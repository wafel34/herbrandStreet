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
        gallery = document.querySelectorAll('.gallery__link');
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
    var eventSource = (e.srcElement.nodeName !== 'IMG') ? e.srcElement.firstChild : e.srcElement;
        linkElement = (e.srcElement.nodeName !== 'IMG') ? e.srcElement : e.srcElement.parentElement;
        content = '';
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
            if (!e.srcElement.src) {
                this.div.classList.add('full-screen-gallery--hidden');
                this.div.classList.remove('full-screen-gallery--visible');
                linkElement.focus();
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

    xhr.open('GET', 'http://api.openweathermap.org/data/2.5/weather?q=London&appid=a472ebd642da3e64e35da328aaf3531c',true);
    xhr.onreadystatechange = function(data) {
        if (xhr.readyState !== 4 ) {
            return false;
        }
        if (xhr.status !== 200 ){
            console.err('Status error: ' + xhr.status);
        }
        var results = JSON.parse(data.srcElement.response);
            //containerDiv = document.getElementById('weather');

    };

    xhr.send();
};

WEATHERAPI.init();

},{"smooth-scroll":1}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImRvbWhhbmRsZXIuanMiLCJnYWxsZXJ5LmpzIiwibWFwcy5qcyIsInNjcm9sbC5qcyIsIndlYXRoZXJhcHAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzFEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzFGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdlBBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIndpbmRvdy5vbmxvYWQgPSBmdW5jdGlvbigpIHtcclxuICAgIERPTUhBTkRMRVIuaW5pdCgpO1xyXG4gICAgTUFQUy5pbml0aWFsaXplKHtcclxuICAgICAgICB0eXBlOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaW5wdXQtdHlwZScpLnZhbHVlLFxyXG4gICAgICAgIHNvcnQ6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdpbnB1dC1zb3J0JykudmFsdWVcclxuICAgIH0pO1xyXG5cclxufTtcclxuIiwiXHJcbi8vRE9NSEFORExFUlxyXG5cclxudmFyIERPTUhBTkRMRVIgPSB7XHJcbiAgICBzZXRJbnB1dFR5cGU6IGZ1bmN0aW9uKHR5cGUpIHtcclxuICAgICAgICB0aGlzLnR5cGUgPSB0eXBlO1xyXG4gICAgfSxcclxuICAgIGdldElucHV0VHlwZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudHlwZTtcclxuICAgIH0sXHJcbiAgICBzZXRJbnB1dFNvcnQ6IGZ1bmN0aW9uKHNvcnQpIHtcclxuICAgICAgICB0aGlzLnNvcnQgPSBzb3J0O1xyXG4gICAgfSxcclxuICAgIGdldElucHV0U29ydDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc29ydDtcclxuICAgIH1cclxufTtcclxuXHJcbi8vSU5JVCBNQUlOIEVWRU5UUyBJTiBUSEUgVE9NXHJcbkRPTUhBTkRMRVIuaW5pdCA9IGZ1bmN0aW9uKCl7XHJcbiAgICB2YXIgaW5wdXRUeXBlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2lucHV0LXR5cGUnKSxcclxuICAgICAgICBpbnB1dFNvcnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaW5wdXQtc29ydCcpLFxyXG4gICAgICAgIGdhbGxlcnkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZ2FsbGVyeV9fbGluaycpO1xyXG4gICAgICAgIGFyciA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGdhbGxlcnkpO1xyXG5cclxuICAgICAgICAvL1NFVCBUWVBFUyBPTiBET01IQU5ETEVSIE9CSkVDVCBBTkQgQUREIExJU1RFTkVSUyBUTyBUSE9TRSBJTlBVVFNcclxuICAgICAgICB0aGlzLnNldElucHV0VHlwZShpbnB1dFR5cGUudmFsdWUpO1xyXG4gICAgICAgIHRoaXMuc2V0SW5wdXRTb3J0KGlucHV0U29ydC52YWx1ZSk7XHJcbiAgICAgICAgaW5wdXRUeXBlLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIHRoaXMuY2xpY2tMaXN0ZW5lci5iaW5kKHRoaXMpLCBmYWxzZSk7XHJcbiAgICAgICAgaW5wdXRTb3J0LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIHRoaXMuY2xpY2tMaXN0ZW5lci5iaW5kKHRoaXMpLCBmYWxzZSk7XHJcblxyXG4gICAgICAgIC8vQUREIExJU1RFTkVSIEZPUiBHQUxMRVJZXHJcbiAgICAgICAgYXJyLm1hcChmdW5jdGlvbihpdGVtKXtcclxuICAgICAgICAgICAgaXRlbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIEdBTExFUlkuaW5pdC5iaW5kKEdBTExFUlkpLCBmYWxzZSk7XHJcbiAgICAgICAgfSk7XHJcbn07XHJcblxyXG5cclxuXHJcbi8vQ0xJQ0sgTElTVEVORVJFIE9OIFRXTyBzZWxlY3QgaW5wdXRzIChyZXNwb25zaWJsZSBmb3IgY2hhZ2luZyBtYXAgZGV0YWlscyBzb3J0aW5nKVxyXG5ET01IQU5ETEVSLmNsaWNrTGlzdGVuZXIgPSBmdW5jdGlvbihlKSB7XHJcbiAgICB2YXIgc3JjID0gZS5zcmMgfHwgZS50YXJnZXQsXHJcbiAgICAgICAgdmFsdWUgPSBzcmMudmFsdWUsXHJcbiAgICAgICAgY29uZmlnID0ge307XHJcblxyXG4gICAgaWYgKHNyYy5pZCA9PT0gJ2lucHV0LXR5cGUnKSB7XHJcbiAgICAgICAgdGhpcy5zZXRJbnB1dFR5cGUodmFsdWUpO1xyXG4gICAgfVxyXG4gICAgaWYgKHNyYy5pZCA9PT0gJ2lucHV0LXNvcnQnKSB7XHJcbiAgICAgICAgdGhpcy5zZXRJbnB1dFNvcnQodmFsdWUpO1xyXG4gICAgfVxyXG4gICAgY29uZmlnID0ge1xyXG4gICAgICAgIHR5cGU6IHRoaXMuZ2V0SW5wdXRUeXBlKCksXHJcbiAgICAgICAgc29ydDogdGhpcy5nZXRJbnB1dFNvcnQoKVxyXG4gICAgfTtcclxuXHJcbiAgICBNQVBTLmluaXRpYWxpemUoY29uZmlnKTtcclxufTtcclxuIiwiLy9HQUxMRVJZIE9CSkVDVCBXSVRIIE1BSU4gUFJPUEVSVElFUyBPTiBJVFxyXG5cclxudmFyIEdBTExFUlkgPSB7XHJcbiAgICBjb2xsZWN0aW9uOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZ2FsbGVyeV9faXRlbScpLFxyXG4gICAgZGl2OiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZnVsbC1zY3JlZW4tZ2FsbGVyeScpLFxyXG4gICAgY2xvc2VCdG46IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpLFxyXG4gICAgY2hlY2tJZkZpcmVkQWxyZWFkeTogZmFsc2UsXHJcbiAgICB3aW5kb3dXaWR0aDogd2luZG93LmlubmVyV2lkdGhcclxufTtcclxuXHJcblxyXG4vL0ZVTkNUSU9OIFRIQVQgSU5JVElBTElaRSBHQUxMRVJZIEVWRVJZVElNRSBJTUFHRSBJUyBDTElDS0VEXHJcbkdBTExFUlkuaW5pdCA9IGZ1bmN0aW9uKGUpe1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgIC8vYmVsb3cgMiB2YXJpYWJsZXMgYXJlIGNoZWNraW5nIGlmIGNsaWNrZWQgZWxlbWVudCB3YXMgaW1hZ2UgKGNsaWNrKSBvciBsaW5rIChrZXkgcHJlc3MpXHJcbiAgICAvL2FuZCBnZXRzIHNvdXJjZSBiYXNlIG9uIHRoYXRcclxuICAgIHZhciBldmVudFNvdXJjZSA9IChlLnNyY0VsZW1lbnQubm9kZU5hbWUgIT09ICdJTUcnKSA/IGUuc3JjRWxlbWVudC5maXJzdENoaWxkIDogZS5zcmNFbGVtZW50O1xyXG4gICAgICAgIGxpbmtFbGVtZW50ID0gKGUuc3JjRWxlbWVudC5ub2RlTmFtZSAhPT0gJ0lNRycpID8gZS5zcmNFbGVtZW50IDogZS5zcmNFbGVtZW50LnBhcmVudEVsZW1lbnQ7XHJcbiAgICAgICAgY29udGVudCA9ICcnO1xyXG4gICAgICAgIC8vYmVsbG93IGlzIHR1cm5pbmcgaHRtbCBjb2xsZWN0aW9uIGludG8gYXJyYXlcclxuICAgICAgICBhcnIgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbCggdGhpcy5jb2xsZWN0aW9uICk7XHJcblxyXG4gICAgICAgIC8vYWRkIGNsYXNzZXMgYW5kIGF0dHJpYnV0ZXMgdG8gaHRtbCBlbGVtZW50c1xyXG4gICAgICAgIHRoaXMuZGl2LmNsYXNzTGlzdC5hZGQoJ2Z1bGwtc2NyZWVuLWdhbGxlcnktLXZpc2libGUnKTtcclxuICAgICAgICB0aGlzLmNsb3NlQnRuLmNsYXNzTGlzdC5hZGQoJ2Z1bGwtc2NyZWVuLWdhbGxlcnlfX2J1dHRvbicpO1xyXG4gICAgICAgIHRoaXMuY2xvc2VCdG4uc2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsJywgJ1ByZXNzIGVudGVyIHRvIGNsb3NlIGdhbGxlcnksIHVzZSBidXR0b25zIHRvIHNjcm9sbCBnYWxsZXJ5Jyk7XHJcblxyXG4gICAgICAgIC8vbWFwIHRocm91Z2ggY29sZWN0aW9uIG9mIGltYWdlcyBhbmQgYXBwZW5kIGRhdGEgdG8gJ2NvbnRlbnQnIHZhcmlhYmxlXHJcbiAgICAgICAgYXJyLm1hcChmdW5jdGlvbihpdGVtLCBpbmRleCl7XHJcbiAgICAgICAgICAgIHZhciBpZCA9IGluZGV4KzE7XHJcbiAgICAgICAgICAgIGlmKGl0ZW0uc3JjID09PSBldmVudFNvdXJjZS5zcmMpe1xyXG4gICAgICAgICAgICAgICAgY29udGVudCArPVxyXG4gICAgICAgICAgICAgICAgICAgICc8aW1nIGNsYXNzPVwiZnVsbC1zY3JlZW4tZ2FsbGVyeV9faW1hZ2VcIiBpZD1cImltYWdlLWFjdGl2ZVwiIHNyYz1cIi4vaW1hZ2VzLycraWQrJy5qcGdcIiBhbHQ9XCJcIj4nO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29udGVudCArPVxyXG4gICAgICAgICAgICAgICAgJzxpbWcgY2xhc3M9XCJmdWxsLXNjcmVlbi1nYWxsZXJ5X19pbWFnZVwiIHNyYz1cIi4vaW1hZ2VzLycraWQrJy5qcGdcIiBhbHQ9XCJcIj4nO1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0uYmluZCh0aGlzKSk7XHJcblxyXG4gICAgICAgIC8vd2hlbiBjbG9zZSBidXR0b24gaXMgY2xpY2tlZCwgcmVtb3ZlIHRoZSBjbGFzcyBhbmQgZm9jdXMgcHJldmlvdXNseSBvcGVuZWQgbGlua1xyXG4gICAgICAgIHRoaXMuY2xvc2VCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgdGhpcy5kaXYuY2xhc3NMaXN0LmFkZCgnZnVsbC1zY3JlZW4tZ2FsbGVyeS0taGlkZGVuJyk7XHJcbiAgICAgICAgICAgIHRoaXMuZGl2LmNsYXNzTGlzdC5yZW1vdmUoJ2Z1bGwtc2NyZWVuLWdhbGxlcnktLXZpc2libGUnKTtcclxuICAgICAgICAgICAgbGlua0VsZW1lbnQuZm9jdXMoKTtcclxuICAgICAgICB9LmJpbmQodGhpcyksIGZhbHNlKTtcclxuXHJcbiAgICAgICAgLy93aGVuIGJ1dHRvbiBpcyBwcmVzc2VkIHdpdGgga2V5Ym9yZCwgY2hlY2sgaWYgaXQgV0FTIE5PVCBlbnRlciBhbmQgcHJldmVudCBmb3IgZm9jdXNpbmcgb3RoZXIgZWxlbWVudHNcclxuICAgICAgICB0aGlzLmNsb3NlQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgaWYgKGUua2V5Q29kZSAhPT0gMTMpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGl2LmZvY3VzKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LmJpbmQodGhpcyksIGZhbHNlKTtcclxuXHJcbiAgICAgICAgLy9jbG9zZSBnYWxsZXJ5IHdoZW4gY2xpY2tlZCBhbnl3aGVyZSBvdXRzaWRlIGltYWdlXHJcbiAgICAgICAgdGhpcy5kaXYuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgaWYgKCFlLnNyY0VsZW1lbnQuc3JjKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRpdi5jbGFzc0xpc3QuYWRkKCdmdWxsLXNjcmVlbi1nYWxsZXJ5LS1oaWRkZW4nKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGl2LmNsYXNzTGlzdC5yZW1vdmUoJ2Z1bGwtc2NyZWVuLWdhbGxlcnktLXZpc2libGUnKTtcclxuICAgICAgICAgICAgICAgIGxpbmtFbGVtZW50LmZvY3VzKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LmJpbmQodGhpcyksIGZhbHNlKTtcclxuXHJcbiAgICAgICAgLy9hcHBlbmQgbWFwcGVkIGNvbnRlbnQgdG8gdGhlIGRpdiBhbmQgYWRkIGJ1dHRvbiBpbiB0aGUgZW5kXHJcbiAgICAgICAgdGhpcy5kaXYuaW5uZXJIVE1MID0gY29udGVudDtcclxuICAgICAgICB0aGlzLmRpdi5hcHBlbmRDaGlsZCh0aGlzLmNsb3NlQnRuKTtcclxuXHJcbiAgICAgICAgLy9hcHBlbmQgZGl2IHRvIGJvZHlcclxuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMuZGl2KTtcclxuXHJcbiAgICAgICAgLy9mb2N1cyB0aGUgY3VycmVudCBkaXYgKHRoaXMgaXMgdG8gbWFrZSBwb3NzaWJsZSBzY3JvbGxpbmcgd2l0aCBhcnJvdyBrZXlzKVxyXG4gICAgICAgIHRoaXMuZGl2LmZvY3VzKCk7XHJcblxyXG4gICAgICAgIC8vR2V0IG9mZnNldCBvZiBhY3RpdmUgZWxlbWVudCAodGhlIG9uZSB0aGF0IHdhcyBjbGlja2VkIG9uIHRodW1ibmFpbCkgYW5kIHNjcm9sbCB0byBpdCdzIHBvc2l0aW9uXHJcbiAgICAgICAgdmFyIG9UID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ltYWdlLWFjdGl2ZScpLm9mZnNldFRvcDtcclxuICAgICAgICB0aGlzLmRpdi5zY3JvbGxUb3AgPSBvVDtcclxuXHJcbiAgICAgICAgLy9hZGQgdGV4dCB0byB0aGUgY2xvc2UgYnV0dG9uXHJcbiAgICAgICAgdGhpcy5jbG9zZUJ0bi5pbm5lckhUTUwgPSAnPHNwYW4gY2xhc3M9XCJmYSBmYS10aW1lc1wiPjwvc3Bhbj4nO1xyXG5cclxuICAgICAgICAvL2lmIHdpbmRvdyBpcyB3aWRlciB0aGFuIDEwMDBweCBhbGVydCBpbnN0cnVjdGlvbiBhYm91dCBnYWxsZXJ5IHNjcm9sbGluZ1xyXG4gICAgICAgIC8vb24gd2lkZXIgc2NyZWVuIGltYWdlIG1heSB0YWtlIGZ1bGwgaGVpZ2h0IGFuZCBpdCBtYXkgYmUgaGFyZCB0byBmaWd1cmUgb3V0IGhvdyB0byBuYXZpZ2F0ZSB0aHJvdWdoIGdhbGxlcnlcclxuICAgICAgICBpZiAodGhpcy53aW5kb3dXaWR0aCA+IDEwMDApIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuY2hlY2tJZkZpcmVkQWxyZWFkeSA9PT0gZmFsc2Upe1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoJ1RPIFZJRVcgR0FMTEVSWSBTQ1JPTEwgVVAgT1IgRE9XTlxcblxcbk9SIFVTRSBBUlJPVyBLRVlTJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5jaGVja0lmRmlyZWRBbHJlYWR5ID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbn07XHJcbiIsInZhciBNQVBTID0ge1xyXG4gICAgbWFwOiB7fSxcclxuICAgIHNlcnZpY2U6IHt9LFxyXG4gICAgaW5mb1dpbmRvdzoge30sXHJcbiAgICBkaXN0YW5jZToge30sXHJcbiAgICBjb3Jkczoge2xhdDogNTEuNTI0ODEzLCBsbmc6IC0wLjEyNTY4OH0sXHJcbiAgICBwbGFjZXNMaXN0OiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFwLWxpc3QnKVxyXG59O1xyXG5cclxuLy9JTklUSUFMSVpFIFRIRSBNQVAgKEZJUkVEIE9OIFRIRSBTVEFSVCBBTkQgT04gRVZFUlkgQ0hBTkdFIE9GIERBVEEgKEZST00gU0xFQ1QgSU5QVVQ6IFRZUEUgQU5EIFNPUlQpKVxyXG5NQVBTLmluaXRpYWxpemUgPSBmdW5jdGlvbihjb25maWcpe1xyXG5cclxuICAgIC8vQ0xFQVIgVEhFIExJU1QgT0YgUExBQ0VTIEJFRk9SRSBJTklUSUFMSVpJTkdcclxuICAgIHRoaXMucGxhY2VzTGlzdC5pbm5lckhUTUwgPSAnJztcclxuXHJcbiAgICAvL1JFUSBPQko6IFRBS0VTIFJBTkssIFRZUEUgRlJPTSBDT05GSUcgQVJHVU1FTlQgUEFTU0VEIFRPIFRISVMgRlVOQ1RJT04gQU5EIFNFVFMgREFUQSBERVBFTkRJTkcgT04gVEhBVFxyXG4gICAgdmFyIHJlcXVlc3QgPSB7XHJcbiAgICAgICAgICAgIGxvY2F0aW9uOiB0aGlzLmNvcmRzLFxyXG4gICAgICAgICAgICB0eXBlOiBbY29uZmlnLnR5cGVdLFxyXG4gICAgICAgICAgICByYW5rQnk6IChjb25maWcuc29ydCA9PT0gJ3JhbmsnKSA/IGdvb2dsZS5tYXBzLnBsYWNlcy5SYW5rQnkuUFJPTUlORU5DRSA6IGdvb2dsZS5tYXBzLnBsYWNlcy5SYW5rQnkuRElTVEFOQ0UsXHJcbiAgICAgICAgICAgIHJhZGl1czogKGNvbmZpZy5zb3J0ID09PSAncmFuaycpID8gJzEwMDAnIDogbnVsbFxyXG4gICAgICAgIH07XHJcblxyXG4gICAgLy9DUkVBVEUgTkVXIEdPT0dMRSBNQVBcclxuICAgIHRoaXMubWFwID0gbmV3IGdvb2dsZS5tYXBzLk1hcChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFwLWRpc3BsYXknKSx7XHJcbiAgICAgICAgY2VudGVyOiB0aGlzLmNvcmRzLFxyXG4gICAgICAgIHpvb206IDE1LFxyXG4gICAgICAgIGNvcmRzOiB0aGlzLmNvcmRzLFxyXG4gICAgICAgIGRpc2FibGVEZWZhdWx0VUk6IHRydWUsXHJcbiAgICAgICAgZ2VzdHVyZUhhbmRsaW5nOiAnY29vcGVyYXRpdmUnXHJcbiAgICB9KTtcclxuXHJcbiAgICAvL0NSRUFURSBNQVJLRVIgKElDT04pIEZPUiBDRU5URVIgUE9JTlRcclxuICAgIHZhciBtYXJrZXIgPSBuZXcgZ29vZ2xlLm1hcHMuTWFya2VyKHtcclxuICAgICAgICBtYXA6IHRoaXMubWFwLFxyXG4gICAgICAgIHBvc2l0aW9uOiB0aGlzLmNvcmRzXHJcbiAgICB9KTtcclxuXHJcbiAgICAvL0lOSVRJQUxJWkUgT1RIRVIgR09PR0xFIFNFUlZJQ0VTXHJcbiAgICB0aGlzLmluZm9XaW5kb3cgPSBuZXcgZ29vZ2xlLm1hcHMuSW5mb1dpbmRvdygpO1xyXG4gICAgdGhpcy5zZXJ2aWNlID0gbmV3IGdvb2dsZS5tYXBzLnBsYWNlcy5QbGFjZXNTZXJ2aWNlKHRoaXMubWFwKTtcclxuICAgIHRoaXMuZGlzdGFuY2UgPSBuZXcgZ29vZ2xlLm1hcHMuRGlzdGFuY2VNYXRyaXhTZXJ2aWNlKCk7XHJcblxyXG4gICAgLy9JTklUSUFMSVpFIG5lYXJieVNlYXJjaCBUTyBGSU5EIFBMQUNFUyBJTiBMT0NBTCBBUkVBIEFORCBDQUxMIGNhbGxiYWNrIGZ1bmN0aW9uXHJcbiAgICB0aGlzLnNlcnZpY2UubmVhcmJ5U2VhcmNoKHJlcXVlc3QsIHRoaXMuY2FsbGJhY2spO1xyXG5cclxufTtcclxuXHJcbi8vU0VBUkNIIEZPUiBEQVRBIEJBU0lORyBPTiBSRVFVRVNUIE9CSiBGUk9NIEFCT1ZFIEFORCBDUkVBVEUgTUFSS0VSUyBPTiBNQVAgRk9SIFBMQUNFU1xyXG5NQVBTLmNhbGxiYWNrID0gZnVuY3Rpb24ocmVzdWx0cywgc3RhdHVzKSB7XHJcbiAgICBpZiAoc3RhdHVzID09IGdvb2dsZS5tYXBzLnBsYWNlcy5QbGFjZXNTZXJ2aWNlU3RhdHVzLk9LKSB7XHJcbiAgICAgICAgZm9yICh2YXIgaT0wOyBpPHJlc3VsdHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgTUFQUy5jcmVhdGVNYXJrZXIocmVzdWx0c1tpXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cclxuLy9BQ1RVQUwgRlVOQ1RJT04gUkVTUE9OU0lCTEUgRk9SIENSRUFUSU5HIE1BUktFUlNcclxuLy9JVCBTRVRTIFRIRSBNQVJLRVIgRk9SIEVBQ0ggUExBQ0UgRk9VTkQgSU4gY2FsbGJhY2sgRlVOQ1RJT04gQUJPVkVcclxuLy9BTkQgQ0FMTFMgJ0NBTENVTEFURSBESVNUQU5DRS9ESVNQTEFZIExJU1QnIEZVTkNUSU9OIFdISUNIIFdJTEwgU0hPVyBUSEUgTElTVFxyXG5NQVBTLmNyZWF0ZU1hcmtlciA9IGZ1bmN0aW9uKHBsYWNlKSB7XHJcblxyXG4gICAgLy9DUkVBVEUgTkVXIE1BUktFUlxyXG4gICAgdmFyIG1hcmtlciA9IG5ldyBnb29nbGUubWFwcy5NYXJrZXIoe1xyXG4gICAgICAgIG1hcDogdGhpcy5tYXAsXHJcbiAgICAgICAgcG9zaXRpb246IHBsYWNlLmdlb21ldHJ5LmxvY2F0aW9uLFxyXG4gICAgICAgIGljb246IHtcclxuICAgICAgICAgICAgdXJsOiAnaHR0cHM6Ly9kZXZlbG9wZXJzLmdvb2dsZS5jb20vbWFwcy9kb2N1bWVudGF0aW9uL2phdmFzY3JpcHQvaW1hZ2VzL2NpcmNsZS5wbmcnXHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLy9BREQgQ0xJQ0sgTElTVEVORVIgT04gQUNUVUFMIE1BUktFUlxyXG4gICAgZ29vZ2xlLm1hcHMuZXZlbnQuYWRkTGlzdGVuZXIobWFya2VyLCAnY2xpY2snLCBmdW5jdGlvbigpe1xyXG4gICAgICAgIHRoaXMuc2VydmljZS5nZXREZXRhaWxzKHBsYWNlLCBmdW5jdGlvbihyZXN1bHQsIHN0YXR1cyl7XHJcbiAgICAgICAgICAgIGlmIChzdGF0dXMgIT09IGdvb2dsZS5tYXBzLnBsYWNlcy5QbGFjZXNTZXJ2aWNlU3RhdHVzLk9LKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKHN0YXR1cyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vU0VUIENPTlRFTlQgT0YgSU5GT1dJTkRPVyBUSEFUIFdJTEwgT1BFTiBBRlRFUiBNQVJLRVIgSVMgQ0xJQ0tFRFxyXG4gICAgICAgICAgICB0aGlzLmluZm9XaW5kb3cuc2V0Q29udGVudCgnPGgyPicrcmVzdWx0Lm5hbWUrJzwvaDI+JyArIHJlc3VsdC5hZHJfYWRkcmVzcyApO1xyXG4gICAgICAgICAgICB0aGlzLmluZm9XaW5kb3cub3Blbih0aGlzLm1hcCwgbWFya2VyKTtcclxuICAgICAgICB9LmJpbmQodGhpcykpO1xyXG4gICAgfS5iaW5kKHRoaXMpKTtcclxuXHJcbiAgICAvL0NBTEwgRlVOQ1RJT04gVEhBVCBXSUxMIENBTENVTEFURSBUSEUgRElTVEFOQ0VcclxuICAgIE1BUFMuY2FsY3VsYXRlRGlzdGFuY2UocGxhY2UsIG1hcmtlcik7XHJcblxyXG59O1xyXG5cclxuLy9USElTIEZVTkNUSU9OIENBTENVTEFURVMgVEhFIERJU1RBTkNFIEJFVFdFRU4gVFdPIFBPSU5UUzogTUFJTiBBTkQgRUFDSCBQQUNFIEZPVU5EIElOIGNhbGxiYWNrIEZVTkNUSU9OIEFCT1ZFXHJcbi8vSVQgVEFLU0UgcGxhY2UgQU5EIG1hcmtlciBBUyBQQVJBTUVURVJTLiBNQVJLRVIgSVMgTkVFREVEIFRPIExJTksgVEhFIExJU1QgV0lUSCBBQ1RVQUwgTUFSS0VSIE9OIFRIRSBNQVAgTEFURVJcclxuTUFQUy5jYWxjdWxhdGVEaXN0YW5jZSA9IGZ1bmN0aW9uKHBsYWNlLCBtYXJrZXIpIHtcclxuXHJcbiAgICAgICAgLy9QT0lOVCBSRVRVUk5TIEFDVFVBTCBMQVQgQU5EIExORyBPRiBUSEUgUExBQ0UgVE8gSEVMUCBDQUxDVUxBVElORyBUSEUgRElTVEFOQ0VcclxuICAgICAgICBwb2ludCA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHZhciBsYXQgPSBwbGFjZS5nZW9tZXRyeS5sb2NhdGlvbi5sYXQoKSxcclxuICAgICAgICAgICAgICAgIGxuZyA9IHBsYWNlLmdlb21ldHJ5LmxvY2F0aW9uLmxuZygpO1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgbGF0OiBsYXQsXHJcbiAgICAgICAgICAgICAgICBsbmc6IGxuZ1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vR0VUIERJU1RBTkNFIEJFVFdFRU4gb3JpZ2lucyBBTkQgZGVzdGluYXRpb25zIFdJVEggJ1dBTEtJTkcnIE1PREVcclxuICAgICAgICB0aGlzLmRpc3RhbmNlLmdldERpc3RhbmNlTWF0cml4KHtcclxuICAgICAgICAgICAgb3JpZ2luczogW3RoaXMuY29yZHNdLFxyXG4gICAgICAgICAgICBkZXN0aW5hdGlvbnM6IFtwb2ludCgpXSxcclxuICAgICAgICAgICAgdHJhdmVsTW9kZTogJ1dBTEtJTkcnXHJcbiAgICAgICAgfSwgZnVuY3Rpb24ocmVzcG9uc2Usc3RhdHVzKXtcclxuICAgICAgICAgICAgLy9nZXQgZHVyYXRpb24gdmFsdWUgKGluIG1pdXRlcylcclxuICAgICAgICAgICAgdmFyIGR1cmF0aW9uID0gcmVzcG9uc2Uucm93c1swXS5lbGVtZW50c1swXS5kdXJhdGlvbi50ZXh0O1xyXG5cclxuICAgICAgICAgICAgLy9DQUxMIFRIRSBESVNQTEFZIExJU1QgZnVuY3Rpb25cclxuICAgICAgICAgICAgdGhpcy5kaXNwbGF5TGlzdChkdXJhdGlvbiwgcGxhY2UsIG1hcmtlcik7XHJcbiAgICAgICAgfS5iaW5kKHRoaXMpKTtcclxufTtcclxuXHJcblxyXG4vL1RISVMgRlVOQ1RJT04gV0lMTCBESVNQTEFZIFRIRSBMSVNUIE9GIFBMQUNFU1xyXG4vL0lUIFRBS1NFIDMgQVJHVU1FTlRTOiBkdXJhdGlvbiAtIFRSQVZFTCBUSU1FIElOIE1JTlVURVMsIHBsYWNlLCBBTkQgbWFya2VyIC0gVE8gTElOSyBMSVNUIFdJVEggTUFSS0VSIE9OIFRIRSBNQVBcclxuTUFQUy5kaXNwbGF5TGlzdCA9IGZ1bmN0aW9uKGR1cmF0aW9uLCBwbGFjZSwgbWFya2VyKXtcclxuXHJcblxyXG4gICAgLy9DUkVBVEUgRElWIFRIQVQgV0lMTCBCRSBDT05UQUlORVIgRk9SIEVBQ0ggUExBQ0UgSVRFTSBPTiBUSEUgTElTVFxyXG4gICAgdmFyIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpLFxyXG4gICAgICAgIGJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpLFxyXG4gICAgICAgIGRldGFpbHMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSxcclxuICAgICAgICAgc3BhbiA9ICcnO1xyXG4gICAgZGl2LmNsYXNzTGlzdC5hZGQoJ21hcC1saXN0X19pdGVtJyk7XHJcbiAgICBidG4uY2xhc3NMaXN0LmFkZCgnbWFwLWxpc3RfX2J1dHRvbicpO1xyXG4gICAgZGV0YWlscy5jbGFzc0xpc3QuYWRkKCdtYXAtbGlzdF9fZGV0YWlscy1saXN0Jyk7XHJcbiAgICBkZXRhaWxzLmNsYXNzTGlzdC5hZGQoJ21hcC1saXN0X19kZXRhaWxzLWxpc3QtLWhpZGRlbicpO1xyXG5cclxuICAgIGJ0bi5pbm5lckhUTUwgPSAnU0VFIE1PUkUgREVUQUlMUyc7XHJcblxyXG5cclxuICAgIC8vaWYgcGxhY2UgaGFzIHBob3RvcyBhZGQgYW4gaW1hZ2Ugd2l0aCBwaG90byBhbmQgYXBwZW5kIGl0IHRvIHNwYW4gdmFyaWFibGUuIGlmIG5vIGltYWdlIGZvdW5kLCB1c2UgaWNvblxyXG4gICAgaWYgKHBsYWNlLnBob3RvcyAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHNwYW4gKz0gJzxpbWcgY2xhc3M9XCJtYXAtbGlzdF9faW1hZ2VcIiBzcmM9XCInKyBwbGFjZS5waG90b3NbMF0uZ2V0VXJsKHttYXhXaWR0aDogNzUsIG1heEhlaWdodDogNzV9KSsnXCIgYWx0PVwiXCI+JztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHNwYW4gKz0gJzxpbWcgY2xhc3M9XCJtYXAtbGlzdF9faW1hZ2VcIiBzcmM9XCInKyBwbGFjZS5pY29uKydcIiBhbHQ9XCJcIj4nO1xyXG4gICAgfVxyXG5cclxuICAgIC8vQkVMT1cgQ09NTUFORFMgQVJFIEFERElORyBDT05URU5UIFRPIEVBQ0ggTElTVCBJVEVNOiBIRUFERVIsIERVUkFUSU9OIElORk8sIERFVEFJTFMgRElWIEFORCBUSEUgc2VlIG1vcmUgZGV0YWlscyBCVVRUT05cclxuICAgIHNwYW4gKz1cclxuICAgICAgICAnPGgzIGNsYXNzPVwibWFwLWxpc3RfX25hbWVcIj4nK1xyXG4gICAgICAgICAgICBwbGFjZS5uYW1lICtcclxuICAgICAgICAnPC9oMz4nK1xyXG4gICAgICAgICc8c3BhbiBjbGFzcz1cIm1hcC1saXN0X19kdXJhdGlvblwiPicrXHJcbiAgICAgICAgICAgICdEaXN0YW5jZSBieSB3YWxraW5nOiAnICtcclxuICAgICAgICAgICAgJzxiPicgK2R1cmF0aW9uKyAnPC9iPicgK1xyXG4gICAgICAgICc8L3NwYW4+JztcclxuXHJcbiAgICBkaXYuaW5uZXJIVE1MID0gc3BhbjtcclxuICAgIGRpdi5hcHBlbmRDaGlsZChkZXRhaWxzKTtcclxuICAgIGRpdi5hcHBlbmRDaGlsZChidG4pO1xyXG4gICAgdGhpcy5wbGFjZXNMaXN0LmFwcGVuZENoaWxkKGRpdik7XHJcblxyXG5cclxuICAgIC8vQUREIEVWRU5UIExJU1RFTkVSUyBXSEVOIElOVEVSQUNUSU5HIFdJVEggVEhFIExJU1RcclxuICAgIGRpdi5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW92ZXInLGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgbWFya2VyLnNldEljb24oJycpO1xyXG4gICAgfSxmYWxzZSk7XHJcblxyXG4gICAgZGl2LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgbWFya2VyLnNldEljb24oJ2h0dHBzOi8vZGV2ZWxvcGVycy5nb29nbGUuY29tL21hcHMvZG9jdW1lbnRhdGlvbi9qYXZhc2NyaXB0L2ltYWdlcy9jaXJjbGUucG5nJyk7XHJcbiAgICB9LGZhbHNlKTtcclxuXHJcblxyXG4gICAgLy9BRlRFUiBZT1UgQ0xJQ0sgT04gQSBESVYsIE9QRU4gSU5GTyBXSU5ET1cgT04gVEhFIE1BUktFUlxyXG4gICAgZGl2LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJyxmdW5jdGlvbigpe1xyXG4gICAgICAgIHRoaXMuc2VydmljZS5nZXREZXRhaWxzKHBsYWNlLCBmdW5jdGlvbihyZXN1bHQsIHN0YXR1cyl7XHJcbiAgICAgICAgICAgIGlmIChzdGF0dXMgIT09IGdvb2dsZS5tYXBzLnBsYWNlcy5QbGFjZXNTZXJ2aWNlU3RhdHVzLk9LKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKHN0YXR1cyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5pbmZvV2luZG93LnNldENvbnRlbnQoXHJcbiAgICAgICAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJwbGFjZS1uYW1lXCI+PGI+JytyZXN1bHQubmFtZSsnPC9iPjwvc3Bhbj4nK1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0LmFkcl9hZGRyZXNzK1xyXG4gICAgICAgICAgICAgICAgJzxhIGNsYXNzPVwicGxhY2UtbGlua1wiIGhyZWY9XCInK3Jlc3VsdC51cmwrJ1wiIHRhcmdldD1cIl9ibGFua1wiPk9wZW4gaW4gTWFwcycrXHJcbiAgICAgICAgICAgICAgICAnPC9hPidcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgdGhpcy5pbmZvV2luZG93Lm9wZW4odGhpcy5tYXAsIG1hcmtlcik7XHJcbiAgICAgICAgfS5iaW5kKHRoaXMpKTtcclxuICAgIH0uYmluZCh0aGlzKSxmYWxzZSk7XHJcblxyXG5cclxuICAgIC8vRVZFTlQgTElTVEVORVIgRk9SICdTRUUgTU9SRSBERVRBSUxTJyBCVVRUT04gT04gUExBQ0VTIExJU1RcclxuICAgIGJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgLy9zdG9wIHByb3BhZ2F0aW9uIChkb24ndCBkaXNwbGF5IHRoZSBpbmZvIHdpbmRvdyBpbiBtYXAgdGhhdCBpcyBmaXJlZCB3aGVuIGRpdiBjbGlja2VkKVxyXG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgdGhpcy5zZXJ2aWNlLmdldERldGFpbHMocGxhY2UsIGZ1bmN0aW9uKHJlc3VsdCwgc3RhdHVzKXtcclxuICAgICAgICAgICAgaWYgKHN0YXR1cyAhPT0gZ29vZ2xlLm1hcHMucGxhY2VzLlBsYWNlc1NlcnZpY2VTdGF0dXMuT0spIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3Ioc3RhdHVzKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy9PTiBDTElDSyBUT0dHTEUgVEhFIFZJU0lCSUxJVFkgT0YgVEhFIERJVlxyXG4gICAgICAgICAgICBkZXRhaWxzLmNsYXNzTGlzdC50b2dnbGUoJ21hcC1saXN0X19kZXRhaWxzLWxpc3QtLWhpZGRlbicpO1xyXG4gICAgICAgICAgICBkZXRhaWxzLmNsYXNzTGlzdC50b2dnbGUoJ21hcC1saXN0X19kZXRhaWxzLWxpc3QtLXZpc2libGUnKTtcclxuXHJcbiAgICAgICAgICAgIC8vQkVMT1cgVkFSSUFCTEUgV0lMTCBCRSBJTlNFUlRFRCBJTlRPIGRldGFpbHMgRElWXHJcbiAgICAgICAgICAgIHZhciByZXN1bHRzRGF0YSA9ICcnO1xyXG5cclxuICAgICAgICAgICAgLy9JRiBQTEFDRSBIQVMgcmVzdWx0LnVybCBBREQgSVQgVE8gUkVTVUxUIERBVEEgQ09OVEVOVFxyXG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdC51cmwgIT09dW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHRzRGF0YSArPVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPGEgY2xhc3M9XCJkZXRhaWxzLWxpc3RfX2xpbmtcIiBocmVmPVwiJytyZXN1bHQudXJsKydcIiB0aXRsZT1cIkxpbmsgdG8gcGxhY2UgaW4gZ29vZ2xlIG1hcHMgYXBwXCIgdGFyZ2V0PVwiX2JsYW5rXCI+JytcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cImRldGFpbHMtbGlzdF9faWNvbiBmYSBmYS1nb29nbGVcIiBhcmlhLWhpZGRlbj1cInRydWVcIj4nK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJzwvc3Bhbj4nK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJzxzcGFuIGNsYXNzPVwiZGV0YWlscy1saXN0X19kZXNjcmlwdGlvblwiPicrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ09wZW4gaW4gTWFwcycrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPC9zcGFuPicrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc8L2E+JztcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvL0lGIFBMQUNFIEhBUyByZXN1bHQud2Vic2l0ZSBBREQgSVQgVE8gUkVTVUxUIERBVEEgQ09OVEVOVFxyXG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdC53ZWJzaXRlICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHRzRGF0YSArPVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPGEgY2xhc3M9XCJkZXRhaWxzLWxpc3RfX2xpbmtcIiBocmVmPVwiJytyZXN1bHQud2Vic2l0ZSsnXCIgdGl0bGU9XCJMaW5rIHRvIHdlYmlzdGUgb2YgdGhlIHBsYWNlXCIgdGFyZ2V0PVwiX2JsYW5rXCI+JytcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cImRldGFpbHMtbGlzdF9faWNvbiBmYSBmYS1nbG9iZVwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPicrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPC9zcGFuPicrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJkZXRhaWxzLWxpc3RfX2Rlc2NyaXB0aW9uXCI+JytcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnV2Vic2l0ZScrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPC9zcGFuPicrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc8L2E+JztcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvL0lGIFBMQUNFIEhBUyByZXN1bHQucmF0aW5nIEFERCBJVCBUTyBSRVNVTFQgREFUQSBDT05URU5UXHJcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0LnJhdGluZyAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0c0RhdGEgKz1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiZGV0YWlscy1saXN0X19pdGVtXCI+JytcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJkZXRhaWxzLWxpc3RfX2ljb24gZmEgZmEtc3RhclwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPicrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJzwvc3Bhbj4nK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cImRldGFpbHMtbGlzdF9fZGVzY3JpcHRpb25cIj4nK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQucmF0aW5nK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8L3NwYW4+JytcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8L2Rpdj4nO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy9JTlNFUlQgVEhFIENPTlRFTlQgSU5UTyBUSEUgRElWIEFORCBGT0NVUyBGSVJTVCBFTEVNRU5UIElOU0lERVxyXG4gICAgICAgICAgICBkZXRhaWxzLmlubmVySFRNTD0gcmVzdWx0c0RhdGE7XHJcbiAgICAgICAgICAgIGRldGFpbHMuZmlyc3RDaGlsZC5mb2N1cygpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfS5iaW5kKHRoaXMpLGZhbHNlKTtcclxufTtcclxuIiwiKGZ1bmN0aW9uKCl7XHJcbiAgICB2YXIgU21vb3RoU2Nyb2xsID0gcmVxdWlyZSgnc21vb3RoLXNjcm9sbCcpO1xyXG4gICAgdmFyIHNjcm9sbCA9IG5ldyBTbW9vdGhTY3JvbGwoJ2FbaHJlZio9XCIjXCJdJywge1xyXG4gICAgICAgIGVhc2luZzogJ2Vhc2VJbk91dFF1YWQnXHJcbiAgICB9KTtcclxufSgpKTtcclxuIiwidmFyIFdFQVRIRVJBUEkgPSB7XHJcblxyXG59O1xyXG5cclxuV0VBVEhFUkFQSS5pbml0ID0gZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcblxyXG4gICAgeGhyLm9wZW4oJ0dFVCcsICdodHRwOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9kYXRhLzIuNS93ZWF0aGVyP3E9TG9uZG9uJmFwcGlkPWE0NzJlYmQ2NDJkYTNlNjRlMzVkYTMyOGFhZjM1MzFjJyx0cnVlKTtcclxuICAgIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbihkYXRhKSB7XHJcbiAgICAgICAgaWYgKHhoci5yZWFkeVN0YXRlICE9PSA0ICkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh4aHIuc3RhdHVzICE9PSAyMDAgKXtcclxuICAgICAgICAgICAgY29uc29sZS5lcnIoJ1N0YXR1cyBlcnJvcjogJyArIHhoci5zdGF0dXMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgcmVzdWx0cyA9IEpTT04ucGFyc2UoZGF0YS5zcmNFbGVtZW50LnJlc3BvbnNlKTtcclxuICAgICAgICAgICAgLy9jb250YWluZXJEaXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnd2VhdGhlcicpO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgeGhyLnNlbmQoKTtcclxufTtcclxuXHJcbldFQVRIRVJBUEkuaW5pdCgpO1xyXG4iXX0=
