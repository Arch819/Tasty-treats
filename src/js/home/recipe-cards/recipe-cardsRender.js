export function createMarkup(recipes) {
  /*
  area
  category
  2 description: "A French dessert consisting of layers of chocolate sponge cake and chocolate ganache, typically topped with chocolate glaze and chocolate decorations."
  ingredients []
  instructions
  4 preview "https://www.themealdb.com/images/media/meals/tqtywx1468317395.jpg"
  3 rating 4.93 + generateStars
  tags []
  thumb
  time
  1 title: "Chocolate Gateau"
  youtube
  5 _id "6462a8f74c3d0ddd28897fc1"
   */
  //console.log('Recipes:', recipes);

  const starIconGrey = `<svg class="icon-star" width="18" height="18" viewBox="0 0 14 13"><path d="M6.049.927c.3-.921 1.603-.921 1.902 0l.845 2.6a1 1 0 0 0 .951.692h2.735c.969 0 1.371 1.24.588 1.809l-2.213 1.607a1 1 0 0 0-.363 1.118l.845 2.601c.3.921-.755 1.688-1.539 1.118l-2.212-1.607a1 1 0 0 0-1.176 0L4.2 12.472c-.784.57-1.838-.197-1.539-1.118l.845-2.6a1 1 0 0 0-.363-1.119L.93 6.028c-.783-.57-.38-1.81.588-1.81h2.735a1 1 0 0 0 .95-.69l.846-2.6Z"/></svg>`;
  const starIconOrange = `<svg class="icon-star" width="18" height="18" viewBox="0 0 14 13"><path fill="orange" d="M6.049.927c.3-.921 1.603-.921 1.902 0l.845 2.6a1 1 0 0 0 .951.692h2.735c.969 0 1.371 1.24.588 1.809l-2.213 1.607a1 1 0 0 0-.363 1.118l.845 2.601c.3.921-.755 1.688-1.539 1.118l-2.212-1.607a1 1 0 0 0-1.176 0L4.2 12.472c-.784.57-1.838-.197-1.539-1.118l.845-2.6a1 1 0 0 0-.363-1.119L.93 6.028c-.783-.57-.38-1.81.588-1.81h2.735a1 1 0 0 0 .95-.69l.846-2.6Z"/></svg>`;

  function generateStars(rating) {
    let stars = '';
    let roundedRating = Math.round(rating);
    for (let i = 0; i < 5; i++) {
      stars += i < roundedRating ? starIconOrange : starIconGrey;
    }
    return stars;
  }

  const heartIconGrey = `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
  <path opacity="0.5" fill-rule="evenodd" clip-rule="evenodd" d="M10.9938 4.70783C9.16102 2.5652 6.10481 1.98884 3.80851 3.95085C1.51221 5.91285 1.18893 9.19323 2.99222 11.5137C4.49154 13.443 9.029 17.5121 10.5161 18.8291C10.6825 18.9764 10.7657 19.0501 10.8627 19.0791C10.9474 19.1043 11.0401 19.1043 11.1248 19.0791C11.2218 19.0501 11.305 18.9764 11.4714 18.8291C12.9585 17.5121 17.496 13.443 18.9953 11.5137C20.7986 9.19323 20.5148 5.89221 18.179 3.95085C15.8432 2.00948 12.8265 2.5652 10.9938 4.70783Z" stroke="#F8F8F8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
  const heartIconWhite = `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M10.9937 4.70783C9.16096 2.5652 6.10475 1.98884 3.80845 3.95085C1.51215 5.91285 1.18887 9.19323 2.99216 11.5137C4.49148 13.443 9.02894 17.5121 10.5161 18.8291C10.6825 18.9764 10.7656 19.0501 10.8627 19.0791C10.9474 19.1043 11.04 19.1043 11.1247 19.0791C11.2218 19.0501 11.305 18.9764 11.4713 18.8291C12.9585 17.5121 17.4959 13.443 18.9952 11.5137C20.7985 9.19323 20.5147 5.89221 18.179 3.95085C15.8432 2.00948 12.8264 2.5652 10.9937 4.70783Z" fill="#F8F8F8"/>
</svg>`;

  function generateHeart(id) {
    return `
    <div class="heart-block" id="${id}">
      <input type="checkbox" class="card-checkbox" id="${id}" aria-label="card-checkbox-for-recipe-N${id}" />
      <label for="${id}" class="card-checkbox-label">
        <span class="unchecked-heart">${heartIconGrey}</span>
        <span class="checked-heart">${heartIconWhite}</span>
      </label>
    </div>`;
  }

  return recipes
    .map(
      recipe => `<li class="card-item">
          <div class="card-block">
            <img class="card-image" src="${recipe.preview}" alt="${
        recipe.title
      }">
            ${generateHeart(recipe._id)}
            <div class="card-content">
              <h3 class="card-heading">${recipe.title}</h3>
              <p class="card-description">${recipe.description}</p>
            </div>
            <div class="card-bottom">
              <div class="card-rating-block">
                <p class="card-rating">${recipe.rating}</p>
                <div class="eating-stars">${generateStars(recipe.rating)}</div>
              </div>
              <button class="card-button" data-id="${
                recipe._id
              }">See recipe</button>
            </div>
          </div>
        </li>`
    )
    .join('');
}
