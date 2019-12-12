/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import '../../vendor/normalize.css';
import '../../../node_modules/swiper/css/swiper.min.css';
import './index.css';
import Swiper from 'swiper';
import config from '../../scripts/config';
import { mainMenu } from '../../blocks/heading/heading';
import HeadingMenu from '../../scripts/heading-menu';
import Popup from '../../blocks/common/popup/popup';
import ShowError from '../../blocks/common/error/error';
import ApiBack from '../../scripts/api';
import CommitsLoad from '../../scripts/commits-load';
import CommitsRendering from '../../scripts/commits-rendering';

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

const swiper = new Swiper('.swiper-container', {
  updateOnWindowResize: true,
  slidesPerView: 3,
  spaceBetween: 10,
  slidesPerGroup: 3,
  loop: false,
  loopFillGroupWithBlank: false,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  breakpoints: {
    200: {
      slidesPerView: 1,
      slidesPerGroup: 1,
      spaceBetween: 10,
    },
    767: {
      slidesPerView: 2,
      spaceBetween: 10,
      slidesPerGroup: 2,
    },
    1023: {
      slidesPerView: 3,
      spaceBetween: 10,
    },
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

const commitsLoad = new CommitsLoad(config.git, config.maxGitCommits);
const commitsRendering = new CommitsRendering(
  swiper.update.bind(swiper),
  commitsLoad.getCommits.bind(commitsLoad),
  config,
);

commitsRendering.init();

window.onresize = () => {
  if (window.innerWidth > 767) mainMenu.close();
};
