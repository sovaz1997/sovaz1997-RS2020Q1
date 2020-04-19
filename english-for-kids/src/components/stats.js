import store from '../store/store';

export default class Stats {
  static data = {};

  static loadStats() {
    const data = window.localStorage.getItem('stats');
    if (data) {
      Stats.data = JSON.parse(data);
    } else {
      Stats.loadDefaults();
    }

    console.log(Stats.data);
  }

  static loadDefaults() {
    Stats.data = store.getWordsInCategories();
  }

  static writeStats() {
    window.localStorage.setItem(JSON.stringify(Stats.data));
  }
}
