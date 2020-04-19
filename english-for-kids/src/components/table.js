import Utils from '../utils/utils';

export default class Table {
  state = {
    fields: [],
    data: [],
    sortIndex: 0,
  };

  constructor() {
    this.createElement();
  }

  createElement() {
    this.el = Utils.createElement('table', 'table');
  }

  render() {
    this.el.innerHTML = '';
  }
}
