const URL_AREA = 'https://tasty-treats-backend.p.goit.global/api/areas';
const URL_INGREDIENTS =
  'https://tasty-treats-backend.p.goit.global/api/ingredients';

export class GetLists {
  constructor() {
    this.urlArea = URL_AREA;
    this.urlIngredients = URL_INGREDIENTS;
  }

  fetchListAreas() {
    return fetch(this.urlArea)
      .then(response => response.json())
      .then(data => {
        return data;
      })
      .catch(error => {
        console.log(error);
      });
  }

  fetchListIngredients() {
    return fetch(this.urlIngredients)
      .then(response => response.json())
      .then(data => {
        return data;
      })
      .catch(error => {
        console.log(error);
      });
  }
}
