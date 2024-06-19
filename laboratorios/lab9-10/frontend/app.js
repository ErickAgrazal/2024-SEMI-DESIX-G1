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
        const username = event.target.querySelector('input[name="username"]').value;
        const password = event.target.querySelector('input[name="password"]').value;
        const payload = { username, password };
        const rawResponse = await fetch('http://localhost:3000/api/users/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        const data = await rawResponse.json();

        const rawResponseUsers = await fetch('http://localhost:3000/api/users', {
          headers: { 'Content-Type': 'application/json', 'Authorization': data.token },
        });
        const dataUsers = await rawResponseUsers.json();

        console.log({ data, dataUsers });
      },
    },
  };
  App.init();
})();
