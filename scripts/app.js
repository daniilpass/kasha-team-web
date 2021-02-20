const videoStart = 15;
const videoEnd = 150;
const videoPlaybackRate = 0.8;
let loaded = false;
let timerId = null;
let opacity = 0;
const maxOpacity = 0.5;

window.onload = function() {
    let video = getVideo();     
    addVideoEvents(video); 
    setUpAndLoadVideo(video);
}

function getVideo() {
    return document.getElementById("video-cs");
}

function setUpAndLoadVideo(video) {
    video.playbackRate = videoPlaybackRate;       
    video.load();
}

function addVideoEvents(video) {
    video.addEventListener('loadeddata', function () {
        startVideo(video);
        videoLoaded(video);
    });   
   
    video.addEventListener('timeupdate', function () {
        if (video.currentTime >= videoEnd) {
            startVideo(video);
        }
    });
}

function startVideo(video) {
    video.currentTime = videoStart;
    video.play();
}

function videoLoaded(video) {
    loaded = true;
    goVisible(video);
}

function goVisible(video) {
    opacity = opacity + 0.02;
    video.style="opacity: " + opacity;

    if (opacity >= maxOpacity){
        return;
    }

    timerId = setTimeout(() => {goVisible(video)}, 33)
}

