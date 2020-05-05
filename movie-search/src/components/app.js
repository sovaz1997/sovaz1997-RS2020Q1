import Utils from '../utils/utils';
import Header from './header';
import FilmCard from './film-card';
import FilmCardList from './film-card-list';

export default class App {
  constructor() {
    this.createElement();

    this.filmCard = new FilmCardList('film-card-list');

    this.render();
  }

  createElement() {
    this.el = Utils.createElement('div', 'app');
  }

  render() {
    this.el.innerHTML = '';
    this.el.append(Header());
    this.el.append(FilmCard({
      name: 'Test', posterSrc: '.', releaseYear: '2007', rating: '9.5',
    }));

    this.el.append(this.filmCard.el);
  }
}
