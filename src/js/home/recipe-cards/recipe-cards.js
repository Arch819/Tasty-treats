import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { createMarkup } from './recipe-cardsRender';
import { TastyApiService } from './recipe-cardsApi';
import { GetLists } from './lists-service';
import { addToFavorites } from './add-to-favorites';
import { refs } from './pagination-ref';

const galleryRecipesRef = document.querySelector('.js-gallery');
const searchQueryTitleRef = document.querySelector('.input-search');
const seachQueryTimeRef = document.querySelector('.time-selector');
const seachQueryAreasRef = document.querySelector('.area-selector');
const selectQueryIngredientsRef = document.querySelector(
  '.ingredients-selector'
);
const btnResetFilterRef = document.querySelector('.reset-filter');
const loaderIndicatorRef = document.querySelector('.loader');
const btnPaginationBarRef = document.querySelector('.pagination-bar');
const formFilters = document.querySelector('.filter-form');

// //  - Pagination - to  pagination.js
// const backToFirstPage = document.querySelector('#pag-btn-start');
// const pageOneBtn = document.querySelector('#pag-btn-1');
// const pageTwoBtn = document.querySelector('#pag-btn-2');
// const pageThreeBtn = document.querySelector('#pag-btn-3');
// const lastPageBtn = document.querySelector('#pag-btn-last');
// const nextPagePagBtn = document.querySelector('#pag-btn-next');
// const buttonNumered = document.querySelectorAll('.pag-btn-number');
// const previousPageButton = document.querySelector('#pag-btn-prev');
// const btnWithDotsRight = document.querySelector('#pag-btn-dots-right');
// const btnWithDotsLeft = document.querySelector('#pag-btn-dots-left');

refs.backToFirstPage.addEventListener('click', backToFirst);
refs.lastPageBtn.addEventListener('click', loadLastPage);
refs.nextPagePagBtn.addEventListener('click', loadNextPage);
refs.previousPageButton.addEventListener('click', loadPrevPage);
refs.pageOneBtn.addEventListener('click', loadfirstPage);
refs.pageTwoBtn.addEventListener('click', loadPageTwo);
refs.pageThreeBtn.addEventListener('click', loadPageThree);
refs.btnWithDotsLeft.addEventListener('click', loadDotsLeft);
refs.btnWithDotsRight.addEventListener('click', loadDotsRigth);

Notify.init({
  position: 'center-center',
});

let pageNumb = 1;
let totalPages = 0;

const testyApiService = new TastyApiService();
testyApiService.setLimitValue();
//console.log('new TastyApiService:', testyApiService.currentPage);
const getLists = new GetLists();

fetchListAreas();
fetchListIngredients();
fetchRecipesQuery();

function renderGallery(dataArr) {
  galleryRecipesRef.insertAdjacentHTML('beforeend', createMarkup(dataArr));
}

searchQueryTitleRef.addEventListener('input', debounce(onSeachQueryTitle, 500));
seachQueryTimeRef.addEventListener('change', onSeachQueryTime);
seachQueryAreasRef.addEventListener('change', onSeachQueryAreas);
selectQueryIngredientsRef.addEventListener('change', onSeachQueryIngredients);
btnResetFilterRef.addEventListener('click', onResetFilter);
formFilters.addEventListener('submit', onForm);

function onForm(evt) {
  evt.preventDefault();
}

function onSeachQueryTitle(evt) {
  resetNumBtn();
  //evt.preventDefault();
  //console.log('inputTitle:', evt.target.value);
  const inputQuery = evt.target.value.trim();
  if (inputQuery === '') return;
  //clearRecipesContainer();
  testyApiService.resetPage();
  testyApiService.setSearchTitle(inputQuery);
  fetchRecipesQuery();
}

function onSeachQueryTime(evt) {
  //console.log(evt.target.value);
  const inputQuery = evt.target.value;
  //clearRecipesContainer();
  testyApiService.resetPage();
  testyApiService.setSearchTime(inputQuery);
  fetchRecipesQuery();
}

