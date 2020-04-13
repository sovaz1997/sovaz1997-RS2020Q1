import Utils from '../utils/utils';
import store from '../store/store';

export default class CategoriesView {
  state = {
    categories: [],
  }

  constructor() {
    this.createElement();
  }

  createElement() {
    this.el = Utils.createElement('ul', 'categories');

    this.addCategories();
    this.renderCategories();
  }

  addCategories() {
    const data = store.getCategoriesViewData();
    this.state.categories = [];

    data.forEach((el) => {
      this.addCategory(el);
    });
  }

  renderCategories() {
    this.el.innerHTML = '';

    this.state.categories.forEach((el) => {
      this.el.append(el.element);
    });
  }

  addCategory(categoryInfo) {
    const categoryDOM = Utils.createElement('li', 'categories__item', 'category');
    categoryDOM.innerHTML = `
    <a href="#" class="category__link">
      <h3 class="category__name">${categoryInfo.name}</h3>
      <img class="category__image" src="${categoryInfo.image}">
    </a>`;

    this.state.categories.push({ name: categoryInfo.name, element: categoryDOM });
  }
}
