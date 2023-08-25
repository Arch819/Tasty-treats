// import { Notify } from 'notiflix/build/notiflix-notify-aio';
// import debounce from 'lodash.debounce';
import { CategoriesAPI } from "./categoriesApi";
import { createCategoriesButton } from "./categoriesRender";
import { TastyApiService } from '../recipe-cards/recipe-cardsApi';
import { createMarkup } from '../recipe-cards/recipe-cardsRender';
import { refs } from '../recipe-cards/pagination-ref';
import { resetFilter, resetNumBtn } from '../recipe-cards/recipe-cards';

const categoriesApiInstance = new CategoriesAPI;

const containerAllCategoriesEl = document.querySelector('.container-all-categories');
const allCategoriesButton = containerAllCategoriesEl.firstElementChild;
const categoryButtons = containerAllCategoriesEl.lastElementChild;

// const galleryRecipesRef = document.querySelector('.js-gallery');
const galleryRecipesRef = refs.galleryRecipesRef// відображення картинок
// const variableToReset = ''; // змінна для скидання фільтра
let activeCategoryButton = null; // Зберігатиме посилання на активну кнопку

// фільтр пошуку
// const searchQueryTitleRef = document.querySelector('.input-search');
// const seachQueryTimeRef = document.querySelector('.time-selector');
// const seachQueryAreasRef = document.querySelector('.area-selector');
// const selectQueryIngredientsRef = document.querySelector('.ingredients-selector');

const searchQueryTitleRef = refs.searchQueryTitleRef;
const seachQueryTimeRef = refs.seachQueryTimeRef;
const seachQueryAreasRef = refs.seachQueryAreasRef;
const selectQueryIngredientsRef = refs.selectQueryIngredientsRef;

const tastyApiService = new TastyApiService(); // створення екзепляру для запиту даних за класом Ігоря
tastyApiService.setLimitValue();
tastyApiService.resetCategory();
tastyApiService.resetPage();

categoriesApiInstance.getAllCategories().then((data) => {
    const markup = createCategoriesButton(data);
    categoryButtons.innerHTML = markup;
    // активна кнопка по дефолту
    allCategoriesButton.classList.add('active');
    activeCategoryButton = allCategoriesButton;
});


allCategoriesButton.addEventListener('click', handleGetAllRecipes);
categoryButtons.addEventListener('click', handleGetRecipesCategory);

// ставлю слухач, щоб фільтрувати категорію при пошуку
searchQueryTitleRef.addEventListener('input', onResetCategory); 

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
            // console.log(data);
            const markup = createMarkup(data.results);
            galleryRecipesRef.innerHTML = markup;
            
        })

}

function handleGetAllRecipes(event) {

    const clickedButton = event.target;

    tastyApiService.resetPage();
    resetFilter();
    tastyApiService.category = '';

    if (activeCategoryButton) {
        activeCategoryButton.classList.remove('active'); // Видаляємо клас з попередньої активної кнопки
    }

    clickedButton.classList.add('active');// Додаємо клас до обраної кнопки
    activeCategoryButton = clickedButton; // Оновлюємо активну кнопку

    tastyApiService.fetchRecipes()
        .then((data) => {
            // console.log(data);
            const markup = createMarkup(data.results);
            galleryRecipesRef.innerHTML = markup;
        })
}

// функція щоб очищати фільтр при натисканні на нову категорію
// function resetFilter() {
//   searchQueryTitleRef.value = '';
//   seachQueryTimeRef.value = '';
//   seachQueryAreasRef.value = '';
//   selectQueryIngredientsRef.value = '';
// }


// фунція обробник при пошуку в фільтрації
function onResetCategory(event) {

    const inputQuery = event.target.value.trim();
    if (inputQuery === '') return;
    if (activeCategoryButton) {
        activeCategoryButton.classList.remove('active');// Видаляємо клас з попередньої активної кнопки 
    }
}

///// 





////////////////////////////////////////////////////////////////
 ///////////////////                                     Pagination

 
//  function backToFirst() {
//   if (testyApiService.currentPage === 1) return;
//   testyApiService.resetPage();
//   refs.pageOneBtn.textContent = 1;
//   refs.pageTwoBtn.textContent = 2;
//   refs.pageThreeBtn.textContent = 3;
//   //galleryRecipesRef.innerHTML = '';
//   fetchRecipesQuery();
// }

