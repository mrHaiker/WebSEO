var video = document.getElementById('video');
var play = document.getElementById('play');
var iplay = document.getElementById('fa-play');
var time = document.getElementById('time');
var bgBar = document.getElementById('bg-bar');
var redline = document.getElementById('redline');
var lifeline = document.getElementById('lifeline');
var fullscreenBtn = document.getElementById('fullscreenBtn');
var volumeBtn = document.getElementById('volumeBtn');
var volume = document.getElementById('volume');

var interval,
    outWidth = 0,
    seekto;



function togglePause () {   // функция паузы/проигрывания видео
    if(video.paused) {
        video.play();
    } else {
        video.pause();
    }
}

function typeTime (sec) {   // функция возвращает секунды в формате времени
    var min = Math.floor(sec / 60);
    var hour = Math.floor(min / 60);
    var time;
    sec = sec % 60;

    if(sec < 10) {
        sec = "0" + sec;
    }

    if(hour > 0) {
        if (min < 10) {
            min = '0' + min;
        }
        time = hour+':'+min+':'+sec;
    } else {
        time = min+':'+sec;
    }

    return time;
}

function newInterval () {   // интервал изменяющий положение линии состояния
    redline.style.width = cssWidth();
    var newTime = video.currentTime * (1000 / video.duration);
    lifeline.value = newTime;
}

function cssWidth (){   //функциия для RedLine
    var step = bgBar.clientWidth/video.duration;  // 800px делит на длинну ролика => ~15px
    outWidth = video.currentTime*step;  // текущий момент времени воспроизведения множит на шаг (15px)
    return outWidth + 'px';
}

// События
video.addEventListener("click", togglePause);
play.addEventListener("click", togglePause);

video.addEventListener("pause", function() {
    iplay.className = "fa fa-play";
    interval = clearInterval(interval);
});

video.addEventListener("play", function() {
    iplay.className = "fa fa-pause";
    interval = setInterval(newInterval, 300);
});

video.addEventListener("ended", function() {
    iplay.className = "fa fa-repeat";
    interval = clearInterval(interval);
    redline.style.width = bgBar.clientWidth+'px';
});

video.addEventListener("timeupdate", function() {
    var sec = Math.floor(video.currentTime);
    var duration = Math.floor(video.duration);

    time.innerHTML = typeTime(sec) + '/' + typeTime(duration);
});

lifeline.addEventListener("change", function() {
    seekto = video.duration * (lifeline.value / 1000);
    video.currentTime = seekto;
    redline.style.width = cssWidth();
});

fullscreenBtn.addEventListener('click', function () {
    if(video.requestFullScreen) {
        video.requestFullScreen()
    } else if(video.webkitRequestFullScreen) {
        video.webkitRequestFullScreen()
    } else if (video.mozRequestFullScreen) {
        video.mozRequestFullScreen();
    }
});

volumeBtn.addEventListener('click', function () {
    if(video.volume) {
        video.volume = 0;
        volume.className = 'fa fa-volume-off';
    } else if (!video.volume) {
        video.volume = 1;
        volume.className = 'fa fa-volume-up';
    }
});