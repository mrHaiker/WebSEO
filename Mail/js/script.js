var contentBlock = document.getElementById('content');
var inbox = document.getElementById('inbox');
var sent = document.getElementById('sent');
var draft = document.getElementById('draft');
var basket = document.getElementById('basket');


//*********************************** functions ***********************************//
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

function onclick(e) {
    loadAjaxContent(this.id);
    removeAllClass();
    this.className = 'active-page';
}

//************************************** events **************************************//
inbox.addEventListener('click', onclick);
sent.addEventListener('click', onclick);
draft.addEventListener('click', onclick);
basket.addEventListener('click', onclick);
