

window.onload = function() {
    //check mobile
    var isMobile = navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i)
    
    //video
    let video = getVideo();     
    addVideoEvents(video); 
    setUpAndLoadVideo(video);
    
    if (!isMobile) {
        //logo
        addLogoEvents();
    }
    
}

/*
* BACKGROUND VIDEO LOGIC
*/
const videoStart = 15;
const videoEnd = 150;
const videoPlaybackRate = 0.8;
let loaded = false;
let timerId = null;
let opacity = 0;
const maxOpacity = 0.5;

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


/*
* LOGO TRANSFORM LOGIC
*/
const maxAngle = 20;

function addLogoEvents() {
    let wrapper = document.getElementById("logo-wrapper"); 
    let img = document.getElementById("logo"); 

    document.body.addEventListener('mousemove', e => {
        bodyMouseMove(e, img, wrapper);
    });
}

bodyMouseMove = function (e, img, wrapper) {
    var rect = e.currentTarget.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
    offsetWidth =  wrapper.offsetWidth;
    offsetHeight = window.innerHeight;

    if (offsetX < wrapper.offsetLeft) {
        offsetX = wrapper.offsetLeft
    }
    if (offsetX > wrapper.offsetLeft + wrapper.offsetWidth) {
        offsetX = wrapper.offsetLeft + wrapper.offsetWidth
    }
    

    let deltaX = ( (offsetX - wrapper.offsetLeft) / offsetWidth - 0.5) * 2 ;
    let angleX = maxAngle * deltaX;

    let deltaY = (offsetY / offsetHeight - 0.5) * 2 ;
    let angleY = maxAngle * deltaY;

    img.style.transform = `scale(1.2) perspective(500px) rotateY(${angleX}deg) rotateX(${-angleY}deg)`;
}