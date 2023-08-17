import { empty } from './empty';

export const renderPageFavorits = conRef => {
  conRef.classList.add('empty');
  conRef.innerHTML = empty();
};
