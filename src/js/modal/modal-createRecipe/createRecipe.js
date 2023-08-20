import { modal, recipeForm, ingredientsContainer } from './createRecipeRender.js';

const recipeForm = document.getElementById('recipeForm');

recipeForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const recipeName = document.getElementById('recipeName').value;
    const ingredientNames = document.querySelectorAll('.ingredient-name');
    const ingredientAmounts = document.querySelectorAll('.ingredient-amount');
    const instructions = document.getElementById('instructions').value;

    const ingredients = [];
    for (let i = 0; i < ingredientNames.length; i += 1) {
        const ingredientName = ingredientNames[i].value;
        const ingredientAmount = ingredientAmounts[i].value;
        ingredients.push({ name: ingredientName, amount: ingredientAmount });
    }

    const recipe = {
        name: recipeName,
        ingredients: ingredients,
        instructions: instructions
    };


    const recipes = JSON.parse(localStorage.getItem('recipes')) || [];
    recipes.push(recipe);
    localStorage.setItem('recipes', JSON.stringify(recipes));


    recipeForm.reset();

    const additionalIngredients = document.querySelectorAll('.ingredient');
    for (let i = additionalIngredients.length - 1; i > 0; i -= 1) {
        ingredientsContainer.removeChild(additionalIngredients[i]);
    }


    modal.style.display = 'none';
});
