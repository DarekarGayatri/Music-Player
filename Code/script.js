
console.log("Welcome to Music World");

//Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('Ishq Hai.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let songs = [
    { songName: "Ishq Hai", filePath: "Ishq Hai.mp3", coverPath: "cover1.jpg" },
    { songName: "Shiddat", filePath: "Shiddat.mp3", coverPath: "cover2.png" },
    { songName: "Humdum", filePath: "Hum Dum.mp3", coverPath: "cover3.png" },
    { songName: "Ishq", filePath: "Ishq.mp3", coverPath: "cover4.png" },
    { songName: "Tere Liye", filePath: "Tere Liye.mp3", coverPath: "cover5.jpg" },
    { songName: "Hasi", filePath: "Hasi.mp3", coverPath: "cover6.png" },
    { songName: "Suniyaa Suniyaa", filePath: "Suniyaa Suniyaa.mp3", coverPath: "cover7.jpg" },
    { songName: "Stay", filePath: "Stay.mp3", coverPath: "cover8.jpg" },
    { songName: "Akhiyaan", filePath: "Akhiyaan.mp3", coverPath: "cover9.jpg" },
]

songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})
// audioElement.play();

// Handel play/ pause click
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
    }
    else {
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
    }
})
// Listen to Events
audioElement.addEventListener('timeupdate', () => {
    //  Update Seekbar
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = isNaN(progress) ? 0 : progress;
})

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
})

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
}
// In the songItemPlay click event
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.add('fa-circle-pause');
        e.target.classList.remove('fa-circle-play')
        audioElement.src = songs[songIndex].filePath;  // Fixed path
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
    })
})

// In the next button handler
document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= songs.length - 1) {  // Fixed condition
        songIndex = 0;
    }    
    else {
        songIndex += 1;
    }
    audioElement.src = songs[songIndex].filePath;  // Fixed path
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');        
    masterSongName.innerText = songs[songIndex].songName;
    masterPlay.classList.add('fa-circle-pause');
})

// In the previous button handler
document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = songs.length - 1;
    }    
    else {
        songIndex -= 1;
    }
    audioElement.src = songs[songIndex].filePath;  // Fixed path
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})
audioElement.addEventListener('error', (e) => {
    console.error('Error loading audio:', e);
    masterSongName.innerText = 'Error loading audio';
    masterPlay.classList.remove('fa-circle-pause');
    masterPlay.classList.add('fa-circle-play');
});

audioElement.addEventListener('loadstart', () => {
    masterSongName.innerText = `Loading: ${songs[songIndex].songName}...`;
});

audioElement.addEventListener('canplay', () => {
    masterSongName.innerText = songs[songIndex].songName;
});

let volumeControl = document.getElementById('volumeControl');

// Add skip forward and backward functionality
let skipForward = document.getElementById('skipForward');
let skipBackward = document.getElementById('skipBackward');
const skipTime = 10; // Skip time in seconds

if (skipForward) {
    skipForward.addEventListener('click', () => {
        audioElement.currentTime = Math.min(audioElement.currentTime + skipTime, audioElement.duration);
    });
}

if (skipBackward) {
    skipBackward.addEventListener('click', () => {
        audioElement.currentTime = Math.max(audioElement.currentTime - skipTime, 0);
    });
}

// Enhance volume control with mute functionality
let volumeIcon = document.getElementById('volumeIcon');
let lastVolume = 1.0;

if (volumeControl) {
    // Set initial volume
    audioElement.volume = volumeControl.value / 100;
    
    volumeControl.addEventListener('input', () => {
        const volumeValue = volumeControl.value / 100;
        audioElement.volume = volumeValue;
        lastVolume = volumeValue;
        
        // Update volume icon based on level
        if (volumeValue === 0) {
            volumeIcon.classList.replace('fa-volume-high', 'fa-volume-mute');
        } else {
            volumeIcon.classList.replace('fa-volume-mute', 'fa-volume-high');
        }
    });
}

if (volumeIcon) {
    volumeIcon.addEventListener('click', () => {
        if (audioElement.volume > 0) {
            lastVolume = audioElement.volume;
            audioElement.volume = 0;
            volumeControl.value = 0;
            volumeIcon.classList.replace('fa-volume-high', 'fa-volume-mute');
        } else {
            audioElement.volume = lastVolume;
            volumeControl.value = lastVolume * 100;
            volumeIcon.classList.replace('fa-volume-mute', 'fa-volume-high');
        }
    });
}