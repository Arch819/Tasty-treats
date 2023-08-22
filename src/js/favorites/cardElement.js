import icons from '../../images/sprite.svg';

//  Створюємо розмітку зірок-------------------

const createRatingStars = rating => {
  const roundRating = Math.round(rating);
  const activeStarMarkup = `<svg class="favorites__star-active"><use href="${icons}#icon-star"></use></svg>`;
  const inactiveStarMarkup = `<svg class="favorites__star-notActive"><use href="${icons}#icon-star-grey"></use></svg>`;
  let starsArray = [];
  for (let i = 1; i <= 5; i += 1) {
    starsArray.push(i > roundRating ? inactiveStarMarkup : activeStarMarkup);
  }
  return starsArray.join('');
};

// Створюємо розмітку рейтингу=------------------------
const renderRating = value => {
  return `<div class='favorites__rating'>
              <div class="favorites__rating-body">
                <div class="favorites__rating-active"><div class='favorites__cards-rating'>${value}</div>${createRatingStars(
    value
  )}</div>
                <div class="favorites__rating-items">
                  <input type="radio" class="favorites__rating-item" value="1" name="rating">
                  <input type="radio" class="favorites__rating-item" value="2" name="rating">
                  <input type="radio" class="favorites__rating-item" value="3" name="rating">
                  <input type="radio" class="favorites__rating-item" value="4" name="rating">
                  <input type="radio" class="favorites__rating-item" value="5" name="rating">
                </div>
              </div>
  
    </div>`;
};

// Створюємо розмітку карток---------------------------------------------
const renderListCards = listOfCard => {
  return listOfCard.map(({ data }) => {
    return `
        <li class="favorites__cards-item">
        <button type="button" id="#${
          data._id
        }" class="icon-button" data-category="${
      data.category
    }"><svg class="favorites__heart heart-isActive"><use href="${icons}#icon-heart"></use></svg></button>
          <img src="${data.preview}" alt="${data.title}" width="335">
          <div class="favorites__cards-thumb">
            <h2 class="favorites__cards-title">${data.title}</h2>
            <p class="favorites__cards-text">${data.description}</p>
            <div class="favorites__rating-thumb">
              ${renderRating(data.rating)}
              <button class="favorites__cards-btn">See recipe</button>
            </div>
          </div>
        </li>`;
  });
};

// -----------------------отримує масив картинок і повертає markup списку-------------------------
export const renderCardsMarkup = cardsData => {
  const cardMarkupCard = renderListCards(cardsData).join('');
  return cardMarkupCard;
};
