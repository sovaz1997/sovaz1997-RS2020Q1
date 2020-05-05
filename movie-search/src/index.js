import 'bootstrap';
import 'bootstrap/js/dist/util';
import 'bootstrap/js/dist/dropdown';

import App from './components/app';

window.onload = () => {
  const app = new App();
  document.body.innerHTML = '';
  document.body.append(app.el);
};
