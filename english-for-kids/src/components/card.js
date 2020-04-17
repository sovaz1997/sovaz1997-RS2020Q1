import Utils from '../utils/utils';

export default class Card {
  state = {
    word: '',
    translation: '',
    image: '',
    audioSrc: '',
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
    const { word, translation, image } = this.state;

    return `
      <div class="card__face card__face--front">
        <span class="card__word">${word}</span>
        <img class="card__image" src="${image}">
        <div class="card__control">
          <button class="card__flip-button"></button>
          <button class="card__speaker-button"></button>
        </div>
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
      } else {
        this.gameObject.checkWord(this.state.word);
      }
    });

    this.el.addEventListener('mouseleave', () => {
      this.flipCard(false);
    });
  }

  flipCard(value) {
    this.el.classList.toggle('card--flipped', value);
  }
}
