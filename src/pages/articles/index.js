/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import '../../vendor/normalize.css';
import './index.css';
import config from '../../scripts/config';
import { mainMenu } from '../../blocks/heading/heading';
import HeadingMenu from '../../scripts/heading-menu';
import Popup from '../../blocks/common/popup/popup';
import SysError from '../../blocks/common/error/error';
import ApiBack from '../../scripts/api';
import ArticlesSaved from '../../scripts/articles-saved';

const sysError = new SysError();
const apiBack = new ApiBack(config);

const loginForm = new Popup(
  document.querySelector('#login-form'),
  '#signup-form',
  apiBack.login.bind(apiBack),
  apiBack.getUserName.bind(apiBack),
  sysError,
);

const signupForm = new Popup(
  document.querySelector('#signup-form'),
  '#login-form',
  apiBack.signUp.bind(apiBack),
  apiBack.getUserName.bind(apiBack),
  sysError,
);

const regCompleteForm = new Popup(
  document.querySelector('#signup-ok'),
  '#login-form',
  null,
  null,
  sysError,
);

const userMenu = new HeadingMenu(
  loginForm.open.bind(loginForm),
  apiBack.logout.bind(apiBack),
  sysError,
);

userMenu.init();

const myArticles = new ArticlesSaved(
  apiBack.getAllArticles.bind(apiBack),
  apiBack.deleteArticle.bind(apiBack),
  config,
  sysError,
);

window.onresize = () => {
  if (window.innerWidth > 767) mainMenu.close();
};
