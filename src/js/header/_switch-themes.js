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
      refs.bodyEl.classList.add('dark');
    } else {
      refs.bodyEl.classList.remove('dark');
    }
  } catch (err) {}
}
if (localStorage.getItem('theme') === 'black') {
  addDarkTheme();
  refs.sliderEl.forEach(slider => (slider.checked = true));
}
