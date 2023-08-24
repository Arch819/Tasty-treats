import { renderCards } from './renderFavorites';
import { paginationFav } from './favPagination';
import { favoritesCardsRef } from './favoritRefs';

// keyOfLocalStorage === значення з LocalStorage
// pageCount === кількість сторінок
// page === сторінка

export const handleFavPagination = async (
  evt,
  keyOfLocalStorage,
  PER_PAGE,
  pageCount
) => {
  let page = Number(localStorage.getItem('page'));
  if (!page) {
    page = 1;
  }
  if (evt.target.closest('.start-container')) {
    page = 1;

    const dataCards = await renderCards(keyOfLocalStorage, page, PER_PAGE);
    favoritesCardsRef.innerHTML = dataCards;

    paginationFav(pageCount, page);
    localStorage.setItem('page', page);
  }

  if (evt.target.closest('.favorites__prew-arrow')) {
    if (page !== 1) {
      page -= 1;

      const dataCards = await renderCards(keyOfLocalStorage, page, PER_PAGE);
      favoritesCardsRef.innerHTML = dataCards;

      paginationFav(pageCount, page);
      localStorage.setItem('page', page);
    }
  }
  if (evt.target.closest('.favorites__pag-page')) {
    try {
      page = Number(evt.target.textContent);

      const dataCards = await renderCards(keyOfLocalStorage, page, PER_PAGE);
      favoritesCardsRef.innerHTML = dataCards;

      paginationFav(pageCount, page);
      localStorage.setItem('page', page);
    } catch (error) {
      console.error('An error occurred:', error);
    }
  }

  if (evt.target.closest('.favorites__next-arrow')) {
    if (page !== pageCount) {
      page += 1;

      const dataCards = await renderCards(keyOfLocalStorage, page, PER_PAGE);
      favoritesCardsRef.innerHTML = dataCards;

      paginationFav(pageCount, page);
      localStorage.setItem('page', page);
    }
  }

  if (evt.target.closest('.end-container')) {
    page = pageCount;

    const dataCards = await renderCards(keyOfLocalStorage, page, PER_PAGE);
    favoritesCardsRef.innerHTML = dataCards;

    paginationFav(pageCount, page);
    localStorage.setItem('page', page);
  }
};
