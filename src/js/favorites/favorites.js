import { renderFavirites } from './renderFavorites';
import { emptyRendering, getValuesOfStorage } from './config';
import { handleFilter } from './handleClick';
import { getValuesOfStorage } from './config';

const conRef = document.querySelector('.favorites__empty');
const favImgRef = document.querySelector('.favorites__img');
const favoritesFilterRef = document.querySelector('.favorites__list-filter');
export const favoritesCardsRef = document.querySelector(
  '.favorites__list-cards'
);

// -------------------------------------------основна функція та логіка сторінки Favorites--------------------------

const renderPageFavorites = async () => {
  const keyOfLocalStorage = getValuesOfStorage('favorites'); // Беремо значення з localStorage

  // =--------------------------------------LocalStorage не існує або порожній масив----------------------
  if (!keyOfLocalStorage || keyOfLocalStorage.length === 0) {
    emptyRendering(conRef);
    return;
  }

  conRef.classList.remove('empty'); // Видаляємо клас empty
  favImgRef.style.display = 'block';

  // ==---------------------------------------Рендеримо сторінку-----------------------------------
  const data = await renderFavirites(
    favoritesFilterRef,
    favoritesCardsRef,
    keyOfLocalStorage
  );

  const cardContainer = document.querySelector('.favorites__list-cards');

  const handleHeartClick = evt => {
    const target = evt.target.closest('.icon-button');

    if (target) {
      const buttonId = target.id.slice(1);
      const dataValue = target.getAttribute('data-category');
      const StorageData = getValuesOfStorage('favorites');
      let arrayOfId = [];

      if (StorageData) {
        arrayOfId = StorageData;
      }

      const index = arrayOfId.findIndex(el => el.id === buttonId);

      if (index !== -1) {
        arrayOfId.splice(index, 1);
      } else {
        arrayOfId.push({ id: buttonId, category: dataValue });
      }

      localStorage.setItem('favorites', JSON.stringify(arrayOfId));

      const heartIcon = target.querySelector('.favorites__heart');
      heartIcon.classList.toggle('heart-isActive');
    }
  };

  // додаємо обробник подій на контейнер щоб обрати сердечко на всіх картках. Делегування подій---------------------------------
  cardContainer.addEventListener('click', handleHeartClick);

  // ================================================callback для фільтра====================================

  // ==============Додаємо обробник подій на фільтр===============

  const filterRef = document.querySelector('.favorites__list-filter');
  filterRef.addEventListener('click', handleFilter);
};

renderPageFavorites();
