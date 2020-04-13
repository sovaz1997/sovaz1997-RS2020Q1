import Utils from '../utils/utils';

export default class CheckBox {
  state = {
    items: [],
    active: 0,
  };

  constructor(...extraClasses) {
    this.extraClasses = extraClasses;
    this.createElement();
    this.addEventListeners();
  }

  createElement() {
    this.el = Utils.createElement('div', 'checkbox', ...this.extraClasses);
  }

  render() {
    this.el.innerHTML = '';
    let renderStr = '';

    const { active } = this.state;

    this.state.items.forEach((name, index) => {
      renderStr += CheckBox.getItemHTML(index, name, index === active);
    });

    this.el.innerHTML = renderStr;
  }

  setActive(index) {
    this.state.active = Number(index);
    this.render();
  }

  static getItemHTML(index, name, active) {
    const activeClassName = 'checkbox__button--active';
    return `
      <button
        class="checkbox__button ${active ? activeClassName : ''}"
        data-index="${index}">
        ${name}
      </button>
      `;
  }

  setItems(items) {
    this.state.items = items;
    this.render();
  }

  addEventListeners() {
    this.el.addEventListener('click', (e) => {
      this.setActive(e.target.dataset.index);
    });
  }
}
