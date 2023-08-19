import team from '../../data/team.json';
import { teamRender } from './teamRender';

const teamList = document.querySelector('.js-team-list');
console.log('gh:', teamRender(team));

teamList.insertAdjacentHTML('afterbegin', teamRender(team));
