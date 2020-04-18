import storage from '../../data/data.json';

class Store {
  state = {
    page: 'game',
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

    return cards.map((card) => {
      const newCard = {
        ...card,
        image: Store.transformPath(card.image),
        audioSrc: Store.transformPath(card.audioSrc),
      };
      return newCard;
    });
  }

  getCategories() {
    return Object.keys(this.storage.categories);
  }
}

const store = new Store();

export default store;
