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

    this.state.items.forEach((item, index, arr) => {
      this.el.append(NavigationChain.getItem(item));

      if (index < arr.length - 1) {
        this.el.append(NavigationChain.getSplitter());
      }
    });
  }

  static getItem({ text, callback }) {
    const el = Utils.createElement('a', 'navigation-chain__item', 'navigation-chain__item--link');
    el.setAttribute('href', '#');
    el.innerText = text;
    el.addEventListener('click', () => {
      callback();
    });
    return el;
  }

  static getSplitter() {
    return Utils.createElement('span', 'navigation-chain__item', 'navigation-chain__item--splitter');
  }

  addItem(text, callback) {
    this.state.items.push({ text, callback });
    this.render();
  }
}
