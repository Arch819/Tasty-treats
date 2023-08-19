import { renderPageFavorits } from './renderFavorites';
import { renderCards } from './renderCardsFav';

const conRef = document.querySelector('.favorites__empty');
const favWrapRef = document.querySelector('.favorites__wrap');
const favImgRef = document.querySelector('.favorites__img');

const favorites = async () => {
  // const storedData = localStorage.getItem('id');
  // let arrayOfId = [];

  // if (storedData) {
  //   arrayOfId = JSON.parse(storedData);
  // }

  // if (!storedData || arrayOfId.length === 0) {
  //   renderPageFavorits(conRef); // Рендеримо сторінку якщо з LocalStorage нічого не отримано
  //   return;
  // }

  conRef.classList.remove('empty');
  favImgRef.style.display = 'block';
  await renderCards(favWrapRef);
  const cardContainer = document.querySelector('.favorites__list-cards');

  cardContainer.addEventListener('click', event => {
    const target = event.target.closest('.icon-button');

    if (target) {
      const buttonId = target.id;
      const storedData = localStorage.getItem('id');
      let arrayOfId = [];

      if (storedData) {
        arrayOfId = JSON.parse(storedData);
      }

      if (arrayOfId.length === 0) {
        renderPageFavorits(conRef);
        return;
      }

      if (arrayOfId.includes(buttonId)) {
        arrayOfId = arrayOfId.filter(id => id !== buttonId);
      } else {
        arrayOfId.push(buttonId);
      }

      localStorage.setItem('id', JSON.stringify(arrayOfId));
      console.log(arrayOfId);

      const heartIcon = target.querySelector('.favorites__heart');
      heartIcon.classList.toggle('heart-isActive');
    }
  });

  if (storedData) {
    arrayOfId = JSON.parse(storedData);
  }

  arrayOfId.forEach(id => {
    const heartIBtn = document.getElementById(`${id}`);
    if (heartIBtn) {
      const heartIcon = heartIBtn.querySelector('.favorites__heart');
      heartIcon.classList.add('heart-isActive');
    }
  });
};

favorites();
