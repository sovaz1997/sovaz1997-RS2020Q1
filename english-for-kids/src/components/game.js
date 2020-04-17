import Page from './page';
import NavigationChain from './navigation-chain';
import CheckBox from './checkbox';
import Stars from './stars';
import store from '../store/store';
import Utils from '../utils/utils';
import Card from './card';

export default class Game {
  state = {
    /*
      Stages: before-start, in-progress, finish, train
    */
    gameStage: 'train',
    gameResult: false,
    category: '',
    wordData: [],
  };

  constructor(app) {
    this.app = app;

    this.createElement();
  }

  createElement() {
    this.page = new Page('Game', 'Play in game', false);
  }

  getNavigationChainElement() {
    const navigationChain = new NavigationChain();

    navigationChain.addItem('Categories', () => {
      this.app.controller('load-categories');
    });

    navigationChain.addItem('Animal', () => {});

    return navigationChain;
  }

  getGameTypeCheckBoxElement() {
    if (this.gameCheckBox === undefined) {
      this.gameCheckBox = new CheckBox('game__type');
      this.gameCheckBox.addItem('Train', () => { this.setTrainMode(); });
      this.gameCheckBox.addItem('Game', () => { this.setGameMode(); });

      return this.gameCheckBox;
    }

    return this.gameCheckBox;
  }

  static getGameStarsElement() {
    return new Stars(10, 'game__progress');
  }

  render() {
    this.page.clearContent();

    this.page.lazyAppendContent(this.getNavigationChainElement().el);
    this.page.lazyAppendContent(this.getGameTypeCheckBoxElement().el);

    if (this.state.gameStage === 'before-start') {
      this.page.lazyAppendContent(this.startGameButton());
    } else if (this.state.gameStage === 'in-progress') {
      this.page.lazyAppendContent(Game.getGameStarsElement().el);
      const cardList = this.generateCardList(true);
      this.page.lazyAppendContent(cardList);
    } else if (this.state.gameStage === 'train') {
      const cardList = this.generateCardList(false);
      this.page.lazyAppendContent(cardList);
    }

    this.page.apply();
  }

  startGameButton() {
    const el = Utils.createElement('button', 'button', 'game__start-button');
    el.innerText = 'Start new Game!';
    el.addEventListener('click', () => { this.startNewGame(); });
    return el;
  }

  generateCardList(onlyImage) {
    this.state.wordData = Utils.shuffle(this.state.wordData);
    this.cardElements = this.state.wordData.map((word, index) => new Card(index, word));

    this.cardElements.forEach((card) => {
      card.render();
    });

    const cardList = Utils.createElement('ul', 'game__cards', 'cards');

    if (onlyImage) {
      cardList.classList.add('cards--only-image');
    }

    this.cardElements.forEach((card) => {
      cardList.append(card.el);
    });

    return cardList;
  }

  reset() {
    this.state = {
      gameStarted: false,
      gameFinished: false,
      isWin: false,
    };
  }

  setCategory(categoryName) {
    this.state.wordData = store.getCardsData(categoryName);
  }

  setTrainMode() {
    this.state.gameStage = 'train';
    this.render();
  }

  setGameMode() {
    this.state.gameStage = 'before-start';
    this.render();
  }

  startNewGame() {
    this.state.gameStage = 'in-progress';
    this.render();
  }

  loadGame() {
    if (this.state.gameStage !== 'train') {
      this.setGameMode();
    }
  }
}
