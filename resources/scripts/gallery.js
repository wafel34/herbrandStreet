var GALLERY = {

};

GALLERY.collectImages = function() {
    var collection = document.querySelectorAll('.gallery__item'),
        arr = Array.prototype.slice.call( collection ),
        div = document.createElement('div'),
        content = '';

    div.classList.add('full-screen-gallery');
    div.classList.add('full-screen-gallery--hidden');

    arr.map(function(item, index){
        var id = index+1;
        console.log(item);
        content +=
            '<img class="full-screen-gallery__image" src="./images/'+id+'.jpg" alt="">';

        item.addEventListener('click', function(e){
                div.classList.toggle('full-screen-gallery--hidden');
                div.classList.toggle('full-screen-gallery--visible');
        },false);

    });


    div.innerHTML = content;
    document.body.appendChild(div);

};

GALLERY.collectImages();
