import Utils from '../utils/utils';

export default class Table {
  state = {
    columns: [],
    data: [],
    sortIndex: 0,
    ascending: true,
  };

  constructor() {
    this.createElement();
  }

  createElement() {
    this.el = Utils.createElement('table', 'table');
  }

  render() {
    this.el.innerHTML = '';

    this.sortData();
  }

  sortData() {
    const { sortIndex } = this.state;
    const { sortType } = this.state.columns[sortIndex];
    this.state.data = this.state.data.sort((a, b) => {
      let res = 0;
      if (sortType === 'number') {
        res = Number(b[sortIndex]) - Number(a[sortIndex]);
      } else if (sortType === 'string') {
        if (a < b) res = 1;
        else if (a > b) res = -1;
        else res = 0;
      }

      return res;
    });
  }

  addColumn(name, text, sortType) {
    this.state.columns.push({ name, text, sortType });
  }

  addField(field) {
    this.state.data.push(field);
  }
}
