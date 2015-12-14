$(document).ready(function () {
    var firstStart = true;
    var newMessage = 0;

    if(firstStart) {
        getMessage ('inbox');
        firstStart = false;
    }

    function getMessage (id) {
        $.getJSON('json/'+id+'.json', function (data) {
            $('.content').empty();
            if(id == 'inbox') newMessage = 0; //Если загружаются данные о входящих > заного перещитываем новые
            $.each(data, function (key, val) {
                var ul = $('<ul>');
                ul.addClass('item');
                ul.attr('id',val['id']);
                var checkbox = $('<input>').attr('type', 'checkbox');
                $('<li>').append(checkbox).addClass('inp').appendTo(ul);
                for (var newKey in val) {
                    if(newKey !== "id" && newKey !== "view")
                    $('<li>').text(val[newKey]).addClass(newKey).appendTo(ul);
                    if(newKey == 'view') newMessage++;
                }
                if (val['view'] == 'false') {
                    ul.addClass('new');
                }
                ul.prependTo('.content');
            });
            changeCounter(newMessage);
        });
    }

    function changeCounter (num) {
        var counter =  $('#inbox > .counter');
        counter.text(num);
        if (!newMessage) {
            counter.fadeOut(100);
        } else {
            counter.fadeIn(100);
        }
    }

    // события

    $('.navigation').click(function () {
        var nav = $(this);
        $('.navigation').removeClass('active');
        nav.addClass('active');
        $('#title').html(nav.html());
        getMessage (this.id);
    });

    $(document).on('click', '.item', function () {
        if($(this).hasClass('new')){
            $(this).removeClass('new');
            newMessage--;
            changeCounter(newMessage);
        }
    });
});