import { empty } from './empty';

const conRef = document.querySelector('.container');

const renderPageFavorits = () => {
  const keyOfLocalStorage = localStorage.getItem('setting');
  if (!keyOfLocalStorage) {
    conRef.classList.add('empty');
    conRef.innerHTML = empty();
    return;
  }
  conRef.classList.remove('empty');
};

renderPageFavorits();
