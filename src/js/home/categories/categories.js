// import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';
import { CategoriesAPI } from "./categoriesApi";
import { createCategoriesButton } from "./categoriesRender";
import { TastyApiService } from '../recipe-cards/recipe-cardsApi';
import { createMarkup } from '../recipe-cards/recipe-cardsRender';

const categoriesApiInstance = new CategoriesAPI;

const containerAllCategoriesEl = document.querySelector('.container-all-categories');
const allCategoriesButton = containerAllCategoriesEl.firstElementChild;
const categoryButtons = containerAllCategoriesEl.lastElementChild;

const galleryRecipesRef = document.querySelector('.js-gallery'); // відображення картинок
const variableToReset = ''; // змінна для скидання фільтра

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


allCategoriesButton.addEventListener('click', handleGetAllRecipes);
categoryButtons.addEventListener('click', handleGetRecipesCategory);

// ставлю слухач, щоб фільтрувати категорію при пошуку
searchQueryTitleRef.addEventListener('input', onResetCategory); 

let activeCategoryButton = null; // Зберігатиме посилання на активну кнопку

function handleGetRecipesCategory(event) {

    if (event.target.nodeName !== 'BUTTON') return;

    const clickedButton = event.target;

    tastyApiService.resetPage();
    resetFilter();

    if (activeCategoryButton) {
        activeCategoryButton.classList.remove('active');// Видаляємо клас з попередньої активної кнопки 
    }

    clickedButton.classList.add('active'); // Додаємо клас до обраної кнопки
    activeCategoryButton = clickedButton; // Оновлюємо активну кнопку

    const nameCategory = event.target.textContent.trim();

    tastyApiService.category = nameCategory;
    tastyApiService.fetchRecipes()
        .then((data) => {
            console.log(data);
            const markup = createMarkup(data.results);
            galleryRecipesRef.innerHTML = markup;
            
        })

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
}

// функція щоб очищати фільтр при натисканні на нову категорію
function resetFilter() {
  searchQueryTitleRef.value = '';
  seachQueryTimeRef.value = '';
  seachQueryAreasRef.value = '';
  selectQueryIngredientsRef.value = '';
}


// фунція обробник при пошуку в фільтрації

function onResetCategory(event) {

    const inputQuery = event.target.value.trim();
    if (inputQuery === '') return;
    if (activeCategoryButton) {
        activeCategoryButton.classList.remove('active');// Видаляємо клас з попередньої активної кнопки 
    }
}


// tastyApiService.setSearchTime(variableToReset);
// tastyApiService.setSearchArea(variableToReset);
// tastyApiService.setSearchIngredient(variableToReset);
// tastyApiService.setCurrentPage(1);


// setSearchTime(query) {
//     this.time = query;
//     //console.log('this.time', this.time);
//   }

//   setSearchArea(query) {
//     this.area = query;
//     //console.log('this.area', this.area);
//   }

//   setSearchIngredient(query) {
//     this.ingredient = query;
//     //console.log('this.ingredient', this.ingredient);
//   }

//   setCurrentPage(page) {
//     this.page = page;
//     //console.log('api-setCurrentPage', this.page);
//   }

//   decrementPage() {
//     this.page -= 1;
//   }