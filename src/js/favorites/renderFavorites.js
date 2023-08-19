import { empty } from './empty';

export const renderPageFavorits = conRef => {
  conRef.classList.add('empty');
  const emptyPage = empty();
  conRef.insertAdjacentHTML('beforeend', emptyPage);
};
