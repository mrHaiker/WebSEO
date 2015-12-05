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

var outWidth = 0,
    firstStart = true;


function startTime () {
    if (localStorage.getItem("lastTime")) {
        video.currentTime = localStorage.getItem("lastTime");
        console.log(video.duration);
        console.log(localStorage.getItem("lastTime"));
        if (localStorage.getItem("lastTime") == video.duration) {
            video.currentTime = 0;
        }
    } else {
        video.currentTime = 0;
    }
}

//********************************************** функции **********************************************//

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

function cssWidth (){   //функциия для RedLine
    var step = bgBar.clientWidth/video.duration;  // 800px делит на длинну ролика => ~15px
    outWidth = video.currentTime*step;  // текущий момент времени воспроизведения множит на шаг (15px)
    return outWidth + 'px';
}

function movePointer (e) {
    redline.style.width = e.pageX-wrapper.offsetLeft + 'px';
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


    if(firstStart) {
        startTime();
        firstStart = false;
    }
    time.innerHTML = typeTime(sec) + '/' + typeTime(duration);
    redline.style.width = cssWidth();
    localStorage.setItem('lastTime', video.currentTime);
    spinner.className = 'hidden';
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

controlLine.addEventListener('click', function (e) {
    video.currentTime = video.duration * (e.offsetX / bgBar.clientWidth);
    redline.style.width = e.offsetX+'px';
    if(video.paused) video.play();
});

pointer.addEventListener('mousedown', function (e) {
    window.addEventListener('mousemove', movePointer);
    e.preventDefault();
});

pointer.addEventListener('mouseup', function () {
    window.removeEventListener('mousemove', movePointer);
    video.currentTime = video.duration * (pointer.offsetLeft / bgBar.clientWidth);
});
