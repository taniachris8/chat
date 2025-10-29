import NicknameModal from "./NicknameModal";
import ChatModal from "./ChatModal";
import UserService from "./UserService";
import User from "./User";
import Message from "./Message";
import loadingIcon from "../icons/loading.png";

const nicknameModal = new NicknameModal();
const chatModal = new ChatModal();
const userService = new UserService();

let currentUser;
let ws;

nicknameModal.modal.addEventListener("submit", (e) => {
  e.preventDefault();
  const nickname = nicknameModal.input.value.trim();
  if (nickname) {
    userService.register(
      nickname,
      (newUser) => {
        currentUser = newUser;
        nicknameModal.close();
        chatModal.open();

        initWebSocket();
      },
      (errorMessage) => {
        nicknameModal.invalidName.classList.add("active");
        nicknameModal.invalidName.textContent = errorMessage;
      },
    );
  } else {
    nicknameModal.invalidName.classList.add("active");
    nicknameModal.invalidName.textContent = "Enter your nickname to continue";
  }
});

function initWebSocket() {
  ws = new WebSocket("wss://server-for-chat-sh2y.onrender.com/ws");

  const chatContainer = document.querySelector(".chat-messages");

  const loader = document.createElement("img");
  loader.classList.add("loader");
  loader.alt = "Loading";
  loader.src = loadingIcon;
  chatModal.userContainer.append(loader);

  ws.onopen = () => {
    console.log("Подключено к серверу");
  };

  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);

    if (Array.isArray(data)) {
      loader.remove();
      chatModal.userContainer.innerHTML = "";
      data.forEach((user) => {
        const nameToDisplay =
          currentUser && user.id === currentUser.id ? "You" : user.name;
        const userEl = new User(
          nameToDisplay,
          user.id,
          chatModal.userContainer,
        );
        userEl.bindToDOM();

        if (nameToDisplay === "You") {
          userEl.userCheckbox.style.backgroundColor = "red";
          userEl.userName.style.color = "red";
        }
      });

      return;
    }

    if (data.type === "send") {
      const { user, message, date } = data;
      if (currentUser.id === user.id) {
        const messageEl = new Message("You", date, message, chatContainer);
        messageEl.bindToDOM();
        messageEl.message.classList.add("active");
        chatContainer.scrollTop = chatContainer.scrollHeight;
      } else {
        const messageEl = new Message(user.name, date, message, chatContainer);
        messageEl.bindToDOM();
        messageEl.message.classList.remove("active");
      }
    }
  };

  ws.onclose = () => {
    currentUser.user.remove();
  };

  chatModal.textarea.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  });

  function sendMessage() {
    const text = chatModal.textarea.value.trim();
    if (!text) return;

    const msg = {
      type: "send",
      user: { name: currentUser.name, id: currentUser.id },
      message: text,
      date: Date.now(),
    };

    ws.send(JSON.stringify(msg));
    chatModal.textarea.value = "";
  }

  window.addEventListener("beforeunload", () => {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(
        JSON.stringify({ type: "exit", user: { name: currentUser.name } }),
      );
    }
  });
}
