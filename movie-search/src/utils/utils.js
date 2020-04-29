export default class Utils {
  static createElement(tagName, classList) {
    const el = document.createElement(tagName);

    if (classList) el.className = classList.split(' ');

    return el;
  }
}
