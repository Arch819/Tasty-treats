export class CategoriesAPI {

    //https://tasty-treats-backend.p.goit.global/api/recipes?category=Beef&page=1&limit=6&time=160&area=Irish&ingredients=640c2dd963a319ea671e3796
    #BASE_URL = 'https://tasty-treats-backend.p.goit.global/api';
    #categoryName = '';

    async getAllCategories() {
        const url = `${this.#BASE_URL}/categories`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(response.status);
            }
            const categories = await response.json();
            return categories;
        } catch (error) {
            console.error("Помилка:", error);
            return null;
        }
    }

    async getRecipesCategory() {
        const url = `${this.#BASE_URL}/recipes?category=${this.#categoryName}&page=1`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(response.status);
            }
            const data = await response.json();
            console.log("Дані відповіді:", data); // Вивести дані відповіді для налагодження
            return data;
        } catch (error) {
            console.error("Помилка:", error);
            return null;
        }
    }
    
    async getAllRecipes() {
        const url = `${this.#BASE_URL}/recipes?`;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(response.status);
            }
            const recipes = await response.json();
            console.log("Отримані рецепти:", recipes); // Вивід рецептів для налагодження
            return recipes;
        } catch (error) {
            console.error("Помилка:", error);
            return null;
    }
}

}
//// ====================

/**
 * async getAllCategories() {
        const url = `${this.#BASE_URL}/categories`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(response.status);
            }
            const categories = await response.json();
            return categories;
        } catch (error) {
            console.error("Помилка:", error);
            return null;
        }
    }

    async getRecipesCategory() {
        const url = `${this.#BASE_URL}/recipes?category=${this.#categoryName}&page=1`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(response.status);
            }
            const data = await response.json();
            console.log("Дані відповіді:", data); // Вивести дані відповіді для налагодження
            return data;
        } catch (error) {
            console.error("Помилка:", error);
            return null;
        }
    }
    
    async getAllRecipes() {
        const url = `${this.#BASE_URL}/recipes?`;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(response.status);
            }
            const recipes = await response.json();
            console.log("Отримані рецепти:", recipes); // Вивід рецептів для налагодження
            return recipes;
        } catch (error) {
            console.error("Помилка:", error);
            return null;
    }
}

 */













///////  ===================        ====================         ===================          =============

// getAllCategories() {
//         const url = `${this.#BASE_URL}/categories`
//         return fetch(url).
//             then(response => {
//                 if (!response.ok) {
//                     throw new Error(response.status);
//                 }
//                 return response.json();
//             })
//     }

  // getRecipesCategory() {
        
    //     const url = `${this.#BASE_URL}/recipes?category=${this.#categoryName}&perPage=9`;
    //     return fetch(url).then(response => {
    //         if (!response.ok) {
    //                 throw new Error(response.status);
    //             }
    //             return response.json();
    //     });
    // }


    // getAllRecipes() {
    //     const url = `${this.#BASE_URL}/recipes?perPage=9`;
    //     return fetch(url).then(response => {
    //         if (!response.ok) {
    //             throw new Error(response.status);
    //         }
    //         return response.json();
    //     });
    // }