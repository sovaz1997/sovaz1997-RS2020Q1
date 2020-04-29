import Utils from '../utils/utils';

export default class App {
  constructor() {
    this.createElement();
    this.render();
  }

  createElement() {
    this.el = Utils.createElement('div', ['app']);
  }

  static createHeader() {
    return Utils.createElement('header', ['site-header'], [
      Utils.createElement('h1', ['site-header__name'], ['Movie Search']),
    ]);
  }

  render() {
    this.el.innerHTML = '';
    this.el.append(App.createHeader());
  }
}
