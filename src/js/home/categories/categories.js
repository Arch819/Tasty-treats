// import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { CategoriesAPI } from "./categoriesApi";
import { createCategoriesButton } from "./categoriesRender";
import { TastyApiService } from '../recipe-cards/recipe-cardsApi';
import { createMarkup } from '../recipe-cards/recipe-cardsRender';

const categoriesApiInstance = new CategoriesAPI;

const containerAllCategoriesEl = document.querySelector('.container-all-categories');
const allCategoriesButton = containerAllCategoriesEl.firstElementChild;
const categoryButtons = containerAllCategoriesEl.lastElementChild;

const galleryRecipesRef = document.querySelector('.js-gallery'); // відображення картинок

// фільтр пошуку
const searchQueryTitleRef = document.querySelector('.input-search');
const seachQueryTimeRef = document.querySelector('.time-selector');
const seachQueryAreasRef = document.querySelector('.area-selector');
const selectQueryIngredientsRef = document.querySelector(
  '.ingredients-selector'
);

const tastyApiService = new TastyApiService(); // створення екзепляру для запиту даних за класом Ігоря
tastyApiService.setLimitValue();
tastyApiService.resetCategory();
tastyApiService.resetPage();

categoriesApiInstance.getAllCategories().then((data) => {
    const markup = createCategoriesButton(data);
    categoryButtons.innerHTML = markup;
});

// tastyApiService.fetchRecipes()   // запит за всіма рецептами
//  .then((data) => {
//     console.log(data);
//      const markup = createMarkup(data.results);
//      galleryRecipesRef.innerHTML = markup;
     
// });

allCategoriesButton.addEventListener('click', handleGetAllRecipes);
categoryButtons.addEventListener('click', handleGetRecipesCategory);

let activeCategoryButton = null; // Зберігатиме посилання на активну кнопку

function handleGetRecipesCategory(event) {

    if (event.target.nodeName !== 'BUTTON') return;

    const clickedButton = event.target;

    tastyApiService.resetPage();
    
    if (activeCategoryButton) {
        activeCategoryButton.classList.remove('active');// Видаляємо клас з попередньої активної кнопки 
    }

    clickedButton.classList.add('active'); // Додаємо клас до обраної кнопки
    activeCategoryButton = clickedButton; // Оновлюємо активну кнопку

    const nameCategory = event.target.textContent.trim();

    tastyApiService.category = nameCategory;
    console.log(nameCategory);
    tastyApiService.fetchRecipes()
        .then((data) => {
            console.log(data);
            const markup = createMarkup(data.results);
            galleryRecipesRef.innerHTML = markup;
            
        })
        // .catch(() => {
        //     Notify.failure(errorWarningText.textContent);
        // });

}

function handleGetAllRecipes(event) {

    const clickedButton = event.target;

    tastyApiService.resetPage();
    tastyApiService.category = '';

    if (activeCategoryButton) {
        activeCategoryButton.classList.remove('active'); // Видаляємо клас з попередньої активної кнопки
    }

    clickedButton.classList.add('active');// Додаємо клас до обраної кнопки
    activeCategoryButton = clickedButton; // Оновлюємо активну кнопку

    tastyApiService.fetchRecipes()
        .then((data) => {
            console.log(data);
            const markup = createMarkup(data.results);
            galleryRecipesRef.innerHTML = markup;
        })
        // .catch((err) => {
        //     Notify.failure(err);
        // });
}
