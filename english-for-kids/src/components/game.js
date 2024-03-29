import Page from './page';
import NavigationChain from './navigation-chain';
import CheckBox from './checkbox';
import Stars from './stars';
import store from '../store/store';
import Utils from '../utils/utils';
import Card from './card';
import Stats from './stats';

export default class Game {
  state = {
    gameStage: 'train',
    category: '',
    wordData: [],
    gameState: {
      success: 0,
      fail: 0,
      leftWords: [],
      isWin: false,
    },
  };

  constructor(app) {
    this.app = app;
    this.createElement();
  }

  createElement() {
    this.page = new Page('Game', 'Play in game', false);
  }

  getResultElement() {
    const { gameState } = this.state;

    const result = Utils.createElement('div', 'game__result');
    const resultImage = Utils.createElement('img', 'game__result-image');
    const resultImageSrc = `./data/img/${gameState.isWin ? 'success' : 'failure'}.png`;

    const text = Utils.createElement('p', 'game__result-text');
    text.innerText = Game.getTextResult(gameState.fail);

    resultImage.setAttribute('src', resultImageSrc);

    result.append(resultImage);
    result.append(text);
    return result;
  }

  static getTextResult(errors) {
    if (!errors) return 'Great result! Without mistakes!';
    if (errors < 2) return `Not bad! But you made ${errors} mistake`;

    return `You could do better: You made ${errors} mistakes.`;
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
    this.page.appendContent(this.getNavigationChainElement().el);
    gameHeader.append(this.getGameTypeCheckBoxElement().el);
    this.page.appendContent(gameHeader);

    const menu = this.app.getMenuElement();
    menu.bindCloseButton(this.page.header.menuButton);
    this.page.appendContent(menu.el);

    if (this.state.gameStage === 'before-start') {
      this.page.appendContent(this.startGameButton());
    } else if (this.state.gameStage === 'in-progress') {
      this.page.appendContent(this.repeatGameButton());
      gameHeader.append(this.getGameStarsElement().el);
      const cardList = this.generateCardList(true);
      this.page.appendContent(cardList);
    } else if (this.state.gameStage === 'train') {
      const cardList = this.generateCardList(false);
      this.page.appendContent(cardList);
    } else if (this.state.gameStage === 'finish') {
      this.page.appendContent(this.getResultElement());
    }
  }

  startGameButton() {
    return Utils.createButton(
      'Start new Game!',
      () => {
        this.startNewGame();
      },
      'game__start-button',
    );
  }

  repeatGameButton() {
    return Utils.createButton(
      'Repeat word',
      () => {
        this.playCurrentWord();
      },
      'game__repeat-word-button',
      'button--orange',
    );
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

  customLoad(categoryName, words) {
    this.state.category = categoryName;
    this.state.wordData = words;
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
      isWin: false,
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
    this.setGameResult();
    this.state.gameStage = 'finish';
    this.render();

    setTimeout(() => { this.app.controller('load-categories'); }, 3000);
  }

  setGameResult() {
    const { gameState } = this.state;
    gameState.isWin = !gameState.fail;

    if (gameState.isWin) {
      Utils.playAudio('../data/audio/success.mp3');
    } else {
      Utils.playAudio('../data/audio/failure.mp3');
    }
  }

  nextWord() {
    const { gameState } = this.state;

    if (!gameState.leftWords.length) {
      this.finishGame();
      return;
    }

    gameState.currentWord = gameState.leftWords.shift();
    this.playCurrentWord();
  }

  playCurrentWord() {
    Utils.playAudio(this.state.gameState.currentWord.audioSrc);
  }

  static resultSoundPlay(isSuccess) {
    if (isSuccess) {
      Utils.playAudio('../data/audio/correct.mp3');
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

  checkWord(word, card) {
    if (this.state.block) return;

    if (this.state.gameStage === 'in-progress') {
      const success = word === this.state.gameState.currentWord.word;
      this.appendResult(success);

      Stats.addWord(this.state.gameState.currentWord.word, 'game', success);

      if (success) {
        card.unactive();
      } else {
        this.state.gameState.leftWords.push(this.state.gameState.currentWord);
      }
      this.state.block = true;
      setTimeout(() => {
        this.state.block = false;
        this.nextWord();
      }, 700);
    }
  }
}