// function loadLastPage() {
//   if (testyApiService.currentPage === totalPages) return;
//   if (totalPages <= 3) return;
//   // pageNumb ->> totalPages
//   // if (window.innerWidth < 768) {
//   //   pageNumb = 48;
//   // } else if (window.innerWidth >= 768 && window.innerWidth < 1200) {
//   //   pageNumb = 36;
//   // } else {
//   //   pageNumb = 32;
//   // }

//   if (window.innerWidth < 768) {
//     //for limit = 6;
//     pageNumb = 48;
//   } else if (window.innerWidth < 1280) {
//     //for limit = 8;
//     pageNumb = 36;
//   } else {
//     //for limit = 9;
//     pageNumb = 32;
//   }
//   //if ((testyApiService.currentPage = totalPages)) return;
//   pageNumb = totalPages;
//   refs.pageThreeBtn.textContent = pageNumb;
//   refs.pageTwoBtn.textContent = pageNumb - 1;
//   refs.pageOneBtn.textContent = pageNumb - 2;
//   //galleryRecipesRef.innerHTML = '';
//   testyApiService.setCurrentPage(pageNumb);
//   fetchRecipesQuery();
// }

// function loadNextPage() {
//   //console.log('loadNextPage - page: ', testyApiService.currentPage);
//   if (testyApiService.currentPage === totalPages) return;
//   //if (totalPages - testyApiService.currentPage <= 2) return;
//   if (parseInt(refs.pageThreeBtn.textContent) === totalPages) return;
//   // if (testyApiService.currentPage === 32) {
//   //   return;
//   // }
//   if (totalPages <= 3) return;
//   refs.buttonNumered.forEach(button => {
//     button.textContent++;
//     // pageNumb=button.textContent
//   });
//   // nextPage = pageNumb + 1;
//   testyApiService.incrementPage();
//   //loadPage(nextPage);
//   //galleryRecipesRef.innerHTML = '';
//   fetchRecipesQuery();
// }

// function loadPrevPage() {
//   if (
//     testyApiService.currentPage === 1 ||
//     refs.pageOneBtn.textContent.textContent === '1'
//   )
//     return;
//   //console.log('loadPrevPage --- ','on Btn ', pageOneBtn.textContent, 'currentPage', testyApiService.currentPage);
//   if (refs.pageOneBtn.textContent != '1') {
//     //if (parseInt(pageOneBtn.textContent) > 2) {
//     refs.buttonNumered.forEach(button => {
//       button.textContent--;
//       // pageNumb=button.textContent
//     });
//   } else return;

//   //prevPage = pageNumb - 1;
//   testyApiService.decrementPage();
//   // loadPage(prevPage);
//   //galleryRecipesRef.innerHTML = '';
//   fetchRecipesQuery();
// }

// function loadfirstPage() {
//   if (totalPages <= 3 && testyApiService.currentPage === 1) return;
//   const pageNumb = parseInt(refs.pageOneBtn.textContent);
//   testyApiService.setCurrentPage(pageNumb);
//   //galleryRecipesRef.innerHTML = '';
//   fetchRecipesQuery();
// }

// function loadPageTwo() {
//   const pageNumb = parseInt(refs.pageTwoBtn.textContent);
//   testyApiService.setCurrentPage(pageNumb);
//   //galleryRecipesRef.innerHTML = '';
//   fetchRecipesQuery();
// }

// function loadPageThree() {
//   const pageNumb = parseInt(refs.pageThreeBtn.textContent);
//   testyApiService.setCurrentPage(pageNumb);
//   //galleryRecipesRef.innerHTML = '';
//   fetchRecipesQuery();
// }

// function loadDotsLeft() {
//   pageNumb = testyApiService.currentPage;
//   // console.log(
//   //   'totalPages: ',
//   //   totalPages,
//   //   'testyApiService.currentPage: ',
//   //   testyApiService.currentPage,
//   //   'pageNumb: ',
//   //   pageNumb
//   // );
//   const pageDotsLeft = totalPages - parseInt(testyApiService.currentPage);

//   if (refs.pageOneBtn.textContent === '2') {
//     refs.pageThreeBtn.textContent = parseInt(refs.pageThreeBtn.textContent) - 1;
//     refs.pageTwoBtn.textContent = parseInt(refs.pageTwoBtn.textContent) - 1;
//     refs.pageOneBtn.textContent = parseInt(refs.pageOneBtn.textContent) - 1;
//     //galleryRecipesRef.innerHTML = '';
//     testyApiService.setCurrentPage(pageNumb - 1);
//     fetchRecipesQuery();
//     return;
//   }

