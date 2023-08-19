// import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { CategoriesAPI } from "./categoriesApi";
import { createCategoriesButton } from "./categoriesRender";

const categoriesApiInstance = new CategoriesAPI;

const containerAllCategoriesEl = document.querySelector('.container-all-categories');
const allCategoriesButton = containerAllCategoriesEl.firstElementChild;
const listCategoryButtons = containerAllCategoriesEl.lastElementChild;

// const allCategoriesBtn = document.createElement('button');
// allCategoriesBtn.textContent = 'All categories';
// selectCategoriesEl.appendChild(allCategoriesBtn);

categoriesApiInstance.getAllCategories().then((data) => {
    const markup = createCategoriesButton(data);
    listCategoryButtons.innerHTML = markup;
    console.log("data from back:", data);
    console.log("markup", markup)
    console.log("listCategoryButtons", listCategoryButtons);
})
// обробка помилка, якщо не буде знайдено на беку категорій
//     .catch(() => {
//     Notify.failure('Enter something');
// }) 

allCategoriesButton.addEventListener('click', handleGetAllRecipes);
listCategoryButtons.addEventListener('click', handleGetRecipesCategory);

function handleGetRecipesCategory(event) {

    if (event.target.nodeName !== 'BUTTON') return;

    const nameCategory = event.target.textContent;
    console.log(nameCategory);
    categoriesApiInstance.categoryName = nameCategory;

    // categoriesApiInstance.getRecipesCategory();
    const recipes = categoriesApiInstance.getRecipesCategory();
    //     .then(({ results }) => {
    //     console.log(results);
    //  });
    
    recipes.then(({ results }) => {
        console.log(results);
    })
}

function handleGetAllRecipes() {
    categoriesApiInstance.getAllRecipes()
        .then(data => {
        console.log(data);
    })
    //     .then(({ results }) => {
    //         console.log(results);
    // })
}