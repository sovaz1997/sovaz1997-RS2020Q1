import Utils from '../utils/utils';

export default class Stars {
  state = {
    items: [],
    maxLength: 5,
  };

  constructor(maxLength, ...extraClasses) {
    this.state.maxLength = maxLength;
    this.extraClasses = extraClasses;
    this.createElement();
  }

  createElement() {
    this.el = Utils.createElement('div', 'checkbox', ...this.extraClasses);
  }

  render() {
    this.el.innerHTML = '';
    let renderStr = '';

    this.state.items.forEach((success) => {
      renderStr += Stars.getItemHTML(success);
    });

    this.el.innerHTML = renderStr;
  }

  static getItemHTML(success) {
    const modifier = success
      ? 'stars__star--success'
      : 'stars__star--fail';

    return `<div class="stars__star ${modifier}"></div>`;
  }

  addStar(success) {
    const { items, maxLength } = this.state;
    items.push(success);
    if (items.length > maxLength) items.shift();
    this.render();
  }

  clear() {
    this.state.items = [];
    this.render();
  }
}
