const videoStart = 15;
const videoEnd = 150;
const videoPlaybackRate = 0.8;

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
    video.classList.add("loaded")
}

