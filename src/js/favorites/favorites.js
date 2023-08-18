// import { renderPageFavorits } from './renderFavorites';

// const conRef = document.querySelector('.favorites__wrap');
// console.log(conRef);

// const favorites = () => {
//   const keyOfLocalStorage = localStorage.getItem('setting');
//   if (!keyOfLocalStorage) {
//     renderPageFavorits(conRef); // Рендеримо сторінку якщо з LocalStorage нічого не отримано
//     return;
//   }
// };

// favorites();

import { renderPageFavorits } from './renderFavorites';

const conRef = document.querySelector('.favorites__wrap');
console.log(conRef);

const favorites = () => {
  const keyOfLocalStorage = localStorage.getItem('setting');
  if (!keyOfLocalStorage) {
    renderPageFavorits(conRef); // Рендеримо сторінку якщо з LocalStorage нічого не отримано
    return;
  }
};

favorites();
