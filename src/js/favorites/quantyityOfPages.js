export const renderQuantityOfPages = quantity => {
  const arrOfPagBtn = [];
  for (let i = 1; i <= quantity; i += 1) {
    arrOfPagBtn.push(createPaginationEl(i));
  }
  return arrOfPagBtn;
};

const createPaginationEl = num => {
  return `<div class="pag-btn-block pag-btn-block-container"><button id="pag-btn-1" class="pag-btn-white pag-btn-number" type="button" aria-label="page 1">${num}</button></div>`;
};
