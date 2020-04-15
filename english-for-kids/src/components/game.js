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
    gameStage: 'before-start',
    gameResult: false,
    category: '',
    wordData: [],
  };

  constructor(header) {
    this.header = header;
    this.createElement();
    this.loadImages('Action (set A)');
  }

  createElement() {
    this.page = new Page('Game', 'Play in game', false, this.header);

    this.navigationChain = new NavigationChain();
    this.navigationChain.setItems(['Categories', 'Animal']);

    this.gameTypeElement = new CheckBox('game__type');
    this.gameTypeElement.addItem('Train', () => { this.startTrain(); });
    this.gameTypeElement.addItem('Game', () => { this.startNewGame(); });

    this.gameStarsElement = new Stars(10, 'game__progress');

    this.page.setContent(this.navigationChain.el);
  }

  render() {
    this.page.lazyClearContent();
    this.page.lazyAppendContent(this.navigationChain.el);
    this.page.lazyAppendContent(this.gameTypeElement.el);

    if (this.state.gameStage === 'in-progress') {
      this.page.lazyAppendContent(this.gameStarsElement.el);
      const cardList = this.generateCardList(true);
      this.page.lazyAppendContent(cardList);
    } else if (this.state.gameStage === 'train') {
      const cardList = this.generateCardList(false);
      this.page.lazyAppendContent(cardList);
    }

    this.page.apply();
  }

  generateCardList(onlyImage) {
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

  loadImages(category) {
    this.state.wordData = Utils.shuffle(store.getCardsData(category));
    this.render();
  }

  startTrain() {
    this.state.gameStage = 'train';
    this.render();
  }

  startNewGame() {
    this.state.gameStage = 'in-progress';
    this.render();
  }
}
