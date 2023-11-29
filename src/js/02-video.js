import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const playerIframe = document.getElementById('vimeo-player');
const player = new Player(playerIframe);

const storedTime = localStorage.getItem('videoplayer-current-time');

if (storedTime) {
  player.setCurrentTime(parseFloat(storedTime));
}

const saveCurrentTime = throttle(async () => {
  const currentTime = await player.getCurrentTime();
  localStorage.setItem('videoplayer-current-time', currentTime);
}, 1000);

player.on('timeupdate', saveCurrentTime);

window.addEventListener('beforeunload', () => {
  saveCurrentTime.flush();
});