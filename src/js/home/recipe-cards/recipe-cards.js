import debounce from 'lodash.debounce';
import { createMarkup } from './recipe-cardsRender';
import { TastyApiService } from './recipe-cardsApi';

const galleryRecipesRef = document.querySelector('.js-gallery');
const searchQueryTitleRef = document.querySelector('.input-search');
const seachQueryTimeRef = document.querySelector('.time-selector');

const testyApiService = new TastyApiService();

// testyApiService
//   .fetchRecipes()
//   .then(data => {
//     console.log(data);
//     console.log(data.results);
//     //createMarkup(data.results);
//     //console.log(createMarkup(data.results));
//     renderGallery(data.results);
//   })
//   .catch(err => console.log(err));
fetchRecipesQuery();

function renderGallery(dataArr) {
  galleryRecipesRef.insertAdjacentHTML('beforeend', createMarkup(dataArr));
}

searchQueryTitleRef.addEventListener('input', debounce(onSeachQueryTitle, 500));
seachQueryTimeRef.addEventListener('change', onSeachQueryTime);

function onSeachQueryTitle(evt) {
  console.log(evt.target.value);
  const inputQuery = evt.target.value.trim();
  if (inputQuery === '') return;
  clearRecipesContainer();
  testyApiService.resetPage();
  testyApiService.setSearchTitle(inputQuery);
  fetchRecipesQuery();
}

function onSeachQueryTime(evt) {
  console.log(evt.target.value);
  const inputQuery = evt.target.value;
  clearRecipesContainer();
  testyApiService.resetPage();
  testyApiService.setSearchTime(inputQuery);
  fetchRecipesQuery();
}

function clearRecipesContainer() {
  galleryRecipesRef.innerHTML = '';
}

function fetchRecipesQuery() {
  testyApiService
    .fetchRecipes()
    .then(data => {
      console.log('fetchRecipesQuery', data.results);
      renderGallery(data.results);
    })
    .catch(err => console.log(err));
}
