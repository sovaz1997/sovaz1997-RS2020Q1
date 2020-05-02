import Utils from '../utils/utils';

const Header = () => (
  Utils.createElement('header', 'site-header', [
    Utils.createElement('button', 'site-header__menu-button'),
    Utils.createElement('h1', 'site-header__name', [
      'English',
      Utils.createElement('span', '', ['- for kids']),
    ]),
  ])
);

export default Header;
