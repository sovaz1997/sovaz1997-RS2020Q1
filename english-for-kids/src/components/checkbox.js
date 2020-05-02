import Utils from '../utils/utils';

export default class CheckBox {
  state = {
    items: [],
    active: 0,
  };

  constructor(...extraClasses) {
    this.createElement(extraClasses);
    this.addEventListeners();
  }

  createElement(classes) {
    this.el = Utils.createElement('div', 'checkbox', ...classes);
  }

  render() {
    this.el.innerHTML = '';

    const { active } = this.state;

    this.state.items.forEach((item, index) => {
      this.el.append(this.getButton(index, item, index === active));
    });
  }

  setActive(index) {
    this.state.active = Number(index);
    this.render();
  }

  getButton(index, { text, callback }, active) {
    const activeClassName = 'checkbox__button--active';

    const button = document.createElement('button');
    button.classList.add('checkbox__button');

    if (active) button.classList.add(activeClassName);

    button.dataset.index = index;
    button.innerText = text;

    button.addEventListener('click', (e) => {
      if (Number(e.target.dataset.index) !== this.state.active) {
        callback();
      }
    });

    return button;
  }

  addItem(text, callback) {
    this.state.items.push({ text, callback });
    this.render();
  }

  addEventListeners() {
    this.el.addEventListener('click', (e) => {
      if (e.target.dataset.index !== undefined) {
        this.setActive(e.target.dataset.index);
      }
    });
  }
}
