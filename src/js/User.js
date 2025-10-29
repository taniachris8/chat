export default class User {
  constructor(name, id, parentEl) {
    this.parentEl = parentEl;
    this.name = name;
    this.id = id;
  }

  bindToDOM() {
    this.user = document.createElement("div");
    this.user.classList.add("user");
    this.user.innerHTML = `
      <input type="checkbox" class="user-checkbox">
      <p class="user-name">${this.name}</p>
      `;
    this.parentEl.append(this.user);

    this.userCheckbox = this.user.querySelector(".user-checkbox");
    this.userName = this.user.querySelector(".user-name");
  }
}
