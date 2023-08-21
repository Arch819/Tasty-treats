import { fetchRecipeDataForIds } from './fetchFavorites';
import { renderCardsMarkup } from './cardElement';
import { markupCategory } from './filterElement';

// -----------------------------рендер списку категорій-------------------------------------
// ПРиймає масив об'єктів і повертає markup елементу категорій

export const renderCategories = async storageValue => {
  try {
    const results = await fetchRecipeDataForIds(storageValue.map(el => el.id));
    const arrayOfCategories = results.map(el => el.data.category);
    console.log(arrayOfCategories);

    const markup = markupCategory(arrayOfCategories);
    console.log(markup);
    return markup;
  } catch (error) {
    console.log(error);
  }
};

//----------рендер списку карток-----------------
// ПРиймає масив об'єктів, дійсну сторінку, скільки карток на сторінці і повертає markup елементу карток

export const renderCards = async (storageValue, currentPage, PerPage) => {
  try {
    const results = await fetchRecipeDataForIds(storageValue.map(el => el.id));
    const startIndex = (currentPage - 1) * PerPage;
    const endIndex = startIndex + PerPage;
    const slicedResults = results.slice(startIndex, endIndex);

    const cardMarkupCard = renderCardsMarkup(slicedResults);
    return cardMarkupCard;
  } catch (error) {
    console.log(error);
  }
};
