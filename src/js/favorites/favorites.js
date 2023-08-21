import { renderCategories, renderCards } from './renderFavorites';
import { emptyRendering, getValuesOfStorage } from './config';
import { handleFilter, handleHeartClick } from './handleClick';
import {
  conRef,
  favImgRef,
  favoritesFilterRef,
  favoritesCardsRef,
} from './favoritRefs';

const PER_PAGE = 12;
let page = 1;

// -------------------------------------------основна функція та логіка сторінки Favorites--------------------------

const renderPageFavorites = async () => {
  const keyOfLocalStorage = getValuesOfStorage('favorites'); // Беремо значення з localStorage
  console.log(keyOfLocalStorage);

  // =--------------------------------------LocalStorage не існує або порожній масив----------------------
  if (!keyOfLocalStorage || keyOfLocalStorage.length === 0) {
    emptyRendering(conRef);
    return;
  }

  // перевіряємо довжину значення з LocalStorage-------------------------
  if (keyOfLocalStorage.length >= 12) {
  }

  // ==---------------------------------------Рендеримо сторінку-----------------------------------
  const dataCategories = await renderCategories(keyOfLocalStorage);
  const dataCards = await renderCards(keyOfLocalStorage, page, PER_PAGE);

  favoritesFilterRef.innerHTML = dataCategories;
  favoritesCardsRef.innerHTML = dataCards;

  const cardContainer = document.querySelector('.favorites__list-cards');

  // додаємо обробник подій на контейнер щоб обрати сердечко на всіх картках. Делегування подій---------------------------------
  cardContainer.addEventListener('click', handleHeartClick);

  // ==============Додаємо обробник подій на фільтр===============

  const filterRef = document.querySelector('.favorites__list-filter');
  filterRef.addEventListener('click', handleFilter);
};

renderPageFavorites();
