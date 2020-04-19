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

    this.el.append(this.getHeaderElement());
    this.state.data.forEach((element) => {
      this.el.append(Table.getFieldElement(element));
    });
  }

  getHeaderElement() {
    const el = Utils.createElement('tr', 'table__row');
    this.state.columns.forEach((column, index) => {
      el.append(this.getColumnCell(column.text, index));
    });
    return el;
  }

  static getFieldElement(field) {
    const el = Utils.createElement('tr', 'table__row');
    field.forEach((element) => {
      el.append(Table.getFieldCell(element));
    });
    return el;
  }

  getColumnCell(text, ind) {
    const el = Utils.createElement('td', 'table__column');
    el.dataset.index = ind;
    el.innerText = text;

    el.addEventListener('click', (e) => {
      const { index } = e.target.dataset;

      if (this.state.sortIndex === index) {
        this.state.ascending = !this.state.ascending;
      } else {
        this.state.ascending = true;
      }

      this.state.sortIndex = index;
      this.render();
    });

    return el;
  }

  static getFieldCell(text) {
    const el = Utils.createElement('td', 'table__cell');
    el.innerText = text;
    return el;
  }

  sortData() {
    const { sortIndex } = this.state;
    const { sortType } = this.state.columns[sortIndex];

    this.state.data = this.state.data.sort((a, b) => {
      let res = 0;
      if (sortType === 'number') {
        res = Utils.getNumber(b[sortIndex]) - Utils.getNumber(a[sortIndex]);
      } else if (sortType === 'string') {
        if (a[sortIndex] < b[sortIndex]) res = -1;
        else if (a[sortIndex] > b[sortIndex]) res = 1;
        else res = 0;
      }

      if (!this.state.ascending) return -res;
      return res;
    });
  }

  addColumn(name, text, sortType) {
    this.state.columns.push({ name, text, sortType });
  }

  addField(field) {
    this.state.data.push(field);
  }

  clearData() {
    this.state.data = [];
  }
}
