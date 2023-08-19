import { renderListCards } from './cardElements';
import { fetchFavorites } from './fetchFavorites';

export const renderCards = async favWrapRef => {
  try {
    const { data } = await fetchFavorites();
    console.log(data);
    const cardMarkupCard = await renderListCards(data.results).join('');

    const test = `<div class='favorites'>
        <ul class='favorites__list-cards'>${cardMarkupCard}</ul>
        </div>`;
    favWrapRef.insertAdjacentHTML('beforeend', test);
  } catch (error) {
    console.log(error);
  }
};
