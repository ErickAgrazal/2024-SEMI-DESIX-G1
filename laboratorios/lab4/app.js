(() => {
  const App = {
    htmlElements: {
      form: document.getElementById("form"),
      response: document.getElementById("response"),
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
        const num = parseInt(e.target.num.value);
        const fibonacci = App.methods.fibonacciArr(num);
        const html = fibonacci.map(App.methods.getHtml);
        App.render(html.join(""));

        const elements = document.querySelectorAll(".remove");
        elements.forEach((element) => {
          element.addEventListener("click", App.handlers.onClick);
        });
      },
      onClick(e) {
        e.target.parentElement.remove();
      },
    },
    methods: {
      fibonacciArr(num) {
        const res = [];
        for (let i = 0; i < num; i++) {
          if (i === 0 || i === 1) {
            res.push(i);
          } else {
            res.push(res[i - 1] + res[i - 2]);
          }
        }
        return res;
      },
      getHtml(num) {
        return `
        <div class="card">
          <div class="remove">X</div>
          <span>${num}</span>
        </div>
        `;
      },
    },
    render(html) {
      document.getElementById("response").innerHTML = html;
    },
  };
  App.init();
})();
