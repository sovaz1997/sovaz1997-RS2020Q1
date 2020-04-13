import Page from './page';
import NavigationChain from './navigation-chain';
import CheckBox from './checkbox';
import Stars from './stars';
import store from '../store/store';
import Utils from '../utils/utils';
import Card from './card';

export default class Game {
  state = {
    gameStage: 'started',
    isTrain: false,
    isWin: false,
    result: [],
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
    this.gameTypeElement.setItems(['Train', 'Play']);

    this.gameStarsElement = new Stars(10, 'game__progress');

    this.page.setContent(this.navigationChain.el);
  }

  render() {
    this.page.lazyClearContent();
    this.page.lazyAppendContent(this.navigationChain.el);
    this.page.lazyAppendContent(this.gameTypeElement.el);

    if (!this.state.isTrain) {
      if (this.state.gameStage === 'started') {
        this.page.lazyAppendContent(this.gameStarsElement.el);
        const cardList = this.generateCardList();
        this.page.lazyAppendContent(cardList);
      }
    }

    this.page.apply();
  }

  generateCardList() {
    this.cardElements = this.state.wordData.map((word, index) => new Card(index, word));

    this.cardElements.forEach((card) => {
      card.render();
    });

    const cardList = Utils.createElement('ul', 'game__cards', 'cards');

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
}
