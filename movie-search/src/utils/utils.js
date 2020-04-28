export default class Utils {
  static createElement(tagName, ...classList) {
    const el = document.createElement(tagName);
    if (classList.length) {
      for (let i = 0; i < classList.length; i += 1) {
        el.classList.add(classList[i]);
      }
    }
    return el;
  }
}
