import Utils from '../utils/utils';

export default class FilmCardList {
  state = {
    indexFrom: 0,
  };

  constructor() {
    this.createElement();
    this.render();
  }

  createElement() {
    this.el = Utils.createElement('div', 'film-card-list');
  }

  render() {
    this.el.innerHTML = `
    <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
  <ol class="carousel-indicators">
    <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
  </ol>
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img class="d-block w-100" src="..." alt="Первый слайд">
    </div>
    <div class="carousel-item">
      <img class="d-block w-100" src="..." alt="Второй слайд">
    </div>
    <div class="carousel-item">
      <img class="d-block w-100" src="..." alt="Третий слайд">
    </div>
  </div>
  <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>
</div>
    `;
  }
}
