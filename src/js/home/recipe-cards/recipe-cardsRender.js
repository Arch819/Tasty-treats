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

  return recipes
    .map(
      recipe => `<li class="card-item">
          <div class="card-block">
            <img class="card-image" src="${recipe.preview}" alt="${
        recipe.title
      }">
        <div class="heart-block" id="card-checkbox-${recipe._id}">
            <span class="unchecked-heart">
            <svg class="heartIconGrey" width="18" height="18">
                <use href="./images/sprite.svg#icon-search"></use>
            </svg>
            </span>
            <span class="checked-heart">
            <svg class="heartIconWhite" width="18" height="18">
                <use href="./images/sprite.svg#icon-search"></use>
            </svg>
            </span>
        </div>
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
