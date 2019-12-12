/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import '../../vendor/normalize.css';
import './index.css';
import { mainMenu } from '../../blocks/heading/heading';
import HeadingMenu from '../../scripts/heading-menu';
import Popup from '../../blocks/common/popup/popup';
import ApiBack from '../../scripts/api';

const userMenu = new HeadingMenu();
userMenu.init();

window.onresize = () => {
  if (window.innerWidth > 767) mainMenu.close();
};
