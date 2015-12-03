var video = document.getElementById('video');
var play = document.getElementById('play');
var iplay = document.getElementById('fa-play');
var time = document.getElementById('time');

function togglePause () {
    if(video.paused) {
        video.play();
    } else {
        video.pause();
    }
}

video.addEventListener("click", togglePause);
play.addEventListener("click", togglePause);

video.addEventListener("pause", function() {
    iplay.className = "fa fa-play";
});

video.addEventListener("play", function() {
    iplay.className = "fa fa-pause";
});