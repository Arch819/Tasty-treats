import '../header/header';
import '../header/_switch-themes';
import { renderCategories, renderCards } from './renderFavorites';
import { handleFilter, handleHeartClick } from './handleClickFunctions';
import { getValuesOfStorage, emptyRendering } from './cardElement';
import {
  conRef,
  favoritesFilterRef,
  favoritesCardsRef,
  paginationRef,
} from './favoritRefs';
import { paginationFav } from './favPagination';
const PER_PAGE = 1;
let page = 1;

// const getValuesOfStorage = storedData => {
//   return JSON.parse(localStorage.getItem(storedData));
// };

// -------------------------------------------основна функція та логіка сторінки Favorites--------------------------

const renderPageFavorites = async () => {
  const keyOfLocalStorage = getValuesOfStorage('favorites'); // Беремо значення з localStorage

  paginationRef.style.display = 'none';

  // =--------------------------------------LocalStorage не існує або порожній масив----------------------
  if (!keyOfLocalStorage || keyOfLocalStorage.length === 0) {
    emptyRendering(conRef);
    return;
  }

  // ---------------------------------------Рендеримо сторінку-----------------------------------
  const dataCategories = await renderCategories(keyOfLocalStorage);
  const dataCards = await renderCards(keyOfLocalStorage, page, PER_PAGE);
  favoritesFilterRef.innerHTML = dataCategories;
  favoritesCardsRef.innerHTML = dataCards;

  // перевіряємо довжину значення з LocalStorage-------------------------

  const pageCount = Math.ceil(keyOfLocalStorage.length / PER_PAGE);

  if (pageCount > 1) {
    paginationRef.style.display = 'flex';
    paginationFav(pageCount, page);
  }

  // додаємо обробник подій на контейнер щоб обрати сердечко на всіх картках. Делегування подій---------------------------------
  favoritesCardsRef.addEventListener('click', handleHeartClick);

  // ==============Додаємо обробник подій на фільтр===============

  const filterRef = document.querySelector('.favorites__list-filter');
  filterRef.addEventListener('click', handleFilter);
};

paginationRef.addEventListener('click', async evt => {
  const keyOfLocalStorage = getValuesOfStorage('favorites');
  const pageCount = Math.ceil(keyOfLocalStorage.length / PER_PAGE);

  if (evt.target.closest('.start-container')) {
    page = 1;
    console.log(evt);

    const dataCards = await renderCards(keyOfLocalStorage, page, PER_PAGE);
    favoritesCardsRef.innerHTML = dataCards;

    paginationFav(pageCount, page);
    return page;
  }

  if (evt.target.closest('.favorites__prew-arrow')) {
    page -= 1;
    console.log(evt);

    const dataCards = await renderCards(keyOfLocalStorage, page, PER_PAGE);
    favoritesCardsRef.innerHTML = dataCards;

    paginationFav(pageCount, page);
    return page;
  }
  if (evt.target.closest('.favorites__pag-page')) {
    try {
      page = Number(evt.target.textContent);

      const dataCards = await renderCards(keyOfLocalStorage, page, PER_PAGE);
      favoritesCardsRef.innerHTML = dataCards;

      paginationFav(pageCount, page);
      return page;
    } catch (error) {
      console.error('An error occurred:', error);
    }
  }

  if (evt.target.closest('.favorites__next-arrow')) {
    page += 1;
    console.log(evt);

    const dataCards = await renderCards(keyOfLocalStorage, page, PER_PAGE);
    favoritesCardsRef.innerHTML = dataCards;

    paginationFav(pageCount, page);
    return page;
  }

  if (evt.target.closest('.end-container')) {
    page = pageCount;

    const dataCards = await renderCards(keyOfLocalStorage, page, PER_PAGE);
    favoritesCardsRef.innerHTML = dataCards;

    paginationFav(pageCount, page);
    return page;
  }
});
renderPageFavorites();

// const test = [
//   { id: '6462a8f74c3d0ddd28897fc2', category: 'Seafood' },
//   { id: '6462a8f74c3d0ddd28897fde', category: 'Dessert' },
//   { id: '6462a8f74c3d0ddd28897feb', category: 'Chicken' },
//   { id: '6462a8f74c3d0ddd28897fc1', category: 'Dessert' },
//   { id: '6462a8f74c3d0ddd28897fb9', category: 'Lamb' },
//   { id: '6462a8f74c3d0ddd28897fbc', category: 'Beef' },
//   { id: '6462a8f74c3d0ddd28897fbf', category: 'Chicken' },
//   { id: '6462a8f74c3d0ddd288980d4', category: 'Soup' },
// ];

// localStorage.setItem('favorites', JSON.stringify(test));
import '../footer/footer';
//*modal
import '../modal/modal-order/modal-order';
import '../modal/modal-rating/modal-rating';
import '../modal/modal-recipe/modal-recipe';
