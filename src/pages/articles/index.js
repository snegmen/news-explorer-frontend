/* eslint-disable no-undef */
import '../../vendor/normalize.css';
import './index.css';
import { mainMenu } from '../../blocks/heading/heading';

window.onresize = () => {
  if (window.innerWidth > 767) mainMenu.close();
};
