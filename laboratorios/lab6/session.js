(() => {
  /*
   * DATA array contains the username and password of the users.
   */
  const DATA = [
    { username: "admin", password: "admin" },
    { username: "user", password: "user" },
  ];
  const Session = {
    /*
     * Register a new user with username and password by pushing it to the DATA array.
     * @param {string} username
     * @param {string} password
     * @returns {void}
     */
    register(username, password) {
      DATA.push({ username, password });
    },
    /*
     * Login a user with username and password. If the user exists in the DATA array, set the
     * username in the localStorage and redirect to the homepage.
     * @param {string} username
     * @param {string} password
     * @param {string} homepage
     * @returns {void}
     */
    login(username, password, homepage = "profile.html") {
      DATA.forEach((item) => {
        if (item.username === username && item.password === password) {
          localStorage.setItem("username", username);
          window.location.href = homepage;
        }
      });
    },
    /*
     * Logout a user by removing the username from the localStorage and redirect to the login page.
     * @returns {void}
     */
    logout() {
      localStorage.removeItem("username");
      window.location.href = "login.html";
    },
    /*
     * Check if the user is logged in. If the user is logged in, redirect to the profile page.
     * @returns {void}
     */
    shouldNotBeLoggedIn() {
      if (localStorage.getItem("username"))
        window.location.href = "profile.html";
    },
    /*
     * Check if the user is logged in. If the user is not logged in, redirect to the login page.
     * @returns {void}
     */
    shouldBeLoggedIn() {
      if (!localStorage.getItem("username"))
        window.location.href = "login.html";
    },
  };
  window.Session = Session;
})();
