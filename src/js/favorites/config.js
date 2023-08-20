import { empty } from './empty';

// ========================================викликаємо коли потрібно завантажити порожню сторінку-======================
const emptyRendering = conRef => {
  conRef.classList.add('empty');
  conRef.insertAdjacentHTML('beforeend', empty());
};

// =================================парсимо localStorage========================================
const getValuesOfStorage = storedData => {
  return JSON.parse(localStorage.getItem(storedData));
};

export { emptyRendering, getValuesOfStorage };
