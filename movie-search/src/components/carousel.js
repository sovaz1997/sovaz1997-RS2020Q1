/*
  Data:
    loadMore(generalCount)
    getByIndex(index)
*/


const Carousel = (SimpleComponent, Data) => {
  const state = {
    currentPage: 0,
  };

  return class {
    constructor({ classList }) {
      this.createElement(classList);
    }

    createElement(classList) {
      this.el = Utils.createElement('div', `carousel ${classList.join(' ')}`);
    }

    render() {
      for (let i = 0)
    }


  }
}

class CardCarousel {
  constructor() {

  }

  createE
}
