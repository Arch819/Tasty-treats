import team from '../../data/team.json';
import { teamRender } from './teamRender';
import { modalTeamRender } from './teamRender';

const teamList = document.getElementById('team-list');
const link = document.querySelectorAll('.disable-link');
const modalTeam = document.querySelector('.modal-wraper');
const backdropTeam = document.getElementById('team-modal');
const closeBtn = document.querySelector('.close-modal-team');

let teamItem = 0;

teamList.addEventListener('click', fetchTeam);
closeBtn.addEventListener('click', onClose);

link.forEach(linkItem => {
  linkItem.addEventListener('click', e => e.preventDefault());
});

teamList.insertAdjacentHTML('afterbegin', teamRender(team));

function fetchTeam(e) {
  const { target } = e;
  if (!target.tagName === 'IMG') {
    return;
  }
  const findId = target.dataset.id;
  teamItem = team.find(obj => obj.id === findId);

  setClassBackdropTeam(e);
}

function setClassBackdropTeam(e) {
  document.addEventListener('keydown', onKeyClose);
  document.addEventListener('click', onClickClose);

  onOpen();

  modalTeam.innerHTML = modalTeamRender(teamItem);
  modalTeam.addEventListener('click', onModalClick);
}

function onOpen() {
  backdropTeam.classList.remove('is-hidden');
}

function onClose() {
  backdropTeam.classList.add('is-hidden');
  modalTeam.removeEventListener('click', onModalClick);
}

function onModalClick(event) {
  event.stopPropagation();
}

function onKeyClose(event) {
  if (event.code !== 'Escape') {
    return;
  }
  onClose();
  document.removeEventListener('keydown', onKeyClose);
}

function onClickClose(event) {
  console.log(event.target);
  if (event.target !== backdropTeam && !teamList.contains(event.target)) {
    onClose();
    document.removeEventListener('click', onClickClose);
  }
}
