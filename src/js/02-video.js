import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);
let LOCALSTORAGE_KEY = 'videoplayer-current-time'

player.on('timeupdate', throttle(setSeconds, 1000));

function setSeconds({ seconds }) {
    localStorage.setItem(LOCALSTORAGE_KEY, seconds);
}

const savedTime = localStorage.getItem(LOCALSTORAGE_KEY)
if (savedTime) {player.setCurrentTime(savedTime)}