//   if (parseInt(refs.pageOneBtn.textContent) < 3) return;
//   refs.pageThreeBtn.textContent = parseInt(refs.pageThreeBtn.textContent) - 2;
//   refs.pageTwoBtn.textContent = parseInt(refs.pageTwoBtn.textContent) - 2;
//   refs.pageOneBtn.textContent = parseInt(refs.pageOneBtn.textContent) - 2;
//   //galleryRecipesRef.innerHTML = '';
//   testyApiService.setCurrentPage(pageNumb - 2);
//   fetchRecipesQuery();
// }

// function loadDotsRigth() {
//   pageNumb = testyApiService.currentPage;
//   // console.log(
//   //   'totalPages: ',
//   //   totalPages,
//   //   'testyApiService.currentPage: ',
//   //   testyApiService.currentPage,
//   //   'pageNumb: ',
//   //   pageNumb
//   // );
//   const pageDotsLeft = totalPages - parseInt(testyApiService.currentPage);

//   if (totalPages - parseInt(refs.pageThreeBtn.textContent) === 1) {
//     refs.pageThreeBtn.textContent = parseInt(refs.pageThreeBtn.textContent) + 1;
//     refs.pageTwoBtn.textContent = parseInt(refs.pageTwoBtn.textContent) + 1;
//     refs.pageOneBtn.textContent = parseInt(refs.pageOneBtn.textContent) + 1;
//     //galleryRecipesRef.innerHTML = '';
//     testyApiService.setCurrentPage(pageNumb + 1);
//     fetchRecipesQuery();
//     return;
//   }

//   refs.pageThreeBtn.textContent = parseInt(refs.pageThreeBtn.textContent) + 2;
//   refs.pageTwoBtn.textContent = parseInt(refs.pageTwoBtn.textContent) + 2;
//   refs.pageOneBtn.textContent = parseInt(refs.pageOneBtn.textContent) + 2;
//   //galleryRecipesRef.innerHTML = '';
//   testyApiService.setCurrentPage(pageNumb + 2);
//   fetchRecipesQuery();
// }

// function changeButtonColor() {
//   refs.buttonNumered.forEach(button => {
//     const pageNumb = parseInt(button.textContent);
//     //console.log(pageNumb);
//     //console.log('btn:', pageNumb, 'currentPage', testyApiService.currentPage);
//     if (testyApiService.currentPage === pageNumb) {
//       button.classList.add('pag-btn-on-hover');
//     } else {
//       button.classList.remove('pag-btn-on-hover');
//     }
//   });
//   //
//   //console.log('btn3: ', pageThreeBtn.textContent);
//   //if (testyApiService.currentPage > totalPages - 3) {
//   if (parseInt(refs.pageThreeBtn.textContent) === totalPages) {
//     refs.btnWithDotsRight.classList.add('btn_hidden');
//   } else {
//     refs.btnWithDotsRight.classList.remove('btn_hidden');
//   }
//   //
//   if (testyApiService.currentPage > 3) {
//     refs.btnWithDotsLeft.classList.remove('btn_hidden');
//   } else {
//     refs.btnWithDotsLeft.classList.add('btn_hidden');
//   }
//   //
//   if (totalPages <= 3) {
//     refs.btnWithDotsRight.classList.add('btn_hidden');
//     refs.btnWithDotsLeft.classList.add('btn_hidden');
//   }
//   //
//   if (totalPages <= 2) {
//     refs.pageThreeBtn.classList.add('btn_hidden');
//   }
//   //
//   if (totalPages <= 1) {
//     refs.pageTwoBtn.classList.add('btn_hidden');
//   }
// }

// function resetNumBtn() {
//   refs.pageOneBtn.textContent = 1;
//   refs.pageTwoBtn.textContent = 2;
//   refs.pageThreeBtn.textContent = 3;
//   refs.pageOneBtn.classList.remove('btn_hidden');
//   refs.pageTwoBtn.classList.remove('btn_hidden');
//   refs.pageThreeBtn.classList.remove('btn_hidden');
//   refs.btnWithDotsRight.classList.remove('btn_hidden');
// }

// export { resetFilter, resetNumBtn };
