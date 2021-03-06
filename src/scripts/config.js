const config = {
  url: 'https://api.newsyp.tk',
  login: 'https://api.newsyp.tk/signin',
  signup: 'https://api.newsyp.tk/signup',
  logout: 'https://api.newsyp.tk/logout',
  getUser: 'https://api.newsyp.tk/users/me',
  articles: 'https://api.newsyp.tk/articles',
  git: 'https://api.github.com/repos/snegmen/news-explorer-frontend/commits',
  maxGitCommits: 15,
  month: ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа',
    'сентября', 'октября', 'ноября', 'декабря'],
  sevenDays: (7 * 24 * 3600 * 1000),
  newsFeed: 'https://newsapi.org/v2/everything?sortBy=popularity&apiKey=61e9a15929844de49c00be490b903f34&language=ru&pageSize=100',
  results: {
    showStep: 3,
    showMore: { node: '#show-more', hide: 'results__button_hide' },
    resultsField: '.results__articles',
    newsForm: '.search__form',
    newsFormSearchField: '.search__form-input',
    newsFormButton: '#search-the-news',
    preloader: { node: '#preloader-searching', hide: 'preloader__wrapper_hide' },
    notFound: { node: '#preloader-not-found', hide: 'preloader__wrapper_hide' },
    serverError: { node: '#preloader-server-error', hide: 'preloader__wrapper_hide' },
    resultsSection: { node: '.results', hide: 'results_hide' },
  },
  myArticlles: {
    myArticllesContainer: '.saved-articles',
    articlesQty: '.articles-qty',
    articlesHeader: '.saved-description__title',
    words: {
      first: '.first-word',
      second: '.second-word',
      more: '.and-more',
      tail: '.word-tail',
    },
  },
  cardSample: '#card-sample',
  card: {
    node: '.card',
    img: '.card__picture',
    date: '.card__date',
    title: '.card__title',
    text: '.card__text',
    src: '.card__source',
    warning: '.card__balloon',
    keyword: '.card__keyword',
    icon: {
      node: '.card__icon',
      logged: 'card__icon_logged',
      marked: 'card__icon_saved',
      bin: 'card__icon_del',
    },
  },
  slider: {
    node: '.slider',
    commitDate: '.slider__commit-date',
    commitImage: '.slider__commit-image',
    commitName: '.slider__commit-name',
    commitEmail: '.slider__commit-email',
    commitText: '.slider__commit-text',
    template: '#commit-sample',
    swiperWrap: '.swiper-wrapper',
  },
};

export default config;
