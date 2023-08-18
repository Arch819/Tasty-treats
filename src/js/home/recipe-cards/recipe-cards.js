import { createMarkup } from './recipe-cardsRender';

import { TastyApiService } from './recipe-cardsApi';

const galleryRecipesRef = document.querySelector('.js-gallery');

const testyApiService = new TastyApiService();

testyApiService.fetchRecipes().then(data => {
  console.log(data);
  console.log(data.results);
  //console.log(createMarkup(data.results));
  //createMarkup(data.results);
  //console.log(createMarkup(data.results));
  renderGallery(data.results);
});

function renderGallery(dataArr) {
  galleryRecipesRef.insertAdjacentHTML('beforeend', createMarkup(dataArr));
}
