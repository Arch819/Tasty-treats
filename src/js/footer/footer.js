import team from '../../data/teame.json';
import { teamRender } from './teamRender';

const teamList = document.querySelector('.js-team-list');
console.log(teamRender(team));

teamList.insertAdjacentHTML('beforebegin', teamRender(team));
