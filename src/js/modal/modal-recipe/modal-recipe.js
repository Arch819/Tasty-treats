import fetchRecipe from './modal-recipeApi';
import renderRecipe from './modal-recipeRender';

let favorites = [];

function hasArrElement(arr, id) {
  const resolt = arr.filter(item => item.id === id);
  return resolt.length;
}

function addToFavorite(event) {
  event.target.textContent = 'Add to favorite';
  const id = event.target.dataset.id;

  const obj = {
    id: event.target.dataset.id,
    category: event.target.dataset.category,
  };

  const savedFavirites = JSON.parse(localStorage.getItem('favorites'));
  if (savedFavirites && hasArrElement(savedFavirites, id)) {
    const arr = savedFavirites.filter(item => item.id !== id);
    localStorage.setItem('favorites', JSON.stringify(arr));
    favorites = [];
    return;
  }
  if (savedFavirites) {
    favorites = [...savedFavirites];
  }

  favorites.push(obj);
  localStorage.setItem('favorites', JSON.stringify(favorites));
  event.target.textContent = 'Remove from favorites';
}

// refs.cardsEl.addEventListener('click', openModalRecipe);

const bodyEl = document.querySelector('body');
const modalWindow = document.querySelector('.modal');
const modalEl = document.querySelector('.modal-content');
const backdropEl = document.querySelector('.js-backdrop');
const cardsEl = document.querySelector('.search-recipes');
const favEl = document.querySelector('body');
if (cardsEl) {
  cardsEl.addEventListener('click', openModalRecipe);
}
favEl.addEventListener('click', openModalRecipe);

function openModalRecipe(e) {
  if (e.target.classList.contains('js-card-button')) {
    toggleDarkTheme();
    let id = e.target.dataset.id;
    fetchRecipe(id)
      .then(obj => {
        modalEl.innerHTML = renderRecipe(obj);
        const closeBtn = document.querySelector('.close-modal');
        backdropEl.classList.remove('is-hidden');
        document.body.classList.add('no-scroll');
        closeBtn.addEventListener('click', closeModal);
        backdropEl.addEventListener('click', closeOnEscape);
        document.addEventListener('keydown', closeOnBackdrop);
        const favoriteBtn = document.querySelector('.js-favorite');
        const savedFavirites = JSON.parse(localStorage.getItem('favorites'));

        const coverVideoEl = document.querySelector('.cover-video');
        const playBtn = document.querySelector('.playBtn');
        playBtn.addEventListener('click', hideCoverVideo);

        function hideCoverVideo() {
          setTimeout(() => {
            coverVideoEl.classList.add('is-hidden');
          }, 300);
          document
            .getElementById('v1')
            .contentWindow.postMessage(
              '{"event":"command","func":"playVideo","args":""}',
              '*'
            );
        }

        if (
          JSON.parse(
            localStorage.getItem('favorites') &&
              hasArrElement(savedFavirites, id)
          )
        ) {
          favoriteBtn.textContent = 'Remove from favorites';
        }
        favoriteBtn.addEventListener('click', addToFavorite);
      })
      .catch(error => {
        modalEl.innerHTML = `<p>${error}</p>`;
        const closeBtn = document.querySelector('.close-modal');
        backdropEl.classList.remove('is-hidden');
        document.body.classList.add('no-scroll');
        closeBtn.addEventListener('click', closeError);
        backdropEl.addEventListener('click', closeOnEscapeError);
        document.addEventListener('keydown', closeOnBackdropError);
      });
  }
}

function closeModal() {
  document.body.classList.remove('no-scroll');
  backdropEl.classList.add('is-hidden');
  document.removeEventListener('keydown', closeOnBackdrop);
  backdropEl.removeEventListener('click', closeOnEscape);
  document
    .getElementById('v1')
    .contentWindow.postMessage(
      '{"event":"command","func":"stopVideo","args":""}',
      '*'
    );
}

function closeOnEscape(e) {
  if (e.target !== e.currentTarget) {
    return;
  }
  closeModal();
}

function closeOnBackdrop(e) {
  if (e.code === 'Escape') {
    closeModal();
  }
}

function closeError() {
  document.body.classList.remove('no-scroll');
  backdropEl.classList.add('is-hidden');
  document.removeEventListener('keydown', closeOnBackdropError);
  backdropEl.removeEventListener('click', closeOnEscapeError);
}

function closeOnBackdropError(e) {
  if (e.code === 'Escape') {
    closeError();
  }
}

function closeOnEscapeError(e) {
  if (e.target !== e.currentTarget) {
    return;
  }
  closeError();
}

function toggleDarkTheme() {
  if (bodyEl.classList.contains('dark')) {
    modalWindow.classList.add('dark-theme');
  } else {
    modalWindow.classList.remove('dark-theme');
  }
}
