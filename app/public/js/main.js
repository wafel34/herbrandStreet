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
            item.addEventListener('click', GALLERY.init, false);
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImRvbWhhbmRsZXIuanMiLCJnYWxsZXJ5LmpzIiwibWFwcy5qcyIsInNjcm9sbC5qcyIsIndlYXRoZXJhcHAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzFEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3pEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdlBBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIndpbmRvdy5vbmxvYWQgPSBmdW5jdGlvbigpIHtcclxuICAgIERPTUhBTkRMRVIuaW5pdCgpO1xyXG4gICAgTUFQUy5pbml0aWFsaXplKHtcclxuICAgICAgICB0eXBlOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaW5wdXQtdHlwZScpLnZhbHVlLFxyXG4gICAgICAgIHNvcnQ6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdpbnB1dC1zb3J0JykudmFsdWVcclxuICAgIH0pO1xyXG5cclxufTtcclxuIiwiXHJcbi8vRE9NSEFORExFUlxyXG5cclxudmFyIERPTUhBTkRMRVIgPSB7XHJcbiAgICBzZXRJbnB1dFR5cGU6IGZ1bmN0aW9uKHR5cGUpIHtcclxuICAgICAgICB0aGlzLnR5cGUgPSB0eXBlO1xyXG4gICAgfSxcclxuICAgIGdldElucHV0VHlwZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudHlwZTtcclxuICAgIH0sXHJcbiAgICBzZXRJbnB1dFNvcnQ6IGZ1bmN0aW9uKHNvcnQpIHtcclxuICAgICAgICB0aGlzLnNvcnQgPSBzb3J0O1xyXG4gICAgfSxcclxuICAgIGdldElucHV0U29ydDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc29ydDtcclxuICAgIH1cclxufTtcclxuXHJcbi8vSU5JVCBNQUlOIEVWRU5UUyBJTiBUSEUgVE9NXHJcbkRPTUhBTkRMRVIuaW5pdCA9IGZ1bmN0aW9uKCl7XHJcbiAgICB2YXIgaW5wdXRUeXBlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2lucHV0LXR5cGUnKSxcclxuICAgICAgICBpbnB1dFNvcnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaW5wdXQtc29ydCcpLFxyXG4gICAgICAgIGdhbGxlcnkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZ2FsbGVyeV9fbGluaycpO1xyXG4gICAgICAgIGFyciA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGdhbGxlcnkpO1xyXG5cclxuICAgICAgICAvL1NFVCBUWVBFUyBPTiBET01IQU5ETEVSIE9CSkVDVCBBTkQgQUREIExJU1RFTkVSUyBUTyBUSE9TRSBJTlBVVFNcclxuICAgICAgICB0aGlzLnNldElucHV0VHlwZShpbnB1dFR5cGUudmFsdWUpO1xyXG4gICAgICAgIHRoaXMuc2V0SW5wdXRTb3J0KGlucHV0U29ydC52YWx1ZSk7XHJcbiAgICAgICAgaW5wdXRUeXBlLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIHRoaXMuY2xpY2tMaXN0ZW5lci5iaW5kKHRoaXMpLCBmYWxzZSk7XHJcbiAgICAgICAgaW5wdXRTb3J0LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIHRoaXMuY2xpY2tMaXN0ZW5lci5iaW5kKHRoaXMpLCBmYWxzZSk7XHJcblxyXG4gICAgICAgIC8vQUREIExJU1RFTkVSIEZPUiBHQUxMRVJZXHJcbiAgICAgICAgYXJyLm1hcChmdW5jdGlvbihpdGVtKXtcclxuICAgICAgICAgICAgaXRlbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIEdBTExFUlkuaW5pdCwgZmFsc2UpO1xyXG4gICAgICAgIH0pO1xyXG59O1xyXG5cclxuXHJcblxyXG4vL0NMSUNLIExJU1RFTkVSRSBPTiBUV08gc2VsZWN0IGlucHV0cyAocmVzcG9uc2libGUgZm9yIGNoYWdpbmcgbWFwIGRldGFpbHMgc29ydGluZylcclxuRE9NSEFORExFUi5jbGlja0xpc3RlbmVyID0gZnVuY3Rpb24oZSkge1xyXG4gICAgdmFyIHNyYyA9IGUuc3JjIHx8IGUudGFyZ2V0LFxyXG4gICAgICAgIHZhbHVlID0gc3JjLnZhbHVlLFxyXG4gICAgICAgIGNvbmZpZyA9IHt9O1xyXG5cclxuICAgIGlmIChzcmMuaWQgPT09ICdpbnB1dC10eXBlJykge1xyXG4gICAgICAgIHRoaXMuc2V0SW5wdXRUeXBlKHZhbHVlKTtcclxuICAgIH1cclxuICAgIGlmIChzcmMuaWQgPT09ICdpbnB1dC1zb3J0Jykge1xyXG4gICAgICAgIHRoaXMuc2V0SW5wdXRTb3J0KHZhbHVlKTtcclxuICAgIH1cclxuICAgIGNvbmZpZyA9IHtcclxuICAgICAgICB0eXBlOiB0aGlzLmdldElucHV0VHlwZSgpLFxyXG4gICAgICAgIHNvcnQ6IHRoaXMuZ2V0SW5wdXRTb3J0KClcclxuICAgIH07XHJcblxyXG4gICAgTUFQUy5pbml0aWFsaXplKGNvbmZpZyk7XHJcbn07XHJcbiIsInZhciBHQUxMRVJZID0ge1xyXG5cclxufTtcclxuXHJcblxyXG5HQUxMRVJZLmluaXQgPSBmdW5jdGlvbihlKXtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIGNvbnNvbGUubG9nKGUpO1xyXG4gICAgdmFyIGNvbGxlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZ2FsbGVyeV9faXRlbScpLFxyXG4gICAgICAgIGFyciA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKCBjb2xsZWN0aW9uICksXHJcbiAgICAgICAgZGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Z1bGwtc2NyZWVuLWdhbGxlcnknKSxcclxuICAgICAgICBjbG9zZUJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xyXG4gICAgICAgIGV2ZW50U291cmNlID0gKGUuc3JjRWxlbWVudC5ub2RlTmFtZSAhPT0gJ0lNRycpID8gZS5zcmNFbGVtZW50LmZpcnN0Q2hpbGQgOiBlLnNyY0VsZW1lbnQ7XHJcbiAgICAgICAgbGlua0VsZW1lbnQgPSAoZS5zcmNFbGVtZW50Lm5vZGVOYW1lICE9PSAnSU1HJykgPyBlLnNyY0VsZW1lbnQgOiBlLnNyY0VsZW1lbnQucGFyZW50RWxlbWVudDtcclxuICAgICAgICBjb250ZW50ID0gJyc7XHJcbiAgICAgICAgZGl2LmNsYXNzTGlzdC5hZGQoJ2Z1bGwtc2NyZWVuLWdhbGxlcnktLXZpc2libGUnKTtcclxuICAgICAgICBjbG9zZUJ0bi5pbm5lckhUTUwgPSAnQ0xPU0UgR0FMTEVSWSc7XHJcbiAgICAgICAgY2xvc2VCdG4uY2xhc3NMaXN0LmFkZCgnZnVsbC1zY3JlZW4tZ2FsbGVyeV9fYnV0dG9uJyk7XHJcblxyXG4gICAgICAgIGFyci5tYXAoZnVuY3Rpb24oaXRlbSwgaW5kZXgpe1xyXG4gICAgICAgICAgICB2YXIgaWQgPSBpbmRleCsxO1xyXG4gICAgICAgICAgICBpZihpdGVtLnNyYyA9PT0gZXZlbnRTb3VyY2Uuc3JjKXtcclxuICAgICAgICAgICAgICAgIGNvbnRlbnQgKz1cclxuICAgICAgICAgICAgICAgICAgICAnPGltZyBjbGFzcz1cImZ1bGwtc2NyZWVuLWdhbGxlcnlfX2ltYWdlXCIgaWQ9XCJpbWFnZS1hY3RpdmVcIiBzcmM9XCIuL2ltYWdlcy8nK2lkKycuanBnXCIgYWx0PVwiXCI+JztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnRlbnQgKz1cclxuICAgICAgICAgICAgICAgICc8aW1nIGNsYXNzPVwiZnVsbC1zY3JlZW4tZ2FsbGVyeV9faW1hZ2VcIiBzcmM9XCIuL2ltYWdlcy8nK2lkKycuanBnXCIgYWx0PVwiXCI+JztcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgY2xvc2VCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgZGl2LmNsYXNzTGlzdC5hZGQoJ2Z1bGwtc2NyZWVuLWdhbGxlcnktLWhpZGRlbicpO1xyXG4gICAgICAgICAgICBkaXYuY2xhc3NMaXN0LnJlbW92ZSgnZnVsbC1zY3JlZW4tZ2FsbGVyeS0tdmlzaWJsZScpO1xyXG4gICAgICAgICAgICBsaW5rRWxlbWVudC5mb2N1cygpO1xyXG5cclxuICAgICAgICB9LCBmYWxzZSk7XHJcblxyXG4gICAgICAgIGRpdi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgICBpZiAoIWUuc3JjRWxlbWVudC5zcmMpIHtcclxuICAgICAgICAgICAgICAgIGRpdi5jbGFzc0xpc3QuYWRkKCdmdWxsLXNjcmVlbi1nYWxsZXJ5LS1oaWRkZW4nKTtcclxuICAgICAgICAgICAgICAgIGRpdi5jbGFzc0xpc3QucmVtb3ZlKCdmdWxsLXNjcmVlbi1nYWxsZXJ5LS12aXNpYmxlJyk7XHJcbiAgICAgICAgICAgICAgICBsaW5rRWxlbWVudC5mb2N1cygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgZmFsc2UpO1xyXG5cclxuICAgICAgICBkaXYuaW5uZXJIVE1MID0gY29udGVudDtcclxuICAgICAgICBkaXYuYXBwZW5kQ2hpbGQoY2xvc2VCdG4pO1xyXG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZGl2KTtcclxuXHJcblxyXG4gICAgICAgIGNsb3NlQnRuLmZvY3VzKCk7XHJcbiAgICAgICAgdmFyIG9UID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ltYWdlLWFjdGl2ZScpLm9mZnNldFRvcDtcclxuXHJcblxyXG4gICAgICAgIGRpdi5zY3JvbGxUb3AgPSBvVDtcclxufTtcclxuIiwidmFyIE1BUFMgPSB7XHJcbiAgICBtYXA6IHt9LFxyXG4gICAgc2VydmljZToge30sXHJcbiAgICBpbmZvV2luZG93OiB7fSxcclxuICAgIGRpc3RhbmNlOiB7fSxcclxuICAgIGNvcmRzOiB7bGF0OiA1MS41MjQ4MTMsIGxuZzogLTAuMTI1Njg4fSxcclxuICAgIHBsYWNlc0xpc3Q6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYXAtbGlzdCcpXHJcbn07XHJcblxyXG4vL0lOSVRJQUxJWkUgVEhFIE1BUCAoRklSRUQgT04gVEhFIFNUQVJUIEFORCBPTiBFVkVSWSBDSEFOR0UgT0YgREFUQSAoRlJPTSBTTEVDVCBJTlBVVDogVFlQRSBBTkQgU09SVCkpXHJcbk1BUFMuaW5pdGlhbGl6ZSA9IGZ1bmN0aW9uKGNvbmZpZyl7XHJcblxyXG4gICAgLy9DTEVBUiBUSEUgTElTVCBPRiBQTEFDRVMgQkVGT1JFIElOSVRJQUxJWklOR1xyXG4gICAgdGhpcy5wbGFjZXNMaXN0LmlubmVySFRNTCA9ICcnO1xyXG5cclxuICAgIC8vUkVRIE9CSjogVEFLRVMgUkFOSywgVFlQRSBGUk9NIENPTkZJRyBBUkdVTUVOVCBQQVNTRUQgVE8gVEhJUyBGVU5DVElPTiBBTkQgU0VUUyBEQVRBIERFUEVORElORyBPTiBUSEFUXHJcbiAgICB2YXIgcmVxdWVzdCA9IHtcclxuICAgICAgICAgICAgbG9jYXRpb246IHRoaXMuY29yZHMsXHJcbiAgICAgICAgICAgIHR5cGU6IFtjb25maWcudHlwZV0sXHJcbiAgICAgICAgICAgIHJhbmtCeTogKGNvbmZpZy5zb3J0ID09PSAncmFuaycpID8gZ29vZ2xlLm1hcHMucGxhY2VzLlJhbmtCeS5QUk9NSU5FTkNFIDogZ29vZ2xlLm1hcHMucGxhY2VzLlJhbmtCeS5ESVNUQU5DRSxcclxuICAgICAgICAgICAgcmFkaXVzOiAoY29uZmlnLnNvcnQgPT09ICdyYW5rJykgPyAnMTAwMCcgOiBudWxsXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAvL0NSRUFURSBORVcgR09PR0xFIE1BUFxyXG4gICAgdGhpcy5tYXAgPSBuZXcgZ29vZ2xlLm1hcHMuTWFwKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYXAtZGlzcGxheScpLHtcclxuICAgICAgICBjZW50ZXI6IHRoaXMuY29yZHMsXHJcbiAgICAgICAgem9vbTogMTUsXHJcbiAgICAgICAgY29yZHM6IHRoaXMuY29yZHMsXHJcbiAgICAgICAgZGlzYWJsZURlZmF1bHRVSTogdHJ1ZSxcclxuICAgICAgICBnZXN0dXJlSGFuZGxpbmc6ICdjb29wZXJhdGl2ZSdcclxuICAgIH0pO1xyXG5cclxuICAgIC8vQ1JFQVRFIE1BUktFUiAoSUNPTikgRk9SIENFTlRFUiBQT0lOVFxyXG4gICAgdmFyIG1hcmtlciA9IG5ldyBnb29nbGUubWFwcy5NYXJrZXIoe1xyXG4gICAgICAgIG1hcDogdGhpcy5tYXAsXHJcbiAgICAgICAgcG9zaXRpb246IHRoaXMuY29yZHNcclxuICAgIH0pO1xyXG5cclxuICAgIC8vSU5JVElBTElaRSBPVEhFUiBHT09HTEUgU0VSVklDRVNcclxuICAgIHRoaXMuaW5mb1dpbmRvdyA9IG5ldyBnb29nbGUubWFwcy5JbmZvV2luZG93KCk7XHJcbiAgICB0aGlzLnNlcnZpY2UgPSBuZXcgZ29vZ2xlLm1hcHMucGxhY2VzLlBsYWNlc1NlcnZpY2UodGhpcy5tYXApO1xyXG4gICAgdGhpcy5kaXN0YW5jZSA9IG5ldyBnb29nbGUubWFwcy5EaXN0YW5jZU1hdHJpeFNlcnZpY2UoKTtcclxuXHJcbiAgICAvL0lOSVRJQUxJWkUgbmVhcmJ5U2VhcmNoIFRPIEZJTkQgUExBQ0VTIElOIExPQ0FMIEFSRUEgQU5EIENBTEwgY2FsbGJhY2sgZnVuY3Rpb25cclxuICAgIHRoaXMuc2VydmljZS5uZWFyYnlTZWFyY2gocmVxdWVzdCwgdGhpcy5jYWxsYmFjayk7XHJcblxyXG59O1xyXG5cclxuLy9TRUFSQ0ggRk9SIERBVEEgQkFTSU5HIE9OIFJFUVVFU1QgT0JKIEZST00gQUJPVkUgQU5EIENSRUFURSBNQVJLRVJTIE9OIE1BUCBGT1IgUExBQ0VTXHJcbk1BUFMuY2FsbGJhY2sgPSBmdW5jdGlvbihyZXN1bHRzLCBzdGF0dXMpIHtcclxuICAgIGlmIChzdGF0dXMgPT0gZ29vZ2xlLm1hcHMucGxhY2VzLlBsYWNlc1NlcnZpY2VTdGF0dXMuT0spIHtcclxuICAgICAgICBmb3IgKHZhciBpPTA7IGk8cmVzdWx0cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBNQVBTLmNyZWF0ZU1hcmtlcihyZXN1bHRzW2ldKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxyXG4vL0FDVFVBTCBGVU5DVElPTiBSRVNQT05TSUJMRSBGT1IgQ1JFQVRJTkcgTUFSS0VSU1xyXG4vL0lUIFNFVFMgVEhFIE1BUktFUiBGT1IgRUFDSCBQTEFDRSBGT1VORCBJTiBjYWxsYmFjayBGVU5DVElPTiBBQk9WRVxyXG4vL0FORCBDQUxMUyAnQ0FMQ1VMQVRFIERJU1RBTkNFL0RJU1BMQVkgTElTVCcgRlVOQ1RJT04gV0hJQ0ggV0lMTCBTSE9XIFRIRSBMSVNUXHJcbk1BUFMuY3JlYXRlTWFya2VyID0gZnVuY3Rpb24ocGxhY2UpIHtcclxuXHJcbiAgICAvL0NSRUFURSBORVcgTUFSS0VSXHJcbiAgICB2YXIgbWFya2VyID0gbmV3IGdvb2dsZS5tYXBzLk1hcmtlcih7XHJcbiAgICAgICAgbWFwOiB0aGlzLm1hcCxcclxuICAgICAgICBwb3NpdGlvbjogcGxhY2UuZ2VvbWV0cnkubG9jYXRpb24sXHJcbiAgICAgICAgaWNvbjoge1xyXG4gICAgICAgICAgICB1cmw6ICdodHRwczovL2RldmVsb3BlcnMuZ29vZ2xlLmNvbS9tYXBzL2RvY3VtZW50YXRpb24vamF2YXNjcmlwdC9pbWFnZXMvY2lyY2xlLnBuZydcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvL0FERCBDTElDSyBMSVNURU5FUiBPTiBBQ1RVQUwgTUFSS0VSXHJcbiAgICBnb29nbGUubWFwcy5ldmVudC5hZGRMaXN0ZW5lcihtYXJrZXIsICdjbGljaycsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdGhpcy5zZXJ2aWNlLmdldERldGFpbHMocGxhY2UsIGZ1bmN0aW9uKHJlc3VsdCwgc3RhdHVzKXtcclxuICAgICAgICAgICAgaWYgKHN0YXR1cyAhPT0gZ29vZ2xlLm1hcHMucGxhY2VzLlBsYWNlc1NlcnZpY2VTdGF0dXMuT0spIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3Ioc3RhdHVzKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy9TRVQgQ09OVEVOVCBPRiBJTkZPV0lORE9XIFRIQVQgV0lMTCBPUEVOIEFGVEVSIE1BUktFUiBJUyBDTElDS0VEXHJcbiAgICAgICAgICAgIHRoaXMuaW5mb1dpbmRvdy5zZXRDb250ZW50KCc8aDI+JytyZXN1bHQubmFtZSsnPC9oMj4nICsgcmVzdWx0LmFkcl9hZGRyZXNzICk7XHJcbiAgICAgICAgICAgIHRoaXMuaW5mb1dpbmRvdy5vcGVuKHRoaXMubWFwLCBtYXJrZXIpO1xyXG4gICAgICAgIH0uYmluZCh0aGlzKSk7XHJcbiAgICB9LmJpbmQodGhpcykpO1xyXG5cclxuICAgIC8vQ0FMTCBGVU5DVElPTiBUSEFUIFdJTEwgQ0FMQ1VMQVRFIFRIRSBESVNUQU5DRVxyXG4gICAgTUFQUy5jYWxjdWxhdGVEaXN0YW5jZShwbGFjZSwgbWFya2VyKTtcclxuXHJcbn07XHJcblxyXG4vL1RISVMgRlVOQ1RJT04gQ0FMQ1VMQVRFUyBUSEUgRElTVEFOQ0UgQkVUV0VFTiBUV08gUE9JTlRTOiBNQUlOIEFORCBFQUNIIFBBQ0UgRk9VTkQgSU4gY2FsbGJhY2sgRlVOQ1RJT04gQUJPVkVcclxuLy9JVCBUQUtTRSBwbGFjZSBBTkQgbWFya2VyIEFTIFBBUkFNRVRFUlMuIE1BUktFUiBJUyBORUVERUQgVE8gTElOSyBUSEUgTElTVCBXSVRIIEFDVFVBTCBNQVJLRVIgT04gVEhFIE1BUCBMQVRFUlxyXG5NQVBTLmNhbGN1bGF0ZURpc3RhbmNlID0gZnVuY3Rpb24ocGxhY2UsIG1hcmtlcikge1xyXG5cclxuICAgICAgICAvL1BPSU5UIFJFVFVSTlMgQUNUVUFMIExBVCBBTkQgTE5HIE9GIFRIRSBQTEFDRSBUTyBIRUxQIENBTENVTEFUSU5HIFRIRSBESVNUQU5DRVxyXG4gICAgICAgIHBvaW50ID0gZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgdmFyIGxhdCA9IHBsYWNlLmdlb21ldHJ5LmxvY2F0aW9uLmxhdCgpLFxyXG4gICAgICAgICAgICAgICAgbG5nID0gcGxhY2UuZ2VvbWV0cnkubG9jYXRpb24ubG5nKCk7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBsYXQ6IGxhdCxcclxuICAgICAgICAgICAgICAgIGxuZzogbG5nXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy9HRVQgRElTVEFOQ0UgQkVUV0VFTiBvcmlnaW5zIEFORCBkZXN0aW5hdGlvbnMgV0lUSCAnV0FMS0lORycgTU9ERVxyXG4gICAgICAgIHRoaXMuZGlzdGFuY2UuZ2V0RGlzdGFuY2VNYXRyaXgoe1xyXG4gICAgICAgICAgICBvcmlnaW5zOiBbdGhpcy5jb3Jkc10sXHJcbiAgICAgICAgICAgIGRlc3RpbmF0aW9uczogW3BvaW50KCldLFxyXG4gICAgICAgICAgICB0cmF2ZWxNb2RlOiAnV0FMS0lORydcclxuICAgICAgICB9LCBmdW5jdGlvbihyZXNwb25zZSxzdGF0dXMpe1xyXG4gICAgICAgICAgICAvL2dldCBkdXJhdGlvbiB2YWx1ZSAoaW4gbWl1dGVzKVxyXG4gICAgICAgICAgICB2YXIgZHVyYXRpb24gPSByZXNwb25zZS5yb3dzWzBdLmVsZW1lbnRzWzBdLmR1cmF0aW9uLnRleHQ7XHJcblxyXG4gICAgICAgICAgICAvL0NBTEwgVEhFIERJU1BMQVkgTElTVCBmdW5jdGlvblxyXG4gICAgICAgICAgICB0aGlzLmRpc3BsYXlMaXN0KGR1cmF0aW9uLCBwbGFjZSwgbWFya2VyKTtcclxuICAgICAgICB9LmJpbmQodGhpcykpO1xyXG59O1xyXG5cclxuXHJcbi8vVEhJUyBGVU5DVElPTiBXSUxMIERJU1BMQVkgVEhFIExJU1QgT0YgUExBQ0VTXHJcbi8vSVQgVEFLU0UgMyBBUkdVTUVOVFM6IGR1cmF0aW9uIC0gVFJBVkVMIFRJTUUgSU4gTUlOVVRFUywgcGxhY2UsIEFORCBtYXJrZXIgLSBUTyBMSU5LIExJU1QgV0lUSCBNQVJLRVIgT04gVEhFIE1BUFxyXG5NQVBTLmRpc3BsYXlMaXN0ID0gZnVuY3Rpb24oZHVyYXRpb24sIHBsYWNlLCBtYXJrZXIpe1xyXG5cclxuXHJcbiAgICAvL0NSRUFURSBESVYgVEhBVCBXSUxMIEJFIENPTlRBSU5FUiBGT1IgRUFDSCBQTEFDRSBJVEVNIE9OIFRIRSBMSVNUXHJcbiAgICB2YXIgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JyksXHJcbiAgICAgICAgYnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyksXHJcbiAgICAgICAgZGV0YWlscyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpLFxyXG4gICAgICAgICBzcGFuID0gJyc7XHJcbiAgICBkaXYuY2xhc3NMaXN0LmFkZCgnbWFwLWxpc3RfX2l0ZW0nKTtcclxuICAgIGJ0bi5jbGFzc0xpc3QuYWRkKCdtYXAtbGlzdF9fYnV0dG9uJyk7XHJcbiAgICBkZXRhaWxzLmNsYXNzTGlzdC5hZGQoJ21hcC1saXN0X19kZXRhaWxzLWxpc3QnKTtcclxuICAgIGRldGFpbHMuY2xhc3NMaXN0LmFkZCgnbWFwLWxpc3RfX2RldGFpbHMtbGlzdC0taGlkZGVuJyk7XHJcblxyXG4gICAgYnRuLmlubmVySFRNTCA9ICdTRUUgTU9SRSBERVRBSUxTJztcclxuXHJcblxyXG4gICAgLy9pZiBwbGFjZSBoYXMgcGhvdG9zIGFkZCBhbiBpbWFnZSB3aXRoIHBob3RvIGFuZCBhcHBlbmQgaXQgdG8gc3BhbiB2YXJpYWJsZS4gaWYgbm8gaW1hZ2UgZm91bmQsIHVzZSBpY29uXHJcbiAgICBpZiAocGxhY2UucGhvdG9zICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgc3BhbiArPSAnPGltZyBjbGFzcz1cIm1hcC1saXN0X19pbWFnZVwiIHNyYz1cIicrIHBsYWNlLnBob3Rvc1swXS5nZXRVcmwoe21heFdpZHRoOiA3NSwgbWF4SGVpZ2h0OiA3NX0pKydcIiBhbHQ9XCJcIj4nO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgc3BhbiArPSAnPGltZyBjbGFzcz1cIm1hcC1saXN0X19pbWFnZVwiIHNyYz1cIicrIHBsYWNlLmljb24rJ1wiIGFsdD1cIlwiPic7XHJcbiAgICB9XHJcblxyXG4gICAgLy9CRUxPVyBDT01NQU5EUyBBUkUgQURESU5HIENPTlRFTlQgVE8gRUFDSCBMSVNUIElURU06IEhFQURFUiwgRFVSQVRJT04gSU5GTywgREVUQUlMUyBESVYgQU5EIFRIRSBzZWUgbW9yZSBkZXRhaWxzIEJVVFRPTlxyXG4gICAgc3BhbiArPVxyXG4gICAgICAgICc8aDMgY2xhc3M9XCJtYXAtbGlzdF9fbmFtZVwiPicrXHJcbiAgICAgICAgICAgIHBsYWNlLm5hbWUgK1xyXG4gICAgICAgICc8L2gzPicrXHJcbiAgICAgICAgJzxzcGFuIGNsYXNzPVwibWFwLWxpc3RfX2R1cmF0aW9uXCI+JytcclxuICAgICAgICAgICAgJ0Rpc3RhbmNlIGJ5IHdhbGtpbmc6ICcgK1xyXG4gICAgICAgICAgICAnPGI+JyArZHVyYXRpb24rICc8L2I+JyArXHJcbiAgICAgICAgJzwvc3Bhbj4nO1xyXG5cclxuICAgIGRpdi5pbm5lckhUTUwgPSBzcGFuO1xyXG4gICAgZGl2LmFwcGVuZENoaWxkKGRldGFpbHMpO1xyXG4gICAgZGl2LmFwcGVuZENoaWxkKGJ0bik7XHJcbiAgICB0aGlzLnBsYWNlc0xpc3QuYXBwZW5kQ2hpbGQoZGl2KTtcclxuXHJcblxyXG4gICAgLy9BREQgRVZFTlQgTElTVEVORVJTIFdIRU4gSU5URVJBQ1RJTkcgV0lUSCBUSEUgTElTVFxyXG4gICAgZGl2LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsZnVuY3Rpb24oKXtcclxuICAgICAgICBtYXJrZXIuc2V0SWNvbignJyk7XHJcbiAgICB9LGZhbHNlKTtcclxuXHJcbiAgICBkaXYuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsZnVuY3Rpb24oKXtcclxuICAgICAgICBtYXJrZXIuc2V0SWNvbignaHR0cHM6Ly9kZXZlbG9wZXJzLmdvb2dsZS5jb20vbWFwcy9kb2N1bWVudGF0aW9uL2phdmFzY3JpcHQvaW1hZ2VzL2NpcmNsZS5wbmcnKTtcclxuICAgIH0sZmFsc2UpO1xyXG5cclxuXHJcbiAgICAvL0FGVEVSIFlPVSBDTElDSyBPTiBBIERJViwgT1BFTiBJTkZPIFdJTkRPVyBPTiBUSEUgTUFSS0VSXHJcbiAgICBkaXYuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdGhpcy5zZXJ2aWNlLmdldERldGFpbHMocGxhY2UsIGZ1bmN0aW9uKHJlc3VsdCwgc3RhdHVzKXtcclxuICAgICAgICAgICAgaWYgKHN0YXR1cyAhPT0gZ29vZ2xlLm1hcHMucGxhY2VzLlBsYWNlc1NlcnZpY2VTdGF0dXMuT0spIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3Ioc3RhdHVzKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmluZm9XaW5kb3cuc2V0Q29udGVudChcclxuICAgICAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cInBsYWNlLW5hbWVcIj48Yj4nK3Jlc3VsdC5uYW1lKyc8L2I+PC9zcGFuPicrXHJcbiAgICAgICAgICAgICAgICByZXN1bHQuYWRyX2FkZHJlc3MrXHJcbiAgICAgICAgICAgICAgICAnPGEgY2xhc3M9XCJwbGFjZS1saW5rXCIgaHJlZj1cIicrcmVzdWx0LnVybCsnXCIgdGFyZ2V0PVwiX2JsYW5rXCI+T3BlbiBpbiBNYXBzJytcclxuICAgICAgICAgICAgICAgICc8L2E+J1xyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB0aGlzLmluZm9XaW5kb3cub3Blbih0aGlzLm1hcCwgbWFya2VyKTtcclxuICAgICAgICB9LmJpbmQodGhpcykpO1xyXG4gICAgfS5iaW5kKHRoaXMpLGZhbHNlKTtcclxuXHJcblxyXG4gICAgLy9FVkVOVCBMSVNURU5FUiBGT1IgJ1NFRSBNT1JFIERFVEFJTFMnIEJVVFRPTiBPTiBQTEFDRVMgTElTVFxyXG4gICAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJyxmdW5jdGlvbihlKXtcclxuICAgICAgICAvL3N0b3AgcHJvcGFnYXRpb24gKGRvbid0IGRpc3BsYXkgdGhlIGluZm8gd2luZG93IGluIG1hcCB0aGF0IGlzIGZpcmVkIHdoZW4gZGl2IGNsaWNrZWQpXHJcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICB0aGlzLnNlcnZpY2UuZ2V0RGV0YWlscyhwbGFjZSwgZnVuY3Rpb24ocmVzdWx0LCBzdGF0dXMpe1xyXG4gICAgICAgICAgICBpZiAoc3RhdHVzICE9PSBnb29nbGUubWFwcy5wbGFjZXMuUGxhY2VzU2VydmljZVN0YXR1cy5PSykge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihzdGF0dXMpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvL09OIENMSUNLIFRPR0dMRSBUSEUgVklTSUJJTElUWSBPRiBUSEUgRElWXHJcbiAgICAgICAgICAgIGRldGFpbHMuY2xhc3NMaXN0LnRvZ2dsZSgnbWFwLWxpc3RfX2RldGFpbHMtbGlzdC0taGlkZGVuJyk7XHJcbiAgICAgICAgICAgIGRldGFpbHMuY2xhc3NMaXN0LnRvZ2dsZSgnbWFwLWxpc3RfX2RldGFpbHMtbGlzdC0tdmlzaWJsZScpO1xyXG5cclxuICAgICAgICAgICAgLy9CRUxPVyBWQVJJQUJMRSBXSUxMIEJFIElOU0VSVEVEIElOVE8gZGV0YWlscyBESVZcclxuICAgICAgICAgICAgdmFyIHJlc3VsdHNEYXRhID0gJyc7XHJcblxyXG4gICAgICAgICAgICAvL0lGIFBMQUNFIEhBUyByZXN1bHQudXJsIEFERCBJVCBUTyBSRVNVTFQgREFUQSBDT05URU5UXHJcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0LnVybCAhPT11bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdHNEYXRhICs9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc8YSBjbGFzcz1cImRldGFpbHMtbGlzdF9fbGlua1wiIGhyZWY9XCInK3Jlc3VsdC51cmwrJ1wiIHRpdGxlPVwiTGluayB0byBwbGFjZSBpbiBnb29nbGUgbWFwcyBhcHBcIiB0YXJnZXQ9XCJfYmxhbmtcIj4nK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJzxzcGFuIGNsYXNzPVwiZGV0YWlscy1saXN0X19pY29uIGZhIGZhLWdvb2dsZVwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPicrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPC9zcGFuPicrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJkZXRhaWxzLWxpc3RfX2Rlc2NyaXB0aW9uXCI+JytcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnT3BlbiBpbiBNYXBzJytcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8L3NwYW4+JytcclxuICAgICAgICAgICAgICAgICAgICAgICAgJzwvYT4nO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vSUYgUExBQ0UgSEFTIHJlc3VsdC53ZWJzaXRlIEFERCBJVCBUTyBSRVNVTFQgREFUQSBDT05URU5UXHJcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0LndlYnNpdGUgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdHNEYXRhICs9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc8YSBjbGFzcz1cImRldGFpbHMtbGlzdF9fbGlua1wiIGhyZWY9XCInK3Jlc3VsdC53ZWJzaXRlKydcIiB0aXRsZT1cIkxpbmsgdG8gd2ViaXN0ZSBvZiB0aGUgcGxhY2VcIiB0YXJnZXQ9XCJfYmxhbmtcIj4nK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJzxzcGFuIGNsYXNzPVwiZGV0YWlscy1saXN0X19pY29uIGZhIGZhLWdsb2JlXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+JytcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8L3NwYW4+JytcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cImRldGFpbHMtbGlzdF9fZGVzY3JpcHRpb25cIj4nK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdXZWJzaXRlJytcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8L3NwYW4+JytcclxuICAgICAgICAgICAgICAgICAgICAgICAgJzwvYT4nO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vSUYgUExBQ0UgSEFTIHJlc3VsdC5yYXRpbmcgQUREIElUIFRPIFJFU1VMVCBEQVRBIENPTlRFTlRcclxuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQucmF0aW5nICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHRzRGF0YSArPVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJkZXRhaWxzLWxpc3RfX2l0ZW1cIj4nK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cImRldGFpbHMtbGlzdF9faWNvbiBmYSBmYS1zdGFyXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+JytcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPC9zcGFuPicrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJzxzcGFuIGNsYXNzPVwiZGV0YWlscy1saXN0X19kZXNjcmlwdGlvblwiPicrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5yYXRpbmcrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJzwvc3Bhbj4nK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJzwvZGl2Pic7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvL0lOU0VSVCBUSEUgQ09OVEVOVCBJTlRPIFRIRSBESVYgQU5EIEZPQ1VTIEZJUlNUIEVMRU1FTlQgSU5TSURFXHJcbiAgICAgICAgICAgIGRldGFpbHMuaW5uZXJIVE1MPSByZXN1bHRzRGF0YTtcclxuICAgICAgICAgICAgZGV0YWlscy5maXJzdENoaWxkLmZvY3VzKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LmJpbmQodGhpcyksZmFsc2UpO1xyXG59O1xyXG4iLCIoZnVuY3Rpb24oKXtcclxuICAgIHZhciBTbW9vdGhTY3JvbGwgPSByZXF1aXJlKCdzbW9vdGgtc2Nyb2xsJyk7XHJcbiAgICB2YXIgc2Nyb2xsID0gbmV3IFNtb290aFNjcm9sbCgnYVtocmVmKj1cIiNcIl0nLCB7XHJcbiAgICAgICAgZWFzaW5nOiAnZWFzZUluT3V0UXVhZCdcclxuICAgIH0pO1xyXG59KCkpO1xyXG4iLCJ2YXIgV0VBVEhFUkFQSSA9IHtcclxuXHJcbn07XHJcblxyXG5XRUFUSEVSQVBJLmluaXQgPSBmdW5jdGlvbigpIHtcclxuICAgIHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuXHJcbiAgICB4aHIub3BlbignR0VUJywgJ2h0dHA6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L3dlYXRoZXI/cT1Mb25kb24mYXBwaWQ9YTQ3MmViZDY0MmRhM2U2NGUzNWRhMzI4YWFmMzUzMWMnLHRydWUpO1xyXG4gICAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgICAgICBpZiAoeGhyLnJlYWR5U3RhdGUgIT09IDQgKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHhoci5zdGF0dXMgIT09IDIwMCApe1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycignU3RhdHVzIGVycm9yOiAnICsgeGhyLnN0YXR1cyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciByZXN1bHRzID0gSlNPTi5wYXJzZShkYXRhLnNyY0VsZW1lbnQucmVzcG9uc2UpO1xyXG4gICAgICAgICAgICAvL2NvbnRhaW5lckRpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd3ZWF0aGVyJyk7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICB4aHIuc2VuZCgpO1xyXG59O1xyXG5cclxuV0VBVEhFUkFQSS5pbml0KCk7XHJcbiJdfQ==
