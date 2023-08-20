import { fetchRecipeById } from './fetchFavorites';
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

// -------------------------------------------------отримує масив всіх категорій та повертає розмітку-------------------------

const renderListOfCategories = listOfCategories => {
  const zeroMarkup = `<li><button type="button" class="favorites__filter-btn">All categories</button></li>`;
  const uniqueArray = [];
  for (const item of listOfCategories) {
    if (!uniqueArray.includes(item)) {
      uniqueArray.push(item);
    }
  }
  const markup = uniqueArray.map(el => {
    return `<li><button type="button" class="favorites__filter-btn">${el}</button></li>`;
  });
  markup.unshift(zeroMarkup);
  return markup;
};

// Створюємо розмітку карток---------------------------------------------
const renderListCards = listOfCard => {
  return listOfCard.map(
    ({ preview, title, description, rating, _id, category }) => {
      return `
      <li class="favorites__cards-item">
      <button type="button" id="#${_id}" class="icon-button" data-category="${category}"><svg class="favorites__heart heart-isActive"><use href="${icons}#icon-heart"></use></svg></button>
        <img src="${preview}" alt="${title}" width="335">
        <div class="favorites__cards-thumb">
          <h2 class="favorites__cards-title">${title}</h2>
          <p class="favorites__cards-text">${description}</p>
          <div class="favorites__rating-thumb">
            ${renderRating(rating)}
            <button class="favorites__cards-btn">See recipe</button>
          </div>
        </div>
      </li>`;
    }
  );
};

// -------------------------------------------------отримує масив id та повертає масив об'єктів рецептів-----------------------
const fetchRecipeDataForIds = async ids => {
  const fetchPromises = ids.map(async id => {
    const result = await fetchRecipeById(id);
    return result;
  });

  const results = await Promise.all(fetchPromises);
  return results;
};

// -----------------------отримує масив категорій і повертає markup списку-------------------------

const renderCategories = categories => {
  const markupCategory = renderListOfCategories(categories).join('');
  return markupCategory;
};

// -----------------------отримує масив картинок і повертає markup списку-------------------------
const renderCardsMarkup = cardsData => {
  const cardMarkupCard = renderListCards(cardsData).join('');
  return cardMarkupCard;
};

// -----------------------------рендер списку категорій та карток-------------------------------------

export const renderFavirites = async (
  favoritesFilterRef,
  favoritesCardsRef,
  storageValue
) => {
  try {
    const results = await fetchRecipeDataForIds(storageValue.map(el => el.id));
    const arrayOfCategories = results.map(el => el.category);

    const markupCategory = renderCategories(arrayOfCategories);
    const cardMarkupCard = renderCardsMarkup(results);

    favoritesFilterRef.insertAdjacentHTML('beforeend', markupCategory);
    favoritesCardsRef.innerHTML = cardMarkupCard;
  } catch (error) {
    console.log(error);
  }
};

//----------рендер списку карток-----------------

export const renderCards = async (favoritesCardsRef, storageValue) => {
  try {
    const results = await fetchRecipeDataForIds(storageValue.map(el => el.id));
    const cardMarkupCard = renderCardsMarkup(results);

    favoritesCardsRef.innerHTML = cardMarkupCard;
  } catch (error) {
    console.log(error);
  }
};
