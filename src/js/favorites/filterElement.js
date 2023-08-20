// -------------------------------------------------отримує масив всіх категорій та повертає розмітку-------------------------

const renderListOfCategories = listOfCategories => {
  const zeroMarkup = `<li><button type="button" class="favorites__filter-btn">All categories</button></li>`;
  const uniqueArray = [];
  for (const item of listOfCategories) {
    if (!uniqueArray.includes(item)) {
      uniqueArray.push(item);
    }
  }
  const markup = uniqueArray.map(el => {
    return `<li><button type="button" class="favorites__filter-btn">${el}</button></li>`;
  });
  markup.unshift(zeroMarkup);
  return markup;
};

// -----------------------отримує масив категорій і повертає markup списку-------------------------

export const markupCategory = categories => {
  const markupCategory = renderListOfCategories(categories).join('');
  return markupCategory;
};
