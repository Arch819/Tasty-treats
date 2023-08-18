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
  return recipes
    .map(
      recipe => `<li class="card-item">
          <div class="card-block">
            <img class="card-image" src="${recipe.preview}" alt="${recipe.title}" width="335px">
        <div class="heart-block">
          <input type="checkbox" class="card-checkbox" id="card-checkbox-${recipe._id}" aria-label="card-checkbox-${recipe._id}" />
          <label for="card-checkbox-${recipe._id}" class="card-checkbox-label">
            <span class="unchecked-heart">
            <svg class="heartIconGrey" width="18" height="18">
                <use href="./images/sprite.svg#icon-search"></use>
              </svg></span>
            <span class="checked-heart">
            <svg class="heartIconWhite" width="18" height="18">
                <use href="./images/sprite.svg#icon-search"></use>
              </svg></span>
            </span>
          </label>
        </div>
            <div class="card-content">
              <h3 class="card-heading">${recipe.title}</h3>
              <p class="card-description">${recipe.description}</p>
            </div>
            <div class="card-bottom">
              <div class="card-rating-block">
                <p class="card-rating">${recipe.rating}</p>
                <div class="eating-stars">generateStars(recipe.rating)</div>
              </div>
              <button class="card-button" data-id="${recipe._id}">See recipe</button>
            </div>
          </div>
        </li>`
    )
    .join('');
}
