import Utils from '../utils/utils';

const Header = () => (
  Utils.createElement('header', ['site-header'], [
    Utils.createElement('h1', ['site-header__name'], ['Movie Search']),
  ])
);

export default Header;
