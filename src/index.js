import './index.css';
import Menu from './blocks/heading/heading';

const menu = new Menu(
  {
    control: '.heading__mobile',
    items: '.heading__list',
    menu: '.heading',
  },
  overlay,
)