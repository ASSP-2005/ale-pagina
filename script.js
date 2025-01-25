const audio = document.getElementById('audio');
const playButton = document.getElementById('play-btn');
const progress = document.getElementById('progress');
const currentTimeElement = document.getElementById('current-time');
const durationElement = document.getElementById('duration');

const songs = [
  'https://audio.jukehost.co.uk/js3P2sOFgPh8XfFdUmjcSHtMTCMEIend', // Ruta de tu canción 1
];
let currentSongIndex = 0;

function updatePlayButton() {
  const img = playButton.querySelector('img');
  if (audio.paused) {
    // playButton.textContent = '▶️';
    img.src = './resources/play-icon.svg';
  } else {
    // playButton.textContent = '⏸️';
    img.src = './resources/pause-icon.svg';
  }
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secondsRemaining = Math.floor(seconds % 60);
  return `${minutes}:${secondsRemaining < 10 ? '0' : ''}${secondsRemaining}`;
}

function updateProgressBar() {
  const progressValue = (audio.currentTime / audio.duration) * 100;
  progress.value = progressValue;
  currentTimeElement.textContent = formatTime(audio.currentTime);
  durationElement.textContent = formatTime(audio.duration);
}

function setProgress() {
  const newTime = (progress.value / 100) * audio.duration;
  audio.currentTime = newTime;
}

function playPauseAudio() {
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
  updatePlayButton();
}


audio.addEventListener('timeupdate', updateProgressBar);
progress.addEventListener('input', setProgress);
playButton.addEventListener('click', playPauseAudio);

audio.addEventListener('loadedmetadata', () => {
  durationElement.textContent = formatTime(audio.duration);
});

window.onload = () => {
  audio.src = songs[currentSongIndex]; // Cargar la primera canción
};
