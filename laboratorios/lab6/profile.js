((Session) => {
  const App = {
    /*
     * HTML elements to bind events.
     */
    htmlElements: {
      logoutButton: document.getElementById("logout"),
    },
    /*
     * Initialize the application by binding events and performing initial validations.
     * @returns {void}
     */
    init() {
      App.bindEvents();
      App.initialValiations();
    },
    /*
     * Perform initial validations to check if the user is logged in.
     * @returns {void}
     */
    initialValiations() {
      Session.shouldBeLoggedIn();
    },
    /*
     * Bind events to the HTML elements.
     * @returns {void}
     */
    bindEvents() {
      App.htmlElements.logoutButton.addEventListener(
        "click",
        App.handlers.handleLogout,
      );
    },
    /*
     * Event handlers for the HTML elements.
     */
    handlers: {
      handleLogout() {
        Session.logout();
      },
    },
    /*
     * Methods to perform operations.
     */
    methods: {},
    /*
     * Templates to render the data.
     */
    templates: {},
    /*
     * Render the data to the HTML.
     */
    render() {},
  };
  App.init();
})(window.Session);
