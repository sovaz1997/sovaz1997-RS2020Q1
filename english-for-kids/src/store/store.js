import storage from '../../data/data.json';

class Store {
  state = {
    page: '',
  }

  constructor() {
    this.storage = storage;
    this.instance = this;
  }

  setPage(pageName) {
    this.state.page = pageName;
  }

  static transformPath(path) {
    return `./data/${path}`;
  }

  getCategoriesViewData() {
    const keys = Object.keys(this.storage.categories);
    const values = Object.values(this.storage.categories);

    const res = [];

    for (let i = 0; i < keys.length; i += 1) {
      res.push({ name: keys[i], image: Store.transformPath(values[i].categoryImage) });
    }

    return res;
  }

  getCardsData(categoryName) {
    const { cards } = this.storage.categories[categoryName];

    return cards.map((card) => Store.getTransformCard(card));
  }

  static getTransformCard(card) {
    return {
      ...card,
      image: Store.transformPath(card.image),
      audioSrc: Store.transformPath(card.audioSrc),
    };
  }

  getCategories() {
    return Object.keys(this.storage.categories);
  }

  getCard(category, word) {
    return Store.getTransformCard(
      this.storage.categories[category].cards.find((el) => word === el.word),
    );
  }

  getDefaultStats() {
    const categories = this.getCategories();
    const res = {};
    categories.forEach((category) => {
      const words = this.getCardsData(category);

      for (let i = 0; i < words.length; i += 1) {
        res[words[i].word] = {
          category,
          word: words[i].word,
          translation: words[i].translation,
          clicksInTrain: 0,
          success: 0,
          fail: 0,
        };
      }
    });

    return res;
  }
}

const store = new Store();

export default store;
