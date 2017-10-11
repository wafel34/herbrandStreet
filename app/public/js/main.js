(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function(){



}());

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
}


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
    }

    MAPS.initialize(config);

};

DOMHANDLER.init();
MAPS.initialize({
    type: document.getElementById('input-type').value,
    sort: document.getElementById('input-sort')
});

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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsIm1hcHMuanMiLCJ3ZWF0aGVyYXBwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2pUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7XHJcblxyXG5cclxuXHJcbn0oKSk7XHJcbiIsInZhciBNQVBTID0ge1xyXG4gICAgbWFwOiB7fSxcclxuICAgIHNlcnZpY2U6IHt9LFxyXG4gICAgaW5mb1dpbmRvdzoge30sXHJcbiAgICBkaXN0YW5jZToge30sXHJcbiAgICBjb3Jkczoge2xhdDogNTEuNTI0ODEzLCBsbmc6IC0wLjEyNTY4OH0sXHJcbiAgICBwbGFjZXNMaXN0OiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFwLWxpc3QnKVxyXG59O1xyXG5cclxuLy9JTklUSUFMSVpFIFRIRSBNQVAgKEZJUkVEIE9OIFRIRSBTVEFSVCBBTkQgT04gRVZFUlkgQ0hBTkdFIE9GIERBVEEgKEZST00gU0xFQ1QgSU5QVVQ6IFRZUEUgQU5EIFNPUlQpKVxyXG5NQVBTLmluaXRpYWxpemUgPSBmdW5jdGlvbihjb25maWcpe1xyXG5cclxuICAgIC8vQ0xFQVIgVEhFIExJU1QgT0YgUExBQ0VTIEJFRk9SRSBJTklUSUFMSVpJTkdcclxuICAgIHRoaXMucGxhY2VzTGlzdC5pbm5lckhUTUwgPSAnJztcclxuXHJcbiAgICAvL1JFUSBPQko6IFRBS0VTIFJBTkssIFRZUEUgRlJPTSBDT05GSUcgQVJHVU1FTlQgUEFTU0VEIFRPIFRISVMgRlVOQ1RJT04gQU5EIFNFVFMgREFUQSBERVBFTkRJTkcgT04gVEhBVFxyXG4gICAgdmFyIHJlcXVlc3QgPSB7XHJcbiAgICAgICAgICAgIGxvY2F0aW9uOiB0aGlzLmNvcmRzLFxyXG4gICAgICAgICAgICB0eXBlOiBbY29uZmlnLnR5cGVdLFxyXG4gICAgICAgICAgICByYW5rQnk6IChjb25maWcuc29ydCA9PT0gJ3JhbmsnKSA/IGdvb2dsZS5tYXBzLnBsYWNlcy5SYW5rQnkuUFJPTUlORU5DRSA6IGdvb2dsZS5tYXBzLnBsYWNlcy5SYW5rQnkuRElTVEFOQ0UsXHJcbiAgICAgICAgICAgIHJhZGl1czogKGNvbmZpZy5zb3J0ID09PSAncmFuaycpID8gJzEwMDAnIDogbnVsbFxyXG4gICAgICAgIH07XHJcblxyXG4gICAgLy9DUkVBVEUgTkVXIEdPT0dMRSBNQVBcclxuICAgIHRoaXMubWFwID0gbmV3IGdvb2dsZS5tYXBzLk1hcChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFwLWRpc3BsYXknKSx7XHJcbiAgICAgICAgY2VudGVyOiB0aGlzLmNvcmRzLFxyXG4gICAgICAgIHpvb206IDE1LFxyXG4gICAgICAgIGNvcmRzOiB0aGlzLmNvcmRzLFxyXG4gICAgICAgIGRpc2FibGVEZWZhdWx0VUk6IHRydWUsXHJcbiAgICAgICAgZ2VzdHVyZUhhbmRsaW5nOiAnY29vcGVyYXRpdmUnXHJcbiAgICB9KTtcclxuXHJcbiAgICAvL0NSRUFURSBNQVJLRVIgKElDT04pIEZPUiBDRU5URVIgUE9JTlRcclxuICAgIHZhciBtYXJrZXIgPSBuZXcgZ29vZ2xlLm1hcHMuTWFya2VyKHtcclxuICAgICAgICBtYXA6IHRoaXMubWFwLFxyXG4gICAgICAgIHBvc2l0aW9uOiB0aGlzLmNvcmRzXHJcbiAgICB9KTtcclxuXHJcbiAgICAvL0lOSVRJQUxJWkUgT1RIRVIgR09PR0xFIFNFUlZJQ0VTXHJcbiAgICB0aGlzLmluZm9XaW5kb3cgPSBuZXcgZ29vZ2xlLm1hcHMuSW5mb1dpbmRvdygpO1xyXG4gICAgdGhpcy5zZXJ2aWNlID0gbmV3IGdvb2dsZS5tYXBzLnBsYWNlcy5QbGFjZXNTZXJ2aWNlKHRoaXMubWFwKTtcclxuICAgIHRoaXMuZGlzdGFuY2UgPSBuZXcgZ29vZ2xlLm1hcHMuRGlzdGFuY2VNYXRyaXhTZXJ2aWNlKCk7XHJcblxyXG4gICAgLy9JTklUSUFMSVpFIG5lYXJieVNlYXJjaCBUTyBGSU5EIFBMQUNFUyBJTiBMT0NBTCBBUkVBIEFORCBDQUxMIGNhbGxiYWNrIGZ1bmN0aW9uXHJcbiAgICB0aGlzLnNlcnZpY2UubmVhcmJ5U2VhcmNoKHJlcXVlc3QsIHRoaXMuY2FsbGJhY2spO1xyXG5cclxufTtcclxuXHJcbi8vU0VBUkNIIEZPUiBEQVRBIEJBU0lORyBPTiBSRVFVRVNUIE9CSiBGUk9NIEFCT1ZFIEFORCBDUkVBVEUgTUFSS0VSUyBPTiBNQVAgRk9SIFBMQUNFU1xyXG5NQVBTLmNhbGxiYWNrID0gZnVuY3Rpb24ocmVzdWx0cywgc3RhdHVzKSB7XHJcbiAgICBpZiAoc3RhdHVzID09IGdvb2dsZS5tYXBzLnBsYWNlcy5QbGFjZXNTZXJ2aWNlU3RhdHVzLk9LKSB7XHJcbiAgICAgICAgZm9yICh2YXIgaT0wOyBpPHJlc3VsdHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgTUFQUy5jcmVhdGVNYXJrZXIocmVzdWx0c1tpXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cclxuLy9BQ1RVQUwgRlVOQ1RJT04gUkVTUE9OU0lCTEUgRk9SIENSRUFUSU5HIE1BUktFUlNcclxuLy9JVCBTRVRTIFRIRSBNQVJLRVIgRk9SIEVBQ0ggUExBQ0UgRk9VTkQgSU4gY2FsbGJhY2sgRlVOQ1RJT04gQUJPVkVcclxuLy9BTkQgQ0FMTFMgJ0NBTENVTEFURSBESVNUQU5DRS9ESVNQTEFZIExJU1QnIEZVTkNUSU9OIFdISUNIIFdJTEwgU0hPVyBUSEUgTElTVFxyXG5NQVBTLmNyZWF0ZU1hcmtlciA9IGZ1bmN0aW9uKHBsYWNlKSB7XHJcblxyXG4gICAgLy9DUkVBVEUgTkVXIE1BUktFUlxyXG4gICAgdmFyIG1hcmtlciA9IG5ldyBnb29nbGUubWFwcy5NYXJrZXIoe1xyXG4gICAgICAgIG1hcDogdGhpcy5tYXAsXHJcbiAgICAgICAgcG9zaXRpb246IHBsYWNlLmdlb21ldHJ5LmxvY2F0aW9uLFxyXG4gICAgICAgIGljb246IHtcclxuICAgICAgICAgICAgdXJsOiAnaHR0cHM6Ly9kZXZlbG9wZXJzLmdvb2dsZS5jb20vbWFwcy9kb2N1bWVudGF0aW9uL2phdmFzY3JpcHQvaW1hZ2VzL2NpcmNsZS5wbmcnXHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLy9BREQgQ0xJQ0sgTElTVEVORVIgT04gQUNUVUFMIE1BUktFUlxyXG4gICAgZ29vZ2xlLm1hcHMuZXZlbnQuYWRkTGlzdGVuZXIobWFya2VyLCAnY2xpY2snLCBmdW5jdGlvbigpe1xyXG4gICAgICAgIHRoaXMuc2VydmljZS5nZXREZXRhaWxzKHBsYWNlLCBmdW5jdGlvbihyZXN1bHQsIHN0YXR1cyl7XHJcbiAgICAgICAgICAgIGlmIChzdGF0dXMgIT09IGdvb2dsZS5tYXBzLnBsYWNlcy5QbGFjZXNTZXJ2aWNlU3RhdHVzLk9LKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKHN0YXR1cyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vU0VUIENPTlRFTlQgT0YgSU5GT1dJTkRPVyBUSEFUIFdJTEwgT1BFTiBBRlRFUiBNQVJLRVIgSVMgQ0xJQ0tFRFxyXG4gICAgICAgICAgICB0aGlzLmluZm9XaW5kb3cuc2V0Q29udGVudCgnPGgyPicrcmVzdWx0Lm5hbWUrJzwvaDI+JyArIHJlc3VsdC5hZHJfYWRkcmVzcyApO1xyXG4gICAgICAgICAgICB0aGlzLmluZm9XaW5kb3cub3Blbih0aGlzLm1hcCwgbWFya2VyKTtcclxuICAgICAgICB9LmJpbmQodGhpcykpO1xyXG4gICAgfS5iaW5kKHRoaXMpKTtcclxuXHJcbiAgICAvL0NBTEwgRlVOQ1RJT04gVEhBVCBXSUxMIENBTENVTEFURSBUSEUgRElTVEFOQ0VcclxuICAgIE1BUFMuY2FsY3VsYXRlRGlzdGFuY2UocGxhY2UsIG1hcmtlcik7XHJcblxyXG59O1xyXG5cclxuLy9USElTIEZVTkNUSU9OIENBTENVTEFURVMgVEhFIERJU1RBTkNFIEJFVFdFRU4gVFdPIFBPSU5UUzogTUFJTiBBTkQgRUFDSCBQQUNFIEZPVU5EIElOIGNhbGxiYWNrIEZVTkNUSU9OIEFCT1ZFXHJcbi8vSVQgVEFLU0UgcGxhY2UgQU5EIG1hcmtlciBBUyBQQVJBTUVURVJTLiBNQVJLRVIgSVMgTkVFREVEIFRPIExJTksgVEhFIExJU1QgV0lUSCBBQ1RVQUwgTUFSS0VSIE9OIFRIRSBNQVAgTEFURVJcclxuTUFQUy5jYWxjdWxhdGVEaXN0YW5jZSA9IGZ1bmN0aW9uKHBsYWNlLCBtYXJrZXIpIHtcclxuXHJcbiAgICAgICAgLy9QT0lOVCBSRVRVUk5TIEFDVFVBTCBMQVQgQU5EIExORyBPRiBUSEUgUExBQ0UgVE8gSEVMUCBDQUxDVUxBVElORyBUSEUgRElTVEFOQ0VcclxuICAgICAgICBwb2ludCA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHZhciBsYXQgPSBwbGFjZS5nZW9tZXRyeS5sb2NhdGlvbi5sYXQoKSxcclxuICAgICAgICAgICAgICAgIGxuZyA9IHBsYWNlLmdlb21ldHJ5LmxvY2F0aW9uLmxuZygpO1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgbGF0OiBsYXQsXHJcbiAgICAgICAgICAgICAgICBsbmc6IGxuZ1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vR0VUIERJU1RBTkNFIEJFVFdFRU4gb3JpZ2lucyBBTkQgZGVzdGluYXRpb25zIFdJVEggJ1dBTEtJTkcnIE1PREVcclxuICAgICAgICB0aGlzLmRpc3RhbmNlLmdldERpc3RhbmNlTWF0cml4KHtcclxuICAgICAgICAgICAgb3JpZ2luczogW3RoaXMuY29yZHNdLFxyXG4gICAgICAgICAgICBkZXN0aW5hdGlvbnM6IFtwb2ludCgpXSxcclxuICAgICAgICAgICAgdHJhdmVsTW9kZTogJ1dBTEtJTkcnXHJcbiAgICAgICAgfSwgZnVuY3Rpb24ocmVzcG9uc2Usc3RhdHVzKXtcclxuICAgICAgICAgICAgLy9nZXQgZHVyYXRpb24gdmFsdWUgKGluIG1pdXRlcylcclxuICAgICAgICAgICAgdmFyIGR1cmF0aW9uID0gcmVzcG9uc2Uucm93c1swXS5lbGVtZW50c1swXS5kdXJhdGlvbi50ZXh0O1xyXG5cclxuICAgICAgICAgICAgLy9DQUxMIFRIRSBESVNQTEFZIExJU1QgZnVuY3Rpb25cclxuICAgICAgICAgICAgdGhpcy5kaXNwbGF5TGlzdChkdXJhdGlvbiwgcGxhY2UsIG1hcmtlcik7XHJcbiAgICAgICAgfS5iaW5kKHRoaXMpKTtcclxufTtcclxuXHJcblxyXG4vL1RISVMgRlVOQ1RJT04gV0lMTCBESVNQTEFZIFRIRSBMSVNUIE9GIFBMQUNFU1xyXG4vL0lUIFRBS1NFIDMgQVJHVU1FTlRTOiBkdXJhdGlvbiAtIFRSQVZFTCBUSU1FIElOIE1JTlVURVMsIHBsYWNlLCBBTkQgbWFya2VyIC0gVE8gTElOSyBMSVNUIFdJVEggTUFSS0VSIE9OIFRIRSBNQVBcclxuTUFQUy5kaXNwbGF5TGlzdCA9IGZ1bmN0aW9uKGR1cmF0aW9uLCBwbGFjZSwgbWFya2VyKXtcclxuXHJcblxyXG4gICAgLy9DUkVBVEUgRElWIFRIQVQgV0lMTCBCRSBDT05UQUlORVIgRk9SIEVBQ0ggUExBQ0UgSVRFTSBPTiBUSEUgTElTVFxyXG4gICAgdmFyIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpLFxyXG4gICAgICAgIGJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpLFxyXG4gICAgICAgIGRldGFpbHMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSxcclxuICAgICAgICAgc3BhbiA9ICcnO1xyXG4gICAgZGl2LmNsYXNzTGlzdC5hZGQoJ21hcC1saXN0X19pdGVtJyk7XHJcbiAgICBidG4uY2xhc3NMaXN0LmFkZCgnbWFwLWxpc3RfX2J1dHRvbicpO1xyXG4gICAgZGV0YWlscy5jbGFzc0xpc3QuYWRkKCdtYXAtbGlzdF9fZGV0YWlscy1saXN0Jyk7XHJcbiAgICBkZXRhaWxzLmNsYXNzTGlzdC5hZGQoJ21hcC1saXN0X19kZXRhaWxzLWxpc3QtLWhpZGRlbicpO1xyXG5cclxuICAgIGJ0bi5pbm5lckhUTUwgPSAnU0VFIE1PUkUgREVUQUlMUyc7XHJcblxyXG5cclxuICAgIC8vaWYgcGxhY2UgaGFzIHBob3RvcyBhZGQgYW4gaW1hZ2Ugd2l0aCBwaG90byBhbmQgYXBwZW5kIGl0IHRvIHNwYW4gdmFyaWFibGUuIGlmIG5vIGltYWdlIGZvdW5kLCB1c2UgaWNvblxyXG4gICAgaWYgKHBsYWNlLnBob3RvcyAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHNwYW4gKz0gJzxpbWcgY2xhc3M9XCJtYXAtbGlzdF9faW1hZ2VcIiBzcmM9XCInKyBwbGFjZS5waG90b3NbMF0uZ2V0VXJsKHttYXhXaWR0aDogNzUsIG1heEhlaWdodDogNzV9KSsnXCIgYWx0PVwiXCI+JztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHNwYW4gKz0gJzxpbWcgY2xhc3M9XCJtYXAtbGlzdF9faW1hZ2VcIiBzcmM9XCInKyBwbGFjZS5pY29uKydcIiBhbHQ9XCJcIj4nO1xyXG4gICAgfVxyXG5cclxuICAgIC8vQkVMT1cgQ09NTUFORFMgQVJFIEFERElORyBDT05URU5UIFRPIEVBQ0ggTElTVCBJVEVNOiBIRUFERVIsIERVUkFUSU9OIElORk8sIERFVEFJTFMgRElWIEFORCBUSEUgc2VlIG1vcmUgZGV0YWlscyBCVVRUT05cclxuICAgIHNwYW4gKz1cclxuICAgICAgICAnPGgzIGNsYXNzPVwibWFwLWxpc3RfX25hbWVcIj4nK1xyXG4gICAgICAgICAgICBwbGFjZS5uYW1lICtcclxuICAgICAgICAnPC9oMz4nK1xyXG4gICAgICAgICc8c3BhbiBjbGFzcz1cIm1hcC1saXN0X19kdXJhdGlvblwiPicrXHJcbiAgICAgICAgICAgICdEaXN0YW5jZSBieSB3YWxraW5nOiAnICtcclxuICAgICAgICAgICAgJzxiPicgK2R1cmF0aW9uKyAnPC9iPicgK1xyXG4gICAgICAgICc8L3NwYW4+JztcclxuXHJcbiAgICBkaXYuaW5uZXJIVE1MID0gc3BhbjtcclxuICAgIGRpdi5hcHBlbmRDaGlsZChkZXRhaWxzKTtcclxuICAgIGRpdi5hcHBlbmRDaGlsZChidG4pO1xyXG4gICAgdGhpcy5wbGFjZXNMaXN0LmFwcGVuZENoaWxkKGRpdik7XHJcblxyXG5cclxuICAgIC8vQUREIEVWRU5UIExJU1RFTkVSUyBXSEVOIElOVEVSQUNUSU5HIFdJVEggVEhFIExJU1RcclxuICAgIGRpdi5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW92ZXInLGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgbWFya2VyLnNldEljb24oJycpO1xyXG4gICAgfSxmYWxzZSk7XHJcblxyXG4gICAgZGl2LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgbWFya2VyLnNldEljb24oJ2h0dHBzOi8vZGV2ZWxvcGVycy5nb29nbGUuY29tL21hcHMvZG9jdW1lbnRhdGlvbi9qYXZhc2NyaXB0L2ltYWdlcy9jaXJjbGUucG5nJyk7XHJcbiAgICB9LGZhbHNlKTtcclxuXHJcblxyXG4gICAgLy9BRlRFUiBZT1UgQ0xJQ0sgT04gQSBESVYsIE9QRU4gSU5GTyBXSU5ET1cgT04gVEhFIE1BUktFUlxyXG4gICAgZGl2LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJyxmdW5jdGlvbigpe1xyXG4gICAgICAgIHRoaXMuc2VydmljZS5nZXREZXRhaWxzKHBsYWNlLCBmdW5jdGlvbihyZXN1bHQsIHN0YXR1cyl7XHJcbiAgICAgICAgICAgIGlmIChzdGF0dXMgIT09IGdvb2dsZS5tYXBzLnBsYWNlcy5QbGFjZXNTZXJ2aWNlU3RhdHVzLk9LKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKHN0YXR1cyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5pbmZvV2luZG93LnNldENvbnRlbnQoXHJcbiAgICAgICAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJwbGFjZS1uYW1lXCI+PGI+JytyZXN1bHQubmFtZSsnPC9iPjwvc3Bhbj4nK1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0LmFkcl9hZGRyZXNzK1xyXG4gICAgICAgICAgICAgICAgJzxhIGNsYXNzPVwicGxhY2UtbGlua1wiIGhyZWY9XCInK3Jlc3VsdC51cmwrJ1wiIHRhcmdldD1cIl9ibGFua1wiPk9wZW4gaW4gTWFwcycrXHJcbiAgICAgICAgICAgICAgICAnPC9hPidcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgdGhpcy5pbmZvV2luZG93Lm9wZW4odGhpcy5tYXAsIG1hcmtlcik7XHJcbiAgICAgICAgfS5iaW5kKHRoaXMpKTtcclxuICAgIH0uYmluZCh0aGlzKSxmYWxzZSk7XHJcblxyXG5cclxuICAgIC8vRVZFTlQgTElTVEVORVIgRk9SICdTRUUgTU9SRSBERVRBSUxTJyBCVVRUT04gT04gUExBQ0VTIExJU1RcclxuICAgIGJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgLy9zdG9wIHByb3BhZ2F0aW9uIChkb24ndCBkaXNwbGF5IHRoZSBpbmZvIHdpbmRvdyBpbiBtYXAgdGhhdCBpcyBmaXJlZCB3aGVuIGRpdiBjbGlja2VkKVxyXG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgdGhpcy5zZXJ2aWNlLmdldERldGFpbHMocGxhY2UsIGZ1bmN0aW9uKHJlc3VsdCwgc3RhdHVzKXtcclxuICAgICAgICAgICAgaWYgKHN0YXR1cyAhPT0gZ29vZ2xlLm1hcHMucGxhY2VzLlBsYWNlc1NlcnZpY2VTdGF0dXMuT0spIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3Ioc3RhdHVzKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy9PTiBDTElDSyBUT0dHTEUgVEhFIFZJU0lCSUxJVFkgT0YgVEhFIERJVlxyXG4gICAgICAgICAgICBkZXRhaWxzLmNsYXNzTGlzdC50b2dnbGUoJ21hcC1saXN0X19kZXRhaWxzLWxpc3QtLWhpZGRlbicpO1xyXG4gICAgICAgICAgICBkZXRhaWxzLmNsYXNzTGlzdC50b2dnbGUoJ21hcC1saXN0X19kZXRhaWxzLWxpc3QtLXZpc2libGUnKTtcclxuXHJcbiAgICAgICAgICAgIC8vQkVMT1cgVkFSSUFCTEUgV0lMTCBCRSBJTlNFUlRFRCBJTlRPIGRldGFpbHMgRElWXHJcbiAgICAgICAgICAgIHZhciByZXN1bHRzRGF0YSA9ICcnO1xyXG5cclxuICAgICAgICAgICAgLy9JRiBQTEFDRSBIQVMgcmVzdWx0LnVybCBBREQgSVQgVE8gUkVTVUxUIERBVEEgQ09OVEVOVFxyXG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdC51cmwgIT09dW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHRzRGF0YSArPVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPGEgY2xhc3M9XCJkZXRhaWxzLWxpc3RfX2xpbmtcIiBocmVmPVwiJytyZXN1bHQudXJsKydcIiB0aXRsZT1cIkxpbmsgdG8gcGxhY2UgaW4gZ29vZ2xlIG1hcHMgYXBwXCIgdGFyZ2V0PVwiX2JsYW5rXCI+JytcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cImRldGFpbHMtbGlzdF9faWNvbiBmYSBmYS1nb29nbGVcIiBhcmlhLWhpZGRlbj1cInRydWVcIj4nK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJzwvc3Bhbj4nK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJzxzcGFuIGNsYXNzPVwiZGV0YWlscy1saXN0X19kZXNjcmlwdGlvblwiPicrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ09wZW4gaW4gTWFwcycrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPC9zcGFuPicrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc8L2E+JztcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvL0lGIFBMQUNFIEhBUyByZXN1bHQud2Vic2l0ZSBBREQgSVQgVE8gUkVTVUxUIERBVEEgQ09OVEVOVFxyXG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdC53ZWJzaXRlICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHRzRGF0YSArPVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPGEgY2xhc3M9XCJkZXRhaWxzLWxpc3RfX2xpbmtcIiBocmVmPVwiJytyZXN1bHQud2Vic2l0ZSsnXCIgdGl0bGU9XCJMaW5rIHRvIHdlYmlzdGUgb2YgdGhlIHBsYWNlXCIgdGFyZ2V0PVwiX2JsYW5rXCI+JytcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cImRldGFpbHMtbGlzdF9faWNvbiBmYSBmYS1nbG9iZVwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPicrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPC9zcGFuPicrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJkZXRhaWxzLWxpc3RfX2Rlc2NyaXB0aW9uXCI+JytcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnV2Vic2l0ZScrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPC9zcGFuPicrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc8L2E+JztcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvL0lGIFBMQUNFIEhBUyByZXN1bHQucmF0aW5nIEFERCBJVCBUTyBSRVNVTFQgREFUQSBDT05URU5UXHJcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0LnJhdGluZyAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0c0RhdGEgKz1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiZGV0YWlscy1saXN0X19pdGVtXCI+JytcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJkZXRhaWxzLWxpc3RfX2ljb24gZmEgZmEtc3RhclwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPicrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJzwvc3Bhbj4nK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cImRldGFpbHMtbGlzdF9fZGVzY3JpcHRpb25cIj4nK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQucmF0aW5nK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8L3NwYW4+JytcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8L2Rpdj4nO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy9JTlNFUlQgVEhFIENPTlRFTlQgSU5UTyBUSEUgRElWIEFORCBGT0NVUyBGSVJTVCBFTEVNRU5UIElOU0lERVxyXG4gICAgICAgICAgICBkZXRhaWxzLmlubmVySFRNTD0gcmVzdWx0c0RhdGE7XHJcbiAgICAgICAgICAgIGRldGFpbHMuZmlyc3RDaGlsZC5mb2N1cygpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfS5iaW5kKHRoaXMpLGZhbHNlKTtcclxuXHJcblxyXG59O1xyXG5cclxuXHJcbi8vRE9NSEFORExFUlxyXG5cclxudmFyIERPTUhBTkRMRVIgPSB7XHJcbiAgICBzZXRUeXBlOiBmdW5jdGlvbih0eXBlKSB7XHJcbiAgICAgICAgdGhpcy50eXBlID0gdHlwZTtcclxuICAgIH0sXHJcbiAgICBnZXRUeXBlOiBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy50eXBlO1xyXG4gICAgfSxcclxuICAgIHNldFNvcnQ6IGZ1bmN0aW9uKHNvcnQpIHtcclxuICAgICAgICB0aGlzLnNvcnQgPSBzb3J0O1xyXG4gICAgfSxcclxuICAgIGdldFNvcnQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNvcnQ7XHJcbiAgICB9XHJcbn07XHJcblxyXG5cclxuRE9NSEFORExFUi5pbml0ID0gZnVuY3Rpb24oKXtcclxuICAgIHZhciBpbnB1dFR5cGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaW5wdXQtdHlwZScpLFxyXG4gICAgICAgIGlucHV0U29ydCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdpbnB1dC1zb3J0Jyk7XHJcbiAgICAgICAgdGhpcy5zZXRUeXBlKGlucHV0VHlwZS52YWx1ZSk7XHJcbiAgICAgICAgdGhpcy5zZXRTb3J0KGlucHV0U29ydC52YWx1ZSk7XHJcblxyXG4gICAgICAgIGlucHV0VHlwZS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCB0aGlzLmNsaWNrTGlzdGVuZXIuYmluZCh0aGlzKSwgZmFsc2UpO1xyXG4gICAgICAgIGlucHV0U29ydC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCB0aGlzLmNsaWNrTGlzdGVuZXIuYmluZCh0aGlzKSwgZmFsc2UpO1xyXG59XHJcblxyXG5cclxuRE9NSEFORExFUi5jbGlja0xpc3RlbmVyID0gZnVuY3Rpb24oZSkge1xyXG4gICAgdmFyIHNyYyA9IGUuc3JjIHx8IGUudGFyZ2V0LFxyXG4gICAgICAgIHZhbHVlID0gc3JjLnZhbHVlLFxyXG4gICAgICAgIGNvbmZpZyA9IHt9O1xyXG5cclxuICAgIGlmIChzcmMuaWQgPT09ICdpbnB1dC10eXBlJykge1xyXG4gICAgICAgIHRoaXMuc2V0VHlwZSh2YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBpZiAoc3JjLmlkID09PSAnaW5wdXQtc29ydCcpIHtcclxuICAgICAgICB0aGlzLnNldFNvcnQodmFsdWUpO1xyXG4gICAgfVxyXG4gICAgY29uZmlnID0ge1xyXG4gICAgICAgIHR5cGU6IHRoaXMuZ2V0VHlwZSgpLFxyXG4gICAgICAgIHNvcnQ6IHRoaXMuZ2V0U29ydCgpXHJcbiAgICB9XHJcblxyXG4gICAgTUFQUy5pbml0aWFsaXplKGNvbmZpZyk7XHJcblxyXG59O1xyXG5cclxuRE9NSEFORExFUi5pbml0KCk7XHJcbk1BUFMuaW5pdGlhbGl6ZSh7XHJcbiAgICB0eXBlOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaW5wdXQtdHlwZScpLnZhbHVlLFxyXG4gICAgc29ydDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2lucHV0LXNvcnQnKVxyXG59KTtcclxuIiwidmFyIFdFQVRIRVJBUEkgPSB7XHJcblxyXG59O1xyXG5cclxuV0VBVEhFUkFQSS5pbml0ID0gZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcblxyXG4gICAgeGhyLm9wZW4oJ0dFVCcsICdodHRwOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9kYXRhLzIuNS93ZWF0aGVyP3E9TG9uZG9uJmFwcGlkPWE0NzJlYmQ2NDJkYTNlNjRlMzVkYTMyOGFhZjM1MzFjJyx0cnVlKTtcclxuICAgIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbihkYXRhKSB7XHJcbiAgICAgICAgaWYgKHhoci5yZWFkeVN0YXRlICE9PSA0ICkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh4aHIuc3RhdHVzICE9PSAyMDAgKXtcclxuICAgICAgICAgICAgY29uc29sZS5lcnIoJ1N0YXR1cyBlcnJvcjogJyArIHhoci5zdGF0dXMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgcmVzdWx0cyA9IEpTT04ucGFyc2UoZGF0YS5zcmNFbGVtZW50LnJlc3BvbnNlKTtcclxuICAgICAgICAgICAgLy9jb250YWluZXJEaXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnd2VhdGhlcicpO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgeGhyLnNlbmQoKTtcclxufTtcclxuXHJcbldFQVRIRVJBUEkuaW5pdCgpO1xyXG4iXX0=
