/* eslint-disable no-undef */
import './heading.css';
import Component from '../common/component';
import Overlay from '../common/overlay/overlay';

class Menu {
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
    this.isBlack = Array.from(this.menu.classList).includes('heading_black');
  }

  click() {
    if (this.isOpened) {
      this.close();
    } else {
      this.open();
    }
  }

  open() {
    this.menuControl.classList.add('heading__mobile_close');
    if (this.isBlack) this.menuControl.classList.add('heading__mobile_close_black');
    this.overlay.show();
    this.menu.classList.add(!this.isBlack ? 'heading_on-top' : 'heading_on-top_black');
    this.menuItems.classList.add('heading__list_show');
    if (this.isBlack) this.menuItems.style.background = 'rgba(255,255,255,1)';
    this.isOpened = true;
  }

  close() {
    this.menuControl.classList.remove('heading__mobile_close');
    this.overlay.hide();
    this.menu.classList.remove('heading_on-top');
    this.menu.classList.remove('heading_on-top_black');
    this.menuItems.classList.remove('heading__list_show');
    if (this.isBlack) this.menuItems.style.background = 'rgba(255,255,255,0)';
    this.isOpened = false;
  }
}

const overlay = new Overlay();

export const mainMenu = new Menu(
  {
    control: '.heading__mobile',
    items: '.heading__list',
    menu: '.heading',
  },
  overlay,
)

export const menuOperator = new Component(
  document.querySelector('.heading__mobile'),
  {
    click: () => {
      mainMenu.click();
    },
  },
);
