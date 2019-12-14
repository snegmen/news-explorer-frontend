/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import './vendor/normalize.css';
import './index.css';
import config from './scripts/config';
import { mainMenu } from './blocks/heading/heading';
import Popup from './blocks/common/popup/popup';
import SysError from './blocks/common/error/error';
import ApiBack from './scripts/api';
import HeadingMenu from './scripts/heading-menu';
import NewsApi from './scripts/news-api';
import NewsRendering from './scripts/news-rendering';

const sysError = new SysError();
const apiBack = new ApiBack(config);
const newsApi = new NewsApi(config.newsFeed, config.sevenDays);

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

const regForm = new Popup(
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

const newsRender = new NewsRendering(
  newsApi.getNews.bind(newsApi),
  apiBack.saveArticle.bind(apiBack),
  apiBack.deleteArticle.bind(apiBack),
  sysError,
  config,
);

userMenu.init();

window.onresize = () => {
  if (window.innerWidth > 767) mainMenu.close();
};
