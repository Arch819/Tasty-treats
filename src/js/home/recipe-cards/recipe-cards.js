import debounce from 'lodash.debounce';
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

const testyApiService = new TastyApiService();
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

function onSeachQueryTitle(evt) {
  //console.log(evt.target.value);
  const inputQuery = evt.target.value.trim();
  if (inputQuery === '') return;
  clearRecipesContainer();
  testyApiService.resetPage();
  testyApiService.setSearchTitle(inputQuery);
  fetchRecipesQuery();
}

function onSeachQueryTime(evt) {
  //console.log(evt.target.value);
  const inputQuery = evt.target.value;
  clearRecipesContainer();
  testyApiService.resetPage();
  testyApiService.setSearchTime(inputQuery);
  fetchRecipesQuery();
}

function onSeachQueryAreas(evt) {
  console.log(evt.target.value);
  const inputQuery = evt.target.value;
  clearRecipesContainer();
  testyApiService.resetPage();
  testyApiService.setSearchArea(inputQuery);
  fetchRecipesQuery();
}

function onSeachQueryIngredients(evt) {
  console.log(evt.target.value);
  const inputQuery = evt.target.value;
  clearRecipesContainer();
  testyApiService.resetPage();
  testyApiService.setSearchIngredient(inputQuery);
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

function fetchListAreas() {
  getLists
    .fetchListAreas()
    .then(data => {
      console.log('getLists', data);
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
      console.log('ingredient', data);
      markup = data
        .map(ingredient => {
          return `<option value="${ingredient._id}" class="area">${ingredient.name}</option>`;
        })
        .join('');
      selectQueryIngredientsRef.insertAdjacentHTML('beforeend', markup);
    })
    .catch(err => console.log(err));
}
