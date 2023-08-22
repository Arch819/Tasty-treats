import {
  favoritesCardsRef,
  paginationRef,
  favoritesListCardsThumb,
} from './favoritRefs';
import { renderCards } from './renderFavorites';
import { getValuesOfStorage } from './config';
import { renderQuantityOfPages } from './quantyityOfPages';
import { emptyItem } from './empty';
// ========================================змінюємао кнопку на активну====================================
const PER_PAGE = 12;
let page = 1;

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

const handleFilter = async evt => {
  const target = evt.target;
  checkFilterBtn(target);
  const filterValue = getValuesOfStorage('favorites');

  // ===================================================перевіряємо якщо натиснули на All category====================================
  if (target.textContent === 'All categories') {
    page = 1; //скидаємо сторінку
    const totalPageCount = Math.ceil(filterValue.length / PER_PAGE);
    updatePagination(totalPageCount); // оновлюємо пагінацію

    const data = await renderCards(filterValue, page, PER_PAGE);
    favoritesCardsRef.innerHTML = data;
    return;
  }

  // фільтруємо масив і залишаємо ті які співпадають з натиснутою категорією
  const arrayFromFilter = filterValue.filter(
    el => el.category === target.textContent
  );

  if (arrayFromFilter.length !== 0) {
    page = 1; // Скидаємо сторінку натисканні на кнопку категорії
    const totalPageCount = Math.ceil(arrayFromFilter.length / PER_PAGE);
    updatePagination(totalPageCount);

    const data = await renderCards(arrayFromFilter, page, PER_PAGE);
    favoritesCardsRef.style.justifyContent = 'start';
    favoritesCardsRef.innerHTML = data;
  } else {
    favoritesCardsRef.style.justifyContent = 'center';
    favoritesCardsRef.innerHTML = emptyItem();
  }
};

// ===============Оновлюємо пагінацію=============
const updatePagination = pageCount => {
  if (pageCount === 1) {
    paginationRef.style.display = 'none';
    return;
  }
  const dataPages = renderQuantityOfPages(pageCount, PER_PAGE);
  paginationRef.firstElementChild.innerHTML = dataPages.join('');
  paginationRef.style.display = 'flex';
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
