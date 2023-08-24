import Notiflix from 'notiflix';
import team from '../../data/team.json';
import { teamRender } from './teamRender';
import { modalTeamRender } from './teamRender';

const teamList = document.getElementById('team-list');
const link = document.querySelectorAll('.disable-link');
const supportLink = document.querySelector('.support-link');
const modalTeam = document.querySelector('.modal-wraper');
const backdropTeam = document.getElementById('team-modal');
const closeBtn = document.querySelector('.close-modal-team');

let teamItem = 0;

teamList.addEventListener('click', fetchTeam);
closeBtn.addEventListener('click', onClose);
supportLink.addEventListener('click', e => {
  e.preventDefault();
  confirmNavigation(supportLink.href);
});

link.forEach(linkItem => {
  linkItem.addEventListener('click', e => e.preventDefault());
});

teamList.insertAdjacentHTML('afterbegin', teamRender(team));

function fetchTeam(e) {
  const { target } = e;
  console.log(e.target);
  if (target.tagName === 'UL' || target.tagName === 'LI') {
    return;
  }
  if (!target.tagName === 'IMG') {
    return;
  }
  const findId = target.dataset.id;
  teamItem = team.find(obj => obj.id === findId);

  setClassBackdropTeam(e);
}

function setClassBackdropTeam() {
  document.addEventListener('keydown', onKeyClose);
  document.addEventListener('click', onClickClose);

  try {
    if (!teamItem) {
      throw new Error('data not available');
    }
    modalTeam.innerHTML = modalTeamRender(teamItem);
    onOpen();
    modalTeam.addEventListener('click', onModalClick);
  } catch (error) {
    Notiflix.Report.failure(error.message);
  }
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
  if (event.target !== backdropTeam && !teamList.contains(event.target)) {
    onClose();
    document.removeEventListener('click', onClickClose);
  }
}
function confirmNavigation(link) {
  Notiflix.Confirm.show(
    'Confirmation',
    'This address leads to another website. Are you sure you want to navigate to this link?',
    'Yes',
    'No',
    function () {
      window.open(link, '_blank');
    }
  );
}
