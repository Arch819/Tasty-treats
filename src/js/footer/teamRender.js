export function teamRender(team) {
  return team
    .map(({ id, img, name }) => {
      ` <li class='team-item'>
                  <img src="${img}" alt="${name}" id="${id}" title="${name}">
               </li>`;
    })
    .join('');
}
