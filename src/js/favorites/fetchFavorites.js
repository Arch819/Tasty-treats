import axios from 'axios';

const URL_RECIPE = 'https://tasty-treats-backend.p.goit.global/api/recipes';

export const fetchFavorites = async () => {
  try {
    const response = await axios.get(URL_RECIPE, {
      params: {
        limit: 12,
      },
    });
    if (response.status === 404) {
      throw new Error('Page not found error 404');
    }

    return response;
  } catch {
    throw new Error('an error occurred while fetching the images from the API');
  }
};
