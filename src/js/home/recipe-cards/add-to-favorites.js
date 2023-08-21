import { FechRecipe } from './fechRecipeApi';

export function addToFavorites() {
  const heartCheckBoxRef = document.querySelectorAll('.card-checkbox');
  //console.log('heartCheckBoxRef ', heartCheckBoxRef);

  heartCheckBoxRef.forEach(checkbox => {
    checkbox.addEventListener('change', onCheckboxChange);
  });

  let selectedHeart = [];
  checkAndReadStorage();

  // Для запроса карточки по ID
  // const fechRecipe = new FechRecipe();
  // console.log(fechRecipe);

  function onCheckboxChange(evt) {
    const checkbox = evt.target;
    // console.dir(evt.target);
    // console.log(evt.target.id);

    const checkboxId = checkbox.id;
    // Запрос карточки рецепта по ID

    //

    // Idcard-to-or-from-Arr
    //console.log('arr-begin: ', selectedHeart);
    if (checkbox.checked) {
      selectedHeart.push(checkboxId);
    } else {
      const index = selectedHeart.indexOf(checkboxId);
      if (index !== -1) {
        selectedHeart.splice(index, 1);
      }
    }
    const heartCheckBoxElLocalStorage = JSON.stringify(selectedHeart);
    localStorage.setItem('favoriteRecipe', heartCheckBoxElLocalStorage);
    //console.log('arr-end: ', selectedHeart);
  }

  function checkAndReadStorage() {
    const storedData = localStorage.getItem('favoriteRecipe');
    if (storedData) {
      selectedHeart = JSON.parse(storedData);

      heartCheckBoxRef.forEach(checkbox => {
        const checkboxId = checkbox.id;
        if (selectedHeart.includes(checkboxId)) {
          checkbox.checked = true;
        }
      });
    }
  }
}
