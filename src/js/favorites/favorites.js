import '../header/header';
import '../header/_switch-themes';
import { renderCategories, renderCards } from './renderFavorites';
import { getValuesOfStorage, emptyRendering, emptyItem } from './cardElement';
import { handleFavPagination as handlePaginationFunction } from './handleFavPagination';
import {
  conRef,
  favoritesFilterRef,
  favoritesCardsRef,
  paginationRef,
  favImgRef,
} from './favoritRefs';
import { paginationFav } from './favPagination';

const screenWidth = window.innerWidth;
let perPage = 12;
if (screenWidth < 768) {
  perPage = 9;
}
let page = 1;
let keyOfLocalStorage = null;
let pageCount = null;

const checkFilterBtn = evt => {
  const isFilterBtn = evt.classList.contains('favorites__filter-btn');

  if (isFilterBtn) {
    const activeButton = document.querySelector('.favorites__active-btn');

    if (activeButton) {
      activeButton.classList.remove('favorites__active-btn');
    }

    evt.classList.add('favorites__active-btn');
  }
};

const handleHeartClick = evt => {
  const target = evt.target.closest('.icon-button');

  if (!target) {
    return;
  }

  const isHiddenEl = evt.target.closest('.favorites__cards-item');
  if (isHiddenEl) {
    isHiddenEl.style.display = 'none';
  }

  const buttonId = target.id.slice(1);
  const dataValue = target.getAttribute('data-category');
  const StorageData = getValuesOfStorage('favorites') || [];

  const index = StorageData.findIndex(el => el.id === buttonId);

  if (index !== -1) {
    StorageData.splice(index, 1);
  } else {
    StorageData.push({ id: buttonId, category: dataValue });
  }

  localStorage.setItem('favorites', JSON.stringify(StorageData));

  const heartIcon = target.querySelector('.favorites__heart');
  heartIcon.classList.toggle('heart-isActive');
};

const handleFilter = async evt => {
  const target = evt.target;

  if (target.type !== 'button') {
    return;
  }

  checkFilterBtn(target);
  keyOfLocalStorage = getValuesOfStorage('favorites');
  let arrayFromFilter = keyOfLocalStorage;
  if (target.textContent !== 'All categories') {
    arrayFromFilter = keyOfLocalStorage.filter(
      el => el.category === target.textContent
    );
  }

  if (arrayFromFilter.length !== 0) {
    localStorage.setItem('page', 1);
    keyOfLocalStorage = arrayFromFilter;
    pageCount = Math.ceil(arrayFromFilter.length / perPage);
    paginationRef.style.display = pageCount > 1 ? 'flex' : 'none';

    paginationFav(pageCount, page);

    const data = await renderCards(arrayFromFilter, page, perPage);
    favoritesCardsRef.innerHTML = data;

    favoritesCardsRef.style.justifyContent = 'start';
    return page;
  } else {
    favoritesCardsRef.innerHTML = emptyItem();
    favoritesCardsRef.style.justifyContent = 'center';
  }
  return keyOfLocalStorage, pageCount, page;
};

// -------------------------------------------основна функція та логіка сторінки Favorites--------------------------

const renderPageFavorites = async () => {
  paginationRef.style.display = 'none';

  keyOfLocalStorage = getValuesOfStorage('favorites') || [];

  if (screenWidth < 768 && keyOfLocalStorage.length === 0) {
    favoritesCardsRef.style.minHeight = '100hv';
  }

  // =--------------------------------------LocalStorage не існує або порожній масив----------------------
  if (keyOfLocalStorage.length === 0) {
    if (screenWidth < 768) {
      favImgRef.style.display = 'none';
    }
    emptyRendering(conRef);
    return;
  }

  favImgRef.style.display = 'block';
  pageCount = Math.ceil(keyOfLocalStorage.length / perPage);
  // ---------------------------------------Рендеримо сторінку-----------------------------------
  const dataCategories = await renderCategories(keyOfLocalStorage);
  if (!dataCategories) {
    favoritesFilterRef.style.display = 'none';
    favoritesCardsRef.innerHTML = `
    <li class="error-message"><h2>Error</h2>
    <p>Oops! Something went wrong! Try reloading the page!</p></li>`;
    return;
  }
  const dataCards = await renderCards(keyOfLocalStorage, page, perPage);
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
};

const filterRef = document.querySelector('.favorites__list-filter');
filterRef.addEventListener('click', handleFilter);
paginationRef.addEventListener('click', evt => {
  handlePaginationFunction(evt, keyOfLocalStorage, perPage, pageCount);
});
renderPageFavorites();

window.addEventListener('beforeunload', () => {
  localStorage.removeItem('page');
});

import '../footer/footer';
//*modal
import '../modal/modal-order/modal-order';
// import '../modal/modal-rating/modal-rating';
import '../modal/modal-recipe/modal-recipe';
