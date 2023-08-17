import elements from '../../images/elements.jpg';

export const empty = () => {
  const text = `It appears that you haven't added any recipes to your favorites yet. To get started, you can add recipes that you like to your favorites for easier access in the future.`;
  return `<div class="favorites__empty">
  <div class="favorites__img"></div>
    <img src="${elements}" alt="chef's hat">
    <p class="favorites__text">${text}</p></div>`;
};
