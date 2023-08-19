export function teamRender(team) {
  return team
    .map(({ id, img, name }) => {
      return ` <li class='team-item'>
                  <img src="${img}" alt="${name}" data-id="${id}" title="${name}" width="24" height="24">
               </li>`;
    })
    .join('');
}

export function modalTeamRender({ img, name, role, responsibility }) {
  return `
    <h2 class="modal-team-title">Developer</h2>
    <div class="devel-info">
      <img src="${img}" alt="${name}" width="80" height="80">
      <div class="info-text">
        <h2 class="devel-name">${name}</h2>
        <p class="devel-role">${role}</p>
        <p class="devel-responsibility">${responsibility}</p>
      </div>
    </div>
  `;
}
