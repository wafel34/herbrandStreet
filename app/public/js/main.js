(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
/*! smooth-scroll v12.1.5 | (c) 2017 Chris Ferdinandi | MIT License | http://github.com/cferdinandi/smooth-scroll */
!(function(e,t){"function"==typeof define&&define.amd?define([],(function(){return t(e)})):"object"==typeof exports?module.exports=t(e):e.SmoothScroll=t(e)})("undefined"!=typeof global?global:"undefined"!=typeof window?window:this,(function(e){"use strict";var t="querySelector"in document&&"addEventListener"in e&&"requestAnimationFrame"in e&&"closest"in e.Element.prototype,n={ignore:"[data-scroll-ignore]",header:null,speed:500,offset:0,easing:"easeInOutCubic",customEasing:null,before:function(){},after:function(){}},o=function(){for(var e={},t=0,n=arguments.length;t<n;t++){var o=arguments[t];!(function(t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])})(o)}return e},a=function(t){return parseInt(e.getComputedStyle(t).height,10)},r=function(e){"#"===e.charAt(0)&&(e=e.substr(1));for(var t,n=String(e),o=n.length,a=-1,r="",i=n.charCodeAt(0);++a<o;){if(0===(t=n.charCodeAt(a)))throw new InvalidCharacterError("Invalid character: the input contains U+0000.");t>=1&&t<=31||127==t||0===a&&t>=48&&t<=57||1===a&&t>=48&&t<=57&&45===i?r+="\\"+t.toString(16)+" ":r+=t>=128||45===t||95===t||t>=48&&t<=57||t>=65&&t<=90||t>=97&&t<=122?n.charAt(a):"\\"+n.charAt(a)}return"#"+r},i=function(e,t){var n;return"easeInQuad"===e.easing&&(n=t*t),"easeOutQuad"===e.easing&&(n=t*(2-t)),"easeInOutQuad"===e.easing&&(n=t<.5?2*t*t:(4-2*t)*t-1),"easeInCubic"===e.easing&&(n=t*t*t),"easeOutCubic"===e.easing&&(n=--t*t*t+1),"easeInOutCubic"===e.easing&&(n=t<.5?4*t*t*t:(t-1)*(2*t-2)*(2*t-2)+1),"easeInQuart"===e.easing&&(n=t*t*t*t),"easeOutQuart"===e.easing&&(n=1- --t*t*t*t),"easeInOutQuart"===e.easing&&(n=t<.5?8*t*t*t*t:1-8*--t*t*t*t),"easeInQuint"===e.easing&&(n=t*t*t*t*t),"easeOutQuint"===e.easing&&(n=1+--t*t*t*t*t),"easeInOutQuint"===e.easing&&(n=t<.5?16*t*t*t*t*t:1+16*--t*t*t*t*t),e.customEasing&&(n=e.customEasing(t)),n||t},u=function(){return Math.max(document.body.scrollHeight,document.documentElement.scrollHeight,document.body.offsetHeight,document.documentElement.offsetHeight,document.body.clientHeight,document.documentElement.clientHeight)},c=function(e,t,n){var o=0;if(e.offsetParent)do{o+=e.offsetTop,e=e.offsetParent}while(e);return o=Math.max(o-t-n,0)},s=function(e){return e?a(e)+e.offsetTop:0},l=function(t,n,o){o||(t.focus(),document.activeElement.id!==t.id&&(t.setAttribute("tabindex","-1"),t.focus(),t.style.outline="none"),e.scrollTo(0,n))},f=function(t){return!!("matchMedia"in e&&e.matchMedia("(prefers-reduced-motion)").matches)};return function(a,d){var m,h,g,p,v,b,y,S={};S.cancelScroll=function(){cancelAnimationFrame(y)},S.animateScroll=function(t,a,r){var f=o(m||n,r||{}),d="[object Number]"===Object.prototype.toString.call(t),h=d||!t.tagName?null:t;if(d||h){var g=e.pageYOffset;f.header&&!p&&(p=document.querySelector(f.header)),v||(v=s(p));var b,y,E,I=d?t:c(h,v,parseInt("function"==typeof f.offset?f.offset():f.offset,10)),O=I-g,A=u(),C=0,w=function(n,o){var r=e.pageYOffset;if(n==o||r==o||(g<o&&e.innerHeight+r)>=A)return S.cancelScroll(),l(t,o,d),f.after(t,a),b=null,!0},Q=function(t){b||(b=t),C+=t-b,y=C/parseInt(f.speed,10),y=y>1?1:y,E=g+O*i(f,y),e.scrollTo(0,Math.floor(E)),w(E,I)||(e.requestAnimationFrame(Q),b=t)};0===e.pageYOffset&&e.scrollTo(0,0),f.before(t,a),S.cancelScroll(),e.requestAnimationFrame(Q)}};var E=function(e){h&&(h.id=h.getAttribute("data-scroll-id"),S.animateScroll(h,g),h=null,g=null)},I=function(t){if(!f()&&0===t.button&&!t.metaKey&&!t.ctrlKey&&(g=t.target.closest(a))&&"a"===g.tagName.toLowerCase()&&!t.target.closest(m.ignore)&&g.hostname===e.location.hostname&&g.pathname===e.location.pathname&&/#/.test(g.href)){var n;try{n=r(decodeURIComponent(g.hash))}catch(e){n=r(g.hash)}if("#"===n){t.preventDefault(),h=document.body;var o=h.id?h.id:"smooth-scroll-top";return h.setAttribute("data-scroll-id",o),h.id="",void(e.location.hash.substring(1)===o?E():e.location.hash=o)}h=document.querySelector(n),h&&(h.setAttribute("data-scroll-id",h.id),h.id="",g.hash===e.location.hash&&(t.preventDefault(),E()))}},O=function(e){b||(b=setTimeout((function(){b=null,v=s(p)}),66))};return S.destroy=function(){m&&(document.removeEventListener("click",I,!1),e.removeEventListener("resize",O,!1),S.cancelScroll(),m=null,h=null,g=null,p=null,v=null,b=null,y=null)},S.init=function(a){t&&(S.destroy(),m=o(n,a||{}),p=m.header?document.querySelector(m.header):null,v=s(p),document.addEventListener("click",I,!1),e.addEventListener("hashchange",E,!1),p&&e.addEventListener("resize",O,!1))},S.init(d),S}}));
}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],2:[function(require,module,exports){
window.onload = function() {
    DOMHANDLER.init();
    MAPS.initialize({
        type: document.getElementById('input-type').value,
        sort: document.getElementById('input-sort').value
    });

};

var CONTACT = {
    name: document.getElementById('personName'),
    email: document.getElementById('personEmail'),
    message: document.getElementById('personMessage'),
    submit: document.getElementById('form__submit-button'),
    button: document.getElementById('close-confirmation-button'),
    infoDiv:  document.getElementById('form-submitted')
};

CONTACT.validate = function(e) {
    e.preventDefault();
    var config = {
        name: this.name.value,
        email: this.email.value,
        message: this.message.value
    };

    this.send(config);
};


CONTACT.showConfirmation = function () {
    this.name.value = null;
    this.email.value = null;
    this.message.value = null;

    this.infoDiv.classList.remove('form-submitted--hidden');
    this.infoDiv.classList.add('form-submitted--visible');

    this.name.disabled = true;
    this.email.disabled = true;
    this.message.disabled = true;
    this.submit.disabled = true;


    this.button.addEventListener('click', function(){
        this.infoDiv.classList.remove('form-submitted--visible');
        this.infoDiv.classList.add('form-submitted--hidden');

        this.name.disabled = false;
        this.email.disabled = false;
        this.message.disabled = false;
        this.submit.disabled = false;
    }.bind(this), false);

    setTimeout(function(){
        this.button.focus();
    }.bind(this), 300);
};

CONTACT.send = function(config) {

    var data = JSON.stringify(config);
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        if(xhr.readyState === 4 && xhr.status === 200)
           {
               this.showConfirmation();
           } else if (xhr.readyState === 4 && xhr.status !== 200){
               alert('Ooops, there was and error: ' + xhr.responseText +'\nPlease try again, or email us manually at herbrandapartment@gmail.com\nThank you.');
           }
    }.bind(this);

    xhr.open('POST', '/');
    xhr.setRequestHeader("Content-type", "application/json;charset=UTF-8");
    xhr.send(data);
};


//DOMHANDLER

var DOMHANDLER = {
    setInputType: function(type) {
        this.type = type;
    },
    getInputType: function() {
        return this.type;
    },
    setInputSort: function(sort) {
        this.sort = sort;
    },
    getInputSort: function() {
        return this.sort;
    }
};

//INIT MAIN EVENTS IN THE TOM
DOMHANDLER.init = function(){
    var inputType = document.getElementById('input-type'),
        inputSort = document.getElementById('input-sort'),
        gallery = document.querySelectorAll('.gallery__link'),
        menuList = document.querySelector('.menu-list'),
        contactFrorm = document.getElementById('contact-form');
        arr = Array.prototype.slice.call(gallery);

        //SET TYPES ON DOMHANDLER OBJECT AND ADD LISTENERS TO THOSE INPUTS
        this.setInputType(inputType.value);
        this.setInputSort(inputSort.value);
        inputType.addEventListener('change', this.clickListener.bind(this), false);
        inputSort.addEventListener('change', this.clickListener.bind(this), false);

        //ADD LISTENER FOR GALLERY
        arr.map(function(item){
            item.addEventListener('click', GALLERY.init.bind(GALLERY), false);
        });

        //CHECK WHEN TABBING OUT FROM NAVIGATION
        menuList.addEventListener('focusout', NAVIGATION.hideFocus.bind(NAVIGATION), false);

        menuList.addEventListener('click', NAVIGATION.hideClick.bind(NAVIGATION), false);

        document.body.addEventListener('click', NAVIGATION.hideClickOut.bind(NAVIGATION), false);

        contactFrorm.addEventListener('submit', CONTACT.validate.bind(CONTACT), false);
};



//CLICK LISTENERE ON TWO select inputs (responsible for chaging map details sorting)
DOMHANDLER.clickListener = function(e) {
    var src = e.src || e.target,
        value = src.value,
        config = {};

    if (src.id === 'input-type') {
        this.setInputType(value);
    }
    if (src.id === 'input-sort') {
        this.setInputSort(value);
    }
    config = {
        type: this.getInputType(),
        sort: this.getInputSort()
    };

    MAPS.initialize(config);
};

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

var MAPS = {
    map: {},
    service: {},
    infoWindow: {},
    distance: {},
    cords: {lat: 51.524813, lng: -0.125688},
    placesList: document.getElementById('map-list')
};

//INITIALIZE THE MAP (FIRED ON THE START AND ON EVERY CHANGE OF DATA (FROM SLECT INPUT: TYPE AND SORT))
MAPS.initialize = function(config){

    //CLEAR THE LIST OF PLACES BEFORE INITIALIZING
    this.placesList.innerHTML = '';

    //REQ OBJ: TAKES RANK, TYPE FROM CONFIG ARGUMENT PASSED TO THIS FUNCTION AND SETS DATA DEPENDING ON THAT
    var request = {
            location: this.cords,
            type: [config.type],
            rankBy: (config.sort === 'rank') ? google.maps.places.RankBy.PROMINENCE : google.maps.places.RankBy.DISTANCE,
            radius: (config.sort === 'rank') ? '1000' : null
        };

    //CREATE NEW GOOGLE MAP
    this.map = new google.maps.Map(document.getElementById('map-display'),{
        center: this.cords,
        zoom: 15,
        cords: this.cords,
        disableDefaultUI: true,
        gestureHandling: 'cooperative'
    });

    //CREATE MARKER (ICON) FOR CENTER POINT
    var marker = new google.maps.Marker({
        map: this.map,
        position: this.cords
    });

    //INITIALIZE OTHER GOOGLE SERVICES
    this.infoWindow = new google.maps.InfoWindow();
    this.service = new google.maps.places.PlacesService(this.map);
    this.distance = new google.maps.DistanceMatrixService();

    //INITIALIZE nearbySearch TO FIND PLACES IN LOCAL AREA AND CALL callback function
    this.service.nearbySearch(request, this.callback);

};

//SEARCH FOR DATA BASING ON REQUEST OBJ FROM ABOVE AND CREATE MARKERS ON MAP FOR PLACES
MAPS.callback = function(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i=0; i<results.length; i++) {
            MAPS.createMarker(results[i]);
        }
    }
};

//ACTUAL FUNCTION RESPONSIBLE FOR CREATING MARKERS
//IT SETS THE MARKER FOR EACH PLACE FOUND IN callback FUNCTION ABOVE
//AND CALLS 'CALCULATE DISTANCE/DISPLAY LIST' FUNCTION WHICH WILL SHOW THE LIST
MAPS.createMarker = function(place) {

    //CREATE NEW MARKER
    var marker = new google.maps.Marker({
        map: this.map,
        position: place.geometry.location,
        icon: {
            url: 'https://developers.google.com/maps/documentation/javascript/images/circle.png'
        }
    });

    //ADD CLICK LISTENER ON ACTUAL MARKER
    google.maps.event.addListener(marker, 'click', function(){
        this.service.getDetails(place, function(result, status){
            if (status !== google.maps.places.PlacesServiceStatus.OK) {
                console.error(status);
                return;
            }

            //SET CONTENT OF INFOWINDOW THAT WILL OPEN AFTER MARKER IS CLICKED
            this.infoWindow.setContent('<h2>'+result.name+'</h2>' + result.adr_address );
            this.infoWindow.open(this.map, marker);
        }.bind(this));
    }.bind(this));

    //CALL FUNCTION THAT WILL CALCULATE THE DISTANCE
    MAPS.calculateDistance(place, marker);

};

//THIS FUNCTION CALCULATES THE DISTANCE BETWEEN TWO POINTS: MAIN AND EACH PACE FOUND IN callback FUNCTION ABOVE
//IT TAKSE place AND marker AS PARAMETERS. MARKER IS NEEDED TO LINK THE LIST WITH ACTUAL MARKER ON THE MAP LATER
MAPS.calculateDistance = function(place, marker) {

        //POINT RETURNS ACTUAL LAT AND LNG OF THE PLACE TO HELP CALCULATING THE DISTANCE
        point = function(){
            var lat = place.geometry.location.lat(),
                lng = place.geometry.location.lng();
            return {
                lat: lat,
                lng: lng
            };
        };

        //GET DISTANCE BETWEEN origins AND destinations WITH 'WALKING' MODE
        this.distance.getDistanceMatrix({
            origins: [this.cords],
            destinations: [point()],
            travelMode: 'WALKING'
        }, function(response,status){
            //get duration value (in miutes)
            var duration = response.rows[0].elements[0].duration.text;

            //CALL THE DISPLAY LIST function
            this.displayList(duration, place, marker);
        }.bind(this));
};


//THIS FUNCTION WILL DISPLAY THE LIST OF PLACES
//IT TAKSE 3 ARGUMENTS: duration - TRAVEL TIME IN MINUTES, place, AND marker - TO LINK LIST WITH MARKER ON THE MAP
MAPS.displayList = function(duration, place, marker){


    //CREATE DIV THAT WILL BE CONTAINER FOR EACH PLACE ITEM ON THE LIST
    var div = document.createElement('div'),
        btn = document.createElement('button'),
        details = document.createElement('div'),
         span = '';
    div.classList.add('map-list__item');
    btn.classList.add('map-list__button');
    details.classList.add('map-list__details-list');
    details.classList.add('map-list__details-list--hidden');

    btn.innerHTML = 'SEE MORE DETAILS';


    //if place has photos add an image with photo and append it to span variable. if no image found, use icon
    if (place.photos !== undefined) {
            span += '<img class="map-list__image" src="'+ place.photos[0].getUrl({maxWidth: 75, maxHeight: 75})+'" alt="">';
    } else {
            span += '<img class="map-list__image" src="'+ place.icon+'" alt="">';
    }

    //BELOW COMMANDS ARE ADDING CONTENT TO EACH LIST ITEM: HEADER, DURATION INFO, DETAILS DIV AND THE see more details BUTTON
    span +=
        '<h3 class="map-list__name">'+
            place.name +
        '</h3>'+
        '<span class="map-list__duration">'+
            'Distance by walking: ' +
            '<b>' +duration+ '</b>' +
        '</span>';

    div.innerHTML = span;
    div.appendChild(details);
    div.appendChild(btn);
    this.placesList.appendChild(div);


    //ADD EVENT LISTENERS WHEN INTERACTING WITH THE LIST
    div.addEventListener('mouseover',function(){
        marker.setIcon('');
    },false);

    div.addEventListener('mouseleave',function(){
        marker.setIcon('https://developers.google.com/maps/documentation/javascript/images/circle.png');
    },false);


    //AFTER YOU CLICK ON A DIV, OPEN INFO WINDOW ON THE MARKER
    div.addEventListener('click',function(){
        this.service.getDetails(place, function(result, status){
            if (status !== google.maps.places.PlacesServiceStatus.OK) {
                console.error(status);
                return;
            }
            this.infoWindow.setContent(
                '<span class="place-name"><b>'+result.name+'</b></span>'+
                result.adr_address+
                '<a class="place-link" href="'+result.url+'" target="_blank">Open in Maps'+
                '</a>'
            );
            this.infoWindow.open(this.map, marker);
        }.bind(this));
    }.bind(this),false);


    //EVENT LISTENER FOR 'SEE MORE DETAILS' BUTTON ON PLACES LIST
    btn.addEventListener('click',function(e){
        //stop propagation (don't display the info window in map that is fired when div clicked)
        e.stopPropagation();
        this.service.getDetails(place, function(result, status){
            if (status !== google.maps.places.PlacesServiceStatus.OK) {
                console.error(status);
                return;
            }

            //ON CLICK TOGGLE THE VISIBILITY OF THE DIV
            details.classList.toggle('map-list__details-list--hidden');
            details.classList.toggle('map-list__details-list--visible');

            //BELOW VARIABLE WILL BE INSERTED INTO details DIV
            var resultsData = '';

            //IF PLACE HAS result.url ADD IT TO RESULT DATA CONTENT
                if (result.url !==undefined){
                    resultsData +=
                        '<a class="details-list__link" href="'+result.url+'" title="Link to place in google maps app" target="_blank">'+
                            '<span class="details-list__icon fa fa-google" aria-hidden="true">'+
                            '</span>'+
                            '<span class="details-list__description">'+
                                'Open in Maps'+
                            '</span>'+
                        '</a>';
                }

                //IF PLACE HAS result.website ADD IT TO RESULT DATA CONTENT
                if (result.website !== undefined) {
                    resultsData +=
                        '<a class="details-list__link" href="'+result.website+'" title="Link to webiste of the place" target="_blank">'+
                            '<span class="details-list__icon fa fa-globe" aria-hidden="true">'+
                            '</span>'+
                            '<span class="details-list__description">'+
                                'Website'+
                            '</span>'+
                        '</a>';
                }

                //IF PLACE HAS result.rating ADD IT TO RESULT DATA CONTENT
                if (result.rating !== undefined) {
                    resultsData +=
                            '<div class="details-list__item">'+
                                '<span class="details-list__icon fa fa-star" aria-hidden="true">'+
                                '</span>'+
                                '<span class="details-list__description">'+
                                    result.rating+
                                '</span>'+
                            '</div>';
                }

            //INSERT THE CONTENT INTO THE DIV AND FOCUS FIRST ELEMENT INSIDE
            details.innerHTML= resultsData;
            details.firstChild.focus();
        });
    }.bind(this),false);
};

NAVIGATION = {
    checkbox: document.getElementById('menu-checkbox')
};

//if user left navigation and event source was Contact link, hide navigation
NAVIGATION.hideFocus = function(e) {
    var source = e.target || e.srcElement;
        if (source.hash === '#contact-header') {
            this.checkbox.checked = false;
        }
};

//if youser clicked on a link, hide navigation
NAVIGATION.hideClick = function(e) {
    var source = e.target || e.srcElement;
        if (source.href) {
            this.checkbox.checked = false;
        }
};

//close navigation if clicked outside menu
NAVIGATION.hideClickOut = function(e) {
    var source = e.target || e.srcElement;
    if (this.checkbox.checked) {
        if (source.className !== 'menu__label' && source.className !== 'menu__checkbox' ) {
            if (source.className !== 'menu-list') {
                this.checkbox.checked = false;
            }
        }
    }

    //if (this.checkbox.checked &&)
};

(function(){
    var SmoothScroll = require('smooth-scroll');
    var scroll = new SmoothScroll('a[href*="#"]', {
        easing: 'easeInOutQuad'
    });
}());

var WEATHERAPI = {

};

WEATHERAPI.init = function() {
    var xhr = new XMLHttpRequest();

    xhr.open('GET', 'http://api.openweathermap.org/data/2.5/weather?q=London&appid=a472ebd642da3e64e35da328aaf3531c&units=metric',true);

    xhr.onreadystatechange = function(data) {
        if (xhr.readyState !== 4 ) {
            return false;
        }
        if (xhr.status !== 200 ){
            console.err('Status error: ' + xhr.status);
        }

        var results = {},
            containerDiv = document.getElementById('weather'),
            image = document.createElement('img'),
            div = document.createElement('div');

            image.classList.add('weather__icon');
            if (!data.srcElement){
                results = JSON.parse(data.target.response);
            } else {
                results = JSON.parse(data.srcElement.response);
            }

            div.innerHTML =
                '<span class="weather__text">'+
                    results.weather[0].main +
                '</span>'+
                '<span class="weather__text">'+
                    results.main.temp.toFixed(1) + ' °C'+
                '</span>';


            image.src = 'http://openweathermap.org/img/w/' + results.weather[0].icon + '.png';
            containerDiv.appendChild(image);
            containerDiv.appendChild(div);

    };

    xhr.send();
};

WEATHERAPI.init();

},{"smooth-scroll":1}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImNvbnRhY3QuanMiLCJkb21oYW5kbGVyLmpzIiwiZ2FsbGVyeS5qcyIsIm1hcHMuanMiLCJuYXZpZ2F0aW9uLmpzIiwic2Nyb2xsLmpzIiwid2VhdGhlcmFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNwRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNyRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDakhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN2UEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNqQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsid2luZG93Lm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgRE9NSEFORExFUi5pbml0KCk7XHJcbiAgICBNQVBTLmluaXRpYWxpemUoe1xyXG4gICAgICAgIHR5cGU6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdpbnB1dC10eXBlJykudmFsdWUsXHJcbiAgICAgICAgc29ydDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2lucHV0LXNvcnQnKS52YWx1ZVxyXG4gICAgfSk7XHJcblxyXG59O1xyXG4iLCJ2YXIgQ09OVEFDVCA9IHtcclxuICAgIG5hbWU6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwZXJzb25OYW1lJyksXHJcbiAgICBlbWFpbDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BlcnNvbkVtYWlsJyksXHJcbiAgICBtZXNzYWdlOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGVyc29uTWVzc2FnZScpLFxyXG4gICAgc3VibWl0OiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZm9ybV9fc3VibWl0LWJ1dHRvbicpLFxyXG4gICAgYnV0dG9uOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2xvc2UtY29uZmlybWF0aW9uLWJ1dHRvbicpLFxyXG4gICAgaW5mb0RpdjogIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmb3JtLXN1Ym1pdHRlZCcpXHJcbn07XHJcblxyXG5DT05UQUNULnZhbGlkYXRlID0gZnVuY3Rpb24oZSkge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgdmFyIGNvbmZpZyA9IHtcclxuICAgICAgICBuYW1lOiB0aGlzLm5hbWUudmFsdWUsXHJcbiAgICAgICAgZW1haWw6IHRoaXMuZW1haWwudmFsdWUsXHJcbiAgICAgICAgbWVzc2FnZTogdGhpcy5tZXNzYWdlLnZhbHVlXHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMuc2VuZChjb25maWcpO1xyXG59O1xyXG5cclxuXHJcbkNPTlRBQ1Quc2hvd0NvbmZpcm1hdGlvbiA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMubmFtZS52YWx1ZSA9IG51bGw7XHJcbiAgICB0aGlzLmVtYWlsLnZhbHVlID0gbnVsbDtcclxuICAgIHRoaXMubWVzc2FnZS52YWx1ZSA9IG51bGw7XHJcblxyXG4gICAgdGhpcy5pbmZvRGl2LmNsYXNzTGlzdC5yZW1vdmUoJ2Zvcm0tc3VibWl0dGVkLS1oaWRkZW4nKTtcclxuICAgIHRoaXMuaW5mb0Rpdi5jbGFzc0xpc3QuYWRkKCdmb3JtLXN1Ym1pdHRlZC0tdmlzaWJsZScpO1xyXG5cclxuICAgIHRoaXMubmFtZS5kaXNhYmxlZCA9IHRydWU7XHJcbiAgICB0aGlzLmVtYWlsLmRpc2FibGVkID0gdHJ1ZTtcclxuICAgIHRoaXMubWVzc2FnZS5kaXNhYmxlZCA9IHRydWU7XHJcbiAgICB0aGlzLnN1Ym1pdC5kaXNhYmxlZCA9IHRydWU7XHJcblxyXG5cclxuICAgIHRoaXMuYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKXtcclxuICAgICAgICB0aGlzLmluZm9EaXYuY2xhc3NMaXN0LnJlbW92ZSgnZm9ybS1zdWJtaXR0ZWQtLXZpc2libGUnKTtcclxuICAgICAgICB0aGlzLmluZm9EaXYuY2xhc3NMaXN0LmFkZCgnZm9ybS1zdWJtaXR0ZWQtLWhpZGRlbicpO1xyXG5cclxuICAgICAgICB0aGlzLm5hbWUuZGlzYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmVtYWlsLmRpc2FibGVkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5tZXNzYWdlLmRpc2FibGVkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5zdWJtaXQuZGlzYWJsZWQgPSBmYWxzZTtcclxuICAgIH0uYmluZCh0aGlzKSwgZmFsc2UpO1xyXG5cclxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcclxuICAgICAgICB0aGlzLmJ1dHRvbi5mb2N1cygpO1xyXG4gICAgfS5iaW5kKHRoaXMpLCAzMDApO1xyXG59O1xyXG5cclxuQ09OVEFDVC5zZW5kID0gZnVuY3Rpb24oY29uZmlnKSB7XHJcblxyXG4gICAgdmFyIGRhdGEgPSBKU09OLnN0cmluZ2lmeShjb25maWcpO1xyXG4gICAgdmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG5cclxuICAgIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBpZih4aHIucmVhZHlTdGF0ZSA9PT0gNCAmJiB4aHIuc3RhdHVzID09PSAyMDApXHJcbiAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICB0aGlzLnNob3dDb25maXJtYXRpb24oKTtcclxuICAgICAgICAgICB9IGVsc2UgaWYgKHhoci5yZWFkeVN0YXRlID09PSA0ICYmIHhoci5zdGF0dXMgIT09IDIwMCl7XHJcbiAgICAgICAgICAgICAgIGFsZXJ0KCdPb29wcywgdGhlcmUgd2FzIGFuZCBlcnJvcjogJyArIHhoci5yZXNwb25zZVRleHQgKydcXG5QbGVhc2UgdHJ5IGFnYWluLCBvciBlbWFpbCB1cyBtYW51YWxseSBhdCBoZXJicmFuZGFwYXJ0bWVudEBnbWFpbC5jb21cXG5UaGFuayB5b3UuJyk7XHJcbiAgICAgICAgICAgfVxyXG4gICAgfS5iaW5kKHRoaXMpO1xyXG5cclxuICAgIHhoci5vcGVuKCdQT1NUJywgJy8nKTtcclxuICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKFwiQ29udGVudC10eXBlXCIsIFwiYXBwbGljYXRpb24vanNvbjtjaGFyc2V0PVVURi04XCIpO1xyXG4gICAgeGhyLnNlbmQoZGF0YSk7XHJcbn07XHJcbiIsIlxyXG4vL0RPTUhBTkRMRVJcclxuXHJcbnZhciBET01IQU5ETEVSID0ge1xyXG4gICAgc2V0SW5wdXRUeXBlOiBmdW5jdGlvbih0eXBlKSB7XHJcbiAgICAgICAgdGhpcy50eXBlID0gdHlwZTtcclxuICAgIH0sXHJcbiAgICBnZXRJbnB1dFR5cGU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnR5cGU7XHJcbiAgICB9LFxyXG4gICAgc2V0SW5wdXRTb3J0OiBmdW5jdGlvbihzb3J0KSB7XHJcbiAgICAgICAgdGhpcy5zb3J0ID0gc29ydDtcclxuICAgIH0sXHJcbiAgICBnZXRJbnB1dFNvcnQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNvcnQ7XHJcbiAgICB9XHJcbn07XHJcblxyXG4vL0lOSVQgTUFJTiBFVkVOVFMgSU4gVEhFIFRPTVxyXG5ET01IQU5ETEVSLmluaXQgPSBmdW5jdGlvbigpe1xyXG4gICAgdmFyIGlucHV0VHlwZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdpbnB1dC10eXBlJyksXHJcbiAgICAgICAgaW5wdXRTb3J0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2lucHV0LXNvcnQnKSxcclxuICAgICAgICBnYWxsZXJ5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmdhbGxlcnlfX2xpbmsnKSxcclxuICAgICAgICBtZW51TGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tZW51LWxpc3QnKSxcclxuICAgICAgICBjb250YWN0RnJvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udGFjdC1mb3JtJyk7XHJcbiAgICAgICAgYXJyID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZ2FsbGVyeSk7XHJcblxyXG4gICAgICAgIC8vU0VUIFRZUEVTIE9OIERPTUhBTkRMRVIgT0JKRUNUIEFORCBBREQgTElTVEVORVJTIFRPIFRIT1NFIElOUFVUU1xyXG4gICAgICAgIHRoaXMuc2V0SW5wdXRUeXBlKGlucHV0VHlwZS52YWx1ZSk7XHJcbiAgICAgICAgdGhpcy5zZXRJbnB1dFNvcnQoaW5wdXRTb3J0LnZhbHVlKTtcclxuICAgICAgICBpbnB1dFR5cGUuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgdGhpcy5jbGlja0xpc3RlbmVyLmJpbmQodGhpcyksIGZhbHNlKTtcclxuICAgICAgICBpbnB1dFNvcnQuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgdGhpcy5jbGlja0xpc3RlbmVyLmJpbmQodGhpcyksIGZhbHNlKTtcclxuXHJcbiAgICAgICAgLy9BREQgTElTVEVORVIgRk9SIEdBTExFUllcclxuICAgICAgICBhcnIubWFwKGZ1bmN0aW9uKGl0ZW0pe1xyXG4gICAgICAgICAgICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgR0FMTEVSWS5pbml0LmJpbmQoR0FMTEVSWSksIGZhbHNlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy9DSEVDSyBXSEVOIFRBQkJJTkcgT1VUIEZST00gTkFWSUdBVElPTlxyXG4gICAgICAgIG1lbnVMaXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3Vzb3V0JywgTkFWSUdBVElPTi5oaWRlRm9jdXMuYmluZChOQVZJR0FUSU9OKSwgZmFsc2UpO1xyXG5cclxuICAgICAgICBtZW51TGlzdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIE5BVklHQVRJT04uaGlkZUNsaWNrLmJpbmQoTkFWSUdBVElPTiksIGZhbHNlKTtcclxuXHJcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIE5BVklHQVRJT04uaGlkZUNsaWNrT3V0LmJpbmQoTkFWSUdBVElPTiksIGZhbHNlKTtcclxuXHJcbiAgICAgICAgY29udGFjdEZyb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIENPTlRBQ1QudmFsaWRhdGUuYmluZChDT05UQUNUKSwgZmFsc2UpO1xyXG59O1xyXG5cclxuXHJcblxyXG4vL0NMSUNLIExJU1RFTkVSRSBPTiBUV08gc2VsZWN0IGlucHV0cyAocmVzcG9uc2libGUgZm9yIGNoYWdpbmcgbWFwIGRldGFpbHMgc29ydGluZylcclxuRE9NSEFORExFUi5jbGlja0xpc3RlbmVyID0gZnVuY3Rpb24oZSkge1xyXG4gICAgdmFyIHNyYyA9IGUuc3JjIHx8IGUudGFyZ2V0LFxyXG4gICAgICAgIHZhbHVlID0gc3JjLnZhbHVlLFxyXG4gICAgICAgIGNvbmZpZyA9IHt9O1xyXG5cclxuICAgIGlmIChzcmMuaWQgPT09ICdpbnB1dC10eXBlJykge1xyXG4gICAgICAgIHRoaXMuc2V0SW5wdXRUeXBlKHZhbHVlKTtcclxuICAgIH1cclxuICAgIGlmIChzcmMuaWQgPT09ICdpbnB1dC1zb3J0Jykge1xyXG4gICAgICAgIHRoaXMuc2V0SW5wdXRTb3J0KHZhbHVlKTtcclxuICAgIH1cclxuICAgIGNvbmZpZyA9IHtcclxuICAgICAgICB0eXBlOiB0aGlzLmdldElucHV0VHlwZSgpLFxyXG4gICAgICAgIHNvcnQ6IHRoaXMuZ2V0SW5wdXRTb3J0KClcclxuICAgIH07XHJcblxyXG4gICAgTUFQUy5pbml0aWFsaXplKGNvbmZpZyk7XHJcbn07XHJcbiIsIi8vR0FMTEVSWSBPQkpFQ1QgV0lUSCBNQUlOIFBST1BFUlRJRVMgT04gSVRcclxuXHJcbnZhciBHQUxMRVJZID0ge1xyXG4gICAgY29sbGVjdGlvbjogZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmdhbGxlcnlfX2l0ZW0nKSxcclxuICAgIGRpdjogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Z1bGwtc2NyZWVuLWdhbGxlcnknKSxcclxuICAgIGNsb3NlQnRuOiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKSxcclxuICAgIGNoZWNrSWZGaXJlZEFscmVhZHk6IGZhbHNlLFxyXG4gICAgd2luZG93V2lkdGg6IHdpbmRvdy5pbm5lcldpZHRoXHJcbn07XHJcblxyXG5cclxuLy9GVU5DVElPTiBUSEFUIElOSVRJQUxJWkUgR0FMTEVSWSBFVkVSWVRJTUUgSU1BR0UgSVMgQ0xJQ0tFRFxyXG5HQUxMRVJZLmluaXQgPSBmdW5jdGlvbihlKXtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcblxyXG4gICAgLy9iZWxvdyAyIHZhcmlhYmxlcyBhcmUgY2hlY2tpbmcgaWYgY2xpY2tlZCBlbGVtZW50IHdhcyBpbWFnZSAoY2xpY2spIG9yIGxpbmsgKGtleSBwcmVzcylcclxuICAgIC8vYW5kIGdldHMgc291cmNlIGJhc2Ugb24gdGhhdFxyXG4gICAgdmFyIGV2ZW50U291cmNlID0ge30sXHJcbiAgICAgICAgbGlua0VsZW1lbnQgPSB7fTtcclxuICAgICAgICBjb250ZW50ID0gJyc7XHJcblxyXG4gICAgICAgIGlmKCFlLnNyY0VsZW1lbnQpIHtcclxuICAgICAgICAgICAgZXZlbnRTb3VyY2UgPSAoZS50YXJnZXQubm9kZU5hbWUgIT09ICdJTUcnKSA/IGUudGFyZ2V0LmZpcnN0Q2hpbGQgOiBlLnRhcmdldDtcclxuICAgICAgICAgICAgbGlua0VsZW1lbnQgPSAoZS50YXJnZXQubm9kZU5hbWUgIT09ICdJTUcnKSA/IGUudGFyZ2V0IDogZS50YXJnZXQucGFyZW50RWxlbWVudDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBldmVudFNvdXJjZSA9IChlLnNyY0VsZW1lbnQubm9kZU5hbWUgIT09ICdJTUcnKSA/IGUuc3JjRWxlbWVudC5maXJzdENoaWxkIDogZS5zcmNFbGVtZW50O1xyXG4gICAgICAgICAgICBsaW5rRWxlbWVudCA9IChlLnNyY0VsZW1lbnQubm9kZU5hbWUgIT09ICdJTUcnKSA/IGUuc3JjRWxlbWVudCA6IGUuc3JjRWxlbWVudC5wYXJlbnRFbGVtZW50O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9iZWxsb3cgaXMgdHVybmluZyBodG1sIGNvbGxlY3Rpb24gaW50byBhcnJheVxyXG4gICAgICAgIGFyciA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKCB0aGlzLmNvbGxlY3Rpb24gKTtcclxuXHJcbiAgICAgICAgLy9hZGQgY2xhc3NlcyBhbmQgYXR0cmlidXRlcyB0byBodG1sIGVsZW1lbnRzXHJcbiAgICAgICAgdGhpcy5kaXYuY2xhc3NMaXN0LmFkZCgnZnVsbC1zY3JlZW4tZ2FsbGVyeS0tdmlzaWJsZScpO1xyXG4gICAgICAgIHRoaXMuY2xvc2VCdG4uY2xhc3NMaXN0LmFkZCgnZnVsbC1zY3JlZW4tZ2FsbGVyeV9fYnV0dG9uJyk7XHJcbiAgICAgICAgdGhpcy5jbG9zZUJ0bi5zZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnLCAnUHJlc3MgZW50ZXIgdG8gY2xvc2UgZ2FsbGVyeSwgdXNlIGJ1dHRvbnMgdG8gc2Nyb2xsIGdhbGxlcnknKTtcclxuXHJcbiAgICAgICAgLy9tYXAgdGhyb3VnaCBjb2xlY3Rpb24gb2YgaW1hZ2VzIGFuZCBhcHBlbmQgZGF0YSB0byAnY29udGVudCcgdmFyaWFibGVcclxuICAgICAgICBhcnIubWFwKGZ1bmN0aW9uKGl0ZW0sIGluZGV4KXtcclxuICAgICAgICAgICAgdmFyIGlkID0gaW5kZXgrMTtcclxuICAgICAgICAgICAgaWYoaXRlbS5zcmMgPT09IGV2ZW50U291cmNlLnNyYyl7XHJcbiAgICAgICAgICAgICAgICBjb250ZW50ICs9XHJcbiAgICAgICAgICAgICAgICAgICAgJzxpbWcgY2xhc3M9XCJmdWxsLXNjcmVlbi1nYWxsZXJ5X19pbWFnZVwiIGlkPVwiaW1hZ2UtYWN0aXZlXCIgc3JjPVwiLi9pbWFnZXMvJytpZCsnLmpwZ1wiIGFsdD1cIlwiPic7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb250ZW50ICs9XHJcbiAgICAgICAgICAgICAgICAnPGltZyBjbGFzcz1cImZ1bGwtc2NyZWVuLWdhbGxlcnlfX2ltYWdlXCIgc3JjPVwiLi9pbWFnZXMvJytpZCsnLmpwZ1wiIGFsdD1cIlwiPic7XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfS5iaW5kKHRoaXMpKTtcclxuXHJcbiAgICAgICAgLy93aGVuIGNsb3NlIGJ1dHRvbiBpcyBjbGlja2VkLCByZW1vdmUgdGhlIGNsYXNzIGFuZCBmb2N1cyBwcmV2aW91c2x5IG9wZW5lZCBsaW5rXHJcbiAgICAgICAgdGhpcy5jbG9zZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgICB0aGlzLmRpdi5jbGFzc0xpc3QuYWRkKCdmdWxsLXNjcmVlbi1nYWxsZXJ5LS1oaWRkZW4nKTtcclxuICAgICAgICAgICAgdGhpcy5kaXYuY2xhc3NMaXN0LnJlbW92ZSgnZnVsbC1zY3JlZW4tZ2FsbGVyeS0tdmlzaWJsZScpO1xyXG4gICAgICAgICAgICBsaW5rRWxlbWVudC5mb2N1cygpO1xyXG4gICAgICAgIH0uYmluZCh0aGlzKSwgZmFsc2UpO1xyXG5cclxuICAgICAgICAvL3doZW4gYnV0dG9uIGlzIHByZXNzZWQgd2l0aCBrZXlib3JkLCBjaGVjayBpZiBpdCBXQVMgTk9UIGVudGVyIGFuZCBwcmV2ZW50IGZvciBmb2N1c2luZyBvdGhlciBlbGVtZW50c1xyXG4gICAgICAgIHRoaXMuY2xvc2VCdG4uYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgICBpZiAoZS5rZXlDb2RlICE9PSAxMykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kaXYuZm9jdXMoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0uYmluZCh0aGlzKSwgZmFsc2UpO1xyXG5cclxuICAgICAgICAvL2Nsb3NlIGdhbGxlcnkgd2hlbiBjbGlja2VkIGFueXdoZXJlIG91dHNpZGUgaW1hZ2VcclxuICAgICAgICB0aGlzLmRpdi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgICAvL2NoZWNrIGlmIGJyb3dzZXIgc3VwcG9yc3QgZS5zcmNFbGVtZW50XHJcbiAgICAgICAgICAgIGlmIChlLnNyY0VsZW1lbnQpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAvL2lmIGVsZW1lbnQgdGhhdCB3YXMgY2xpY2tlZCB3YXNuJ3QgaW1hZ2UgLSBjbG9zZSB0aGUgZGl2XHJcbiAgICAgICAgICAgICAgICBpZiAoIWUuc3JjRWxlbWVudC5zcmMpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRpdi5jbGFzc0xpc3QuYWRkKCdmdWxsLXNjcmVlbi1nYWxsZXJ5LS1oaWRkZW4nKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRpdi5jbGFzc0xpc3QucmVtb3ZlKCdmdWxsLXNjcmVlbi1nYWxsZXJ5LS12aXNpYmxlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGlua0VsZW1lbnQuZm9jdXMoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAvL2lmIGVsZW1lbnQgdGhhdCB3YXMgY2xpY2tlZCB3YXNuJ3QgaW1hZ2UgLSBjbG9zZSB0aGUgZGl2XHJcbiAgICAgICAgICAgICAgICBpZiAoIWUudGFyZ2V0LnNyYykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGl2LmNsYXNzTGlzdC5hZGQoJ2Z1bGwtc2NyZWVuLWdhbGxlcnktLWhpZGRlbicpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGl2LmNsYXNzTGlzdC5yZW1vdmUoJ2Z1bGwtc2NyZWVuLWdhbGxlcnktLXZpc2libGUnKTtcclxuICAgICAgICAgICAgICAgICAgICBsaW5rRWxlbWVudC5mb2N1cygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfS5iaW5kKHRoaXMpLCBmYWxzZSk7XHJcblxyXG4gICAgICAgIC8vYXBwZW5kIG1hcHBlZCBjb250ZW50IHRvIHRoZSBkaXYgYW5kIGFkZCBidXR0b24gaW4gdGhlIGVuZFxyXG4gICAgICAgIHRoaXMuZGl2LmlubmVySFRNTCA9IGNvbnRlbnQ7XHJcbiAgICAgICAgdGhpcy5kaXYuYXBwZW5kQ2hpbGQodGhpcy5jbG9zZUJ0bik7XHJcblxyXG4gICAgICAgIC8vYXBwZW5kIGRpdiB0byBib2R5XHJcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aGlzLmRpdik7XHJcblxyXG4gICAgICAgIC8vZm9jdXMgdGhlIGN1cnJlbnQgZGl2ICh0aGlzIGlzIHRvIG1ha2UgcG9zc2libGUgc2Nyb2xsaW5nIHdpdGggYXJyb3cga2V5cylcclxuICAgICAgICB0aGlzLmRpdi5mb2N1cygpO1xyXG5cclxuICAgICAgICAvL0dldCBvZmZzZXQgb2YgYWN0aXZlIGVsZW1lbnQgKHRoZSBvbmUgdGhhdCB3YXMgY2xpY2tlZCBvbiB0aHVtYm5haWwpIGFuZCBzY3JvbGwgdG8gaXQncyBwb3NpdGlvblxyXG4gICAgICAgIHZhciBvVCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdpbWFnZS1hY3RpdmUnKS5vZmZzZXRUb3A7XHJcbiAgICAgICAgdGhpcy5kaXYuc2Nyb2xsVG9wID0gb1Q7XHJcblxyXG4gICAgICAgIC8vYWRkIHRleHQgdG8gdGhlIGNsb3NlIGJ1dHRvblxyXG4gICAgICAgIHRoaXMuY2xvc2VCdG4uaW5uZXJIVE1MID0gJzxzcGFuIGNsYXNzPVwiZmEgZmEtdGltZXNcIj48L3NwYW4+JztcclxuXHJcbiAgICAgICAgLy9pZiB3aW5kb3cgaXMgd2lkZXIgdGhhbiAxMDAwcHggYWxlcnQgaW5zdHJ1Y3Rpb24gYWJvdXQgZ2FsbGVyeSBzY3JvbGxpbmdcclxuICAgICAgICAvL29uIHdpZGVyIHNjcmVlbiBpbWFnZSBtYXkgdGFrZSBmdWxsIGhlaWdodCBhbmQgaXQgbWF5IGJlIGhhcmQgdG8gZmlndXJlIG91dCBob3cgdG8gbmF2aWdhdGUgdGhyb3VnaCBnYWxsZXJ5XHJcbiAgICAgICAgaWYgKHRoaXMud2luZG93V2lkdGggPiAxMDAwKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNoZWNrSWZGaXJlZEFscmVhZHkgPT09IGZhbHNlKXtcclxuICAgICAgICAgICAgICAgIGFsZXJ0KCdUTyBWSUVXIEdBTExFUlkgU0NST0xMIFVQIE9SIERPV05cXG5cXG5PUiBVU0UgQVJST1cgS0VZUycpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuY2hlY2tJZkZpcmVkQWxyZWFkeSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG59O1xyXG4iLCJ2YXIgTUFQUyA9IHtcclxuICAgIG1hcDoge30sXHJcbiAgICBzZXJ2aWNlOiB7fSxcclxuICAgIGluZm9XaW5kb3c6IHt9LFxyXG4gICAgZGlzdGFuY2U6IHt9LFxyXG4gICAgY29yZHM6IHtsYXQ6IDUxLjUyNDgxMywgbG5nOiAtMC4xMjU2ODh9LFxyXG4gICAgcGxhY2VzTGlzdDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hcC1saXN0JylcclxufTtcclxuXHJcbi8vSU5JVElBTElaRSBUSEUgTUFQIChGSVJFRCBPTiBUSEUgU1RBUlQgQU5EIE9OIEVWRVJZIENIQU5HRSBPRiBEQVRBIChGUk9NIFNMRUNUIElOUFVUOiBUWVBFIEFORCBTT1JUKSlcclxuTUFQUy5pbml0aWFsaXplID0gZnVuY3Rpb24oY29uZmlnKXtcclxuXHJcbiAgICAvL0NMRUFSIFRIRSBMSVNUIE9GIFBMQUNFUyBCRUZPUkUgSU5JVElBTElaSU5HXHJcbiAgICB0aGlzLnBsYWNlc0xpc3QuaW5uZXJIVE1MID0gJyc7XHJcblxyXG4gICAgLy9SRVEgT0JKOiBUQUtFUyBSQU5LLCBUWVBFIEZST00gQ09ORklHIEFSR1VNRU5UIFBBU1NFRCBUTyBUSElTIEZVTkNUSU9OIEFORCBTRVRTIERBVEEgREVQRU5ESU5HIE9OIFRIQVRcclxuICAgIHZhciByZXF1ZXN0ID0ge1xyXG4gICAgICAgICAgICBsb2NhdGlvbjogdGhpcy5jb3JkcyxcclxuICAgICAgICAgICAgdHlwZTogW2NvbmZpZy50eXBlXSxcclxuICAgICAgICAgICAgcmFua0J5OiAoY29uZmlnLnNvcnQgPT09ICdyYW5rJykgPyBnb29nbGUubWFwcy5wbGFjZXMuUmFua0J5LlBST01JTkVOQ0UgOiBnb29nbGUubWFwcy5wbGFjZXMuUmFua0J5LkRJU1RBTkNFLFxyXG4gICAgICAgICAgICByYWRpdXM6IChjb25maWcuc29ydCA9PT0gJ3JhbmsnKSA/ICcxMDAwJyA6IG51bGxcclxuICAgICAgICB9O1xyXG5cclxuICAgIC8vQ1JFQVRFIE5FVyBHT09HTEUgTUFQXHJcbiAgICB0aGlzLm1hcCA9IG5ldyBnb29nbGUubWFwcy5NYXAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hcC1kaXNwbGF5Jykse1xyXG4gICAgICAgIGNlbnRlcjogdGhpcy5jb3JkcyxcclxuICAgICAgICB6b29tOiAxNSxcclxuICAgICAgICBjb3JkczogdGhpcy5jb3JkcyxcclxuICAgICAgICBkaXNhYmxlRGVmYXVsdFVJOiB0cnVlLFxyXG4gICAgICAgIGdlc3R1cmVIYW5kbGluZzogJ2Nvb3BlcmF0aXZlJ1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy9DUkVBVEUgTUFSS0VSIChJQ09OKSBGT1IgQ0VOVEVSIFBPSU5UXHJcbiAgICB2YXIgbWFya2VyID0gbmV3IGdvb2dsZS5tYXBzLk1hcmtlcih7XHJcbiAgICAgICAgbWFwOiB0aGlzLm1hcCxcclxuICAgICAgICBwb3NpdGlvbjogdGhpcy5jb3Jkc1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy9JTklUSUFMSVpFIE9USEVSIEdPT0dMRSBTRVJWSUNFU1xyXG4gICAgdGhpcy5pbmZvV2luZG93ID0gbmV3IGdvb2dsZS5tYXBzLkluZm9XaW5kb3coKTtcclxuICAgIHRoaXMuc2VydmljZSA9IG5ldyBnb29nbGUubWFwcy5wbGFjZXMuUGxhY2VzU2VydmljZSh0aGlzLm1hcCk7XHJcbiAgICB0aGlzLmRpc3RhbmNlID0gbmV3IGdvb2dsZS5tYXBzLkRpc3RhbmNlTWF0cml4U2VydmljZSgpO1xyXG5cclxuICAgIC8vSU5JVElBTElaRSBuZWFyYnlTZWFyY2ggVE8gRklORCBQTEFDRVMgSU4gTE9DQUwgQVJFQSBBTkQgQ0FMTCBjYWxsYmFjayBmdW5jdGlvblxyXG4gICAgdGhpcy5zZXJ2aWNlLm5lYXJieVNlYXJjaChyZXF1ZXN0LCB0aGlzLmNhbGxiYWNrKTtcclxuXHJcbn07XHJcblxyXG4vL1NFQVJDSCBGT1IgREFUQSBCQVNJTkcgT04gUkVRVUVTVCBPQkogRlJPTSBBQk9WRSBBTkQgQ1JFQVRFIE1BUktFUlMgT04gTUFQIEZPUiBQTEFDRVNcclxuTUFQUy5jYWxsYmFjayA9IGZ1bmN0aW9uKHJlc3VsdHMsIHN0YXR1cykge1xyXG4gICAgaWYgKHN0YXR1cyA9PSBnb29nbGUubWFwcy5wbGFjZXMuUGxhY2VzU2VydmljZVN0YXR1cy5PSykge1xyXG4gICAgICAgIGZvciAodmFyIGk9MDsgaTxyZXN1bHRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIE1BUFMuY3JlYXRlTWFya2VyKHJlc3VsdHNbaV0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuXHJcbi8vQUNUVUFMIEZVTkNUSU9OIFJFU1BPTlNJQkxFIEZPUiBDUkVBVElORyBNQVJLRVJTXHJcbi8vSVQgU0VUUyBUSEUgTUFSS0VSIEZPUiBFQUNIIFBMQUNFIEZPVU5EIElOIGNhbGxiYWNrIEZVTkNUSU9OIEFCT1ZFXHJcbi8vQU5EIENBTExTICdDQUxDVUxBVEUgRElTVEFOQ0UvRElTUExBWSBMSVNUJyBGVU5DVElPTiBXSElDSCBXSUxMIFNIT1cgVEhFIExJU1RcclxuTUFQUy5jcmVhdGVNYXJrZXIgPSBmdW5jdGlvbihwbGFjZSkge1xyXG5cclxuICAgIC8vQ1JFQVRFIE5FVyBNQVJLRVJcclxuICAgIHZhciBtYXJrZXIgPSBuZXcgZ29vZ2xlLm1hcHMuTWFya2VyKHtcclxuICAgICAgICBtYXA6IHRoaXMubWFwLFxyXG4gICAgICAgIHBvc2l0aW9uOiBwbGFjZS5nZW9tZXRyeS5sb2NhdGlvbixcclxuICAgICAgICBpY29uOiB7XHJcbiAgICAgICAgICAgIHVybDogJ2h0dHBzOi8vZGV2ZWxvcGVycy5nb29nbGUuY29tL21hcHMvZG9jdW1lbnRhdGlvbi9qYXZhc2NyaXB0L2ltYWdlcy9jaXJjbGUucG5nJ1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8vQUREIENMSUNLIExJU1RFTkVSIE9OIEFDVFVBTCBNQVJLRVJcclxuICAgIGdvb2dsZS5tYXBzLmV2ZW50LmFkZExpc3RlbmVyKG1hcmtlciwgJ2NsaWNrJywgZnVuY3Rpb24oKXtcclxuICAgICAgICB0aGlzLnNlcnZpY2UuZ2V0RGV0YWlscyhwbGFjZSwgZnVuY3Rpb24ocmVzdWx0LCBzdGF0dXMpe1xyXG4gICAgICAgICAgICBpZiAoc3RhdHVzICE9PSBnb29nbGUubWFwcy5wbGFjZXMuUGxhY2VzU2VydmljZVN0YXR1cy5PSykge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihzdGF0dXMpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvL1NFVCBDT05URU5UIE9GIElORk9XSU5ET1cgVEhBVCBXSUxMIE9QRU4gQUZURVIgTUFSS0VSIElTIENMSUNLRURcclxuICAgICAgICAgICAgdGhpcy5pbmZvV2luZG93LnNldENvbnRlbnQoJzxoMj4nK3Jlc3VsdC5uYW1lKyc8L2gyPicgKyByZXN1bHQuYWRyX2FkZHJlc3MgKTtcclxuICAgICAgICAgICAgdGhpcy5pbmZvV2luZG93Lm9wZW4odGhpcy5tYXAsIG1hcmtlcik7XHJcbiAgICAgICAgfS5iaW5kKHRoaXMpKTtcclxuICAgIH0uYmluZCh0aGlzKSk7XHJcblxyXG4gICAgLy9DQUxMIEZVTkNUSU9OIFRIQVQgV0lMTCBDQUxDVUxBVEUgVEhFIERJU1RBTkNFXHJcbiAgICBNQVBTLmNhbGN1bGF0ZURpc3RhbmNlKHBsYWNlLCBtYXJrZXIpO1xyXG5cclxufTtcclxuXHJcbi8vVEhJUyBGVU5DVElPTiBDQUxDVUxBVEVTIFRIRSBESVNUQU5DRSBCRVRXRUVOIFRXTyBQT0lOVFM6IE1BSU4gQU5EIEVBQ0ggUEFDRSBGT1VORCBJTiBjYWxsYmFjayBGVU5DVElPTiBBQk9WRVxyXG4vL0lUIFRBS1NFIHBsYWNlIEFORCBtYXJrZXIgQVMgUEFSQU1FVEVSUy4gTUFSS0VSIElTIE5FRURFRCBUTyBMSU5LIFRIRSBMSVNUIFdJVEggQUNUVUFMIE1BUktFUiBPTiBUSEUgTUFQIExBVEVSXHJcbk1BUFMuY2FsY3VsYXRlRGlzdGFuY2UgPSBmdW5jdGlvbihwbGFjZSwgbWFya2VyKSB7XHJcblxyXG4gICAgICAgIC8vUE9JTlQgUkVUVVJOUyBBQ1RVQUwgTEFUIEFORCBMTkcgT0YgVEhFIFBMQUNFIFRPIEhFTFAgQ0FMQ1VMQVRJTkcgVEhFIERJU1RBTkNFXHJcbiAgICAgICAgcG9pbnQgPSBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICB2YXIgbGF0ID0gcGxhY2UuZ2VvbWV0cnkubG9jYXRpb24ubGF0KCksXHJcbiAgICAgICAgICAgICAgICBsbmcgPSBwbGFjZS5nZW9tZXRyeS5sb2NhdGlvbi5sbmcoKTtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIGxhdDogbGF0LFxyXG4gICAgICAgICAgICAgICAgbG5nOiBsbmdcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvL0dFVCBESVNUQU5DRSBCRVRXRUVOIG9yaWdpbnMgQU5EIGRlc3RpbmF0aW9ucyBXSVRIICdXQUxLSU5HJyBNT0RFXHJcbiAgICAgICAgdGhpcy5kaXN0YW5jZS5nZXREaXN0YW5jZU1hdHJpeCh7XHJcbiAgICAgICAgICAgIG9yaWdpbnM6IFt0aGlzLmNvcmRzXSxcclxuICAgICAgICAgICAgZGVzdGluYXRpb25zOiBbcG9pbnQoKV0sXHJcbiAgICAgICAgICAgIHRyYXZlbE1vZGU6ICdXQUxLSU5HJ1xyXG4gICAgICAgIH0sIGZ1bmN0aW9uKHJlc3BvbnNlLHN0YXR1cyl7XHJcbiAgICAgICAgICAgIC8vZ2V0IGR1cmF0aW9uIHZhbHVlIChpbiBtaXV0ZXMpXHJcbiAgICAgICAgICAgIHZhciBkdXJhdGlvbiA9IHJlc3BvbnNlLnJvd3NbMF0uZWxlbWVudHNbMF0uZHVyYXRpb24udGV4dDtcclxuXHJcbiAgICAgICAgICAgIC8vQ0FMTCBUSEUgRElTUExBWSBMSVNUIGZ1bmN0aW9uXHJcbiAgICAgICAgICAgIHRoaXMuZGlzcGxheUxpc3QoZHVyYXRpb24sIHBsYWNlLCBtYXJrZXIpO1xyXG4gICAgICAgIH0uYmluZCh0aGlzKSk7XHJcbn07XHJcblxyXG5cclxuLy9USElTIEZVTkNUSU9OIFdJTEwgRElTUExBWSBUSEUgTElTVCBPRiBQTEFDRVNcclxuLy9JVCBUQUtTRSAzIEFSR1VNRU5UUzogZHVyYXRpb24gLSBUUkFWRUwgVElNRSBJTiBNSU5VVEVTLCBwbGFjZSwgQU5EIG1hcmtlciAtIFRPIExJTksgTElTVCBXSVRIIE1BUktFUiBPTiBUSEUgTUFQXHJcbk1BUFMuZGlzcGxheUxpc3QgPSBmdW5jdGlvbihkdXJhdGlvbiwgcGxhY2UsIG1hcmtlcil7XHJcblxyXG5cclxuICAgIC8vQ1JFQVRFIERJViBUSEFUIFdJTEwgQkUgQ09OVEFJTkVSIEZPUiBFQUNIIFBMQUNFIElURU0gT04gVEhFIExJU1RcclxuICAgIHZhciBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSxcclxuICAgICAgICBidG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKSxcclxuICAgICAgICBkZXRhaWxzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JyksXHJcbiAgICAgICAgIHNwYW4gPSAnJztcclxuICAgIGRpdi5jbGFzc0xpc3QuYWRkKCdtYXAtbGlzdF9faXRlbScpO1xyXG4gICAgYnRuLmNsYXNzTGlzdC5hZGQoJ21hcC1saXN0X19idXR0b24nKTtcclxuICAgIGRldGFpbHMuY2xhc3NMaXN0LmFkZCgnbWFwLWxpc3RfX2RldGFpbHMtbGlzdCcpO1xyXG4gICAgZGV0YWlscy5jbGFzc0xpc3QuYWRkKCdtYXAtbGlzdF9fZGV0YWlscy1saXN0LS1oaWRkZW4nKTtcclxuXHJcbiAgICBidG4uaW5uZXJIVE1MID0gJ1NFRSBNT1JFIERFVEFJTFMnO1xyXG5cclxuXHJcbiAgICAvL2lmIHBsYWNlIGhhcyBwaG90b3MgYWRkIGFuIGltYWdlIHdpdGggcGhvdG8gYW5kIGFwcGVuZCBpdCB0byBzcGFuIHZhcmlhYmxlLiBpZiBubyBpbWFnZSBmb3VuZCwgdXNlIGljb25cclxuICAgIGlmIChwbGFjZS5waG90b3MgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBzcGFuICs9ICc8aW1nIGNsYXNzPVwibWFwLWxpc3RfX2ltYWdlXCIgc3JjPVwiJysgcGxhY2UucGhvdG9zWzBdLmdldFVybCh7bWF4V2lkdGg6IDc1LCBtYXhIZWlnaHQ6IDc1fSkrJ1wiIGFsdD1cIlwiPic7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBzcGFuICs9ICc8aW1nIGNsYXNzPVwibWFwLWxpc3RfX2ltYWdlXCIgc3JjPVwiJysgcGxhY2UuaWNvbisnXCIgYWx0PVwiXCI+JztcclxuICAgIH1cclxuXHJcbiAgICAvL0JFTE9XIENPTU1BTkRTIEFSRSBBRERJTkcgQ09OVEVOVCBUTyBFQUNIIExJU1QgSVRFTTogSEVBREVSLCBEVVJBVElPTiBJTkZPLCBERVRBSUxTIERJViBBTkQgVEhFIHNlZSBtb3JlIGRldGFpbHMgQlVUVE9OXHJcbiAgICBzcGFuICs9XHJcbiAgICAgICAgJzxoMyBjbGFzcz1cIm1hcC1saXN0X19uYW1lXCI+JytcclxuICAgICAgICAgICAgcGxhY2UubmFtZSArXHJcbiAgICAgICAgJzwvaDM+JytcclxuICAgICAgICAnPHNwYW4gY2xhc3M9XCJtYXAtbGlzdF9fZHVyYXRpb25cIj4nK1xyXG4gICAgICAgICAgICAnRGlzdGFuY2UgYnkgd2Fsa2luZzogJyArXHJcbiAgICAgICAgICAgICc8Yj4nICtkdXJhdGlvbisgJzwvYj4nICtcclxuICAgICAgICAnPC9zcGFuPic7XHJcblxyXG4gICAgZGl2LmlubmVySFRNTCA9IHNwYW47XHJcbiAgICBkaXYuYXBwZW5kQ2hpbGQoZGV0YWlscyk7XHJcbiAgICBkaXYuYXBwZW5kQ2hpbGQoYnRuKTtcclxuICAgIHRoaXMucGxhY2VzTGlzdC5hcHBlbmRDaGlsZChkaXYpO1xyXG5cclxuXHJcbiAgICAvL0FERCBFVkVOVCBMSVNURU5FUlMgV0hFTiBJTlRFUkFDVElORyBXSVRIIFRIRSBMSVNUXHJcbiAgICBkaXYuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdmVyJyxmdW5jdGlvbigpe1xyXG4gICAgICAgIG1hcmtlci5zZXRJY29uKCcnKTtcclxuICAgIH0sZmFsc2UpO1xyXG5cclxuICAgIGRpdi5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJyxmdW5jdGlvbigpe1xyXG4gICAgICAgIG1hcmtlci5zZXRJY29uKCdodHRwczovL2RldmVsb3BlcnMuZ29vZ2xlLmNvbS9tYXBzL2RvY3VtZW50YXRpb24vamF2YXNjcmlwdC9pbWFnZXMvY2lyY2xlLnBuZycpO1xyXG4gICAgfSxmYWxzZSk7XHJcblxyXG5cclxuICAgIC8vQUZURVIgWU9VIENMSUNLIE9OIEEgRElWLCBPUEVOIElORk8gV0lORE9XIE9OIFRIRSBNQVJLRVJcclxuICAgIGRpdi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsZnVuY3Rpb24oKXtcclxuICAgICAgICB0aGlzLnNlcnZpY2UuZ2V0RGV0YWlscyhwbGFjZSwgZnVuY3Rpb24ocmVzdWx0LCBzdGF0dXMpe1xyXG4gICAgICAgICAgICBpZiAoc3RhdHVzICE9PSBnb29nbGUubWFwcy5wbGFjZXMuUGxhY2VzU2VydmljZVN0YXR1cy5PSykge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihzdGF0dXMpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuaW5mb1dpbmRvdy5zZXRDb250ZW50KFxyXG4gICAgICAgICAgICAgICAgJzxzcGFuIGNsYXNzPVwicGxhY2UtbmFtZVwiPjxiPicrcmVzdWx0Lm5hbWUrJzwvYj48L3NwYW4+JytcclxuICAgICAgICAgICAgICAgIHJlc3VsdC5hZHJfYWRkcmVzcytcclxuICAgICAgICAgICAgICAgICc8YSBjbGFzcz1cInBsYWNlLWxpbmtcIiBocmVmPVwiJytyZXN1bHQudXJsKydcIiB0YXJnZXQ9XCJfYmxhbmtcIj5PcGVuIGluIE1hcHMnK1xyXG4gICAgICAgICAgICAgICAgJzwvYT4nXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIHRoaXMuaW5mb1dpbmRvdy5vcGVuKHRoaXMubWFwLCBtYXJrZXIpO1xyXG4gICAgICAgIH0uYmluZCh0aGlzKSk7XHJcbiAgICB9LmJpbmQodGhpcyksZmFsc2UpO1xyXG5cclxuXHJcbiAgICAvL0VWRU5UIExJU1RFTkVSIEZPUiAnU0VFIE1PUkUgREVUQUlMUycgQlVUVE9OIE9OIFBMQUNFUyBMSVNUXHJcbiAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgIC8vc3RvcCBwcm9wYWdhdGlvbiAoZG9uJ3QgZGlzcGxheSB0aGUgaW5mbyB3aW5kb3cgaW4gbWFwIHRoYXQgaXMgZmlyZWQgd2hlbiBkaXYgY2xpY2tlZClcclxuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIHRoaXMuc2VydmljZS5nZXREZXRhaWxzKHBsYWNlLCBmdW5jdGlvbihyZXN1bHQsIHN0YXR1cyl7XHJcbiAgICAgICAgICAgIGlmIChzdGF0dXMgIT09IGdvb2dsZS5tYXBzLnBsYWNlcy5QbGFjZXNTZXJ2aWNlU3RhdHVzLk9LKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKHN0YXR1cyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vT04gQ0xJQ0sgVE9HR0xFIFRIRSBWSVNJQklMSVRZIE9GIFRIRSBESVZcclxuICAgICAgICAgICAgZGV0YWlscy5jbGFzc0xpc3QudG9nZ2xlKCdtYXAtbGlzdF9fZGV0YWlscy1saXN0LS1oaWRkZW4nKTtcclxuICAgICAgICAgICAgZGV0YWlscy5jbGFzc0xpc3QudG9nZ2xlKCdtYXAtbGlzdF9fZGV0YWlscy1saXN0LS12aXNpYmxlJyk7XHJcblxyXG4gICAgICAgICAgICAvL0JFTE9XIFZBUklBQkxFIFdJTEwgQkUgSU5TRVJURUQgSU5UTyBkZXRhaWxzIERJVlxyXG4gICAgICAgICAgICB2YXIgcmVzdWx0c0RhdGEgPSAnJztcclxuXHJcbiAgICAgICAgICAgIC8vSUYgUExBQ0UgSEFTIHJlc3VsdC51cmwgQUREIElUIFRPIFJFU1VMVCBEQVRBIENPTlRFTlRcclxuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQudXJsICE9PXVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0c0RhdGEgKz1cclxuICAgICAgICAgICAgICAgICAgICAgICAgJzxhIGNsYXNzPVwiZGV0YWlscy1saXN0X19saW5rXCIgaHJlZj1cIicrcmVzdWx0LnVybCsnXCIgdGl0bGU9XCJMaW5rIHRvIHBsYWNlIGluIGdvb2dsZSBtYXBzIGFwcFwiIHRhcmdldD1cIl9ibGFua1wiPicrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJkZXRhaWxzLWxpc3RfX2ljb24gZmEgZmEtZ29vZ2xlXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+JytcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8L3NwYW4+JytcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cImRldGFpbHMtbGlzdF9fZGVzY3JpcHRpb25cIj4nK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdPcGVuIGluIE1hcHMnK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJzwvc3Bhbj4nK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPC9hPic7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy9JRiBQTEFDRSBIQVMgcmVzdWx0LndlYnNpdGUgQUREIElUIFRPIFJFU1VMVCBEQVRBIENPTlRFTlRcclxuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQud2Vic2l0ZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0c0RhdGEgKz1cclxuICAgICAgICAgICAgICAgICAgICAgICAgJzxhIGNsYXNzPVwiZGV0YWlscy1saXN0X19saW5rXCIgaHJlZj1cIicrcmVzdWx0LndlYnNpdGUrJ1wiIHRpdGxlPVwiTGluayB0byB3ZWJpc3RlIG9mIHRoZSBwbGFjZVwiIHRhcmdldD1cIl9ibGFua1wiPicrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJkZXRhaWxzLWxpc3RfX2ljb24gZmEgZmEtZ2xvYmVcIiBhcmlhLWhpZGRlbj1cInRydWVcIj4nK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJzwvc3Bhbj4nK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJzxzcGFuIGNsYXNzPVwiZGV0YWlscy1saXN0X19kZXNjcmlwdGlvblwiPicrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ1dlYnNpdGUnK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJzwvc3Bhbj4nK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPC9hPic7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy9JRiBQTEFDRSBIQVMgcmVzdWx0LnJhdGluZyBBREQgSVQgVE8gUkVTVUxUIERBVEEgQ09OVEVOVFxyXG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5yYXRpbmcgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdHNEYXRhICs9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cImRldGFpbHMtbGlzdF9faXRlbVwiPicrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJzxzcGFuIGNsYXNzPVwiZGV0YWlscy1saXN0X19pY29uIGZhIGZhLXN0YXJcIiBhcmlhLWhpZGRlbj1cInRydWVcIj4nK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8L3NwYW4+JytcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJkZXRhaWxzLWxpc3RfX2Rlc2NyaXB0aW9uXCI+JytcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnJhdGluZytcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPC9zcGFuPicrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPC9kaXY+JztcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vSU5TRVJUIFRIRSBDT05URU5UIElOVE8gVEhFIERJViBBTkQgRk9DVVMgRklSU1QgRUxFTUVOVCBJTlNJREVcclxuICAgICAgICAgICAgZGV0YWlscy5pbm5lckhUTUw9IHJlc3VsdHNEYXRhO1xyXG4gICAgICAgICAgICBkZXRhaWxzLmZpcnN0Q2hpbGQuZm9jdXMoKTtcclxuICAgICAgICB9KTtcclxuICAgIH0uYmluZCh0aGlzKSxmYWxzZSk7XHJcbn07XHJcbiIsIk5BVklHQVRJT04gPSB7XHJcbiAgICBjaGVja2JveDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21lbnUtY2hlY2tib3gnKVxyXG59O1xyXG5cclxuLy9pZiB1c2VyIGxlZnQgbmF2aWdhdGlvbiBhbmQgZXZlbnQgc291cmNlIHdhcyBDb250YWN0IGxpbmssIGhpZGUgbmF2aWdhdGlvblxyXG5OQVZJR0FUSU9OLmhpZGVGb2N1cyA9IGZ1bmN0aW9uKGUpIHtcclxuICAgIHZhciBzb3VyY2UgPSBlLnRhcmdldCB8fCBlLnNyY0VsZW1lbnQ7XHJcbiAgICAgICAgaWYgKHNvdXJjZS5oYXNoID09PSAnI2NvbnRhY3QtaGVhZGVyJykge1xyXG4gICAgICAgICAgICB0aGlzLmNoZWNrYm94LmNoZWNrZWQgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbn07XHJcblxyXG4vL2lmIHlvdXNlciBjbGlja2VkIG9uIGEgbGluaywgaGlkZSBuYXZpZ2F0aW9uXHJcbk5BVklHQVRJT04uaGlkZUNsaWNrID0gZnVuY3Rpb24oZSkge1xyXG4gICAgdmFyIHNvdXJjZSA9IGUudGFyZ2V0IHx8IGUuc3JjRWxlbWVudDtcclxuICAgICAgICBpZiAoc291cmNlLmhyZWYpIHtcclxuICAgICAgICAgICAgdGhpcy5jaGVja2JveC5jaGVja2VkID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG59O1xyXG5cclxuLy9jbG9zZSBuYXZpZ2F0aW9uIGlmIGNsaWNrZWQgb3V0c2lkZSBtZW51XHJcbk5BVklHQVRJT04uaGlkZUNsaWNrT3V0ID0gZnVuY3Rpb24oZSkge1xyXG4gICAgdmFyIHNvdXJjZSA9IGUudGFyZ2V0IHx8IGUuc3JjRWxlbWVudDtcclxuICAgIGlmICh0aGlzLmNoZWNrYm94LmNoZWNrZWQpIHtcclxuICAgICAgICBpZiAoc291cmNlLmNsYXNzTmFtZSAhPT0gJ21lbnVfX2xhYmVsJyAmJiBzb3VyY2UuY2xhc3NOYW1lICE9PSAnbWVudV9fY2hlY2tib3gnICkge1xyXG4gICAgICAgICAgICBpZiAoc291cmNlLmNsYXNzTmFtZSAhPT0gJ21lbnUtbGlzdCcpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tib3guY2hlY2tlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vaWYgKHRoaXMuY2hlY2tib3guY2hlY2tlZCAmJilcclxufTtcclxuIiwiKGZ1bmN0aW9uKCl7XHJcbiAgICB2YXIgU21vb3RoU2Nyb2xsID0gcmVxdWlyZSgnc21vb3RoLXNjcm9sbCcpO1xyXG4gICAgdmFyIHNjcm9sbCA9IG5ldyBTbW9vdGhTY3JvbGwoJ2FbaHJlZio9XCIjXCJdJywge1xyXG4gICAgICAgIGVhc2luZzogJ2Vhc2VJbk91dFF1YWQnXHJcbiAgICB9KTtcclxufSgpKTtcclxuIiwidmFyIFdFQVRIRVJBUEkgPSB7XHJcblxyXG59O1xyXG5cclxuV0VBVEhFUkFQSS5pbml0ID0gZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcblxyXG4gICAgeGhyLm9wZW4oJ0dFVCcsICdodHRwOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9kYXRhLzIuNS93ZWF0aGVyP3E9TG9uZG9uJmFwcGlkPWE0NzJlYmQ2NDJkYTNlNjRlMzVkYTMyOGFhZjM1MzFjJnVuaXRzPW1ldHJpYycsdHJ1ZSk7XHJcblxyXG4gICAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgICAgICBpZiAoeGhyLnJlYWR5U3RhdGUgIT09IDQgKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHhoci5zdGF0dXMgIT09IDIwMCApe1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycignU3RhdHVzIGVycm9yOiAnICsgeGhyLnN0YXR1cyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgcmVzdWx0cyA9IHt9LFxyXG4gICAgICAgICAgICBjb250YWluZXJEaXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnd2VhdGhlcicpLFxyXG4gICAgICAgICAgICBpbWFnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpLFxyXG4gICAgICAgICAgICBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuXHJcbiAgICAgICAgICAgIGltYWdlLmNsYXNzTGlzdC5hZGQoJ3dlYXRoZXJfX2ljb24nKTtcclxuICAgICAgICAgICAgaWYgKCFkYXRhLnNyY0VsZW1lbnQpe1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0cyA9IEpTT04ucGFyc2UoZGF0YS50YXJnZXQucmVzcG9uc2UpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0cyA9IEpTT04ucGFyc2UoZGF0YS5zcmNFbGVtZW50LnJlc3BvbnNlKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZGl2LmlubmVySFRNTCA9XHJcbiAgICAgICAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJ3ZWF0aGVyX190ZXh0XCI+JytcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHRzLndlYXRoZXJbMF0ubWFpbiArXHJcbiAgICAgICAgICAgICAgICAnPC9zcGFuPicrXHJcbiAgICAgICAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJ3ZWF0aGVyX190ZXh0XCI+JytcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHRzLm1haW4udGVtcC50b0ZpeGVkKDEpICsgJyDCsEMnK1xyXG4gICAgICAgICAgICAgICAgJzwvc3Bhbj4nO1xyXG5cclxuXHJcbiAgICAgICAgICAgIGltYWdlLnNyYyA9ICdodHRwOi8vb3BlbndlYXRoZXJtYXAub3JnL2ltZy93LycgKyByZXN1bHRzLndlYXRoZXJbMF0uaWNvbiArICcucG5nJztcclxuICAgICAgICAgICAgY29udGFpbmVyRGl2LmFwcGVuZENoaWxkKGltYWdlKTtcclxuICAgICAgICAgICAgY29udGFpbmVyRGl2LmFwcGVuZENoaWxkKGRpdik7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICB4aHIuc2VuZCgpO1xyXG59O1xyXG5cclxuV0VBVEhFUkFQSS5pbml0KCk7XHJcbiJdfQ==
