// import '../header/header';
// import '../header/_switch-themes';
import { renderCategories, renderCards } from './renderFavorites';
import { emptyRendering, getValuesOfStorage } from './config';
import { handleFilter, handleHeartClick } from './handleClickFunctions';
import {
  conRef,
  favoritesFilterRef,
  favoritesCardsRef,
  paginationRef,
} from './favoritRefs';
import { paginationFav } from './favPagination';
import { renderQuantityOfPages } from './quantyityOfPages';
let totalPage = 20;
const PER_PAGE = 13;
let page = 1;

// -------------------------------------------основна функція та логіка сторінки Favorites--------------------------

const renderPageFavorites = async () => {
  const keyOfLocalStorage = getValuesOfStorage('favorites'); // Беремо значення з localStorage
  // paginationRef.style.display = 'none';

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

  const cardContainer = document.querySelector('.favorites__list-cards');

  // перевіряємо довжину значення з LocalStorage-------------------------

  const pageCount = Math.ceil(keyOfLocalStorage.length / PER_PAGE);

  // if (pageCount < PER_PAGE) {
  //   paginationRef.style.display = 'none';
  // } else {
  //   const dataPages = renderQuantityOfPages(pageCount, PER_PAGE);
  //   paginationRef.firstElementChild.insertAdjacentHTML(
  //     'beforeend',
  //     dataPages.join('')
  //   );

  // paginationRef.style.display = 'flex';
  // }

  // додаємо обробник подій на контейнер щоб обрати сердечко на всіх картках. Делегування подій---------------------------------
  cardContainer.addEventListener('click', handleHeartClick);

  // ==============Додаємо обробник подій на фільтр===============

  const filterRef = document.querySelector('.favorites__list-filter');
  filterRef.addEventListener('click', handleFilter);
};

renderPageFavorites();

paginationFav(totalPage, 1);

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
