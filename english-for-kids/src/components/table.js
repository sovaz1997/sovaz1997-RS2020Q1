import Utils from '../utils/utils';

export default class Table {
  state = {
    fields: [],
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
    const { sortType } = this.state.fields[sortIndex];
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

  addField(name, text, sortType) {
    this.state.fields.push({ name, text, sortType });
  }
}
