import Utils from '../utils/utils';

export default class Menu {
  state = {
    data: [],
  };

  constructor() {
    this.createElement();
  }

  createElement() {
    this.el = Utils.createElement('div', 'menu');
  }

  render() {
    this.el.innerHTML = '';

    const menuElement = Utils.createElement('ul', 'menu__list');

    const { data } = this.state;

    const dataObject = Utils.getObjectData(data);

    for (let i = 0; i < dataObject.length; i += 1) {
      menuElement.append(this.getMenuElement(dataObject.values[i]));
    }

    this.el.append(menuElement);
    this.close();
  }

  bindCloseButton(element) {
    element.addEventListener('click', () => {
      this.toggle();
    });
  }

  close() {
    this.toggle(true);
  }

  open() {
    this.toggle(false);
  }

  toggle(value) {
    if (value === undefined) {
      this.el.classList.toggle('menu--closed');
    } else {
      this.el.classList.toggle('menu--closed', value);
    }
  }

  getMenuElement(data) {
    if (data.simple) return this.getSimpleLinkElement(data);
    return this.getInnerMenuElement(data);
  }

  getSimpleLinkElement(data) {
    const element = Utils.createElement('li', 'menu__link');
    element.innerText = data.text;

    element.addEventListener('click', () => {
      this.close();
      data.callback();
    });
    return element;
  }

  getInnerMenuElement(data) {
    const element = Utils.createElement('li', 'menu__inner');
    const textElement = Utils.createElement('span', 'menu__inner-list-header');
    const innerMenuElement = Utils.createElement('ul', 'menu__inner-list');

    textElement.innerText = data.text;

    const dataObject = Utils.getObjectData(data.data);
    for (let i = 0; i < dataObject.length; i += 1) {
      innerMenuElement.append(this.getMenuElement(dataObject.values[i]));
    }

    element.append(textElement);
    element.append(innerMenuElement);

    textElement.addEventListener('click', () => {
      element.classList.toggle('menu__inner--closed');
    });

    return element;
  }

  addSimpleLinkToData(data, text, callback) {
    const dataObject = data;
    dataObject[text] = { simple: true, text, callback };
    this.render();
  }

  addSimpleLink(text, callback) {
    this.addSimpleLinkToData(this.state.data, text, callback);
  }

  addInnerMenu(text) {
    this.state.data[text] = ({ simple: false, text, data: [] });
    this.render();
  }

  addLinkToInnerMenu(menuName, text, callback) {
    const menu = this.state.data[menuName];
    if (!menu.simple) this.addSimpleLinkToData(menu.data, text, callback);
    this.render();
  }
}
