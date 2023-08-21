import fetchRecipe from './modal-recipeApi';
import renderRecipe from './modal-recipeRender';

let favorites = [];

function addToFavorite(e) {
  e.target.textContent = 'Add to favorite';
  const id = e.target.dataset.id;
  const savedFavirites = JSON.parse(localStorage.getItem('favorite'));
  if (savedFavirites && savedFavirites.includes(id)) {
    const arr = savedFavirites.filter(item => item !== id);
    localStorage.setItem('favorite', JSON.stringify(arr));
    favorites = [];
    return;
  }
  if (savedFavirites) {
    favorites = [...savedFavirites];
  }

  favorites.push(id);
  localStorage.setItem('favorite', JSON.stringify(favorites));
  e.target.textContent = 'Remove from favorites';
}

const bodyEl = document.querySelector('body');
const modalWindow = document.querySelector('.modal');
const modalEl = document.querySelector('.modal-content');
const backdropEl = document.querySelector('.js-backdrop');
const cardsEl = document.querySelector('.js-gallery');
cardsEl.addEventListener('click', openModalRecipe);

function openModalRecipe(e) {
  if (e.target.classList.value === 'card-button') {
    toggleDarkTheme();
    let id = e.target.dataset.id;
    fetchRecipe(id).then(obj => {
      modalEl.innerHTML = renderRecipe(obj);
      const closeBtn = document.querySelector('.close-modal');
      backdropEl.classList.remove('is-hidden');
      document.body.classList.add('no-scroll');
      closeBtn.addEventListener('click', closeModal);
      backdropEl.addEventListener('click', closeModal);
      document.addEventListener('keydown', closeOnBackdrop);
      const favoriteBtn = document.querySelector('.js-favorite');

      if (
        JSON.parse(
          localStorage.getItem('favorite') &&
            JSON.parse(localStorage.getItem('favorite')).includes(id)
        )
      ) {
        favoriteBtn.textContent = 'Remove from favorites';
      }
      favoriteBtn.addEventListener('click', addToFavorite);
    });
  }
}

function closeModal() {
  document.body.classList.remove('no-scroll');
  backdropEl.classList.add('is-hidden');
  document.removeEventListener('keydown', closeOnBackdrop);
  backdropEl.removeEventListener('click', closeModal);
  document
    .getElementById('v1')
    .contentWindow.postMessage(
      '{"event":"command","func":"stopVideo","args":""}',
      '*'
    );
}

function closeOnBackdrop(e) {
  if (e.code === 'Escape') {
    closeModal();
  }
}

function toggleDarkTheme() {
  if (bodyEl.classList.contains('dark')) {
    modalWindow.classList.add('black');
  } else {
    modalWindow.classList.remove('black');
  }
}
