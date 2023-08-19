import axios from 'axios';
import { createMarkupPopularRecipes } from './popularRender.js';

const popularRecipesUrl =
  'https://tasty-treats-backend.p.goit.global/api/recipes/popular';

const container = document.querySelector('.popular-recipes-container');

function updatePopularRecipes() {
  axios
    .get(popularRecipesUrl)
    .then(response => {
      const popularRecipes = response.data;
      const numElements = window.innerWidth < 768 ? 2 : 4;
      const slicedRecipes = popularRecipes.slice(0, numElements);
      const markup = createMarkupPopularRecipes(slicedRecipes);
      container.innerHTML = markup;
    })
    .catch(error => {
      console.error('Error fetching popular recipes:', error);
    });
}

window.addEventListener('resize', updatePopularRecipes);
updatePopularRecipes();
