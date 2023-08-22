const starIconGrey = `<svg class="icon-star" width="18" height="18" viewBox="0 0 14 13"><path fill="rgba(5, 5, 5, 0.10)"; d="M6.049.927c.3-.921 1.603-.921 1.902 0l.845 2.6a1 1 0 0 0 .951.692h2.735c.969 0 1.371 1.24.588 1.809l-2.213 1.607a1 1 0 0 0-.363 1.118l.845 2.601c.3.921-.755 1.688-1.539 1.118l-2.212-1.607a1 1 0 0 0-1.176 0L4.2 12.472c-.784.57-1.838-.197-1.539-1.118l.845-2.6a1 1 0 0 0-.363-1.119L.93 6.028c-.783-.57-.38-1.81.588-1.81h2.735a1 1 0 0 0 .95-.69l.846-2.6Z"/></svg>`;
const starIconOrange = `<svg class="icon-star" width="18" height="18" viewBox="0 0 14 13"><path fill="#EEA10C" d="M6.049.927c.3-.921 1.603-.921 1.902 0l.845 2.6a1 1 0 0 0 .951.692h2.735c.969 0 1.371 1.24.588 1.809l-2.213 1.607a1 1 0 0 0-.363 1.118l.845 2.601c.3.921-.755 1.688-1.539 1.118l-2.212-1.607a1 1 0 0 0-1.176 0L4.2 12.472c-.784.57-1.838-.197-1.539-1.118l.845-2.6a1 1 0 0 0-.363-1.119L.93 6.028c-.783-.57-.38-1.81.588-1.81h2.735a1 1 0 0 0 .95-.69l.846-2.6Z"/></svg>`;

export default function renderRecipe({
  _id,
  title,
  rating,
  time,
  instructions,
  youtube,
  tags,
  ingredients,
  thumb,
}) {
  return ` <h2 class="modal__title">${title}</h2>

            <div class="modal__video">
                        <div class="cover-video" style="background-image: url(${thumb})">
            <svg class="icon-video" width="50px" height="50px">
                    <use href="/img/symbol-defs.svg#play-icon"></use>
                </svg>
            </div>
            <iframe class="frame-video" width="100%" height="100%" src="https://www.youtube.com/embed/${youtube.slice(
              youtube.lastIndexOf('=') + 1
            )}?enablejsapi=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen id='v1'></iframe></div>
            
            <div class="info-bar">
                <ul class="tag-list">
                ${markupTags(tags)}
                </ul>

              <div class="rating-block">
                <p class="rating-value">${rating}</p>
                <div class="reating-stars">${generateStars(rating)}</div>
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
  return `<li class="tag-item">#</li>`;
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

function generateStars(rating) {
  let stars = '';
  let roundedRating = Math.round(rating);
  for (let i = 0; i < 5; i++) {
    stars += i < roundedRating ? starIconOrange : starIconGrey;
  }
  return stars;
}
