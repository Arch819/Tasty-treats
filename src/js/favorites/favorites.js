import '../header/header';
import '../header/_switch-themes';
import { renderCategories, renderCards } from './renderFavorites';
import { handleFilter, handleHeartClick } from './handleClickFunctions';
import { getValuesOfStorage, emptyRendering } from './cardElement';
import { handleFavPagination as handlePaginationFunction } from './handleFavPagination';
import {
  conRef,
  favoritesFilterRef,
  favoritesCardsRef,
  paginationRef,
} from './favoritRefs';
import { paginationFav } from './favPagination';
const PER_PAGE = 12;
let page = 1;
let keyOfLocalStorage = null;
let pageCount = null;

// -------------------------------------------основна функція та логіка сторінки Favorites--------------------------

const renderPageFavorites = async () => {
  paginationRef.style.display = 'none';

  keyOfLocalStorage = getValuesOfStorage('favorites');

  // =--------------------------------------LocalStorage не існує або порожній масив----------------------
  if (!keyOfLocalStorage || keyOfLocalStorage.length === 0) {
    emptyRendering(conRef);
    return;
  }
  pageCount = Math.ceil(keyOfLocalStorage.length / PER_PAGE);
  // ---------------------------------------Рендеримо сторінку-----------------------------------
  const dataCategories = await renderCategories(keyOfLocalStorage);
  const dataCards = await renderCards(keyOfLocalStorage, page, PER_PAGE);
  favoritesFilterRef.innerHTML = dataCategories;
  favoritesCardsRef.innerHTML = dataCards;

  // перевіряємо довжину значення з LocalStorage-------------------------

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

paginationRef.addEventListener('click', evt => {
  handlePaginationFunction(evt, keyOfLocalStorage, PER_PAGE, pageCount);
});
renderPageFavorites();

import '../footer/footer';
//*modal
import '../modal/modal-order/modal-order';
import '../modal/modal-rating/modal-rating';
import '../modal/modal-recipe/modal-recipe';
