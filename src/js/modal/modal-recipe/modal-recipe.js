import fetchRecipe from './modal-recipeApi';
import renderRecipe from './modal-recipeRender';

let favorites = [];

const refs = {
  iconClose: document.querySelector('.icon-close'),
  closeBtn: document.querySelector('.close-modal'),
  bodyEl: document.querySelector('body'),
  modalWindow: document.querySelector('.modal'),
  modalEl: document.querySelector('.modal-content'),
  backdropEl: document.querySelector('.js-backdrop'),
  cardsEl: document.querySelector('.search-recipes'),
  favoriteBtn: document.querySelector('.js-favorite'),
};

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

refs.cardsEl.addEventListener('click', openModalRecipe);

function openModalRecipe(e) {
  if (e.target.classList.contains('js-card-button')) {
    let id = e.target.dataset.id;
    fetchRecipe(id).then(obj => {
      refs.modalEl.innerHTML = renderRecipe(obj);
      themeSwitcher();
      refs.backdropEl.classList.remove('is-hidden');
      document.body.classList.add('no-scroll');
      refs.closeBtn.addEventListener('click', closeModal);
      refs.backdropEl.addEventListener('click', closeOnEscape);
      document.addEventListener('keydown', closeOnBackdrop);
      const savedFavirites = JSON.parse(localStorage.getItem('favorites'));
      const videoIcon = document.querySelector('.icon-video');
      videoIcon.addEventListener('click', hideCoverVideo);

      if (
        JSON.parse(
          localStorage.getItem('favorites') && hasArrElement(savedFavirites, id)
        )
      ) {
        refs.favoriteBtn.textContent = 'Remove from favorites';
      }
      refs.favoriteBtn.addEventListener('click', addToFavorite);
    });
  }
}

function closeModal() {
  document.body.classList.remove('no-scroll');
  refs.backdropEl.classList.add('is-hidden');
  document.removeEventListener('keydown', closeOnBackdrop);
  refs.backdropEl.removeEventListener('click', closeOnEscape);
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

function hideCoverVideo() {
  const coverVideoEl = document.querySelector('.cover-video');
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

function themeSwitcher() {
  refs.modalWindow.classList.remove('dark-theme');
  if (refs.bodyEl.classList.contains('dark')) {
    refs.modalWindow.classList.add('dark-theme');
  }
}

// function toggleDarkTheme() {
//   if (refs.bodyEl.classList.contains('dark')) {
//     refs.modalWindow.classList.add('black-modal');
//     refs.iconClose.classList.add('black-closeBtn');
//     refs.iconClose.classList.add('black-value');
//   } else {
//     refs.modalWindow.classList.remove('black-modal');
//     refs.iconClose.classList.remove('black-closeBtn');
//     refs.iconClose.classList.remove('black-value');
//   }
// }
