import { fetchRecipeDataForIds } from './fetchFavorites';
import { renderCardsMarkup } from './cardElement';
import { renderCategories } from './filterElement';

// -----------------------------рендер списку категорій та карток-------------------------------------

export const renderFavirites = async (
  favoritesFilterRef,
  favoritesCardsRef,
  storageValue
) => {
  try {
    const results = await fetchRecipeDataForIds(storageValue.map(el => el.id));
    const arrayOfCategories = results.map(el => el.data.category);

    const markupCategory = renderCategories(arrayOfCategories);
    const cardMarkupCard = renderCardsMarkup(results);

    favoritesFilterRef.innerHTML = markupCategory;
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
