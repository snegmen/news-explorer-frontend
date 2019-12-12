/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import './vendor/normalize.css';
import './index.css';
import config from './scripts/config';
import { mainMenu, menuOperator } from './blocks/heading/heading';
import HeadingMenu from './scripts/heading-menu';
import Popup from './blocks/common/popup/popup';
import ApiBack from './scripts/api';

const apiBack = new ApiBack(config);

const loginForm = new Popup(
  document.querySelector('#login-form'),
  '#signup-form',
  apiBack.login.bind(apiBack),
  apiBack.getUserName.bind(apiBack),
  // showError,
);

const userMenu = new HeadingMenu(
  loginForm.open.bind(loginForm),
  apiBack.logout.bind(apiBack),
);
userMenu.init();

window.onresize = () => {
  if (window.innerWidth > 767) mainMenu.close();
};
