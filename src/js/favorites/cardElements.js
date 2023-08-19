import sprite from '../../images/sprite.svg';

//  Створюємо розмітку зірок-------------------
const createRatingStars = rating => {
  const roundRating = Math.round(rating);
  const activeStarMarkup = `<svg class="favorites__star-active"><use href="${sprite}#icon-star-grey"></use></svg>`;
  const inactiveStarMarkup = `<svg class="favorites__star-notActive"><use href="${sprite}#icon-star-grey"></use></svg>`;
  let starsArray = [];
  for (let i = 1; i <= 5; i += 1) {
    starsArray.push(i > roundRating ? inactiveStarMarkup : activeStarMarkup);
  }
  return starsArray.join('');
};

// Створюємо розмітку рейтингу=------------------------
const renderRating = value => {
  return `<div class='rating'>
                <div class="rating__body">
                  <div class="rating__active"><div class='favorites__cards-rating'>${value}</div>${createRatingStars(
    value
  )}</div>
                  <div class="rating__items">
                    <input type="radio" class="rating__item" value="1" name="rating">
                    <input type="radio" class="rating__item" value="2" name="rating">
                    <input type="radio" class="rating__item" value="3" name="rating">
                    <input type="radio" class="rating__item" value="4" name="rating">
                    <input type="radio" class="rating__item" value="5" name="rating">
                  </div>
                </div>
        
        
      </div>`;
};

// Створюємо розмітку карток---------------------------------------------
export const renderListCards = listOfCard => {
  console.log(listOfCard);
  return listOfCard.map(({ preview, title, description, rating, _id }) => {
    return `
            <li class="favorites__cards-item">
            <button type="button" id="${_id}" class="icon-button"><svg class="favorites__heart"><use href="${sprite}#icon-heart" class="test-heart"></use></svg></button>
              <img src="${preview}" alt="${title}" loading="lazy"> 
              <div class="favorites__cards-thumb">
                <h2 class="favorites__cards-title">${title}</h2>
                <p class="favorites__cards-text">${description}</p>
                <div class="favorites__rating-thumb">
                  ${renderRating(rating)}
                  <button class="favorites__cards-btn">See recipe</button>
                </div>
              </div>
            </li>`;
  });
};