function onSeachQueryAreas(evt) {
  //console.log(evt.target.value);
  const inputQuery = evt.target.value;
  //clearRecipesContainer();
  testyApiService.resetPage();
  testyApiService.setSearchArea(inputQuery);
  fetchRecipesQuery();
}

function onSeachQueryIngredients(evt) {
  //console.log(evt.target.value);
  const inputQuery = evt.target.value;
  //clearRecipesContainer();
  testyApiService.resetPage();
  testyApiService.setSearchIngredient(inputQuery);
  fetchRecipesQuery();
}

function onResetFilter() {
  testyApiService.resetCategory();
  resetFilter();
  //galleryRecipesRef.innerHTML = '';
  //clearRecipesContainer();
  fetchRecipesQuery();
}

function resetFilter() {
  searchQueryTitleRef.value = '';
  seachQueryTimeRef.value = '';
  seachQueryAreasRef.value = '';
  selectQueryIngredientsRef.value = '';
  resetNumBtn();
}

function clearRecipesContainer() {
  galleryRecipesRef.innerHTML = '';
}
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
function fetchRecipesQuery() {
  loaderIndicatorRef.classList.remove('is-hidden-pgn');
  btnPaginationBarRef.classList.add('is-hidden-pgn');
  testyApiService
    .fetchRecipes()
    .then(data => {
      //console.log('fetchRecipesQuery', data.results);
      //data.results.length === 0 - !data.results -
      if (data.results.length === 0) {
        Notify.failure('Something went wrong. Please try again!');
        loaderIndicatorRef.classList.add('is-hidden-pgn');
        btnPaginationBarRef.classList.remove('is-hidden-pgn');
        return;
      }
      //
      totalPages = data.totalPages;
      //console.log(totalPages);
      clearRecipesContainer();
      renderGallery(data.results);
      addToFavorites();
      changeButtonColor();
      /////testyApiService.incrementPage;
      loaderIndicatorRef.classList.add('is-hidden-pgn');
      btnPaginationBarRef.classList.remove('is-hidden-pgn');
    })
    .catch(err => console.log(err));
}

function fetchListAreas() {
  getLists
    .fetchListAreas()
    .then(data => {
      //console.log('getLists', data);
      const markup = data
        .map(area => {
          return `<option value="${area.name}" class="area">${area.name}</option>`;
        })
        .join('');
      seachQueryAreasRef.insertAdjacentHTML('beforeend', markup);
    })
    .catch(err => console.log(err));
}

function fetchListIngredients() {
  getLists
    .fetchListIngredients()
    .then(data => {
      //console.log('ingredient', data);
      const markup = data
        .map(ingredient => {
          return `<option value="${ingredient._id}" class="area">${ingredient.name}</option>`;
        })
        .join('');
      selectQueryIngredientsRef.insertAdjacentHTML('beforeend', markup);
    })
    .catch(err => console.log(err));
}

//  - Pagination -
// const backToFirstPage = document.querySelector('#pag-btn-start');
// const pageOneBtn = document.querySelector('#pag-btn-1');
// const pageTwoBtn = document.querySelector('#pag-btn-2');
// const pageThreeBtn = document.querySelector('#pag-btn-3');
// const lastPageBtn = document.querySelector('#pag-btn-last');
// const nextPagePagBtn = document.querySelector('#pag-btn-next');
// const buttonNumered = document.querySelectorAll('.pag-btn-number');
// const previousPageButton = document.querySelector('#pag-btn-prev');

// backToFirstPage.addEventListener('click', backToFirst);
// lastPageBtn.addEventListener('click', loadLastPage);
// nextPagePagBtn.addEventListener('click', loadNextPage);
// previousPageButton.addEventListener('click', loadPrevPage);
// pageOneBtn.addEventListener('click', loadfirstPage);
// pageTwoBtn.addEventListener('click', loadPageTwo);
// pageThreeBtn.addEventListener('click', loadPageThree);

function backToFirst() {
  if (testyApiService.currentPage === 1) return;
  testyApiService.resetPage();
  refs.pageOneBtn.textContent = 1;
  refs.pageTwoBtn.textContent = 2;
  refs.pageThreeBtn.textContent = 3;
  //galleryRecipesRef.innerHTML = '';
  fetchRecipesQuery();
}

