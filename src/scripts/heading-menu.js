/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
/* eslint-disable no-underscore-dangle */
export default class HeadingMenu {
  constructor(loginFormOpen, logout, showError) {
    this.loginHandler = loginFormOpen;
    this.logoutHandler = logout;
    this.showError = showError;
    this._userArea = document.querySelector('#user-area');
    this._shownName = document.querySelector('#shown-user-name');
    this._menuLogout = this._shownName.parentNode.querySelector('.heading__out');
    this._savedArticles = document.querySelector('#menu-saved-articles');
    this._updateView = new Event('updateView', { bubbles: true });
  }

  init() {
    this._renderMenu();
    document.addEventListener('updateMenu', this._renderMenu.bind(this));
    this._userArea.addEventListener('click', () => this._onClick());
  }

  _renderMenu() {
    const user = localStorage && localStorage.getItem('user');
    if (!user) {
      if (document.location.pathname === '/articles/') document.location.href = '../';
      this._shownName.textContent = 'Авторизуйтесь';
      this._menuLogout.style.display = 'none';
      this._savedArticles.style.display = 'none';
    } else {
      this._shownName.textContent = user;
      this._menuLogout.style.display = 'inline-block';
      this._savedArticles.style.display = 'flex';
    }
  }

  _onClick() {
    const user = localStorage && localStorage.getItem('user');
    if (user) {
      this._logout();
    } else {
      this._login();
    }
  }

  _logout() {
    this.logoutHandler()
      .then(() => {
        localStorage && localStorage.clear();
        this._renderMenu();
        document.dispatchEvent(this._updateView);
      })
      .catch((err) => {
        this.showError.show(err.message);
      });
  }

  _login() {
    this.loginHandler();
  }
}
