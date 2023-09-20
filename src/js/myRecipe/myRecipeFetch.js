export const fetchMyRecipe = () => {
  const getFetch = JSON.parse(localStorage.getItem('recipes'));
  return getFetch;
};
