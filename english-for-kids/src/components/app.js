import Utils from '../utils/utils';
import Page from './page';
import PageHeader from './page-header';
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
    this.render();
  }

  createPages() {
    this.createHeader();
    this.createCategoriesPage();
    this.createGamePage();
  }

  createHeader() {
    this.appHeader = new PageHeader();
  }

  createCategoriesPage() {
    const categoriesPage = new Page('Categories', 'Choose one of these categories:', true, this.appHeader);
    const categoriesView = new CategoriesView();
    categoriesPage.setContent(categoriesView.el);
    this.addPage('categories', categoriesPage);
  }

  createGamePage() {
    this.game = new Game(this.appHeader);
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
}
