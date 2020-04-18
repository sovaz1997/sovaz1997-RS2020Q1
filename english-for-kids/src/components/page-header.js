import Utils from '../utils/utils';

export default class Header {
  constructor() {
    this.createElement();
  }

  createElement() {
    this.el = Utils.createElement('header', 'site-header');

    this.createMenuButton();
    this.createHeaderText();

    this.el.append(this.menuButton);
    this.el.append(this.headerText);
  }

  createMenuButton() {
    this.menuButton = Utils.createElement('button', 'site-header__menu-button');
  }

  createHeaderText() {
    this.headerText = Utils.createElement('h1', 'site-header__name');
    this.headerText.innerHTML = 'English <span>- for kids</span>';
  }
}
