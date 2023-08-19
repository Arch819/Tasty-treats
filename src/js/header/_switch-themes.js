import { refs } from './refs';

refs.sliderEl.forEach(slider => {
  slider.addEventListener('click', handlerChangeThemes);
});

function handlerChangeThemes() {
  if (localStorage.getItem('theme') === 'black') {
    localStorage.removeItem('theme');
    refs.sliderEl.forEach(slider => (slider.checked = false));
  } else {
    localStorage.setItem('theme', 'black');
    refs.sliderEl.forEach(slider => (slider.checked = true));
  }
  addDarkTheme();
}

function addDarkTheme() {
  try {
    if (localStorage.getItem('theme') === 'black') {
      document.querySelector('body').classList.add('dark');
    } else {
      document.querySelector('body').classList.remove('dark');
      //       document.querySelector('input').checked = false;
    }
  } catch (err) {}
}
// addDarkTheme();
