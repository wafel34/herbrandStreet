//GALLERY OBJECT WITH MAIN PROPERTIES ON IT

var GALLERY = {
    collection: document.querySelectorAll('.gallery__item'),
    div: document.getElementById('full-screen-gallery'),
    closeBtn: document.createElement('button'),
    checkIfFiredAlready: false,
    windowWidth: window.innerWidth
};


//FUNCTION THAT INITIALIZE GALLERY EVERYTIME IMAGE IS CLICKED
GALLERY.init = function(e){
    e.preventDefault();


    //below 2 variables are checking if clicked element was image (click) or link (key press)
    //and gets source base on that
    var eventSource = {},
        linkElement = {};
        content = '';

        if(!e.srcElement) {
            eventSource = (e.target.nodeName !== 'IMG') ? e.target.firstChild : e.target;
            linkElement = (e.target.nodeName !== 'IMG') ? e.target : e.target.parentElement;
        } else {
            eventSource = (e.srcElement.nodeName !== 'IMG') ? e.srcElement.firstChild : e.srcElement;
            linkElement = (e.srcElement.nodeName !== 'IMG') ? e.srcElement : e.srcElement.parentElement;
        }

        //bellow is turning html collection into array
        arr = Array.prototype.slice.call( this.collection );

        //add classes and attributes to html elements
        this.div.classList.add('full-screen-gallery--visible');
        this.closeBtn.classList.add('full-screen-gallery__button');
        this.closeBtn.setAttribute('aria-label', 'Press enter to close gallery, use buttons to scroll gallery');

        //map through colection of images and append data to 'content' variable
        arr.map(function(item, index){
            var id = index+1;
            if(item.src === eventSource.src){
                content +=
                    '<img class="full-screen-gallery__image" id="image-active" src="./images/'+id+'.jpg" alt="">';
            } else {
                content +=
                '<img class="full-screen-gallery__image" src="./images/'+id+'.jpg" alt="">';

            }
        }.bind(this));

        //when close button is clicked, remove the class and focus previously opened link
        this.closeBtn.addEventListener('click', function(e){
            this.div.classList.add('full-screen-gallery--hidden');
            this.div.classList.remove('full-screen-gallery--visible');
            linkElement.focus();
        }.bind(this), false);

        //when button is pressed with keybord, check if it WAS NOT enter and prevent for focusing other elements
        this.closeBtn.addEventListener('keydown', function(e){
            if (e.keyCode !== 13) {
                this.div.focus();
            }
        }.bind(this), false);

        //close gallery when clicked anywhere outside image
        this.div.addEventListener('click', function(e){
            //check if browser supporst e.srcElement
            if (e.srcElement) {

                //if element that was clicked wasn't image - close the div
                if (!e.srcElement.src) {
                    this.div.classList.add('full-screen-gallery--hidden');
                    this.div.classList.remove('full-screen-gallery--visible');
                    linkElement.focus();
                }
            } else {

                //if element that was clicked wasn't image - close the div
                if (!e.target.src) {
                    this.div.classList.add('full-screen-gallery--hidden');
                    this.div.classList.remove('full-screen-gallery--visible');
                    linkElement.focus();
                }
            }
        }.bind(this), false);

        //append mapped content to the div and add button in the end
        this.div.innerHTML = content;
        this.div.appendChild(this.closeBtn);

        //append div to body
        document.body.appendChild(this.div);

        //focus the current div (this is to make possible scrolling with arrow keys)
        this.div.focus();

        //Get offset of active element (the one that was clicked on thumbnail) and scroll to it's position
        var oT = document.getElementById('image-active').offsetTop;
        this.div.scrollTop = oT;

        //add text to the close button
        this.closeBtn.innerHTML = '<span class="fa fa-times"></span>';

        //if window is wider than 1000px alert instruction about gallery scrolling
        //on wider screen image may take full height and it may be hard to figure out how to navigate through gallery
        if (this.windowWidth > 1000) {
            if (this.checkIfFiredAlready === false){
                alert('TO VIEW GALLERY SCROLL UP OR DOWN\n\nOR USE ARROW KEYS');
            }
            this.checkIfFiredAlready = true;
        }
};
