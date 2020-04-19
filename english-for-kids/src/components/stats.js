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
  }

  static loadDefaults() {
    Stats.data = store.getDefaultStats();
  }

  static writeStats() {
    window.localStorage.setItem('stats', JSON.stringify(Stats.data));
  }

  static addWord(word, mode, success) {
    if (mode === 'train') {
      Stats.data[word].clicksInTrain += 1;
    } else {
      Stats.data[word].success += Number(success);
      Stats.data[word].fail += Number(!success);
    }

    Stats.writeStats();
  }

  static clearStats() {
    Stats.loadDefaults();
    Stats.writeStats();
  }
}
