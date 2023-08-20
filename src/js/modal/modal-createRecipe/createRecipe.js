const openModalBtn = document.getElementById('openModalBtnCreate');
const modal = document.getElementById('myModal');
const closeBtn = document.querySelector('.close-create');
const recipeForm = document.getElementById('recipeForm');
const ingredientsContainer = document.getElementById('ingredients-create');
const addIngredientBtn = document.querySelector('.add-ingredient');

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
  disableBodyScroll(); // Заборонити прокручування тіла
});

closeBtn.addEventListener('click', () => {
  hideModal();
  enableBodyScroll(); // Дозволити прокручування тіла
});

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    hideModal();
  }
});


modal.addEventListener('click', (event) => {
  if (event.target === modal) {
    hideModal();
    clearForm();
  }
});

addIngredientBtn.addEventListener('click', () => {
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
  removeIngredientBtn.textContent = '-';
  removeIngredientBtn.addEventListener('click', () => {
    ingredientsContainer.removeChild(newIngredientDiv);
  });
  
  newIngredientDiv.appendChild(ingredientNameInput);
  newIngredientDiv.appendChild(ingredientAmountInput);
  newIngredientDiv.appendChild(removeIngredientBtn);
  
  ingredientsContainer.appendChild(newIngredientDiv);
});

recipeForm.addEventListener('submit', (event) => {
  event.preventDefault();
  // Додайте код для обробки введених даних з форми тут
  // Наприклад, можна отримати дані з полів форми так:
  const recipeName = document.getElementById('recipeName').value;
  const ingredientNames = document.querySelectorAll('.ingredient-name');
  const ingredientAmounts = document.querySelectorAll('.ingredient-amount');
  const instructions = document.getElementById('instructions').value;
  
  // Тут можна виконати подальші дії, наприклад, відправити дані на сервер або зберегти їх локально
  
  // Після обробки можна закрити модальне вікно
  modal.style.display = 'none';
});


// ... Код, який був наданий раніше ...

recipeForm.addEventListener('submit', (event) => {
  event.preventDefault();
  
  const recipeName = document.getElementById('recipeName').value;
  const ingredientNames = document.querySelectorAll('.ingredient-name');
  const ingredientAmounts = document.querySelectorAll('.ingredient-amount');
  const instructions = document.getElementById('instructions').value;
  
  const ingredients = [];
  for (let i = 0; i < ingredientNames.length; i++) {
    const ingredientName = ingredientNames[i].value;
    const ingredientAmount = ingredientAmounts[i].value;
    ingredients.push({ name: ingredientName, amount: ingredientAmount });
  }
  
  const recipe = {
    name: recipeName,
    ingredients: ingredients,
    instructions: instructions
  };
  
  saveRecipe(recipe);

  hideModal();
  clearForm();
});

function saveRecipe(recipe) {
  const recipes = JSON.parse(localStorage.getItem('recipes')) || [];
  recipes.push(recipe);
  localStorage.setItem('recipes', JSON.stringify(recipes));
}





