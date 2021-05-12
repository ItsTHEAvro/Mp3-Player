const container = document.querySelector('.container');
const playBtn = document.querySelector('.btn-play');
const prevBtn = document.querySelector('.btn-prev');
const nextBtn = document.querySelector('.btn-next');
const audio = document.querySelector('#audio');
const progress = document.querySelector('.progressbar');
const progressContainer = document.querySelector('.progressbar-container');
const title = document.querySelector('.song-title');
const author = document.querySelector('.song-author');
const cover = document.querySelector('.cover-img');
const songDuration = document.querySelector('.totalTime');
const currentTime = document.querySelector('.currentTime');

// Song titles and authors
const songs = ['Stuck', 'Be As You Are'];
const authors = ['Ollie', 'Mike Posner']

// Keep track of songs
let songIndex = 0;

// Initially load song into DOM
loadSong(songIndex);

// Update song details
function loadSong(index) {
    let song_title = songs[index];
    let song_author = authors[index];
    title.innerText = song_title;
    author.innerText = song_author;
    audio.src = `mp3/${song_author} - ${song_title}.mp3`
    cover.src = `images/${song_author} - ${song_title}.jpg`
}

function playSong() {
    container.classList.add('play');
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');
    audio.play();
}

function pauseSong() {
    container.classList.remove('play');
    playBtn.querySelector('i.fas').classList.add('fa-play');
    playBtn.querySelector('i.fas').classList.remove('fa-pause');
    audio.pause();
}

function prevSong() {
    songIndex--;

    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }

    loadSong(songIndex);
    playSong();
}

function nextSong() {
    songIndex++;

    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }

    loadSong(songIndex);
    playSong();
}

function updateProgressbar(event) {
    const { duration, currentTime } = event.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
}

function setProgress(event) {
    const width = this.clientWidth;
    const clickX = event.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
}

// Event listeners
playBtn.addEventListener('click', () => {
    isPlaying = container.classList.contains('play');

    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
})

audio.addEventListener('timeupdate', updateProgressbar);
progressContainer.addEventListener('click', setProgress);
audio.addEventListener('ended', nextSong);

// Change song events
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);