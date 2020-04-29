import Utils from '../utils/utils';
import Header from './header';
import FilmCard from './film-card';

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
    this.el.append(FilmCard({
      name: 'Test', posterSrc: '.', releaseYear: '2007', rating: '9.5',
    }));
  }
}
