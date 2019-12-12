/* eslint-disable no-undef */
/* eslint-disable no-underscore-dangle */
export default class CommitsRendering {
  constructor(swiper, getCommits, { month, slider }) {
    this.getCommits = getCommits;
    this.slider = slider;
    this.month = month;
    this.swiperUpdate = swiper;
    this._cardTemplate = document.querySelector(this.slider.template).content;
  }

  init() {
    this.getCommits()
      .then((data) => {
        this._renderCommits(data);
      })
      .catch(() => {
        document.querySelector(this.slider.node).style.display = 'none';
      });
  }

  _buildCommit(data) {
    const container = this._cardTemplate.cloneNode(true);

    container.querySelector(this.slider.commitDate)
      .textContent = `${data.date.getDate()} ${this.month[data.date.getMonth()]} ${data.date.getFullYear()}`;
    container.querySelector(this.slider.commitImage).src = data.avatar;
    container.querySelector(this.slider.commitName).textContent = data.name;
    container.querySelector(this.slider.commitEmail).textContent = data.email;
    container.querySelector(this.slider.commitText).textContent = data.message;
    return container;
  }

  _renderCommits(data) {
    const container = document.createDocumentFragment();
    data.forEach((item) => {
      container.appendChild(this._buildCommit(item));
    });
    document.querySelector(this.slider.swiperWrap).appendChild(container);
    this.swiperUpdate();
  }
}
