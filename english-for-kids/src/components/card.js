import Utils from '../utils/utils';
import Stats from './stats';

export default class Card {
  state = {
    word: '',
    translation: '',
    image: '',
    audioSrc: '',
    active: true,
  };

  constructor(index, state, mode, gameObject) {
    this.index = index;
    this.state = { ...this.state, ...state };
    this.gameObject = gameObject;
    this.mode = mode;
    this.createElement();
  }

  createElement() {
    this.el = Utils.createElement('li', 'card');
    this.el.dataset.index = this.index;
  }

  render() {
    this.el.innerHTML = this.template();
    this.addAudioElement();
    this.addEventListeners();
  }

  template() {
    const {
      word,
      translation,
      image,
    } = this.state;

    return `
      <div class="card__face card__face--front">
        <span class="card__word">${word}</span>
        <img class="card__image" src="${image}">
        <button class="card__speaker-button"></button>
      </div>
      <div class="card__face card__face--back">
        <span class="card__word">${translation}</span>
        <img class="card__image" src="${image}">
      </div>
      `;
  }

  addAudioElement() {
    const audioButton = this.el.querySelector('.card__speaker-button');
    audioButton.addEventListener('click', (e) => {
      e.stopPropagation();
      Utils.playAudio(this.state.audioSrc);
    });
  }

  addEventListeners() {
    this.el.addEventListener('click', () => {
      if (this.mode === 'train') {
        this.flipCard(true);
        Stats.addWord(this.state.word, 'train');
      } else if (this.state.active) {
        this.gameObject.checkWord(this.state.word, this);
      }
    });

    this.el.addEventListener('mouseleave', () => {
      this.flipCard(false);
    });
  }

  flipCard(value) {
    this.el.classList.toggle('card--flipped', value);
  }

  toggleActiveClass() {
    this.el.classList.toggle('card--disable', !this.state.active);
  }

  unactive() {
    this.state.active = false;
    this.toggleActiveClass();
  }
}
