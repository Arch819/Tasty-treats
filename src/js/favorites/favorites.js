import { renderCards, renderFavirites } from './renderFavorites';
import { empty } from './empty';

const conRef = document.querySelector('.favorites__empty');
const favImgRef = document.querySelector('.favorites__img');
const favoritesFilterRef = document.querySelector('.favorites__list-filter');
const favoritesCardsRef = document.querySelector('.favorites__list-cards');

// -------------------------------------------основна функція та логіка сторінки Favorites--------------------------

const renderPageFavorites = async () => {
  const keyOfLocalStorage = JSON.parse(localStorage.getItem('favorites')); // Беремо значення з localStorage

  // =--------------------------------------LocalStorage не існує або порожній масив----------------------
  if (!keyOfLocalStorage || keyOfLocalStorage.length === 0) {
    conRef.classList.add('empty'); // Не памятаю що він робить цей клас
    conRef.innerHTML = empty(); //рендер пустої сторінки
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

  // conRef.insertAdjacentHTML('beforeend', data);

  const cardContainer = document.querySelector('.favorites__list-cards');

  const handleHeartClick = evt => {
    const target = evt.target.closest('.icon-button');

    if (target) {
      const buttonId = target.id.slice(1);
      const dataValue = target.getAttribute('data-category');
      const storedData = localStorage.getItem('favorites');
      let arrayOfId = [];

      if (storedData) {
        arrayOfId = JSON.parse(storedData);
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

  // ============================================Зафарбовуємо сердечко якщо воно є localStorage===============================
  // keyOfLocalStorage.forEach(({ id }) => {
  //   const heartIBtn = document.getElementById(id);
  //   if (heartIBtn) {
  //     const heartIcon = heartIBtn.querySelector('.favorites__heart');
  //     heartIcon.classList.add('heart-isActive');
  //   }
  // });

  // ========================================змінюємао кнопку на активну====================================

  const checkFilterBtn = evt => {
    console.log(evt.classList);
    if (evt.classList.contains('favorites__filter-btn')) {
      // ==================================Знімаємо клас "active" з усіх кнопок
      const activeButton = document.querySelector(
        '.favorites__filter-btn.favorites__active-btn'
      );
      if (activeButton) {
        activeButton.classList.remove('favorites__active-btn');
      }

      // ==============================================Додаємо клас "active" до натиснутої кнопки
      evt.classList.add('favorites__active-btn');
    }
  };

  // ================================================callback для фільтра====================================

  const handleFilter = async evt => {
    // const favoritesRef = document.querySelector(".favorites");

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

  // ==============Додаємо обробник подій на фільтр===============

  const filterRef = document.querySelector('.favorites__list-filter');
  filterRef.addEventListener('click', handleFilter);
};

renderPageFavorites();
