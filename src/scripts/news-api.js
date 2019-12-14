/* eslint-disable no-undef */
export default class NewsApi {
  constructor(newsFeed, sevenDays) {
    this.newsFeed = newsFeed;
    this.sevenDays = sevenDays;
  }

  getNews(query) {
    const dateNow = new Date();
    const dateWeekAgo = new Date(dateNow - this.sevenDays);
    const dateTo = `${dateNow.getFullYear()}-${dateNow.getMonth() + 1}-${dateNow.getDate()}`;
    const dateFrom = `${dateWeekAgo.getFullYear()}-${dateWeekAgo.getMonth() + 1}-${dateWeekAgo.getDate()}`;
    const url = `${this.newsFeed}&q=${query}&from=${dateFrom}&to=${dateTo}`;
    return fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error('Can not read news feed');
        return res.json();
      })
      .then((data) => {
        const news = [];
        for (let i = 0; i < data.articles.length; i += 1) {
          news.push({
            source: data.articles[i].source.name,
            title: data.articles[i].title,
            date: new Date(Date.parse(data.articles[i].publishedAt)),
            text: data.articles[i].description,
            image: data.articles[i].urlToImage,
            link: data.articles[i].url,
            keyword: query,
          });
        }
        return news;
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  }
}
