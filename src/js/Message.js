export default class Message {
  constructor(name, date, text, parentEl) {
    this.parentEl = parentEl;
    this.name = name;
    this.date = date;
    this.text = text;
  }
  bindToDOM() {
    this.message = document.createElement("div");
    this.message.classList.add("message");
    this.message.innerHTML = `
      <div class="message-details">
      <span class="name">${this.name},</span>
      <span class="date">${this.formatDate()}</span>
      </div>
      <p class="message-text">${this.text}</p>
      `;

    this.parentEl.append(this.message);
  }

  formatDate() {
    const date = new Date(this.date);
    const dateStr = date.toLocaleDateString("ru-RU");
    const timeStr = date.toLocaleTimeString("ru-RU", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    return `${timeStr} ${dateStr}`;
  }
}
