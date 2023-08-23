import { favoritesCardsRef, paginationRef } from './favoritRefs';
import { paginationFav } from './favPagination';
import { renderCards } from './renderFavorites';
import { getValuesOfStorage } from './cardElement';
import { emptyItem } from './cardElement';
// ========================================змінюємао кнопку на активну====================================
const PER_PAGE = 1;
let page = 1;

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

// ================================================callback для фільтра====================================

const handleFilter = async evt => {
  const target = evt.target;
  checkFilterBtn(target);
  const filterValue = getValuesOfStorage('favorites');
  let arrayFromFilter = filterValue.filter(
    el => el.category === target.textContent
  );

  if (target.textContent === 'All categories') {
    arrayFromFilter = filterValue;
  }

  if (arrayFromFilter.length !== 0) {
    page = 1;
    const totalPage = Math.ceil(arrayFromFilter.length / PER_PAGE);
    paginationRef.style.display = totalPage > 1 ? 'flex' : 'none';
    paginationFav(totalPage, page);
    const data = await renderCards(arrayFromFilter, page, PER_PAGE);
    favoritesCardsRef.style.justifyContent = 'start';
    favoritesCardsRef.innerHTML = data;
  } else {
    favoritesCardsRef.style.justifyContent = 'start';
    favoritesCardsRef.innerHTML = emptyItem();
  }
};

const handlePaginationClick = async evt => {
  if (evt.target.classList.contains('pag-btn-number')) {
    page = Number(evt.target.textContent);

    const filterValue = getValuesOfStorage('favorites');
    console.log(filterValue);
    const data = await renderCards(filterValue, page, PER_PAGE);
    favoritesCardsRef.innerHTML = data;
  }
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

export { handleFilter, handleHeartClick, handlePaginationClick };
