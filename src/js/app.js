import NicknameModal from "./NicknameModal";
import ChatModal from "./ChatModal";
import UserService from "./UserService";
import User from "./User";
import Message from "./Message";

const nicknameModal = new NicknameModal();
const chatModal = new ChatModal();
const userService = new UserService();

let currentUser;

nicknameModal.modal.addEventListener("submit", (e) => {
  e.preventDefault();
  const nickname = nicknameModal.input.value.trim();
  if (nickname) {
    userService.register(
      nickname,
      (newUser) => {
        currentUser = new User(newUser.name, chatModal.userContainer);
        currentUser.bindToDOM();
        nicknameModal.close();
        chatModal.open();
      },
      (errorMessage) => {
        nicknameModal.invalidName.classList.add("active");
        nicknameModal.invalidName.textContent = errorMessage;
      },
    );
  } else {
    nicknameModal.invalidName.classList.add("active");
    nicknameModal.invalidName.textContent = "To continue enter your nickname";
  }
});

const ws = new WebSocket("wss://server-for-chat-sh2y.onrender.com/ws");
const chatContainer = document.querySelector(".chat-messages");
let text;

ws.onopen = () => {
  console.log("Подключено к серверу");
};

chatModal.textarea.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    console.log(e.key);
    e.preventDefault();
    sendMessage();
  }
});

function sendMessage() {
  text = chatModal.textarea.value.trim();
  if (!text) return;

  const msg = {
    type: "send",
    user: { name: currentUser.name },
    message: text,
    date: Date.now(),
  };

  ws.send(JSON.stringify(msg));
  chatModal.textarea.value = "";
}

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log(data);

  if (Array.isArray(data)) {
    console.log("список пользователей:", data);
    data.forEach((user) => {
      const userEl = new User(user.name, chatModal.userContainer);
      userEl.bindToDOM();
    });

    return;
  }

  if (data.type === "send") {
    const { user, message, date } = data;
    const messageEl = new Message(
      currentUser.name === user.name ? "You" : user.name,
      date,
      message,
      chatContainer,
    );
    messageEl.bindToDOM();
    if (currentUser.name === user.name)
      messageEl.message.classList.add("active");
  }
};

window.addEventListener("beforeunload", () => {
  if (ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify({ type: "exit", user: { name: currentUser.name } }));
  }
});

ws.onclose = () => {
  currentUser.user.remove();
};
