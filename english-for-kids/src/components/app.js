import Utils from '../utils/utils';
import Page from './page';
import CategoriesView from './categories-view';
import store from '../store/store';
import Game from './game';

export default class App {
  state = {
    pages: {},
  };

  constructor() {
    this.createElement();
    this.createPages();
    this.loadPage('categories');
  }

  loadPage(pageName) {
    store.setPage(pageName);
    this.render();
  }

  createPages() {
    this.createCategoriesPage();
    this.createGamePage();
  }

  createCategoriesPage() {
    const categoriesPage = new Page('Categories', 'Choose one of these categories:', true);
    const categoriesView = new CategoriesView();
    categoriesPage.setContent(categoriesView.el);
    this.addPage('categories', categoriesPage);
  }

  createGamePage() {
    this.game = new Game(this.controller);
    this.addPage('game', this.game.page);
  }

  addPage(name, page) {
    this.state.pages[name] = page;
  }

  createElement() {
    this.el = Utils.createElement('div', 'app');
  }

  render() {
    this.el.innerHTML = '';
    this.el.append(this.state.pages[store.state.page].el);
  }

  controller(command, props) {
    if (command === 'load-categories-page') {
      this.loadPage('categories');
    } else if (command === 'load-cards') {
      this.loadPage('game');
      this.game.setCategory(props.category);
    }
  }
}
