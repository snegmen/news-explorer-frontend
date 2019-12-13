/* eslint-disable max-len */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-undef */
/* eslint-disable no-underscore-dangle */
export default class NewsRendering {
  constructor(
    getNews, saveArticle, deleteArticle, sysError,
    {
      cardSample, results, card, month,
    },
  ) {
    this.getNews = getNews;
    this.saveArticle = saveArticle;
    this.deleteArticle = deleteArticle;
    this.sysError = sysError;
    this.cfg = results;
    this.cfg.month = month;
    this.card = card;
    this._news = [];
    this.cardTemplate = document.querySelector(cardSample).content;
    this._resultsField = document.querySelector(results.resultsField);
    this._submit = document.querySelector(results.newsForm);
    this._searchString = document.querySelector(results.newsFormSearchField);
    this._searchButton = document.querySelector(results.newsFormButton);
    this._showMore = document.querySelector(results.showMore.node);
    this._preloader = document.querySelector(results.preloader.node);
    this._notFound = document.querySelector(results.notFound.node);
    this._serverError = document.querySelector(results.serverError.node);
    this._resultsSection = document.querySelector(results.resultsSection.node);
    this._currentPos = 0;

    this._submit.addEventListener('submit', (event) => this.search(event));
    this._showMore.addEventListener('click', () => this._renderCards());
    this._resultsField.addEventListener('click', (event) => this.cardHandler(event));
    document.addEventListener('updateView', () => this.patchRender());
  }

  _isLogged() {
    return Boolean(localStorage.getItem('user'));
  }

  _buildCard(data) {
    const container = this.cardTemplate.cloneNode(true);
    container.querySelector(this.card.node).href = data.link;
    container.querySelector(this.card.img).style.backgroundImage = `url(${data.image})`;
    container.querySelector(this.card.date)
      .textContent = `${data.date.getDate()} ${this.cfg.month[data.date.getMonth()]} ${data.date.getFullYear()}`;
    container.querySelector(this.card.title).textContent = data.title;
    container.querySelector(this.card.text).textContent = data.text;
    container.querySelector(this.card.src).textContent = data.source;
    if (this._isLogged()) container.querySelector(this.card.icon.node).classList.add(this.card.icon.logged);
    container.querySelector(this.card.icon.node).setAttribute('cardID', this._currentPos);
    return container;
  }

  _blockForm() {
    this._searchString.setAttribute('disabled', true);
    this._searchButton.setAttribute('disabled', true);
  }

  _unblockForm() {
    this._searchString.removeAttribute('disabled', true);
    this._searchButton.removeAttribute('disabled', true);
  }

  _renderCards() {
    const container = document.createDocumentFragment();
    const delta = this._news.length - this._currentPos;
    const qty = (delta) < this.cfg.showStep ? delta : this.cfg.showStep;
    if (delta <= this.cfg.showStep) this._showMore.classList.add(this.cfg.showMore.hide);
    for (let i = 0; i < qty; i += 1) {
      container.appendChild(this._buildCard(this._news[this._currentPos]));
      this._currentPos += 1;
    }
    this._resultsField.appendChild(container);
  }

  _clearResultsList() {
    this._currentPos = 0;
    this._news.splice(0, this._news.length);
    while (this._resultsField.firstChild) {
      this._resultsField.removeChild(this._resultsField.firstChild);
    }
  }

  search(event) {
    event.preventDefault();
    const key = this._searchString.value.replace(/^\s+/, '');
    if (key.length === 0) {
      this.sysError.show('Что искать?');
      return;
    }
    this._serverError.classList.add(this.cfg.serverError.hide);
    this._resultsSection.classList.add(this.cfg.resultsSection.hide);
    this._notFound.classList.add(this.cfg.notFound.hide);
    this._preloader.classList.remove(this.cfg.preloader.hide);
    this._showMore.classList.remove(this.cfg.showMore.hide);
    if (this._news.length !== 0) {
      this._clearResultsList();
    }
    // this._blockForm();
    this.getNews(key)
      .then((data) => {
        this._news = data;
        this._preloader.classList.add(this.cfg.preloader.hide);
        if (data.length === 0) {
          this._notFound.classList.remove(this.cfg.notFound.hide);
        } else {
          this._unblockForm();
          this._renderCards();
          this._resultsSection.classList.remove(this.cfg.resultsSection.hide);
        }
      })
      .catch((err) => {
        this._notFound.classList.add(this.cfg.notFound.hide);
        this._preloader.classList.add(this.cfg.notFound.hide);
        this._serverError.classList.remove(this.cfg.serverError.hide);
        this._unblockForm();
        this.sysError.show(err.message);
      });
  }

  patchRender() {
    Array.from(this._resultsField.querySelectorAll(this.card.node)).forEach(
      (item) => {
        if (this._isLogged()) {
          item.querySelector(this.card.icon.node).classList.add(this.card.icon.logged);
        } else {
          item.querySelector(this.card.icon.node).classList.remove(this.card.icon.logged);
          item.querySelector(this.card.icon.node).classList.remove(this.card.icon.marked);
        }
      },
    );
  }

  cardHandler(event) {
    const iconClass = this.card.icon.node.slice(1, this.card.icon.node.length);
    if (event.target.className.includes(iconClass)) {
      event.preventDefault();
      if (this._isLogged()) {
        if (event.target.className.includes(this.card.icon.marked)) {
          this.deleteArticle(event.target.getAttribute('UID'))
            .then(() => {
              event.target.classList.remove(this.card.icon.marked);
              event.target.removeAttribute('UID');
            })
            .catch((err) => {
              this.sysError.show(err.message);
            });
          event.target.classList.remove(this.card.icon.marked);
        } else {
          this.saveArticle(this._news[event.target.getAttribute('cardID')])
            .then((res) => {
              event.target.classList.add(this.card.icon.marked);
              event.target.setAttribute('UID', res);
            })
            .catch((err) => {
              this.sysError.show(err.message);
            });
        }
      }
    }
  }
}
