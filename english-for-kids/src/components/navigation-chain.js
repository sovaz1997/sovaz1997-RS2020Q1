import Utils from '../utils/utils';

export default class NavigationChain {
  state = {
    items: [],
  };

  constructor() {
    this.createElement();
  }

  createElement() {
    this.el = Utils.createElement('div', 'navigation-chain');
  }

  render() {
    this.el.innerHTML = '';
    let renderStr = '';

    this.state.items.forEach((name, index, arr) => {
      renderStr += NavigationChain.getItemHTML(name);

      if (index < arr.length - 1) {
        renderStr += NavigationChain.getSplitterHTML();
      }
    });

    this.el.innerHTML = renderStr;
  }

  static getItemHTML(name) {
    return `<a class="navigation-chain__item navigation-chain__item--link" href="#">${name}</a>`;
  }

  static getSplitterHTML() {
    return '<span class="navigation-chain__item navigation-chain__item--splitter"></span>';
  }

  setItems(items) {
    this.state.items = items;
    this.render();
  }
}
