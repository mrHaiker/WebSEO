var header = angular.element(document.querySelector('header'));

myApp.controller('animationCtrl', function ($scope) {
    var check = false;
    $scope.down = function () {
        check = true;
    };
    $scope.up = function () {
        check = false;
    };
    $scope.mouseMove = function ($event) {
        if (check) {
            var newDirective = angular.element('<div></div>');
            var x = $event.clientX + 'px';
            var y = $event.clientY + 'px';
            var height = Math.random() * 20 + 20 + 'px';
            console.log(createColor());
            newDirective.addClass('circle animate');
            newDirective.attr('ng-animate'," 'animate' ");
            newDirective.css({
                left: x,
                top: y,
                width: height,
                height: height,
                backgroundColor: createColor()
            });
            header.append(newDirective);
            // Animate

        }
    }
});

function createColor () {
    var color = [];
    for (var i = 0; i<3; i++) {
        color.push(Math.floor(Math.random()*255));
    }
    return 'rgb('+color[0]+','+color[1]+','+color[2]+')';
}
