import axios from 'axios';

const URL_RECIPE = 'https://tasty-treats-backend.p.goit.global/api/recipes/';

export const fetchRecipeById = async id => {
  try {
    const response = await axios.get(`${URL_RECIPE}${id}`);
    if (response.status === 404) {
      throw new Error('Page not found error 404');
    }

    return response;
  } catch {
    throw new Error('an error occurred while fetching the images from the API');
  }
};

// -------------------------------------------------отримує масив id та повертає масив об'єктів рецептів-----------------------
export const fetchRecipeDataForIds = async ids => {
  const fetchPromises = ids.map(async id => {
    const result = await fetchRecipeById(id);
    return result;
  });

  const results = await Promise.all(fetchPromises);
  return results;
};
