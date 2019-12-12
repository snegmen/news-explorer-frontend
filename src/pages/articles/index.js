/* eslint-disable no-undef */
import '../../vendor/normalize.css';
import './index.css';
import { mainMenu } from '../../blocks/heading/heading';
import HeadingMenu from '../../scripts/heading-menu';

const userMenu = new HeadingMenu();
userMenu.init();

window.onresize = () => {
  if (window.innerWidth > 767) mainMenu.close();
};
