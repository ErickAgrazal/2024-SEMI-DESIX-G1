(() => {
  const App = {
    htmlElements: {
      form: document.getElementById("form"),
      results: document.getElementById("results"),
    },
    init() {
      App.bindEvents();
    },
    bindEvents() {
      App.htmlElements.form.addEventListener("submit", App.handlers.onSubmit);
    },
    handlers: {
      onSubmit(e) {
        e.preventDefault();
        const name = e.target.name.value;
        const color = e.target.color.value;
        const html = App.templates.card(name, color);
        App.render(html);
        App.templates.chart();
        App.methods.rebindButtonEvents();
      },
      onClick(type) {
        return (e) => {
          const card = e.target.closest(".card");
          const count = parseInt(card.dataset.count);
          card.dataset.count = type === "add" ? count + 1 : count - 1;
          card.querySelector(".count").textContent = card.dataset.count;
          App.templates.chart();
        };
      },
    },
    templates: {
      button: (text, type) => `<button class="${type}">${text}</button>`,
      card: (title, color) => {
        const addButton = App.templates.button("+", "add");
        const substractButton = App.templates.button("-", "substract");
        const id = document.querySelectorAll(".card").length + 1;
        return `
            <div class="card" data-id="${id}" data-count="1" data-name="${title}" data-color="${color}">
              <h2>
                ${title} <span class="count">0</span>
                <div class="pill" style="background-color: ${color};"></div>
              </h2>
              <div class="card-footer">
                ${substractButton} ${addButton} 
              </div>
            </div>
          `;
      },
      chart: () => {
        console.log("chart");
        const cards = document.querySelectorAll(".card");
        const sumOfCounts = Array.from(cards).reduce((acc, card) => {
          return acc + parseInt(card.dataset.count);
        }, 0);
        const html = Array.from(cards).map((c) => {
          c.dataset.percent = (parseInt(c.dataset.count) / sumOfCounts) * 100;
          return `
            <div
              class="bar"
              style="width: ${c.dataset.percent}%; background-color: ${c.dataset.color};"
            >
            </div>
          `;
        });
        console.log(html);
        const chart = document.querySelector("#chart");
        chart.innerHTML = html;
      },
    },
    methods: {
      rebindButtonEvents() {
        const buttons = document.querySelectorAll(".add, .substract");
        buttons.forEach((button) => {
          button.addEventListener(
            "click",
            App.handlers.onClick(button.className),
          );
        });
      },
    },
    render(html) {
      App.htmlElements.results.innerHTML += html;
    },
  };
  App.init();
})();
