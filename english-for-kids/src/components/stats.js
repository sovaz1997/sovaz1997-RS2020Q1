export default class Stats {
  state = {
    data: {},
  }

  constructor() {
    this.loadStats();
  }

  loadStats() {
    const data = window.localStorage.getItem('stats');
    if (data) {
      this.state.data = JSON.parse(data);
    }
  }

  writeStats() {
    window.localStorage.setItem(JSON.stringify(this.state.data));
  }
}
