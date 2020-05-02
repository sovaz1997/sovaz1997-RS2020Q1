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
    document.addEventListener('keydown', (e) => {
      if (e.code === 'Escape') this.close();
    });
  }

  render() {
    this.el.innerHTML = '';

    const menuElement = Utils.createElement('ul', 'menu__list');

    const blur = Utils.createElement('div', 'menu__blur');

    const { data } = this.state;

    const dataObject = Utils.getObjectData(data);

    for (let i = 0; i < dataObject.length; i += 1) {
      menuElement.append(this.getMenuElement(dataObject.values[i]));
    }

    blur.addEventListener('click', () => {
      this.close();
    });

    this.el.append(menuElement);
    this.el.append(blur);
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
      setTimeout(data.callback, 300);
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

  static addSimpleLinkToData(data, text, callback) {
    const dataObject = data;
    dataObject[text] = { simple: true, text, callback };
  }

  addSimpleLink(text, callback) {
    Menu.addSimpleLinkToData(this.state.data, text, callback);
  }

  addInnerMenu(text) {
    this.state.data[text] = ({ simple: false, text, data: [] });
  }

  addLinkToInnerMenu(menuName, text, callback) {
    const menu = this.state.data[menuName];
    if (!menu.simple) Menu.addSimpleLinkToData(menu.data, text, callback);
  }
}
