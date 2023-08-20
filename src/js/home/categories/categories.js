// import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { CategoriesAPI } from "./categoriesApi";
import { createCategoriesButton } from "./categoriesRender";
// import { TastyApiService } from '../recipe-cards';
// import { createMarkup } from './recipe-cardsRender';

const categoriesApiInstance = new CategoriesAPI;

const containerAllCategoriesEl = document.querySelector('.container-all-categories');
const allCategoriesButton = containerAllCategoriesEl.firstElementChild;
const categoryButtons = containerAllCategoriesEl.lastElementChild;

// const TastyApiServiceInstance = new TastyApiService(); // створення екзепляру для запиту даних 

categoriesApiInstance.getAllCategories().then((data) => {
    const markup = createCategoriesButton(data);
    categoryButtons.innerHTML = markup;
});

allCategoriesButton.addEventListener('click', handleGetAllRecipes);
categoryButtons.addEventListener('click', handleGetRecipesCategory);

let activeCategoryButton = null; // Зберігатиме посилання на активну кнопку

function handleGetRecipesCategory(event) {

    if (event.target.nodeName !== 'BUTTON') return;

    const clickedButton = event.target;

    if (activeCategoryButton) {
        activeCategoryButton.classList.remove('active'); // Видаляємо клас з попередньої активної кнопки
    }

    clickedButton.classList.add('active'); // Додаємо клас до обраної кнопки
    activeCategoryButton = clickedButton; // Оновлюємо активну кнопку

    const nameCategory = event.target.textContent.trim();
    categoriesApiInstance.categoryName = nameCategory;
    categoriesApiInstance.getRecipesCategory();

}

function handleGetAllRecipes(event) {
    categoriesApiInstance.getAllRecipes();
    const clickedButton = event.target;

    if (activeCategoryButton) {
        activeCategoryButton.classList.remove('active'); // Видаляємо клас з попередньої активної кнопки
    }

    clickedButton.classList.add('active'); // Додаємо клас до обраної кнопки
    activeCategoryButton = clickedButton; // Оновлюємо активну кнопку
}


/**
 * const categoriesApiInstance = new CategoriesAPI;

const containerAllCategoriesEl = document.querySelector('.container-all-categories');
const allCategoriesButton = containerAllCategoriesEl.firstElementChild;
const categoryButtons = containerAllCategoriesEl.lastElementChild;


categoriesApiInstance.getAllCategories().then((data) => {
    const markup = createCategoriesButton(data);
    categoryButtons.innerHTML = markup;
});

allCategoriesButton.addEventListener('click', handleGetAllRecipes);
categoryButtons.addEventListener('click', handleGetRecipesCategory);

let activeCategoryButton = null; // Зберігатиме посилання на активну кнопку

function handleGetRecipesCategory(event) {

    if (event.target.nodeName !== 'BUTTON') return;

    const clickedButton = event.target;

    if (activeCategoryButton) {
        activeCategoryButton.classList.remove('active'); // Видаляємо клас з попередньої активної кнопки
    }

    clickedButton.classList.add('active'); // Додаємо клас до обраної кнопки
    activeCategoryButton = clickedButton; // Оновлюємо активну кнопку

    const nameCategory = event.target.textContent.trim();
    categoriesApiInstance.categoryName = nameCategory;
    categoriesApiInstance.getRecipesCategory();

}

function handleGetAllRecipes(event) {
    categoriesApiInstance.getAllRecipes();
    const clickedButton = event.target;

    if (activeCategoryButton) {
        activeCategoryButton.classList.remove('active'); // Видаляємо клас з попередньої активної кнопки
    }

    clickedButton.classList.add('active'); // Додаємо клас до обраної кнопки
    activeCategoryButton = clickedButton; // Оновлюємо активну кнопку
}


 */