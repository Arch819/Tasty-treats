export function createCategoriesButton(data) {
    return data.map(({ _id, name }) =>
        `<button id="${_id}" class="category-btn">${name}</button>`
    ).join('');
}