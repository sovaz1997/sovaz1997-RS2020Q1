import Utils from '../utils/utils';
import Header from './header';

export default class App {
  constructor() {
    this.createElement();
    this.render();
  }

  createElement() {
    this.el = Utils.createElement('div', ['app']);
  }

  render() {
    this.el.innerHTML = '';
    this.el.append(Header());
  }
}
