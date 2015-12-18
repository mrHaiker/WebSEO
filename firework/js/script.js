$(document).ready(function () {

    var radius = 100;

    //***************************** Функции *****************************//
    function moveCircle (array, callback) {
        for (var i = 0; i<array.length; i++) {
            var Obj = array[i];
            var circle = $('<div>');
            circle.addClass('circle');
            circle.css({
                top: Obj.posY,
                left: Obj.posX,
                backgroundColor: getRandomColor()
            });
            $(document.body).append(circle);
            circle.animate({
                top: Obj.toY,
                left: Obj.toX
            },400, function () {
                var circle = $(this);
                var circleOffset = circle.offset();
                setTimeout(function () {
                    callback(circleOffset.left, circleOffset.top, circle);
                    circle.hide();
                },400);
            });
        }
    }

    function degToRad (deg) { return deg * Math.PI / 180; }

    function createCircle (posX, posY) {
        var output = [];
        var numCircles = getRandomNum(5,12);

        for (var i = 0; i < 360; i += 360/numCircles) {
            var sin = Math.sin(degToRad(i));
            var cos = Math.cos(degToRad(i));

            var toX = radius*cos + posX;
            var toY = radius*sin + posY;

            var Obj = {};
            Obj.posX = posX;
            Obj.posY = posY;
            Obj.toX = toX;
            Obj.toY = toY;
            output.push(Obj);
            //moveCircle(posX, posY, toX, toY);
        }
        return output;
    }

    function NewLoop (posX, posY) {
        moveCircle(createCircle(posX,posY), deleteCircles);
    }
    function deleteCircles (posX, posY, obj) {
        obj.remove();
    }

    function getRandomNum (from, to) {
        return Math.floor(Math.random()* (to-from) + from);
    }

    function getRandomColor () {
        var color = [];
        for (var i = 0; i < 3; i++) {
            color.push(Math.floor(Math.random()*255));
        }
        return 'rgb('+color[0]+','+color[1]+','+color[2]+')';
    }


    //***************************** События *****************************//
    $(document).click(function (e) {
        var x = e.clientX;
        var y = e.clientY;
         //createCircle(x, y);
        moveCircle(createCircle(x,y), NewLoop);
    })

});