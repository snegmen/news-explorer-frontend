/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import './vendor/normalize.css';
import './index.css';
import config from './scripts/config';
import { mainMenu, menuOperator } from './blocks/heading/heading';

window.onresize = () => {
  if (window.innerWidth > 767) mainMenu.close();
};
