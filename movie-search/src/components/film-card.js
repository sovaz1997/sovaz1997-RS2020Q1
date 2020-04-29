import Utils from '../utils/utils';

const FilmCard = ({
  name, posterSrc, releaseYear, rating,
}) => (
  Utils.createElement('div', ['film-card'], [
    Utils.createElement('h3', ['film-card__name'], [name]),
    Utils.createImage(posterSrc, name, ['film-card__poster']),
    Utils.createElement('span', ['film-card__release'], [releaseYear]),
    Utils.createElement('div', ['film-card__rating rating'], [
      Utils.createElement('div', ['rating__star']),
      Utils.createElement('div', ['rating__value'], [rating]),
    ]),
  ])
);

export default FilmCard;
