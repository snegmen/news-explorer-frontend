/* eslint-disable no-undef */
import './heading.css';

export default class Menu {
  constructor(
    {
      control, items, menu,
    },
    overlayObject,
  ) {
    this.isOpened = false;
    this.overlay = overlayObject;
    this.menuItems = document.querySelector(items);
    this.menuControl = document.querySelector(control);
    this.menu = document.querySelector(menu);
  }

  click() {
    if (this.isOpened) {
      this.close();
    } else {
      this.open();
    }
  }

  open() {
    this.menuControl.classList.add('menu__mobile_close');
    this.overlay.show();
    this.menu.classList.add('menu_on-top');
    this.menuItems.classList.add('menu__items-list_show');
    this.isOpened = true;
  }

  close() {
    this.menuControl.classList.remove('menu__mobile_close');
    this.overlay.hide();
    this.menu.classList.remove('menu_on-top');
    this.menuItems.classList.remove('menu__items-list_show');
    this.isOpened = false;
  }
}