function loadLastPage() {
  if (testyApiService.currentPage === totalPages) return;
  if (totalPages <= 3) return;
  // pageNumb ->> totalPages
  // if (window.innerWidth < 768) {
  //   pageNumb = 48;
  // } else if (window.innerWidth >= 768 && window.innerWidth < 1200) {
  //   pageNumb = 36;
  // } else {
  //   pageNumb = 32;
  // }

  if (window.innerWidth < 768) {
    //for limit = 6;
    pageNumb = 48;
  } else if (window.innerWidth < 1280) {
    //for limit = 8;
    pageNumb = 36;
  } else {
    //for limit = 9;
    pageNumb = 32;
  }
  //if ((testyApiService.currentPage = totalPages)) return;
  pageNumb = totalPages;
  refs.pageThreeBtn.textContent = pageNumb;
  refs.pageTwoBtn.textContent = pageNumb - 1;
  refs.pageOneBtn.textContent = pageNumb - 2;
  //galleryRecipesRef.innerHTML = '';
  testyApiService.setCurrentPage(pageNumb);
  fetchRecipesQuery();
}

function loadNextPage() {
  //console.log('loadNextPage - page: ', testyApiService.currentPage);
  if (testyApiService.currentPage === totalPages) return;
  //if (totalPages - testyApiService.currentPage <= 2) return;
  if (parseInt(refs.pageThreeBtn.textContent) === totalPages) return;
  // if (testyApiService.currentPage === 32) {
  //   return;
  // }
  if (totalPages <= 3) return;
  refs.buttonNumered.forEach(button => {
    button.textContent++;
    // pageNumb=button.textContent
  });
  // nextPage = pageNumb + 1;
  testyApiService.incrementPage();
  //loadPage(nextPage);
  //galleryRecipesRef.innerHTML = '';
  fetchRecipesQuery();
}

function loadPrevPage() {
  if (
    testyApiService.currentPage === 1 ||
    refs.pageOneBtn.textContent.textContent === '1'
  )
    return;
  //console.log('loadPrevPage --- ','on Btn ', pageOneBtn.textContent, 'currentPage', testyApiService.currentPage);
  if (refs.pageOneBtn.textContent != '1') {
    //if (parseInt(pageOneBtn.textContent) > 2) {
    refs.buttonNumered.forEach(button => {
      button.textContent--;
      // pageNumb=button.textContent
    });
  } else return;

  //prevPage = pageNumb - 1;
  testyApiService.decrementPage();
  // loadPage(prevPage);
  //galleryRecipesRef.innerHTML = '';
  fetchRecipesQuery();
}

function loadfirstPage() {
  if (totalPages <= 3 && testyApiService.currentPage === 1) return;
  const pageNumb = parseInt(refs.pageOneBtn.textContent);
  testyApiService.setCurrentPage(pageNumb);
  //galleryRecipesRef.innerHTML = '';
  fetchRecipesQuery();
}

function loadPageTwo() {
  const pageNumb = parseInt(refs.pageTwoBtn.textContent);
  testyApiService.setCurrentPage(pageNumb);
  //galleryRecipesRef.innerHTML = '';
  fetchRecipesQuery();
}

function loadPageThree() {
  const pageNumb = parseInt(refs.pageThreeBtn.textContent);
  testyApiService.setCurrentPage(pageNumb);
  //galleryRecipesRef.innerHTML = '';
  fetchRecipesQuery();
}

