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

  events = {

  };

  constructor(index, state, mode, gameObject) {
    this.index = index;
    this.state = { ...this.state, ...state };
    this.gameObject = gameObject;
    this.mode = mode;
    this.canFlip = true;
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
        <button class="card__flip-button"></button>
      </div>
      <div class="card__face card__face--back">
        <span class="card__word">${translation}</span>
        <img class="card__image" src="${image}">
      </div>
      `;
  }

  addAudioElement() {
    const audioButton = this.el.querySelector('.card__flip-button');
    audioButton.addEventListener('click', (e) => {
      e.stopPropagation();
      this.flipCard(true);
      Stats.addWord(this.state.word, 'train');
    });
  }

  addEventListeners() {
    this.el.addEventListener('click', () => {
      if (this.mode === 'train') {
        Utils.playAudio(this.state.audioSrc);
      } else if (this.state.active) {
        this.gameObject.checkWord(this.state.word, this);
      }
    });

    this.el.addEventListener('mouseenter', () => {
      this.mouseInCard = true;
    });

    this.el.addEventListener('mouseleave', () => { this.onMouseLeave(); });
  }

  flipCard(value) {
    if (value) {
      this.canFlip = false;
      this.el.classList.toggle('card--flipped', value);
      setTimeout(() => {
        this.canFlip = true;
        if (!this.mouseInCard) this.onMouseLeave();
      }, 700);
    }

    if (this.canFlip) {
      this.el.classList.toggle('card--flipped', value);
    }
  }

  onMouseLeave() {
    this.mouseInCard = false;
    this.flipCard(false);
    this.el.removeEventListener('mouseleave', this.onMouseLeave);
  }

  toggleActiveClass() {
    this.el.classList.toggle('card--disable', !this.state.active);
  }

  unactive() {
    this.state.active = false;
    this.toggleActiveClass();
  }
}
