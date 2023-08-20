import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { createMarkup } from './recipe-cardsRender';
import { TastyApiService } from './recipe-cardsApi';
import { GetLists } from './lists-service';

const galleryRecipesRef = document.querySelector('.js-gallery');
const searchQueryTitleRef = document.querySelector('.input-search');
const seachQueryTimeRef = document.querySelector('.time-selector');
const seachQueryAreasRef = document.querySelector('.area-selector');
const selectQueryIngredientsRef = document.querySelector(
  '.ingredients-selector'
);
const btnResetFilterRef = document.querySelector('.reset-filter');

Notify.init({
  position: 'center-center',
});

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

function onSeachQueryTitle(evt) {
  //console.log(evt.target.value);
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
}

function clearRecipesContainer() {
  galleryRecipesRef.innerHTML = '';
}

function fetchRecipesQuery() {
  testyApiService
    .fetchRecipes()
    .then(data => {
      console.log('fetchRecipesQuery', data.results);
      //data.results.length === 0 - !data.results -
      if (data.results.length === 0) {
        Notify.failure('Something went wrong. Please try again!');
        return;
      }
      clearRecipesContainer();
      renderGallery(data.results);
    })
    .catch(err => console.log(err));
}

function fetchListAreas() {
  getLists
    .fetchListAreas()
    .then(data => {
      //console.log('getLists', data);
      markup = data
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
      markup = data
        .map(ingredient => {
          return `<option value="${ingredient._id}" class="area">${ingredient.name}</option>`;
        })
        .join('');
      selectQueryIngredientsRef.insertAdjacentHTML('beforeend', markup);
    })
    .catch(err => console.log(err));
}

//  - Pagination -
const backToFirstPage = document.querySelector('#pag-btn-start');
const pageOneBtn = document.querySelector('#pag-btn-1');
const pageTwoBtn = document.querySelector('#pag-btn-2');
const pageThreeBtn = document.querySelector('#pag-btn-3');
const lastPageBtn = document.querySelector('#pag-btn-last');
const nextPagePagBtn = document.querySelector('#pag-btn-next');
const buttonNumered = document.querySelectorAll('.pag-btn-number');
const previousPageButton = document.querySelector('#pag-btn-prev');

backToFirstPage.addEventListener('click', backToFirst);
lastPageBtn.addEventListener('click', loadLastPage);
nextPagePagBtn.addEventListener('click', loadNextPage);
previousPageButton.addEventListener('click', loadPrevPage);
pageOneBtn.addEventListener('click', loadfirstPage);
pageTwoBtn.addEventListener('click', loadPageTwo);
pageThreeBtn.addEventListener('click', loadPageThree);

function backToFirst() {
  testyApiService.resetPage();
  pageOneBtn.textContent = 1;
  pageTwoBtn.textContent = 2;
  pageThreeBtn.textContent = 3;
  galleryRecipesRef.innerHTML = '';
  fetchRecipesQuery();
}

function loadLastPage() {
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

  pageThreeBtn.textContent = pageNumb;
  pageTwoBtn.textContent = pageNumb - 1;
  pageOneBtn.textContent = pageNumb - 2;
  galleryRecipesRef.innerHTML = '';
  testyApiService.setCurrentPage(pageNumb);
  fetchRecipesQuery();
}

function loadNextPage() {
  //console.log('loadNextPage - page: ', testyApiService.currentPage);
  if (testyApiService.currentPage === 32) {
    return;
  }
  buttonNumered.forEach(button => {
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
  //console.log('loadPrevPage --- ','on Btn ', pageOneBtn.textContent, 'currentPage', testyApiService.currentPage);
  //if (pageOneBtn.textContent != '1') {
  if (parseInt(pageOneBtn.textContent) > 2) {
    buttonNumered.forEach(button => {
      button.textContent--;
      // pageNumb=button.textContent
    });
  } else return;

  //prevPage = pageNumb - 1;
  testyApiService.decrementPage();
  // loadPage(prevPage);
  galleryRecipesRef.innerHTML = '';
  fetchRecipesQuery();
}

function loadfirstPage() {
  const pageNumb = parseInt(pageOneBtn.textContent);
  testyApiService.setCurrentPage(pageNumb);
  //galleryRecipesRef.innerHTML = '';
  fetchRecipesQuery();
}

function loadPageTwo() {
  const pageNumb = parseInt(pageTwoBtn.textContent);
  testyApiService.setCurrentPage(pageNumb);
  //galleryRecipesRef.innerHTML = '';
  fetchRecipesQuery();
}

function loadPageThree() {
  const pageNumb = parseInt(pageThreeBtn.textContent);
  testyApiService.setCurrentPage(pageNumb);
  //galleryRecipesRef.innerHTML = '';
  fetchRecipesQuery();
}

function changeButtonColor() {
  buttonNumered.forEach(button => {
    const pageNumb = parseInt(button.textContent);
    //console.log('btn:', pageNumb, 'currentPage', testyApiService.currentPage);
    if (testyApiService.currentPage === pageNumb) {
      button.classList.add('pag-btn-on-hover');
    } else {
      button.classList.remove('pag-btn-on-hover');
    }
  });
}
