const BASE_URL = 'https://tasty-treats-backend.p.goit.global/api/recipes/';

export default function fetchRecipe(id) {
  return fetch(`${BASE_URL}${id}`).then(response => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  });
}
