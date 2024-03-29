import Utils from '../utils/utils';
import Page from './page';
import CategoriesView from './categories-view';
import store from '../store/store';
import Game from './game';
import Menu from './menu';
import Stats from './stats';
import buttonList from './button-list';

const PAGES = {
  CATEGORIES: 'categories',
  STATISTICS: 'statistics',
  GAME: 'game',
};

export default class App {
  state = {
    pages: {},
  };

  constructor() {
    this.createElement();
    Stats.loadStats();
    this.createPages();
    this.loadPage(PAGES.CATEGORIES);
  }

  loadPage(pageName) {
    store.setPage(pageName);
    this.render();
  }

  createPages() {
    this.createCategoriesPage();
    this.createGamePage();
    this.createStatisticsPage();
  }

  createCategoriesPage() {
    const categoriesPage = new Page('Categories', 'Choose one of these categories:', true);
    const categoriesView = new CategoriesView(this);
    categoriesPage.appendContent(categoriesView.el);
    const menu = this.getMenuElement();
    menu.bindCloseButton(categoriesPage.header.menuButton);
    categoriesPage.appendContent(menu.el);
    this.addPage(PAGES.CATEGORIES, categoriesPage);
  }

  createGamePage() {
    this.game = new Game(this);
    this.addPage(PAGES.GAME, this.game.page);
  }

  createStatisticsPage() {
    this.statisticsPage = new Page('Stats', 'See your stats here:', true);

    const menu = this.getMenuElement();
    menu.bindCloseButton(this.statisticsPage.header.menuButton);
    this.statisticsPage.appendContent(menu.el);

    const table = Stats.getTable();
    this.statisticsPage.appendContent(table);

    const buttons = buttonList(
      App.getClearStatsButton(),
      this.getDifficultGameButon(),
    );

    this.statisticsPage.appendContent(buttons);
    this.addPage(PAGES.STATISTICS, this.statisticsPage);
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

      if (props.difficult) {
        this.game.customLoad('Difficult', Stats.getDifficult());
      } else {
        this.game.setCategory(props.category);
      }

      this.game.loadGame();
      this.game.render();
    } else if (command === 'load-statistics') {
      Stats.updateTableView();
      this.loadPage(PAGES.STATISTICS);
    }
  }

  getMenuElement() {
    const menu = new Menu();

    menu.addSimpleLink('Main Page', () => {
      this.controller('load-categories');
    });

    menu.addInnerMenu('Categories');

    const categories = store.getCategories();

    categories.forEach((category) => {
      menu.addLinkToInnerMenu('Categories', category, () => {
        this.controller('load-cards', { category });
      });
    });

    menu.addSimpleLink('Statistics', () => {
      this.controller('load-statistics');
    });

    menu.render();

    return menu;
  }

  static getClearStatsButton() {
    return Utils.createButton(
      'Reset',
      () => {
        Stats.clearStats();
      },
    );
  }

  getDifficultGameButon() {
    return Utils.createButton(
      'Repeat difficult words',
      () => {
        this.controller('load-cards', { difficult: true });
      },
    );
  }
}
