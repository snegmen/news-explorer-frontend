/* eslint-disable no-undef */
import './overlay.css';

export default class Overlay {
  constructor() {
    this.domElement = document.querySelector('.overlay');
  }

  show() {
    this.domElement.classList.add('overlay_on');
  }

  hide() {
    this.domElement.classList.remove('overlay_on');
  }
}
