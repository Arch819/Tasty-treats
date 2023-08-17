const el = document.querySelector('html');
el.addEventListener('click', handlerChangeThemes);

function handlerChangeThemes() {
  if (localStorage.getItem('theme') === 'black') {
    localStorage.removeItem('theme');
  } else {
    localStorage.setItem('theme', 'black');
  }
  addDarkTheme();
}

function addDarkTheme() {
  try {
    if (localStorage.getItem('theme') === 'black') {
      el.classList.add('dark');
    } else {
      el.classList.remove('dark');
    }
  } catch (err) {}
}
addDarkTheme();
