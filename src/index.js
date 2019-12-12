/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import './vendor/normalize.css';
import './index.css';
import config from './scripts/config';
import { mainMenu, menuOperator } from './blocks/heading/heading';
import HeadingMenu from './scripts/heading-menu';

const userMenu = new HeadingMenu();
userMenu.init();

window.onresize = () => {
  if (window.innerWidth > 767) mainMenu.close();
};
