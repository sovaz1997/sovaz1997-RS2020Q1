export default class Utils {
  static createElement(tagName, classList, childs) {
    const el = document.createElement(tagName);

    if (classList) el.className = classList.join(' ');

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
}
