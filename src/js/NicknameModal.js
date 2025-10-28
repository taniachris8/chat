export default class NicknameModal {
  constructor() {
    this.container = document.querySelector(".container");

    this.modal = document.createElement("form");
    this.modal.classList.add("modal", "active");
    this.modal.method = "POST";
    this.modal.action = "https://server-for-chat-sh2y.onrender.com";
    this.modal.innerHTML = `
        <p class="title">Выберите псевдоним</p>
        <input name="name" class="input" type="text">
        <p class="invalid-name"></p>
        <button class="nickname-button">Продолжить</button>
        `;

    this.container.append(this.modal);

    this.input = this.modal.querySelector(".input");
    this.close = this.close.bind(this);
    this.invalidName = this.modal.querySelector(".invalid-name");

    this.input.addEventListener("focus", () => {
      if (this.invalidName.classList.contains("active")) {
        this.invalidName.classList.remove("active");
      }
    });
  }

  close() {
    this.modal.reset();
    this.modal.classList.remove("active");
  }
}
