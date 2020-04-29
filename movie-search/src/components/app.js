import Utils from '../utils/utils';
import Header from './header';
import Data from '../utils/data';

export default class App {
  constructor() {
    this.createElement();
    this.render();
    Data.getSearchResults('dream', 1).then((content) => {
      console.log(content);
    });
  }

  createElement() {
    this.el = Utils.createElement('div', ['app']);
  }

  render() {
    this.el.innerHTML = '';
    this.el.append(Header());
  }
}
