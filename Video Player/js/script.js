var video = document.getElementById('video');
var play = document.getElementById('play');
var iplay = document.getElementById('fa-play');
var time = document.getElementById('time');
var bgBar = document.getElementById('bg-line');
var redline = document.getElementById('redline');
var controlLine = document.getElementById('line-bar');
var volumeBtn = document.getElementById('volumeBtn');
var volume = document.getElementById('volume');
var pointer = document.getElementById('pointer');
var wrapper = document.getElementById('player');
var spinner = document.getElementById('spinner');

var firstStart = true,
    blockChangeRedline = false,
    offsetPointer;


//********************************************** функции **********************************************//

function startTime () {   // загрузка из localStorage
    firstStart = false;

    if (localStorage.getItem("lastTime")) {
        video.currentTime = localStorage.getItem("lastTime");
        if (localStorage.getItem("lastTime") == video.duration) {
            video.currentTime = 0;
        }
    } else {
        video.currentTime = 0;
    }

    if (localStorage.getItem("volume")) {
        video.volume = localStorage.getItem("volume");
    } else {
        video.volume = 1;
    }
    if(video.volume) volume.className = 'fa fa-volume-up';
    else volume.className = 'fa fa-volume-off';
}

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

function movePointer (e) {
    redline.style.width = e.pageX - wrapper.offsetLeft + offsetPointer + 'px';
}

//********************************************** События **********************************************//
video.addEventListener("click", togglePause);
play.addEventListener("click", togglePause);

video.addEventListener("pause", function() {
    iplay.className = "fa fa-play";
});

video.addEventListener("play", function() {
    iplay.className = "fa fa-pause";
});

video.addEventListener("ended", function() {
    iplay.className = "fa fa-repeat";
    redline.style.width = bgBar.clientWidth+'px';
});

video.addEventListener('seeking', function () {
    spinner.className = 'visible';
});

video.addEventListener("timeupdate", function() {
    var sec = Math.floor(video.currentTime);
    var duration = Math.floor(video.duration);

    if(firstStart) startTime();

    if(!blockChangeRedline) redline.style.width = video.currentTime * (bgBar.clientWidth/video.duration) + 'px';

    time.innerHTML = typeTime(sec) + '/' + typeTime(duration);
    localStorage.setItem('lastTime', video.currentTime);
    spinner.className = 'hidden';
});

fullscreenBtn.addEventListener('click', function () {
    if(video.requestFullScreen) {
        video.requestFullScreen();
    } else if(video.webkitRequestFullScreen) {
        video.webkitRequestFullScreen();
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
    localStorage.setItem('volume', video.volume);
});

controlLine.addEventListener('click', function (e) {
    var offsetX = e.pageX - wrapper.offsetLeft;
    video.currentTime = video.duration * (offsetX / bgBar.clientWidth);
    redline.style.width = offsetX+'px';
    if(video.paused) video.play();
});

pointer.addEventListener('mousedown', function (e) {
    offsetPointer = e.offsetX;
    window.addEventListener('mousemove', movePointer);
    e.preventDefault();
    blockChangeRedline = true;
    wrapper.addEventListener('mouseup', function () {
        window.removeEventListener('mousemove', movePointer);
        blockChangeRedline = false;
    });
});