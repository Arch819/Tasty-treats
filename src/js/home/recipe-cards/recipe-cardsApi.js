const BASE_URL = 'https://tasty-treats-backend.p.goit.global/api/recipes';

//https://tasty-treats-backend.p.goit.global/api/recipes
//?category=Beef
//&page=1
//&limit=6
//&time=160
//&area=Irish
//&ingredient=640c2dd963a319ea671e3796

// https://tasty-treats-backend.p.goit.global/api/recipes?category=&page=1&limit=9&time=&area=&ingredient=
// https://tasty-treats-backend.p.goit.global/api/recipes?title=pasta&category=&page=1&limit=9&time=&area=&ingredient=

// const url = 'https://tasty-treats-backend.p.goit.global/api/recipes?title=pasta&category=&page=1&limit=9&time=&area=&ingredient=';

//  fetch(url).then(response => {
//       if (!response.ok) {
//         throw new Error(response.status);
//       }
//       return response.json();
//     });

export class TastyApiService {
  constructor() {
    this.searchQuery = '';
    this.title = '';
    this.category = '';
    this.time = '';
    this.area = '';
    this.ingredient = '';
    this.page = 1;
    this.limit = 9;
  }

  fetchRecipes() {
    const url = `${BASE_URL}?title=${this.title}&category=${this.category}&page=${this.page}&limit=${this.limit}&time=${this.time}&area=${this.area}&ingredient=${this.ingredient}`;

    return fetch(url)
      .then(response => response.json())
      .then(data => {
        this.incrementPage();
        return data;
      });
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  // get query() {
  //   return this.searchQuery;
  // }

  // set query(newQuery) {
  //   this.searchQuery = newQuery;
  // }

  /////
  setSearchTitle(query) {
    this.title = query;
    console.log('this.title', this.title);
  }
}
