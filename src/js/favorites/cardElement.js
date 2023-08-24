import icons from '../../images/sprite.svg';
import elements from '../../images/favorites/elements.jpg';

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
const renderCardsMarkup = cardsData => {
  const cardMarkupCard = renderListCards(cardsData).join('');
  return cardMarkupCard;
};

const empty = () => {
  const text = `It appears that you haven't added any recipes to your favorites yet. To get started, you can add recipes that you like to your favorites for easier access in the future.`;
  return `
    <img src="${elements}" class="favorites__empty-img" alt="chef's hat">
    <p class="favorites__text">${text}</p>`;
};

const emptyItem = () => {
  return `<li class="favorites__list-cards-thumb">${empty()}</li>`;
};

// ========================================викликаємо коли потрібно завантажити порожню сторінку-======================
const emptyRendering = conRef => {
  conRef.classList.add('empty');
  conRef.insertAdjacentHTML('beforeend', empty());
};

// =================================парсимо localStorage========================================
const getValuesOfStorage = storedData => {
  try {
    const rawData = localStorage.getItem(storedData);
    if (rawData) {
      return JSON.parse(rawData);
    }
  } catch (error) {
    console.error('Error while parsing local storage data:', error);
  }
};

export {
  renderCardsMarkup,
  empty,
  emptyItem,
  emptyRendering,
  getValuesOfStorage,
};
