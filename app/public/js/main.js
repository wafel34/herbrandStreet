(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
window.onload = function() {
    DOMHANDLER.init();
    MAPS.initialize({
        type: document.getElementById('input-type').value,
        sort: document.getElementById('input-sort')
    });

};

var GALLERY = {

};

GALLERY.collectImages = function() {
    var collection = document.querySelectorAll('.gallery__item');


};

GALLERY.collectImages();

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


//DOMHANDLER

var DOMHANDLER = {
    setType: function(type) {
        this.type = type;
    },
    getType: function() {
        return this.type;
    },
    setSort: function(sort) {
        this.sort = sort;
    },
    getSort: function() {
        return this.sort;
    }
};


DOMHANDLER.init = function(){
    var inputType = document.getElementById('input-type'),
        inputSort = document.getElementById('input-sort');
        this.setType(inputType.value);
        this.setSort(inputSort.value);

        inputType.addEventListener('change', this.clickListener.bind(this), false);
        inputSort.addEventListener('change', this.clickListener.bind(this), false);
};


DOMHANDLER.clickListener = function(e) {
    var src = e.src || e.target,
        value = src.value,
        config = {};

    if (src.id === 'input-type') {
        this.setType(value);
    }
    if (src.id === 'input-sort') {
        this.setSort(value);
    }
    config = {
        type: this.getType(),
        sort: this.getSort()
    };

    MAPS.initialize(config);

};

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

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImdhbGxlcnkuanMiLCJtYXBzLmpzIiwid2VhdGhlcmFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMzU0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIndpbmRvdy5vbmxvYWQgPSBmdW5jdGlvbigpIHtcclxuICAgIERPTUhBTkRMRVIuaW5pdCgpO1xyXG4gICAgTUFQUy5pbml0aWFsaXplKHtcclxuICAgICAgICB0eXBlOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaW5wdXQtdHlwZScpLnZhbHVlLFxyXG4gICAgICAgIHNvcnQ6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdpbnB1dC1zb3J0JylcclxuICAgIH0pO1xyXG5cclxufTtcclxuIiwidmFyIEdBTExFUlkgPSB7XHJcblxyXG59O1xyXG5cclxuR0FMTEVSWS5jb2xsZWN0SW1hZ2VzID0gZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgY29sbGVjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5nYWxsZXJ5X19pdGVtJyk7XHJcblxyXG5cclxufTtcclxuXHJcbkdBTExFUlkuY29sbGVjdEltYWdlcygpO1xyXG4iLCJ2YXIgTUFQUyA9IHtcclxuICAgIG1hcDoge30sXHJcbiAgICBzZXJ2aWNlOiB7fSxcclxuICAgIGluZm9XaW5kb3c6IHt9LFxyXG4gICAgZGlzdGFuY2U6IHt9LFxyXG4gICAgY29yZHM6IHtsYXQ6IDUxLjUyNDgxMywgbG5nOiAtMC4xMjU2ODh9LFxyXG4gICAgcGxhY2VzTGlzdDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hcC1saXN0JylcclxufTtcclxuXHJcbi8vSU5JVElBTElaRSBUSEUgTUFQIChGSVJFRCBPTiBUSEUgU1RBUlQgQU5EIE9OIEVWRVJZIENIQU5HRSBPRiBEQVRBIChGUk9NIFNMRUNUIElOUFVUOiBUWVBFIEFORCBTT1JUKSlcclxuTUFQUy5pbml0aWFsaXplID0gZnVuY3Rpb24oY29uZmlnKXtcclxuXHJcbiAgICAvL0NMRUFSIFRIRSBMSVNUIE9GIFBMQUNFUyBCRUZPUkUgSU5JVElBTElaSU5HXHJcbiAgICB0aGlzLnBsYWNlc0xpc3QuaW5uZXJIVE1MID0gJyc7XHJcblxyXG4gICAgLy9SRVEgT0JKOiBUQUtFUyBSQU5LLCBUWVBFIEZST00gQ09ORklHIEFSR1VNRU5UIFBBU1NFRCBUTyBUSElTIEZVTkNUSU9OIEFORCBTRVRTIERBVEEgREVQRU5ESU5HIE9OIFRIQVRcclxuICAgIHZhciByZXF1ZXN0ID0ge1xyXG4gICAgICAgICAgICBsb2NhdGlvbjogdGhpcy5jb3JkcyxcclxuICAgICAgICAgICAgdHlwZTogW2NvbmZpZy50eXBlXSxcclxuICAgICAgICAgICAgcmFua0J5OiAoY29uZmlnLnNvcnQgPT09ICdyYW5rJykgPyBnb29nbGUubWFwcy5wbGFjZXMuUmFua0J5LlBST01JTkVOQ0UgOiBnb29nbGUubWFwcy5wbGFjZXMuUmFua0J5LkRJU1RBTkNFLFxyXG4gICAgICAgICAgICByYWRpdXM6IChjb25maWcuc29ydCA9PT0gJ3JhbmsnKSA/ICcxMDAwJyA6IG51bGxcclxuICAgICAgICB9O1xyXG5cclxuICAgIC8vQ1JFQVRFIE5FVyBHT09HTEUgTUFQXHJcbiAgICB0aGlzLm1hcCA9IG5ldyBnb29nbGUubWFwcy5NYXAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hcC1kaXNwbGF5Jykse1xyXG4gICAgICAgIGNlbnRlcjogdGhpcy5jb3JkcyxcclxuICAgICAgICB6b29tOiAxNSxcclxuICAgICAgICBjb3JkczogdGhpcy5jb3JkcyxcclxuICAgICAgICBkaXNhYmxlRGVmYXVsdFVJOiB0cnVlLFxyXG4gICAgICAgIGdlc3R1cmVIYW5kbGluZzogJ2Nvb3BlcmF0aXZlJ1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy9DUkVBVEUgTUFSS0VSIChJQ09OKSBGT1IgQ0VOVEVSIFBPSU5UXHJcbiAgICB2YXIgbWFya2VyID0gbmV3IGdvb2dsZS5tYXBzLk1hcmtlcih7XHJcbiAgICAgICAgbWFwOiB0aGlzLm1hcCxcclxuICAgICAgICBwb3NpdGlvbjogdGhpcy5jb3Jkc1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy9JTklUSUFMSVpFIE9USEVSIEdPT0dMRSBTRVJWSUNFU1xyXG4gICAgdGhpcy5pbmZvV2luZG93ID0gbmV3IGdvb2dsZS5tYXBzLkluZm9XaW5kb3coKTtcclxuICAgIHRoaXMuc2VydmljZSA9IG5ldyBnb29nbGUubWFwcy5wbGFjZXMuUGxhY2VzU2VydmljZSh0aGlzLm1hcCk7XHJcbiAgICB0aGlzLmRpc3RhbmNlID0gbmV3IGdvb2dsZS5tYXBzLkRpc3RhbmNlTWF0cml4U2VydmljZSgpO1xyXG5cclxuICAgIC8vSU5JVElBTElaRSBuZWFyYnlTZWFyY2ggVE8gRklORCBQTEFDRVMgSU4gTE9DQUwgQVJFQSBBTkQgQ0FMTCBjYWxsYmFjayBmdW5jdGlvblxyXG4gICAgdGhpcy5zZXJ2aWNlLm5lYXJieVNlYXJjaChyZXF1ZXN0LCB0aGlzLmNhbGxiYWNrKTtcclxuXHJcbn07XHJcblxyXG4vL1NFQVJDSCBGT1IgREFUQSBCQVNJTkcgT04gUkVRVUVTVCBPQkogRlJPTSBBQk9WRSBBTkQgQ1JFQVRFIE1BUktFUlMgT04gTUFQIEZPUiBQTEFDRVNcclxuTUFQUy5jYWxsYmFjayA9IGZ1bmN0aW9uKHJlc3VsdHMsIHN0YXR1cykge1xyXG4gICAgaWYgKHN0YXR1cyA9PSBnb29nbGUubWFwcy5wbGFjZXMuUGxhY2VzU2VydmljZVN0YXR1cy5PSykge1xyXG4gICAgICAgIGZvciAodmFyIGk9MDsgaTxyZXN1bHRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIE1BUFMuY3JlYXRlTWFya2VyKHJlc3VsdHNbaV0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuXHJcbi8vQUNUVUFMIEZVTkNUSU9OIFJFU1BPTlNJQkxFIEZPUiBDUkVBVElORyBNQVJLRVJTXHJcbi8vSVQgU0VUUyBUSEUgTUFSS0VSIEZPUiBFQUNIIFBMQUNFIEZPVU5EIElOIGNhbGxiYWNrIEZVTkNUSU9OIEFCT1ZFXHJcbi8vQU5EIENBTExTICdDQUxDVUxBVEUgRElTVEFOQ0UvRElTUExBWSBMSVNUJyBGVU5DVElPTiBXSElDSCBXSUxMIFNIT1cgVEhFIExJU1RcclxuTUFQUy5jcmVhdGVNYXJrZXIgPSBmdW5jdGlvbihwbGFjZSkge1xyXG5cclxuICAgIC8vQ1JFQVRFIE5FVyBNQVJLRVJcclxuICAgIHZhciBtYXJrZXIgPSBuZXcgZ29vZ2xlLm1hcHMuTWFya2VyKHtcclxuICAgICAgICBtYXA6IHRoaXMubWFwLFxyXG4gICAgICAgIHBvc2l0aW9uOiBwbGFjZS5nZW9tZXRyeS5sb2NhdGlvbixcclxuICAgICAgICBpY29uOiB7XHJcbiAgICAgICAgICAgIHVybDogJ2h0dHBzOi8vZGV2ZWxvcGVycy5nb29nbGUuY29tL21hcHMvZG9jdW1lbnRhdGlvbi9qYXZhc2NyaXB0L2ltYWdlcy9jaXJjbGUucG5nJ1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8vQUREIENMSUNLIExJU1RFTkVSIE9OIEFDVFVBTCBNQVJLRVJcclxuICAgIGdvb2dsZS5tYXBzLmV2ZW50LmFkZExpc3RlbmVyKG1hcmtlciwgJ2NsaWNrJywgZnVuY3Rpb24oKXtcclxuICAgICAgICB0aGlzLnNlcnZpY2UuZ2V0RGV0YWlscyhwbGFjZSwgZnVuY3Rpb24ocmVzdWx0LCBzdGF0dXMpe1xyXG4gICAgICAgICAgICBpZiAoc3RhdHVzICE9PSBnb29nbGUubWFwcy5wbGFjZXMuUGxhY2VzU2VydmljZVN0YXR1cy5PSykge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihzdGF0dXMpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvL1NFVCBDT05URU5UIE9GIElORk9XSU5ET1cgVEhBVCBXSUxMIE9QRU4gQUZURVIgTUFSS0VSIElTIENMSUNLRURcclxuICAgICAgICAgICAgdGhpcy5pbmZvV2luZG93LnNldENvbnRlbnQoJzxoMj4nK3Jlc3VsdC5uYW1lKyc8L2gyPicgKyByZXN1bHQuYWRyX2FkZHJlc3MgKTtcclxuICAgICAgICAgICAgdGhpcy5pbmZvV2luZG93Lm9wZW4odGhpcy5tYXAsIG1hcmtlcik7XHJcbiAgICAgICAgfS5iaW5kKHRoaXMpKTtcclxuICAgIH0uYmluZCh0aGlzKSk7XHJcblxyXG4gICAgLy9DQUxMIEZVTkNUSU9OIFRIQVQgV0lMTCBDQUxDVUxBVEUgVEhFIERJU1RBTkNFXHJcbiAgICBNQVBTLmNhbGN1bGF0ZURpc3RhbmNlKHBsYWNlLCBtYXJrZXIpO1xyXG5cclxufTtcclxuXHJcbi8vVEhJUyBGVU5DVElPTiBDQUxDVUxBVEVTIFRIRSBESVNUQU5DRSBCRVRXRUVOIFRXTyBQT0lOVFM6IE1BSU4gQU5EIEVBQ0ggUEFDRSBGT1VORCBJTiBjYWxsYmFjayBGVU5DVElPTiBBQk9WRVxyXG4vL0lUIFRBS1NFIHBsYWNlIEFORCBtYXJrZXIgQVMgUEFSQU1FVEVSUy4gTUFSS0VSIElTIE5FRURFRCBUTyBMSU5LIFRIRSBMSVNUIFdJVEggQUNUVUFMIE1BUktFUiBPTiBUSEUgTUFQIExBVEVSXHJcbk1BUFMuY2FsY3VsYXRlRGlzdGFuY2UgPSBmdW5jdGlvbihwbGFjZSwgbWFya2VyKSB7XHJcblxyXG4gICAgICAgIC8vUE9JTlQgUkVUVVJOUyBBQ1RVQUwgTEFUIEFORCBMTkcgT0YgVEhFIFBMQUNFIFRPIEhFTFAgQ0FMQ1VMQVRJTkcgVEhFIERJU1RBTkNFXHJcbiAgICAgICAgcG9pbnQgPSBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICB2YXIgbGF0ID0gcGxhY2UuZ2VvbWV0cnkubG9jYXRpb24ubGF0KCksXHJcbiAgICAgICAgICAgICAgICBsbmcgPSBwbGFjZS5nZW9tZXRyeS5sb2NhdGlvbi5sbmcoKTtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIGxhdDogbGF0LFxyXG4gICAgICAgICAgICAgICAgbG5nOiBsbmdcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvL0dFVCBESVNUQU5DRSBCRVRXRUVOIG9yaWdpbnMgQU5EIGRlc3RpbmF0aW9ucyBXSVRIICdXQUxLSU5HJyBNT0RFXHJcbiAgICAgICAgdGhpcy5kaXN0YW5jZS5nZXREaXN0YW5jZU1hdHJpeCh7XHJcbiAgICAgICAgICAgIG9yaWdpbnM6IFt0aGlzLmNvcmRzXSxcclxuICAgICAgICAgICAgZGVzdGluYXRpb25zOiBbcG9pbnQoKV0sXHJcbiAgICAgICAgICAgIHRyYXZlbE1vZGU6ICdXQUxLSU5HJ1xyXG4gICAgICAgIH0sIGZ1bmN0aW9uKHJlc3BvbnNlLHN0YXR1cyl7XHJcbiAgICAgICAgICAgIC8vZ2V0IGR1cmF0aW9uIHZhbHVlIChpbiBtaXV0ZXMpXHJcbiAgICAgICAgICAgIHZhciBkdXJhdGlvbiA9IHJlc3BvbnNlLnJvd3NbMF0uZWxlbWVudHNbMF0uZHVyYXRpb24udGV4dDtcclxuXHJcbiAgICAgICAgICAgIC8vQ0FMTCBUSEUgRElTUExBWSBMSVNUIGZ1bmN0aW9uXHJcbiAgICAgICAgICAgIHRoaXMuZGlzcGxheUxpc3QoZHVyYXRpb24sIHBsYWNlLCBtYXJrZXIpO1xyXG4gICAgICAgIH0uYmluZCh0aGlzKSk7XHJcbn07XHJcblxyXG5cclxuLy9USElTIEZVTkNUSU9OIFdJTEwgRElTUExBWSBUSEUgTElTVCBPRiBQTEFDRVNcclxuLy9JVCBUQUtTRSAzIEFSR1VNRU5UUzogZHVyYXRpb24gLSBUUkFWRUwgVElNRSBJTiBNSU5VVEVTLCBwbGFjZSwgQU5EIG1hcmtlciAtIFRPIExJTksgTElTVCBXSVRIIE1BUktFUiBPTiBUSEUgTUFQXHJcbk1BUFMuZGlzcGxheUxpc3QgPSBmdW5jdGlvbihkdXJhdGlvbiwgcGxhY2UsIG1hcmtlcil7XHJcblxyXG5cclxuICAgIC8vQ1JFQVRFIERJViBUSEFUIFdJTEwgQkUgQ09OVEFJTkVSIEZPUiBFQUNIIFBMQUNFIElURU0gT04gVEhFIExJU1RcclxuICAgIHZhciBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSxcclxuICAgICAgICBidG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKSxcclxuICAgICAgICBkZXRhaWxzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JyksXHJcbiAgICAgICAgIHNwYW4gPSAnJztcclxuICAgIGRpdi5jbGFzc0xpc3QuYWRkKCdtYXAtbGlzdF9faXRlbScpO1xyXG4gICAgYnRuLmNsYXNzTGlzdC5hZGQoJ21hcC1saXN0X19idXR0b24nKTtcclxuICAgIGRldGFpbHMuY2xhc3NMaXN0LmFkZCgnbWFwLWxpc3RfX2RldGFpbHMtbGlzdCcpO1xyXG4gICAgZGV0YWlscy5jbGFzc0xpc3QuYWRkKCdtYXAtbGlzdF9fZGV0YWlscy1saXN0LS1oaWRkZW4nKTtcclxuXHJcbiAgICBidG4uaW5uZXJIVE1MID0gJ1NFRSBNT1JFIERFVEFJTFMnO1xyXG5cclxuXHJcbiAgICAvL2lmIHBsYWNlIGhhcyBwaG90b3MgYWRkIGFuIGltYWdlIHdpdGggcGhvdG8gYW5kIGFwcGVuZCBpdCB0byBzcGFuIHZhcmlhYmxlLiBpZiBubyBpbWFnZSBmb3VuZCwgdXNlIGljb25cclxuICAgIGlmIChwbGFjZS5waG90b3MgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBzcGFuICs9ICc8aW1nIGNsYXNzPVwibWFwLWxpc3RfX2ltYWdlXCIgc3JjPVwiJysgcGxhY2UucGhvdG9zWzBdLmdldFVybCh7bWF4V2lkdGg6IDc1LCBtYXhIZWlnaHQ6IDc1fSkrJ1wiIGFsdD1cIlwiPic7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBzcGFuICs9ICc8aW1nIGNsYXNzPVwibWFwLWxpc3RfX2ltYWdlXCIgc3JjPVwiJysgcGxhY2UuaWNvbisnXCIgYWx0PVwiXCI+JztcclxuICAgIH1cclxuXHJcbiAgICAvL0JFTE9XIENPTU1BTkRTIEFSRSBBRERJTkcgQ09OVEVOVCBUTyBFQUNIIExJU1QgSVRFTTogSEVBREVSLCBEVVJBVElPTiBJTkZPLCBERVRBSUxTIERJViBBTkQgVEhFIHNlZSBtb3JlIGRldGFpbHMgQlVUVE9OXHJcbiAgICBzcGFuICs9XHJcbiAgICAgICAgJzxoMyBjbGFzcz1cIm1hcC1saXN0X19uYW1lXCI+JytcclxuICAgICAgICAgICAgcGxhY2UubmFtZSArXHJcbiAgICAgICAgJzwvaDM+JytcclxuICAgICAgICAnPHNwYW4gY2xhc3M9XCJtYXAtbGlzdF9fZHVyYXRpb25cIj4nK1xyXG4gICAgICAgICAgICAnRGlzdGFuY2UgYnkgd2Fsa2luZzogJyArXHJcbiAgICAgICAgICAgICc8Yj4nICtkdXJhdGlvbisgJzwvYj4nICtcclxuICAgICAgICAnPC9zcGFuPic7XHJcblxyXG4gICAgZGl2LmlubmVySFRNTCA9IHNwYW47XHJcbiAgICBkaXYuYXBwZW5kQ2hpbGQoZGV0YWlscyk7XHJcbiAgICBkaXYuYXBwZW5kQ2hpbGQoYnRuKTtcclxuICAgIHRoaXMucGxhY2VzTGlzdC5hcHBlbmRDaGlsZChkaXYpO1xyXG5cclxuXHJcbiAgICAvL0FERCBFVkVOVCBMSVNURU5FUlMgV0hFTiBJTlRFUkFDVElORyBXSVRIIFRIRSBMSVNUXHJcbiAgICBkaXYuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdmVyJyxmdW5jdGlvbigpe1xyXG4gICAgICAgIG1hcmtlci5zZXRJY29uKCcnKTtcclxuICAgIH0sZmFsc2UpO1xyXG5cclxuICAgIGRpdi5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJyxmdW5jdGlvbigpe1xyXG4gICAgICAgIG1hcmtlci5zZXRJY29uKCdodHRwczovL2RldmVsb3BlcnMuZ29vZ2xlLmNvbS9tYXBzL2RvY3VtZW50YXRpb24vamF2YXNjcmlwdC9pbWFnZXMvY2lyY2xlLnBuZycpO1xyXG4gICAgfSxmYWxzZSk7XHJcblxyXG5cclxuICAgIC8vQUZURVIgWU9VIENMSUNLIE9OIEEgRElWLCBPUEVOIElORk8gV0lORE9XIE9OIFRIRSBNQVJLRVJcclxuICAgIGRpdi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsZnVuY3Rpb24oKXtcclxuICAgICAgICB0aGlzLnNlcnZpY2UuZ2V0RGV0YWlscyhwbGFjZSwgZnVuY3Rpb24ocmVzdWx0LCBzdGF0dXMpe1xyXG4gICAgICAgICAgICBpZiAoc3RhdHVzICE9PSBnb29nbGUubWFwcy5wbGFjZXMuUGxhY2VzU2VydmljZVN0YXR1cy5PSykge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihzdGF0dXMpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuaW5mb1dpbmRvdy5zZXRDb250ZW50KFxyXG4gICAgICAgICAgICAgICAgJzxzcGFuIGNsYXNzPVwicGxhY2UtbmFtZVwiPjxiPicrcmVzdWx0Lm5hbWUrJzwvYj48L3NwYW4+JytcclxuICAgICAgICAgICAgICAgIHJlc3VsdC5hZHJfYWRkcmVzcytcclxuICAgICAgICAgICAgICAgICc8YSBjbGFzcz1cInBsYWNlLWxpbmtcIiBocmVmPVwiJytyZXN1bHQudXJsKydcIiB0YXJnZXQ9XCJfYmxhbmtcIj5PcGVuIGluIE1hcHMnK1xyXG4gICAgICAgICAgICAgICAgJzwvYT4nXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIHRoaXMuaW5mb1dpbmRvdy5vcGVuKHRoaXMubWFwLCBtYXJrZXIpO1xyXG4gICAgICAgIH0uYmluZCh0aGlzKSk7XHJcbiAgICB9LmJpbmQodGhpcyksZmFsc2UpO1xyXG5cclxuXHJcbiAgICAvL0VWRU5UIExJU1RFTkVSIEZPUiAnU0VFIE1PUkUgREVUQUlMUycgQlVUVE9OIE9OIFBMQUNFUyBMSVNUXHJcbiAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgIC8vc3RvcCBwcm9wYWdhdGlvbiAoZG9uJ3QgZGlzcGxheSB0aGUgaW5mbyB3aW5kb3cgaW4gbWFwIHRoYXQgaXMgZmlyZWQgd2hlbiBkaXYgY2xpY2tlZClcclxuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIHRoaXMuc2VydmljZS5nZXREZXRhaWxzKHBsYWNlLCBmdW5jdGlvbihyZXN1bHQsIHN0YXR1cyl7XHJcbiAgICAgICAgICAgIGlmIChzdGF0dXMgIT09IGdvb2dsZS5tYXBzLnBsYWNlcy5QbGFjZXNTZXJ2aWNlU3RhdHVzLk9LKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKHN0YXR1cyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vT04gQ0xJQ0sgVE9HR0xFIFRIRSBWSVNJQklMSVRZIE9GIFRIRSBESVZcclxuICAgICAgICAgICAgZGV0YWlscy5jbGFzc0xpc3QudG9nZ2xlKCdtYXAtbGlzdF9fZGV0YWlscy1saXN0LS1oaWRkZW4nKTtcclxuICAgICAgICAgICAgZGV0YWlscy5jbGFzc0xpc3QudG9nZ2xlKCdtYXAtbGlzdF9fZGV0YWlscy1saXN0LS12aXNpYmxlJyk7XHJcblxyXG4gICAgICAgICAgICAvL0JFTE9XIFZBUklBQkxFIFdJTEwgQkUgSU5TRVJURUQgSU5UTyBkZXRhaWxzIERJVlxyXG4gICAgICAgICAgICB2YXIgcmVzdWx0c0RhdGEgPSAnJztcclxuXHJcbiAgICAgICAgICAgIC8vSUYgUExBQ0UgSEFTIHJlc3VsdC51cmwgQUREIElUIFRPIFJFU1VMVCBEQVRBIENPTlRFTlRcclxuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQudXJsICE9PXVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0c0RhdGEgKz1cclxuICAgICAgICAgICAgICAgICAgICAgICAgJzxhIGNsYXNzPVwiZGV0YWlscy1saXN0X19saW5rXCIgaHJlZj1cIicrcmVzdWx0LnVybCsnXCIgdGl0bGU9XCJMaW5rIHRvIHBsYWNlIGluIGdvb2dsZSBtYXBzIGFwcFwiIHRhcmdldD1cIl9ibGFua1wiPicrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJkZXRhaWxzLWxpc3RfX2ljb24gZmEgZmEtZ29vZ2xlXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+JytcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8L3NwYW4+JytcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cImRldGFpbHMtbGlzdF9fZGVzY3JpcHRpb25cIj4nK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdPcGVuIGluIE1hcHMnK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJzwvc3Bhbj4nK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPC9hPic7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy9JRiBQTEFDRSBIQVMgcmVzdWx0LndlYnNpdGUgQUREIElUIFRPIFJFU1VMVCBEQVRBIENPTlRFTlRcclxuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQud2Vic2l0ZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0c0RhdGEgKz1cclxuICAgICAgICAgICAgICAgICAgICAgICAgJzxhIGNsYXNzPVwiZGV0YWlscy1saXN0X19saW5rXCIgaHJlZj1cIicrcmVzdWx0LndlYnNpdGUrJ1wiIHRpdGxlPVwiTGluayB0byB3ZWJpc3RlIG9mIHRoZSBwbGFjZVwiIHRhcmdldD1cIl9ibGFua1wiPicrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJkZXRhaWxzLWxpc3RfX2ljb24gZmEgZmEtZ2xvYmVcIiBhcmlhLWhpZGRlbj1cInRydWVcIj4nK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJzwvc3Bhbj4nK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJzxzcGFuIGNsYXNzPVwiZGV0YWlscy1saXN0X19kZXNjcmlwdGlvblwiPicrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ1dlYnNpdGUnK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJzwvc3Bhbj4nK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPC9hPic7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy9JRiBQTEFDRSBIQVMgcmVzdWx0LnJhdGluZyBBREQgSVQgVE8gUkVTVUxUIERBVEEgQ09OVEVOVFxyXG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5yYXRpbmcgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdHNEYXRhICs9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cImRldGFpbHMtbGlzdF9faXRlbVwiPicrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJzxzcGFuIGNsYXNzPVwiZGV0YWlscy1saXN0X19pY29uIGZhIGZhLXN0YXJcIiBhcmlhLWhpZGRlbj1cInRydWVcIj4nK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8L3NwYW4+JytcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJkZXRhaWxzLWxpc3RfX2Rlc2NyaXB0aW9uXCI+JytcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnJhdGluZytcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPC9zcGFuPicrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPC9kaXY+JztcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vSU5TRVJUIFRIRSBDT05URU5UIElOVE8gVEhFIERJViBBTkQgRk9DVVMgRklSU1QgRUxFTUVOVCBJTlNJREVcclxuICAgICAgICAgICAgZGV0YWlscy5pbm5lckhUTUw9IHJlc3VsdHNEYXRhO1xyXG4gICAgICAgICAgICBkZXRhaWxzLmZpcnN0Q2hpbGQuZm9jdXMoKTtcclxuICAgICAgICB9KTtcclxuICAgIH0uYmluZCh0aGlzKSxmYWxzZSk7XHJcblxyXG5cclxufTtcclxuXHJcblxyXG4vL0RPTUhBTkRMRVJcclxuXHJcbnZhciBET01IQU5ETEVSID0ge1xyXG4gICAgc2V0VHlwZTogZnVuY3Rpb24odHlwZSkge1xyXG4gICAgICAgIHRoaXMudHlwZSA9IHR5cGU7XHJcbiAgICB9LFxyXG4gICAgZ2V0VHlwZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudHlwZTtcclxuICAgIH0sXHJcbiAgICBzZXRTb3J0OiBmdW5jdGlvbihzb3J0KSB7XHJcbiAgICAgICAgdGhpcy5zb3J0ID0gc29ydDtcclxuICAgIH0sXHJcbiAgICBnZXRTb3J0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zb3J0O1xyXG4gICAgfVxyXG59O1xyXG5cclxuXHJcbkRPTUhBTkRMRVIuaW5pdCA9IGZ1bmN0aW9uKCl7XHJcbiAgICB2YXIgaW5wdXRUeXBlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2lucHV0LXR5cGUnKSxcclxuICAgICAgICBpbnB1dFNvcnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaW5wdXQtc29ydCcpO1xyXG4gICAgICAgIHRoaXMuc2V0VHlwZShpbnB1dFR5cGUudmFsdWUpO1xyXG4gICAgICAgIHRoaXMuc2V0U29ydChpbnB1dFNvcnQudmFsdWUpO1xyXG5cclxuICAgICAgICBpbnB1dFR5cGUuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgdGhpcy5jbGlja0xpc3RlbmVyLmJpbmQodGhpcyksIGZhbHNlKTtcclxuICAgICAgICBpbnB1dFNvcnQuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgdGhpcy5jbGlja0xpc3RlbmVyLmJpbmQodGhpcyksIGZhbHNlKTtcclxufTtcclxuXHJcblxyXG5ET01IQU5ETEVSLmNsaWNrTGlzdGVuZXIgPSBmdW5jdGlvbihlKSB7XHJcbiAgICB2YXIgc3JjID0gZS5zcmMgfHwgZS50YXJnZXQsXHJcbiAgICAgICAgdmFsdWUgPSBzcmMudmFsdWUsXHJcbiAgICAgICAgY29uZmlnID0ge307XHJcblxyXG4gICAgaWYgKHNyYy5pZCA9PT0gJ2lucHV0LXR5cGUnKSB7XHJcbiAgICAgICAgdGhpcy5zZXRUeXBlKHZhbHVlKTtcclxuICAgIH1cclxuICAgIGlmIChzcmMuaWQgPT09ICdpbnB1dC1zb3J0Jykge1xyXG4gICAgICAgIHRoaXMuc2V0U29ydCh2YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBjb25maWcgPSB7XHJcbiAgICAgICAgdHlwZTogdGhpcy5nZXRUeXBlKCksXHJcbiAgICAgICAgc29ydDogdGhpcy5nZXRTb3J0KClcclxuICAgIH07XHJcblxyXG4gICAgTUFQUy5pbml0aWFsaXplKGNvbmZpZyk7XHJcblxyXG59O1xyXG4iLCJ2YXIgV0VBVEhFUkFQSSA9IHtcclxuXHJcbn07XHJcblxyXG5XRUFUSEVSQVBJLmluaXQgPSBmdW5jdGlvbigpIHtcclxuICAgIHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuXHJcbiAgICB4aHIub3BlbignR0VUJywgJ2h0dHA6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L3dlYXRoZXI/cT1Mb25kb24mYXBwaWQ9YTQ3MmViZDY0MmRhM2U2NGUzNWRhMzI4YWFmMzUzMWMnLHRydWUpO1xyXG4gICAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgICAgICBpZiAoeGhyLnJlYWR5U3RhdGUgIT09IDQgKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHhoci5zdGF0dXMgIT09IDIwMCApe1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycignU3RhdHVzIGVycm9yOiAnICsgeGhyLnN0YXR1cyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciByZXN1bHRzID0gSlNPTi5wYXJzZShkYXRhLnNyY0VsZW1lbnQucmVzcG9uc2UpO1xyXG4gICAgICAgICAgICAvL2NvbnRhaW5lckRpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd3ZWF0aGVyJyk7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICB4aHIuc2VuZCgpO1xyXG59O1xyXG5cclxuV0VBVEhFUkFQSS5pbml0KCk7XHJcbiJdfQ==
