import { popularRecipesUrl } from './popularApi';

const descriptions = document.querySelectorAll('.card-description');
let maxCharacters = 80;
let maxCharactersTitle = 15;

export function createMarkupPopularRecipes(recipes) {
  return recipes
    .map(
      recipe => `
    <ul class="popular-recipe-list list">
      <li class="popular-recipe-item">
        <div class="popular-recipe-card">
          <img class="card-image" src="${recipe.preview}" alt="${recipe.title}">
          <div class="card-content">
            <h3 class="card-heading">${truncateTitle(recipe.title)}</h3>
            <p class="card-description">${truncateText(recipe.description)}</p>
          </div>
        </div>
      </li>
    </ul>
`
    )
    .join('');
}

function updateMaxCharacters() {
  if (window.innerWidth < 768) {
    maxCharacters = 110;
  } else {
    maxCharacters = 80;
  }

  descriptions.forEach(description => {
    const text = description.textContent;
    description.textContent = truncateText(text);
  });
}

window.addEventListener('DOMContentLoaded', updateMaxCharacters);
window.addEventListener('resize', updateMaxCharacters);

function truncateText(text) {
  if (text.length > maxCharacters) {
    return text.slice(0, maxCharacters) + '...';
  }
  return text;
}

function truncateTitle(title) {
  if (title.length > maxCharactersTitle) {
    return title.slice(0, maxCharactersTitle) + '...';
  }
  return title;
}
