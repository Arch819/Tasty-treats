import { refs } from './refs';
refs.sliderEl.addEventListener('click', handlerChangeThemes);

function handlerChangeThemes(e) {
  if (localStorage.getItem('theme') === 'black') {
    localStorage.removeItem('theme');
    document.querySelector('input').checked = false;
  } else {
    localStorage.setItem('theme', 'black');
    document.querySelector('input').checked = true;
  }
  addDarkTheme();
}

function addDarkTheme() {
  try {
    if (localStorage.getItem('theme') === 'black') {
      document.querySelector('body').classList.add('dark');
      document.querySelector('input').checked = true;
    } else {
      document.querySelector('body').classList.remove('dark');
      document.querySelector('input').checked = false;
    }
  } catch (err) {}
}
addDarkTheme();
