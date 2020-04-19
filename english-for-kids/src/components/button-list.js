import Utils from '../utils/utils';

const buttonList = (...buttons) => {
  const btnList = Utils.createElement('div', 'button-list');

  buttons.forEach((button) => {
    button.classList.add('button-list__item');
    btnList.append(button);
  });

  return btnList;
};

export default buttonList;
