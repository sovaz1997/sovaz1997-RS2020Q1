import store from '../store/store';
import Table from './table';
import Utils from '../utils/utils';

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
    Stats.updateTableView();
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
    Stats.updateTableView();
  }

  static createTable() {
    Stats.table = new Table();

    Stats.table.addColumn('category', 'Category', 'string');
    Stats.table.addColumn('word', 'Word', 'string');
    Stats.table.addColumn('translation', 'Translation', 'string');
    Stats.table.addColumn('train-clicks', 'Clicks in train', 'number');
    Stats.table.addColumn('success-rate', 'Success rate (%)', 'number');
  }

  static updateTableView() {
    if (!Stats.table) Stats.createTable();
    Stats.table.clearData();
    const data = Utils.getObjectData(Stats.data);

    for (let i = 0; i < data.length; i += 1) {
      Stats.table.addField([
        data.values[i].category,
        data.values[i].word,
        data.values[i].translation,
        data.values[i].clicksInTrain,
        `${Stats.getSuccessRate(data.values[i])}%`,
      ]);
    }

    Stats.table.render();
  }

  static getSuccessRate(dataField) {
    const sum = dataField.success + dataField.fail;
    if (!sum) return 0;
    return Math.round(100 * (dataField.success / sum));
  }

  static getTable() {
    Stats.updateTableView();
    return Stats.table.el;
  }
}
