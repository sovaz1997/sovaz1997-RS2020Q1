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
    gameState: {
      success: 0,
      fail: 0,
      leftWords: [],
    },
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

    navigationChain.addItem(this.state.category, () => {});

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

  getGameStarsElement() {
    if (this.stars === undefined) {
      this.stars = new Stars(10, 'game__progress');
    }

    return this.stars;
  }

  clearStars() {
    this.getGameStarsElement().clear();
  }

  render() {
    this.page.clearContent();


    const gameHeader = Utils.createElement('div', 'game__header');
    this.page.lazyAppendContent(this.getNavigationChainElement().el);
    gameHeader.append(this.getGameTypeCheckBoxElement().el);
    this.page.lazyAppendContent(gameHeader);

    if (this.state.gameStage === 'before-start') {
      this.page.lazyAppendContent(this.startGameButton());
    } else if (this.state.gameStage === 'in-progress') {
      gameHeader.append(this.getGameStarsElement().el);
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

  getMode() {
    if (this.state.gameStage === 'train') return 'train';
    return 'game';
  }

  generateCardList(onlyImage) {
    this.state.wordData = Utils.shuffle(this.state.wordData);
    this.cardElements = this.state.wordData.map(
      (word, index) => new Card(index, word, this.getMode(), this),
    );

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

  setCategory(categoryName) {
    this.state.category = categoryName;
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

  resetGameState() {
    this.state.gameState = {
      success: 0,
      fail: 0,
      leftWords: Utils.shuffle(this.state.wordData),
    };

    this.clearStars();
  }

  startNewGame() {
    this.state.gameStage = 'in-progress';
    this.resetGameState();
    this.nextWord();
    this.render();
  }

  loadGame() {
    if (this.state.gameStage !== 'train') {
      this.setGameMode();
    }
  }

  finishGame() {
    return this;
  }

  nextWord() {
    const { gameState } = this.state;

    if (gameState.leftWords < 0) this.finishGame();

    gameState.currentWord = gameState.leftWords.shift();
    Utils.playAudio(gameState.currentWord.audioSrc);
  }

  static resultSoundPlay(isSuccess) {
    if (isSuccess) {
      Utils.playAudio('../data/audio/success.mp3');
    } else {
      Utils.playAudio('../data/audio/error.mp3');
    }
  }

  appendResult(isSuccess) {
    this.state.gameState.success += +isSuccess;
    this.state.gameState.fail += +!isSuccess;
    this.getGameStarsElement().addStar(isSuccess);
    Game.resultSoundPlay(isSuccess);
  }

  checkWord(word) {
    if (this.state.block) return;

    if (this.state.gameStage === 'in-progress') {
      this.appendResult(word === this.state.gameState.currentWord.word);
      this.state.block = true;
      setTimeout(() => {
        this.state.block = false;
        this.nextWord();
      }, 1000);
    }
  }
}
