import Utils from '../utils/utils';

export default class PageContent {
  constructor(pageInfo) {
    this.info = pageInfo;
    this.createElement();
  }

  createElement() {
    this.el = Utils.createElement('div', 'page__content');
    this.createHeaders(this.el);
  }

  createHeaders(selector) {
    if (this.info) {
      const { name, description } = this.info;

      const headerDOMElement = Utils.createElement('h2', 'page__header');
      headerDOMElement.innerText = name;
      selector.append(headerDOMElement);

      const descriptionDOMElement = Utils.createElement('p', 'page__description');
      descriptionDOMElement.innerText = description;
      selector.append(descriptionDOMElement);
    }
  }

  clearContent() {
    this.el.innerHTML = '';
  }

  addContent(contentItem) {
    this.el.append(contentItem);
  }
}
