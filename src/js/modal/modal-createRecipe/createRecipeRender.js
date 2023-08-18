const openModalBtn = document.getElementById('openModalBtn');
const modal = document.getElementById('myModal');
const closeBtn = document.querySelector('.close');
const ingredientsContainer = document.getElementById('ingredients');
const addIngredientBtn = document.querySelector('.add-ingredient');

openModalBtn.addEventListener('click', () => {
    modal.style.display = 'block';
});

closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        modal.style.display = 'none';
    }
});

modal.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
        recipeForm.reset();
        const additionalIngredients = document.querySelectorAll('.ingredient');
        for (let i = additionalIngredients.length - 1; i > 0; i -= 1) {
            ingredientsContainer.removeChild(additionalIngredients[i]);
        }
    }
});

addIngredientBtn.addEventListener('click', () => {
    const newIngredientDiv = document.createElement('div');
    newIngredientDiv.classList.add('ingredient');

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

