export default function renderRecipe({
  _id,
  title,
  rating,
  time,
  instructions,
  youtube,
  tags,
  ingredients,
  category,
}) {
  return `

            <h2 class="modal__title">${title}</h2>
            <div class="modal__video">
            <iframe class="frame-video" width="100%" height="100%" src="https://www.youtube.com/embed/${youtube.slice(
              youtube.lastIndexOf('=') + 1
            )}?enablejsapi=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen id='v1'></iframe></div>
            <div class="info-bar">
                <ul class="tag-list">
                ${markupTags(tags)}
                </ul>
                <div class="rating">
                    <p class="rating-value">${rating}</p>
                    <div class="rating-body">
                        <div class="rating-items">
                            <input class="rating-item" type="radio" value="1" name="rating">
                            <input class="rating-item" type="radio" value="2" name="rating">
                            <input class="rating-item" type="radio" value="3" name="rating">
                            <input class="rating-item" type="radio" value="4" name="rating">
                            <input class="rating-item" type="radio" value="5" name="rating">
                        </div>
                    </div>
                    <p class="time">${time} min</p>
                </div>
            </div>
            <ul class="ingredient-list">
            ${markupIngredientList(ingredients)}
            </ul>
            <div class="recipe">
                <p class="instructions">
                ${instructions}
                </p>
            </div>
            <div class="modal-buttons">
                <button type="button" class="modal-button color js-favorite " data-id=${_id} data-category=${category}>Add to favorite</button>
                <button type="button" class="modal-button js-rating">Give a rating</button>
            </div>`;
}

function markupTags(arr) {
  if (arr.length) {
    return arr
      .map(item => {
        return `<li class="tag-item">#${item}</li>`;
      })
      .join('');
  }
  return;
}

function markupIngredientList(arr) {
  return arr
    .map(({ name, measure }) => {
      return `<li class="ingredient-item">
          <p class="ingredient">${name}</p>
          <p class="ingredient-value">${measure}</p>
        </li>`;
    })
    .join('');
}
