// import axios from 'axios';

const URL_RECIPE = 'https://tasty-treats-backend.p.goit.global/api/recipes/';

// export const fetchRecipeById = async id => {
//   try {
//     const response = await axios.get(URL_RECIPE, {
//       params: {
//         page: 1,
//         limit: 12,
//         id: id,
//       },
//     });
//     if (response.status === 404) {
//       throw new Error('Page not found error 404');
//     }

//     return response;
//   } catch {
//     throw new Error('an error occurred while fetching the images from the API');
//   }
// };

export const fetchRecipeById = async id => {
  const fetchAllRecipe = await fetch(`${URL_RECIPE}${id}`).then(res =>
    res.json()
  );
  return fetchAllRecipe;
};
