import { FechRecipe } from './fechRecipeApi';

const LOCAL_KEY = 'favorites';

export function addToFavorites() {
  const heartCheckBoxRef = document.querySelectorAll('.card-checkbox');

  heartCheckBoxRef.forEach(checkbox => {
    checkbox.addEventListener('change', onCheckboxChange);
  });

  let selectedHeart = []; // from local storage
  checkAndReadStorage();

  function onCheckboxChange(evt) {
    const checkbox = evt.target;
    const checkboxId = checkbox.id;
    const checkboxCategory = checkbox.dataset.category;

    if (checkbox.checked) {
      selectedHeart.push({ id: checkboxId, category: checkboxCategory });
    } else {
      index = selectedHeart.findIndex(cardHeart => cardHeart.id == checkboxId);
      selectedHeart.splice(index, 1);
    }
    const heartCheckBoxElLocalStorage = JSON.stringify(selectedHeart);
    localStorage.setItem('favorites', heartCheckBoxElLocalStorage);
  }

  function checkAndReadStorage() {
    const storedData = localStorage.getItem('favorites');
    if (storedData) {
      selectedHeart = JSON.parse(storedData);
      heartCheckBoxRef.forEach(checkbox => {
        const checkboxId = checkbox.id;

        selectedHeart.forEach(favoriteId => {
          if (checkboxId === favoriteId.id) {
            checkbox.checked = true;
          }
        });
      });
    }
  }
}
