import { fetchRecipeDataForIds } from './fetchFavorites';
import { renderCardsMarkup } from './cardElement';
import { markupCategory } from './filterElement';

// -----------------------------рендер списку категорій-------------------------------------

export const renderCategories = async storageValue => {
  try {
    const results = await fetchRecipeDataForIds(storageValue.map(el => el.id));
    const arrayOfCategories = results.map(el => el.data.category);
    console.log(arrayOfCategories);

    const markupCateg = markupCategory(arrayOfCategories);
    console.log(markupCateg);
    return markupCateg;
  } catch (error) {
    console.log(error);
  }
};

//----------рендер списку карток-----------------

export const renderCards = async storageValue => {
  try {
    const results = await fetchRecipeDataForIds(storageValue.map(el => el.id));
    const cardMarkupCard = renderCardsMarkup(results);

    favoritesCardsRef.innerHTML = cardMarkupCard;
  } catch (error) {
    console.log(error);
  }
};
