((Session) => {
  const App = {
    htmlElements: {
      form: document.getElementById("form"),
    },
    init() {
      App.bindEvents();
      App.initialValiations();
    },
    initialValiations() {
      Session.shouldNotBeLoggedIn();
    },
    bindEvents() {
      App.htmlElements.form.addEventListener("submit", App.handlers.onSubmit);
    },
    handlers: {
      onSubmit(event) {
        event.preventDefault();
        const { username, password } = event.target.elements;
        Session.login(username.value, password.value);
      },
    },
    methods: {},
    templates: {},
    render() {},
  };
  App.init();
})(window.Session);
