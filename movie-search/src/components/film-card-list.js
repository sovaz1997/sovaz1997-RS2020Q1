import Utils from '../utils/utils';

export default class FilmCardList {
  constructor(id) {
    this.id = id;
    this.slides = [];

    this.createElement();
  }

  createElement() {
    this.el = FilmCardList.getContainer();
    this.indicators = FilmCardList.getIndicatorsContainer();
    this.inner = FilmCardList.getInner();

    this.el.append(this.indicators);
    this.el.append(this.inner);
    this.el.append(this.getControl('prev', 'Previous'));
    this.el.append(this.getControl('next', 'Next'));

    this.el.setAttribute('id', this.id);
  }

  static getInner() {
    return Utils.createElement('div', 'carousel-inner');
  }

  static getContainer() {
    const el = Utils.createElement('div', 'film-card-list carousel slide');
    el.dataset.ride = 'carousel';
    return el;
  }

  static getIndicatorsContainer() {
    return Utils.createElement('ol', 'carousel-indicators');
  }

  deleteAllSlides() {
    this.inner.innerHTML = '';
    this.indicators.innerHTML = '';
    this.slides = [];
  }

  pushSlide(number, content) {
    this.slides.push({
      indicator: FilmCardList.getIndicator(number),
      slide: FilmCardList.getSlide(content),
    });
  }

  static getIndicator(number) {
    const el = Utils.createElement('li');
    el.dataset.target = this.id;
    el.dataset.slideTo = number;
    return el;
  }

  /*
  static getSlide(content) {

  }
  */

  getControl(type, text) {
    const el = Utils.createElement('a', `carousel-control-${type}`);

    el.setAttribute('href', `#${this.id}`);
    el.setAttribute('role', 'button');
    el.dataset.slide = type;

    const icon = Utils.createElement('span', `carousel-control-${type}-icon`);
    icon.setAttribute('aria-hidden', 'true');

    el.append(icon);
    el.append(Utils.createElement(
      'span',
      'sr-only',
      [text],
    ));

    return el;
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
