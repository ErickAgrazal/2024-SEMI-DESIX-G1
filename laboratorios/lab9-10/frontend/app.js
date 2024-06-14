(() => {
  const App = {
    htmlElements: {
      form: document.querySelector('form'),
    },
    init() {
      this.bindEvents();
    },
    bindEvents() {
      this.htmlElements.form.addEventListener('submit', this.events.submitForm);
    },
    events: {
      async submitForm(event) {
        event.preventDefault();
        const name = event.target.querySelector('input[name="name"]').value;
        const payload = { name };
        const rawResponse = await fetch('http://localhost:3000/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        const data = await rawResponse.json();
        console.log(data);
      },
    },
  };
  App.init();
})();
