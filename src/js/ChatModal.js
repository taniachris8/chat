export default class ChatModal {
  constructor() {
    this.container = document.querySelector(".container");
    this.chat = document.createElement("div");
    this.chat.classList.add("chat");
    this.chat.innerHTML = `
        <div class="user-container"></div>
        <div class="chat-container">
        <div class="chat-messages"></div>
        <form class="chat-form" method="POST" action="https://server-for-chat-sh2y.onrender.com">
        <textarea class="chat-textarea" placeholder="Type your message here"></textarea>
        </form>
        </div>
        `;

    this.container.append(this.chat);
    this.userContainer = this.chat.querySelector(".user-container");
    this.chatForm = this.chat.querySelector(".chat-form");
    this.textarea = this.chat.querySelector(".chat-textarea");
  }

  open() {
    this.chat.classList.add("active");
  }
}
