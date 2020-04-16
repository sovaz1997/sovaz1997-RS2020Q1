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

  static randomInRange(start, end) {
    return Math.floor(Math.random() * (end - start + 1) + start);
  }

  static shuffle(arr) {
    const newArr = arr.slice();
    for (let i = newArr.length - 1; i >= 0; i -= 1) {
      const j = Utils.randomInRange(0, i);

      const tmp = newArr[i];
      newArr[i] = newArr[j];
      newArr[j] = tmp;
    }

    return newArr;
  }
}