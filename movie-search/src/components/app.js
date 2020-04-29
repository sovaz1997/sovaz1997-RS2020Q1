import Utils from '../utils/utils';

export default class App {
  state = {
    pages: {},
  };

  constructor() {
    this.createElement();
  }


  createElement() {
    this.el = Utils.createElement('div', 'app');
  }

  render() {
    this.el.innerHTML = '';
  }
}
