export function teamRender(team) {
  return team
    .map(({ id, img, name }) => {
      return ` <li class='team-item'>
                  <img src="${img}" alt="${name}" id="${id}" title="${name}" width="24" height="24">
               </li>`;
    })
    .join('');
}
