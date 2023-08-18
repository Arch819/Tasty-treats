import team from '../../data/team.json';
import { teamRender } from './teamRender';

const teamList = document.querySelector('.js-team-list');
console.log(tr);

teamList.insertAdjacentHTML('beforebegin', teamRender(team));
