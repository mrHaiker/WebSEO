var contentBlock = document.getElementById('content');
var inbox = document.getElementById('inbox');
var sent = document.getElementById('sent');
var draft = document.getElementById('draft');
var basket = document.getElementById('basket');

function loadAjaxContent(name) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'json/'+name+'.json', false);
    xhr.send();

    renderContent(JSON.parse(xhr.responseText));
}

function renderContent(array) {
    contentBlock.innerHTML = '';
    for (var i = 0; i<array.length; i++) {
        var value = array[i];

        var ul = document.createElement('ul');
        ul.className = 'items';
        contentBlock.appendChild(ul);

        for(var key in value) {
            var li = document.createElement('li');
            li.className = key;
            li.innerHTML = value[key];

            ul.appendChild(li);
        }
    }
}

function removeAllClass () {
    inbox.className = '';
    sent.className = '';
    draft.className = '';
    basket.className = '';
}

loadAjaxContent('inbox');

inbox.addEventListener('click', function (e) {
    loadAjaxContent(this.id);
    removeAllClass();
    inbox.className = 'active-page';
});
sent.addEventListener('click', function (e) {
    loadAjaxContent(this.id);
    removeAllClass();
    sent.className = 'active-page';
});
draft.addEventListener('click', function (e) {
    loadAjaxContent(this.id);
    removeAllClass();
    draft.className = 'active-page';
});
basket.addEventListener('click', function (e) {
    loadAjaxContent(this.id);
    removeAllClass();
    basket.className = 'active-page';
});
