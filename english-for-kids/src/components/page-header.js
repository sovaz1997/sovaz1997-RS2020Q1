import Utils from '../utils/utils';

export default class Header {
  constructor() {
    this.createElement();
  }

  createElement() {
    this.el = Utils.createElement('header', 'site-header');
    this.el.innerHTML = Header.template();
  }

  static template() {
    return `
      <button class="site-header__menu-button"></button>
      <h1 class="site-header__name">English <span>- for kids</span></h1>
    `;
  }
}
