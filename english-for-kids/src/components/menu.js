import Utils from '../utils/utils';

export default class Menu {
  state = {
    data: [],
  };

  createElement() {
    this.el = Utils.createElement('div', 'menu');
  }

  render() {
    this.el.innerHTML = '';

    const menuElement = Utils.createElement('ul', 'menu__list');

    const data = Utils.getObjectData(this.state.data);

    for (let i = 0; i < data.length; i += 1) {
      menuElement.append(Menu.getMenuElement(data[i]));
    }

    this.el.append(menuElement);
  }

  static getMenuElement(data) {
    if (data.simple) return Menu.getSimpleLinkElement(data);
    return Menu.getInnerMenuElement(data);
  }

  static getSimpleLinkElement(data) {
    const element = Utils.createElement('li', 'menu__link');
    element.innerText = data.text;
    element.addEventListener('click', () => {
      data.callback();
    });
    return element;
  }

  static getInnerMenuElement(data) {
    const element = Utils.createElement('li', 'menu__inner');
    const textElement = Utils.createElement('span', 'menu__inner-list-header');
    const innerMenuElement = Utils.createElement('ul', 'menu__inner-list');

    for (let i = 0; i < data.data.length; i += 1) {
      innerMenuElement.append(Menu.getMenuElement(data.data[i]));
    }

    element.append(textElement);
    element.append(innerMenuElement);

    return element;
  }

  static addSimpleLink(data, text, callback) {
    const dataObject = data;
    dataObject[text] = { simple: true, text, callback };
  }

  addInnerMenu(text) {
    this.state.data[text] = { simple: false, text, data: [] };
  }

  addLinkToInnerMenu(menuName, text, callback) {
    const menu = this.state.data[menuName];

    if (menu.simple) {
      Menu.addSimpleLink(menu.data, text, callback);
    }
  }
}
