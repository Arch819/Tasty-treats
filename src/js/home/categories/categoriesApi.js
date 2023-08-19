export class CategoriesAPI {

    #BASE_URL = 'https://tasty-treats-backend.p.goit.global/api';
    #categoryName = '';

    // searchParams = new URLSearchParams({
    //     perPage: 9,
    //     category: this.#categoryName,
    // });

    getAllCategories() {
        const url = `${this.#BASE_URL}/categories`
        return fetch(url).
            then(response => {
                if (!response.ok) {
                    throw new Error(response.status);
                }
                return response.json();
            })
    }

    getRecipesCategory(page) {
        // const url = `${this.#BASE_URL}/recipes?${this.searchParams}`;
        const url = `${this.#BASE_URL}/recipes?category=${this.#categoryName}&perPage=9`;
        return fetch(url).then(response => {
            if (!response.ok) {
                    throw new Error(response.status);
                }
                return response.json();
        });
    }

    getAllRecipes() {
        const url = `${this.#BASE_URL}/recipes?perPage=9`;
        return fetch(url).then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
        });
    }

}
//// ====================
