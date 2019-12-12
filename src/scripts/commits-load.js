/* eslint-disable no-undef */
export default class CommitsLoad {
  constructor(url, maxGitCommits = 5) {
    this.gitURL = url;
    this.maxGitCommits = maxGitCommits;
  }

  getCommits() {
    return fetch(this.gitURL)
      .then((res) => {
        if (!res.ok) throw new Error(`Ошибка чтения из Git -- ${res.status}`);
        return res.json();
      })
      .then((data) => {
        const commits = [];
        const total = Array.from(Object.keys(data)).length;
        const commitsQty = total < this.maxGitCommits ? total : this.maxGitCommits;
        for (let key = 0; key < commitsQty; key += 1) {
          commits.push({
            name: data[key].commit.committer.name,
            email: data[key].commit.committer.email,
            date: new Date(Date.parse(data[key].commit.committer.date)),
            message: data[key].commit.message,
            avatar: data[key].author.avatar_url,
          });
        }
        return commits;
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  }
}
