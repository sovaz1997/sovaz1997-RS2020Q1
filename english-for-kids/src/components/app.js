import Utils from '../utils/utils';
import Page from './page';
import CategoriesView from './categories-view';
import store from '../store/store';
import Game from './game';
import Menu from './menu';

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
    const categoriesView = new CategoriesView(this);
    categoriesPage.appendContent(categoriesView.el);
    categoriesPage.appendContent(this.getMenuElement().el);
    this.addPage('categories', categoriesPage);
  }

  createGamePage() {
    this.game = new Game(this);
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

  controller = (command, props) => {
    if (command === 'load-categories') {
      this.loadPage('categories');
    } else if (command === 'load-cards') {
      this.loadPage('game');
      this.game.setCategory(props.category);
      this.game.loadGame();
      this.game.render();
    }
  }

  getMenuElement() {
    const menu = new Menu();

    menu.addSimpleLink('Main Page', () => {
      this.controller('load-categories');
    });

    return menu;
  }
}
