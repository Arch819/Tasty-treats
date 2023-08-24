const openModalBtn = document.getElementById('openModalBtnCreate');
const modal = document.getElementById('myModal');
const closeBtn = document.querySelector('.close-create');
const recipeForm = document.getElementById('recipeForm');
const ingredientsContainer = document.getElementById('ingredients-create');
const addIngredientIcon = document.querySelector('.add-ingredient-icon');
const recipeImageInput = document.getElementById('recipeImage');
const recipeImagePreview = document.getElementById('recipeImagePreview'); 

recipeImageInput.addEventListener('change', event => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function() {

      recipeImagePreview.src = reader.result;
    };
    reader.readAsDataURL(file);
  }
});


function disableBodyScroll() {
  document.body.style.overflow = 'hidden';
}

function enableBodyScroll() {
  document.body.style.overflow = '';
}

function showModal() {
  modal.style.display = 'block';
}

function hideModal() {
  modal.style.display = 'none';
}

function clearForm() {
  recipeForm.reset();
  const additionalIngredients = document.querySelectorAll('.ingredient-create');
  for (let i = additionalIngredients.length - 1; i > 0; i--) {
    ingredientsContainer.removeChild(additionalIngredients[i]);
  }
}

openModalBtn.addEventListener('click', () => {
  showModal();
  disableBodyScroll(); // Заборонити прокручування
});

closeBtn.addEventListener('click', () => {
  hideModal();
  enableBodyScroll(); // Дозволити прокручування
});

window.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    hideModal();
    enableBodyScroll();
  }
});

modal.addEventListener('click', event => {
  if (event.target === modal) {
    hideModal();
    clearForm();
    enableBodyScroll();
  }
});

addIngredientIcon.addEventListener('click', () => {
  const newIngredientDiv = document.createElement('div');
  newIngredientDiv.classList.add('ingredient-create');

  const ingredientNameInput = document.createElement('input');
  ingredientNameInput.type = 'text';
  ingredientNameInput.classList.add('ingredient-name');
  ingredientNameInput.name = 'ingredient[]';
  ingredientNameInput.required = true;

  const ingredientAmountInput = document.createElement('input');
  ingredientAmountInput.type = 'text';
  ingredientAmountInput.classList.add('ingredient-amount');
  ingredientAmountInput.name = 'amount[]';
    ingredientAmountInput.placeholder = 'Quantity (g)';
  ingredientAmountInput.required = true;

  const removeIngredientBtn = document.createElement('button');
  removeIngredientBtn.type = 'button';
    removeIngredientBtn.classList.add('remove-ingredient-create');

const svgIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
svgIcon.setAttribute('class', 'remove-ingredient-svg');
svgIcon.setAttribute('width', '20');
svgIcon.setAttribute('height', '20');
svgIcon.setAttribute('viewBox', '0 0 28 32');

const svgPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
svgPath.setAttribute('d', 'M27 16c0 1.106-0.894 2-2 2h-22c-1.106 0-2-0.894-2-2s0.894-2 2-2h22c1.106 0 2 0.894 2 2z');

svgIcon.appendChild(svgPath);
removeIngredientBtn.appendChild(svgIcon);
  removeIngredientBtn.addEventListener('click', () => {
    ingredientsContainer.removeChild(newIngredientDiv);
  });

  newIngredientDiv.appendChild(ingredientNameInput);
  newIngredientDiv.appendChild(ingredientAmountInput);
  newIngredientDiv.appendChild(removeIngredientBtn);

  ingredientsContainer.appendChild(newIngredientDiv);
});

recipeForm.addEventListener('submit', event => {
  event.preventDefault();
  const recipeName = document.getElementById('recipeName').value.trim();
  const ingredientNames = document.querySelectorAll('.ingredient-name');
  const ingredientAmounts = document.querySelectorAll('.ingredient-amount');
  const instructions = document.getElementById('instructions').value.trim();
  const recipeImage = recipeImageInput.files[0];

  modal.style.display = 'none';
});

recipeForm.addEventListener('submit', event => {
  event.preventDefault();

  const recipeName = document.getElementById('recipeName').value.trim();
  const ingredientNames = document.querySelectorAll('.ingredient-name');
  const ingredientAmounts = document.querySelectorAll('.ingredient-amount');
  const instructions = document.getElementById('instructions').value.trim();


  const ingredients = [];
  for (let i = 0; i < ingredientNames.length; i += 1) {
    const ingredientName = ingredientNames[i].value.trim();
    const ingredientAmount = ingredientAmounts[i].value.trim();
    ingredients.push({ name: ingredientName, amount: ingredientAmount });
  }

  const recipe = {
    name: recipeName,
    ingredients: ingredients,
    instructions: instructions,
    image: recipeImage,
  };

  saveRecipe(recipe);

  hideModal();
  clearForm();
  enableBodyScroll();
});

function saveRecipe(recipe) {
  const recipes = JSON.parse(localStorage.getItem('recipes')) || [];
  recipes.push(recipe);
  localStorage.setItem('recipes', JSON.stringify(recipes));
}
