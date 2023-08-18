import { renderPageFavorits } from './renderFavorites';
import { renderCards } from './renderCardsFav';

const conRef = document.querySelector('.favorites__wrap');

const favorites = () => {
  const keyOfLocalStorage = localStorage.getItem('setting');
  // if (!keyOfLocalStorage) {
  //   renderPageFavorits(conRef); // Рендеримо сторінку якщо з LocalStorage нічого не отримано
  //   return;
  // }
  renderCards(conRef);
};

favorites();
