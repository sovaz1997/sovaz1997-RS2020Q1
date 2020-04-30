export default class Utils {
  static createElement(tagName, className, childs) {
    const el = document.createElement(tagName);

    if (className) el.className = className;

    if (childs) {
      childs.forEach((child) => {
        if (typeof child === 'string') {
          el.append(document.createTextNode(child));
        } else {
          el.append(child);
        }
      });
    }

    return el;
  }

  static createImage(src, alt, className) {
    const el = Utils.createElement('img', className);
    el.setAttribute('src', src);
    el.setAttribute('alt', alt);
    return el;
  }
}
