import sprite from '../../images/sprite.svg';
import { paginationRef } from './favoritRefs';

export function paginationFav(totalPage, page) {
  let liTag = '';
  let activeLi = null;
  let beforePage = page - 1;
  let afterPage = page + 1;
  if (page > 1) {
    liTag += `<li class="favorites__pagination-item">
    <div class="favorites__pag-container start-container">
      <svg class="favorites__start-arrow-first">
        <use href="${sprite}#icon-arrow"></use>
      </svg>
      <svg class="favorites__start-arrow-second">
        <use href="${sprite}#icon-arrow"></use>
      </svg>
    </div>
  </li>
  <li class="favorites__pagination-item">
    <div class="favorites__pag-container prew-container">
      <svg class="favorites__prew-arrow">
        <use href="${sprite}#icon-arrow"></use>
      </svg>
    </div>
  </li>`;
  }

  if (page > 2) {
    liTag += `<li class="favorites__pagination-item">
    <span class="favorites_page-dots-first">...</span>
  </li>`;
  }

  if (page == totalPage) {
    beforePage -= 1;
  }

  if (page == 1) {
    afterPage += 1;
  }

  for (let pageLength = beforePage; pageLength <= afterPage; pageLength++) {
    if (pageLength > totalPage) {
      continue;
    }
    if (pageLength == 0) {
      pageLength = pageLength + 1;
    }

    if (page == pageLength) {
      //перевіряємо чи кнопка активна
      activeLi = 'favorites__active-btn';
    } else {
      activeLi = '';
    }
    liTag += `<li class="favorites__pagination-item ${activeLi}">
    <span class="favorites__pag-page">${pageLength}</span>
  </li>`;
  }

  if (page < totalPage - 1) {
    liTag += `<li class="favorites__pagination-item">
    <span class="favorites_page-dots-first">...</span>
  </li>`;
  }

  if (page < totalPage) {
    liTag += `<li class="favorites__pagination-item">
    <div class="favorites__pag-container next-container">
      <svg class="favorites__next-arrow">
        <use href="${sprite}#icon-arrow"></use>
      </svg>
    </div>
  </li>
  <li class="favorites__pagination-item">
    <div class="favorites__pag-container end-container">
      <svg class="favorites__end-arrow-first">
        <use href="${sprite}#icon-arrow"></use>
      </svg>
      <svg class="favorites__end-arrow-second">
        <use href="${sprite}#icon-arrow"></use>
      </svg>
    </div>
  </li>`;
  }
  paginationRef.innerHTML = liTag;
}
//виклик функції і передаємо загальна к-ть сторінок та актуальну сторінку.
