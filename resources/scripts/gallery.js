var GALLERY = {

};


GALLERY.init = function(e){
    e.preventDefault();
    console.log(e);
    var collection = document.querySelectorAll('.gallery__item'),
        arr = Array.prototype.slice.call( collection ),
        div = document.getElementById('full-screen-gallery'),
        closeBtn = document.createElement('button');
        eventSource = (e.srcElement.nodeName !== 'IMG') ? e.srcElement.firstChild : e.srcElement;
        linkElement = (e.srcElement.nodeName !== 'IMG') ? e.srcElement : e.srcElement.parentElement;
        content = '';
        div.classList.add('full-screen-gallery--visible');
        closeBtn.innerHTML = 'CLOSE GALLERY';
        closeBtn.classList.add('full-screen-gallery__button');

        arr.map(function(item, index){
            var id = index+1;
            if(item.src === eventSource.src){
                content +=
                    '<img class="full-screen-gallery__image" id="image-active" src="./images/'+id+'.jpg" alt="">';
            } else {
                content +=
                '<img class="full-screen-gallery__image" src="./images/'+id+'.jpg" alt="">';

            }
        });

        closeBtn.addEventListener('click', function(e){
            div.classList.add('full-screen-gallery--hidden');
            div.classList.remove('full-screen-gallery--visible');
            linkElement.focus();

        }, false);

        div.addEventListener('click', function(e){
            if (!e.srcElement.src) {
                div.classList.add('full-screen-gallery--hidden');
                div.classList.remove('full-screen-gallery--visible');
                linkElement.focus();
            }
        }, false);

        div.innerHTML = content;
        div.appendChild(closeBtn);
        document.body.appendChild(div);


        closeBtn.focus();
        var oT = document.getElementById('image-active').offsetTop;


        div.scrollTop = oT;
};
