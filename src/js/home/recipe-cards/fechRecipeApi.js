export class FechRecipe {
  #BASE_URL = `https://tasty-treats-backend.p.goit.global/api/recipes`;
  constructor() {
    this.id = '';
  }

  fetchRecipeCard() {
    const url = `${this.#BASE_URL}/${this.id}`;

    return fetch(url)
      .then(response => response.json())
      .then(data => {
        return data;
      });
  }

  setIdRecipe(query) {
    this.id = query;
  }
}
