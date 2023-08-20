import { favoritesCardsRef } from './favoritRefs';
import { renderCards } from './renderFavorites';
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

const handleFilter = async evt => {
  const target = evt.target;
  checkFilterBtn(target);
  const filterValue = JSON.parse(localStorage.getItem('favorites'));
  if (target.textContent === 'All categories') {
    const data = await renderCards(favoritesCardsRef, filterValue);
    return;
  }
  const arrayFromFilter = [];
  filterValue.map(el => {
    if (el.category === target.textContent) {
      arrayFromFilter.push(el);
    }
  });
  const data = await renderCards(favoritesCardsRef, arrayFromFilter);
};

export { checkFilterBtn, handleFilter };
