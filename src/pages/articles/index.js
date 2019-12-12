/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import '../../vendor/normalize.css';
import './index.css';
import config from '../../scripts/config';
import { mainMenu } from '../../blocks/heading/heading';
import HeadingMenu from '../../scripts/heading-menu';
import Popup from '../../blocks/common/popup/popup';
import ShowError from '../../blocks/common/error/error';
import ApiBack from '../../scripts/api';

const showError = new ShowError();
const apiBack = new ApiBack(config);

const loginForm = new Popup(
  document.querySelector('#login-form'),
  '#signup-form',
  apiBack.login.bind(apiBack),
  apiBack.getUserName.bind(apiBack),
  showError,
);

const signupForm = new Popup(
  document.querySelector('#signup-form'),
  '#login-form',
  apiBack.signUp.bind(apiBack),
  apiBack.getUserName.bind(apiBack),
  showError,
);

const regCompleteForm = new Popup(
  document.querySelector('#signup-ok'),
  '#login-form',
  null,
  null,
  showError,
);

const userMenu = new HeadingMenu(
  loginForm.open.bind(loginForm),
  apiBack.logout.bind(apiBack),
  showError,
);

userMenu.init();

window.onresize = () => {
  if (window.innerWidth > 767) mainMenu.close();
};
