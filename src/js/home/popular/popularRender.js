import { popularRecipesUrl } from './popularApi';

// const descriptions = document.querySelectorAll('.card-description');

function createRecipeMarkup(recipe, index) {
  return `<li
      class="popular-recipe-item js-card-button"
      data-id="${recipe._id}"
    >
      <a class="popular-recipe-card">
        <img
          class="popular-card-image"
          src="${recipe.preview}"
          alt="${recipe.title}"
        >
        <div class="popular-card-content">
          <h3 class="popular-card-heading">${recipe.title}</h3>
          <p class="popular-card-description">
            ${recipe.description}
          </p>
        </div>
      </a>
    </li>`;
}

export function createMarkupPopularRecipes(recipes) {
  return `<ul class="popular-recipe-list list">
      ${recipes.reduce(
        (accumulator, recipe, index) =>
          accumulator + createRecipeMarkup(recipe, index + 1),
        ''
      )}
    </ul>`;
}
