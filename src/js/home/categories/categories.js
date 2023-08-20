// import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { CategoriesAPI } from "./categoriesApi";
import { createCategoriesButton } from "./categoriesRender";

const categoriesApiInstance = new CategoriesAPI;

const containerAllCategoriesEl = document.querySelector('.container-all-categories');
const allCategoriesButton = containerAllCategoriesEl.firstElementChild;
const listCategoryButtons = containerAllCategoriesEl.lastElementChild;

categoriesApiInstance.getAllCategories().then((data) => {
    const markup = createCategoriesButton(data);
    listCategoryButtons.innerHTML = markup;
    console.log("listCategoryButtons", listCategoryButtons);
})

allCategoriesButton.addEventListener('click', handleGetAllRecipes);
listCategoryButtons.addEventListener('click', handleGetRecipesCategory);

function handleGetRecipesCategory(event) {

    if (event.target.nodeName !== 'BUTTON') return;

    const nameCategory = event.target.textContent;
    categoriesApiInstance.categoryName = nameCategory;
    categoriesApiInstance.getRecipesCategory();
    event.target.classList.toggle("item-category-active-btn");
    
}

function handleGetAllRecipes() {
    categoriesApiInstance.getAllRecipes();
}