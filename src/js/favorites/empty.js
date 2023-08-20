import elements from '../../images/favorites/elements.jpg';

export const empty = () => {
  const text = `It appears that you haven't added any recipes to your favorites yet. To get started, you can add recipes that you like to your favorites for easier access in the future.`;
  return `
    <img src="${elements}" alt="chef's hat">
    <p class="favorites__text">${text}</p>`;
};