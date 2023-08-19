export function createCategoriesButton(data) {
    return data.map(({ _id, name }) =>
        `<button id="${_id}" class="item-category-btn btn">${name}</button>`
    ).join('');
}