function loadDotsLeft() {
  pageNumb = testyApiService.currentPage;
  // console.log(
  //   'totalPages: ',
  //   totalPages,
  //   'testyApiService.currentPage: ',
  //   testyApiService.currentPage,
  //   'pageNumb: ',
  //   pageNumb
  // );
  const pageDotsLeft = totalPages - parseInt(testyApiService.currentPage);

  if (refs.pageOneBtn.textContent === '2') {
    refs.pageThreeBtn.textContent = parseInt(refs.pageThreeBtn.textContent) - 1;
    refs.pageTwoBtn.textContent = parseInt(refs.pageTwoBtn.textContent) - 1;
    refs.pageOneBtn.textContent = parseInt(refs.pageOneBtn.textContent) - 1;
    //galleryRecipesRef.innerHTML = '';
    testyApiService.setCurrentPage(pageNumb - 1);
    fetchRecipesQuery();
    return;
  }

  if (parseInt(refs.pageOneBtn.textContent) < 3) return;
  refs.pageThreeBtn.textContent = parseInt(refs.pageThreeBtn.textContent) - 2;
  refs.pageTwoBtn.textContent = parseInt(refs.pageTwoBtn.textContent) - 2;
  refs.pageOneBtn.textContent = parseInt(refs.pageOneBtn.textContent) - 2;
  //galleryRecipesRef.innerHTML = '';
  testyApiService.setCurrentPage(pageNumb - 2);
  fetchRecipesQuery();
}

function loadDotsRigth() {
  pageNumb = testyApiService.currentPage;
  // console.log(
  //   'totalPages: ',
  //   totalPages,
  //   'testyApiService.currentPage: ',
  //   testyApiService.currentPage,
  //   'pageNumb: ',
  //   pageNumb
  // );
  const pageDotsLeft = totalPages - parseInt(testyApiService.currentPage);

  if (totalPages - parseInt(refs.pageThreeBtn.textContent) === 1) {
    refs.pageThreeBtn.textContent = parseInt(refs.pageThreeBtn.textContent) + 1;
    refs.pageTwoBtn.textContent = parseInt(refs.pageTwoBtn.textContent) + 1;
    refs.pageOneBtn.textContent = parseInt(refs.pageOneBtn.textContent) + 1;
    //galleryRecipesRef.innerHTML = '';
    testyApiService.setCurrentPage(pageNumb + 1);
    fetchRecipesQuery();
    return;
  }

  refs.pageThreeBtn.textContent = parseInt(refs.pageThreeBtn.textContent) + 2;
  refs.pageTwoBtn.textContent = parseInt(refs.pageTwoBtn.textContent) + 2;
  refs.pageOneBtn.textContent = parseInt(refs.pageOneBtn.textContent) + 2;
  //galleryRecipesRef.innerHTML = '';
  testyApiService.setCurrentPage(pageNumb + 2);
  fetchRecipesQuery();
}

function changeButtonColor() {
  refs.buttonNumered.forEach(button => {
    const pageNumb = parseInt(button.textContent);
    //console.log(pageNumb);
    //console.log('btn:', pageNumb, 'currentPage', testyApiService.currentPage);
    if (testyApiService.currentPage === pageNumb) {
      button.classList.add('pag-btn-on-hover');
    } else {
      button.classList.remove('pag-btn-on-hover');
    }
  });
  //
  //console.log('btn3: ', pageThreeBtn.textContent);
  //if (testyApiService.currentPage > totalPages - 3) {
  if (parseInt(refs.pageThreeBtn.textContent) === totalPages) {
    refs.btnWithDotsRight.classList.add('btn_hidden');
  } else {
    refs.btnWithDotsRight.classList.remove('btn_hidden');
  }
  //
  if (testyApiService.currentPage > 3) {
    refs.btnWithDotsLeft.classList.remove('btn_hidden');
  } else {
    refs.btnWithDotsLeft.classList.add('btn_hidden');
  }
  //
  if (totalPages <= 3) {
    refs.btnWithDotsRight.classList.add('btn_hidden');
    refs.btnWithDotsLeft.classList.add('btn_hidden');
  }
  //
  if (totalPages <= 2) {
    refs.pageThreeBtn.classList.add('btn_hidden');
  }
  //
  if (totalPages <= 1) {
    refs.pageTwoBtn.classList.add('btn_hidden');
  }
}

function resetNumBtn() {
  refs.pageOneBtn.textContent = 1;
  refs.pageTwoBtn.textContent = 2;
  refs.pageThreeBtn.textContent = 3;
  refs.pageOneBtn.classList.remove('btn_hidden');
  refs.pageTwoBtn.classList.remove('btn_hidden');
  refs.pageThreeBtn.classList.remove('btn_hidden');
  refs.btnWithDotsRight.classList.remove('btn_hidden');
}

export { resetFilter, resetNumBtn };
