import { renderCategories, renderCards } from './renderFavorites';
import { emptyRendering, getValuesOfStorage } from './config';
import { handleFilter, handleHeartClick } from './handleClick';
import { getValuesOfStorage } from './config';
import {
  conRef,
  favImgRef,
  favoritesFilterRef,
  favoritesCardsRef,
} from './favoritRefs';

// -------------------------------------------основна функція та логіка сторінки Favorites--------------------------

const renderPageFavorites = async () => {
  const keyOfLocalStorage = getValuesOfStorage('favorites'); // Беремо значення з localStorage

  // =--------------------------------------LocalStorage не існує або порожній масив----------------------
  if (!keyOfLocalStorage || keyOfLocalStorage.length === 0) {
    emptyRendering(conRef);
    return;
  }

  // перевіряємо довжину значення з LocalStorage-------------------------
  if (keyOfLocalStorage.length >= 12) {
  }

  conRef.classList.remove('empty'); // Видаляємо клас empty
  favImgRef.style.display = 'block';

  // ==---------------------------------------Рендеримо сторінку-----------------------------------
  const dataCategories = await renderCategories(keyOfLocalStorage);
  const dataCards = await renderCards(keyOfLocalStorage, 2, 2);

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
