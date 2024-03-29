import Utils from '../utils/utils';
import PageContent from './page-content';
import PageHeader from './page-header';

export default class Page {
  constructor(name, description, showInfo) {
    this.info = { name, description };

    this.content = new PageContent(showInfo ? this.info : undefined);
    this.header = new PageHeader();

    this.createElement();
  }

  createElement() {
    this.el = Utils.createElement('div');

    this.el.append(this.header.el);

    const main = Utils.createElement('main', 'page');
    const bg = Utils.createElement('div', 'page__background');
    main.append(bg);
    main.append(this.content.el);
    this.el.append(main);
  }

  clearContent() {
    this.content.clearContent();
  }

  appendContent(element) {
    this.content.addContent(element);
  }
}
