export default class User {
  constructor(name, parentEl) {
    this.parentEl = parentEl;
    this.name = name;
  }

  bindToDOM() {
    this.user = document.createElement("div");
    this.user.classList.add("user");
    this.user.innerHTML = `
      <input type="checkbox" class="user-checkbox">
      <p class="user-name">${this.name}</p>
      `;
    this.parentEl.append(this.user);
  }
}
