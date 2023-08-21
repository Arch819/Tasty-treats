import { favoritesCardsRef } from './favoritRefs';
import { renderCards } from './renderFavorites';
import { getValuesOfStorage } from './config';
// ========================================змінюємао кнопку на активну====================================

const checkFilterBtn = evt => {
  if (evt.classList.contains('favorites__filter-btn')) {
    // ==================================Знімаємо клас з усіх кнопок====================================
    const activeButton = document.querySelector(
      '.favorites__filter-btn.favorites__active-btn'
    );
    if (activeButton) {
      activeButton.classList.remove('favorites__active-btn');
    }

    // ==============================================Додаємо клас до натиснутої кнопки============================
    evt.classList.add('favorites__active-btn');
  }
};

// ================================================callback для фільтра====================================
const PER_PAGE = 12;
const page = 1;

const handleFilter = async evt => {
  const target = evt.target;
  checkFilterBtn(target);
  const filterValue = getValuesOfStorage('favorites');
  if (target.textContent === 'All categories') {
    const data = await renderCards(filterValue, page, PER_PAGE);
    favoritesCardsRef.innerHTML = data;
    return;
  }
  const arrayFromFilter = [];
  filterValue.map(el => {
    if (el.category === target.textContent) {
      arrayFromFilter.push(el);
    }
  });
  const data = await renderCards(arrayFromFilter, page, PER_PAGE);
  favoritesCardsRef.innerHTML = data;
};

// ----------------------------------heart---------------------------------

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

export { handleFilter, handleHeartClick };
