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
            rankBy: (config.sort === 'rank') ? google.maps.places.RankBy.RATING : google.maps.places.RankBy.DISTANCE,
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
        details = document.createElement('div');
    div.classList.add('map-list__item');
    btn.classList.add('map-list__button');
    details.classList.add('map-list__details');
    details.classList.add('map-list__details--hidden');

    btn.innerHTML = 'SEE MORE DETAILS';

    //var span = '<span>'+place.name+', duration: '+duration+'</span>';
    var span =
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

    btn.addEventListener('click',function(){
        this.service.getDetails(place, function(result, status){
            if (status !== google.maps.places.PlacesServiceStatus.OK) {
                console.error(status);
                return;
            }

            details.innerHTML= 'works';
        }.bind(this));
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsIm1hcHMuanMiLCJ3ZWF0aGVyYXBwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNyT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe1xyXG5cclxuXHJcblxyXG59KCkpO1xyXG4iLCJ2YXIgTUFQUyA9IHtcclxuICAgIG1hcDoge30sXHJcbiAgICBzZXJ2aWNlOiB7fSxcclxuICAgIGluZm9XaW5kb3c6IHt9LFxyXG4gICAgZGlzdGFuY2U6IHt9LFxyXG4gICAgY29yZHM6IHtsYXQ6IDUxLjUyNDgxMywgbG5nOiAtMC4xMjU2ODh9LFxyXG4gICAgcGxhY2VzTGlzdDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hcC1saXN0JylcclxufTtcclxuXHJcbi8vSU5JVElBTElaRSBUSEUgTUFQIChGSVJFRCBPTiBUSEUgU1RBUlQgQU5EIE9OIEVWRVJZIENIQU5HRSBPRiBEQVRBIChGUk9NIFNMRUNUIElOUFVUOiBUWVBFIEFORCBTT1JUKSlcclxuTUFQUy5pbml0aWFsaXplID0gZnVuY3Rpb24oY29uZmlnKXtcclxuXHJcbiAgICAvL0NMRUFSIFRIRSBMSVNUIE9GIFBMQUNFUyBCRUZPUkUgSU5JVElBTElaSU5HXHJcbiAgICB0aGlzLnBsYWNlc0xpc3QuaW5uZXJIVE1MID0gJyc7XHJcblxyXG4gICAgLy9SRVEgT0JKOiBUQUtFUyBSQU5LLCBUWVBFIEZST00gQ09ORklHIEFSR1VNRU5UIFBBU1NFRCBUTyBUSElTIEZVTkNUSU9OIEFORCBTRVRTIERBVEEgREVQRU5ESU5HIE9OIFRIQVRcclxuICAgIHZhciByZXF1ZXN0ID0ge1xyXG4gICAgICAgICAgICBsb2NhdGlvbjogdGhpcy5jb3JkcyxcclxuICAgICAgICAgICAgdHlwZTogW2NvbmZpZy50eXBlXSxcclxuICAgICAgICAgICAgcmFua0J5OiAoY29uZmlnLnNvcnQgPT09ICdyYW5rJykgPyBnb29nbGUubWFwcy5wbGFjZXMuUmFua0J5LlJBVElORyA6IGdvb2dsZS5tYXBzLnBsYWNlcy5SYW5rQnkuRElTVEFOQ0UsXHJcbiAgICAgICAgICAgIHJhZGl1czogKGNvbmZpZy5zb3J0ID09PSAncmFuaycpID8gJzEwMDAnIDogbnVsbFxyXG4gICAgICAgIH07XHJcblxyXG4gICAgLy9DUkVBVEUgTkVXIEdPT0dMRSBNQVBcclxuICAgIHRoaXMubWFwID0gbmV3IGdvb2dsZS5tYXBzLk1hcChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFwLWRpc3BsYXknKSx7XHJcbiAgICAgICAgY2VudGVyOiB0aGlzLmNvcmRzLFxyXG4gICAgICAgIHpvb206IDE1LFxyXG4gICAgICAgIGNvcmRzOiB0aGlzLmNvcmRzLFxyXG4gICAgICAgIGRpc2FibGVEZWZhdWx0VUk6IHRydWUsXHJcbiAgICAgICAgZ2VzdHVyZUhhbmRsaW5nOiAnY29vcGVyYXRpdmUnXHJcbiAgICB9KTtcclxuXHJcbiAgICAvL0NSRUFURSBNQVJLRVIgKElDT04pIEZPUiBDRU5URVIgUE9JTlRcclxuICAgIHZhciBtYXJrZXIgPSBuZXcgZ29vZ2xlLm1hcHMuTWFya2VyKHtcclxuICAgICAgICBtYXA6IHRoaXMubWFwLFxyXG4gICAgICAgIHBvc2l0aW9uOiB0aGlzLmNvcmRzXHJcbiAgICB9KTtcclxuXHJcbiAgICAvL0lOSVRJQUxJWkUgT1RIRVIgR09PR0xFIFNFUlZJQ0VTXHJcbiAgICB0aGlzLmluZm9XaW5kb3cgPSBuZXcgZ29vZ2xlLm1hcHMuSW5mb1dpbmRvdygpO1xyXG4gICAgdGhpcy5zZXJ2aWNlID0gbmV3IGdvb2dsZS5tYXBzLnBsYWNlcy5QbGFjZXNTZXJ2aWNlKHRoaXMubWFwKTtcclxuICAgIHRoaXMuZGlzdGFuY2UgPSBuZXcgZ29vZ2xlLm1hcHMuRGlzdGFuY2VNYXRyaXhTZXJ2aWNlKCk7XHJcblxyXG4gICAgLy9JTklUSUFMSVpFIG5lYXJieVNlYXJjaCBUTyBGSU5EIFBMQUNFUyBJTiBMT0NBTCBBUkVBIEFORCBDQUxMIGNhbGxiYWNrIGZ1bmN0aW9uXHJcbiAgICB0aGlzLnNlcnZpY2UubmVhcmJ5U2VhcmNoKHJlcXVlc3QsIHRoaXMuY2FsbGJhY2spO1xyXG5cclxufTtcclxuXHJcbi8vU0VBUkNIIEZPUiBEQVRBIEJBU0lORyBPTiBSRVFVRVNUIE9CSiBGUk9NIEFCT1ZFIEFORCBDUkVBVEUgTUFSS0VSUyBPTiBNQVAgRk9SIFBMQUNFU1xyXG5NQVBTLmNhbGxiYWNrID0gZnVuY3Rpb24ocmVzdWx0cywgc3RhdHVzKSB7XHJcbiAgICBpZiAoc3RhdHVzID09IGdvb2dsZS5tYXBzLnBsYWNlcy5QbGFjZXNTZXJ2aWNlU3RhdHVzLk9LKSB7XHJcbiAgICAgICAgZm9yICh2YXIgaT0wOyBpPHJlc3VsdHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgTUFQUy5jcmVhdGVNYXJrZXIocmVzdWx0c1tpXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cclxuLy9BQ1RVQUwgRlVOQ1RJT04gUkVTUE9OU0lCTEUgRk9SIENSRUFUSU5HIE1BUktFUlNcclxuLy9JVCBTRVRTIFRIRSBNQVJLRVIgRk9SIEVBQ0ggUExBQ0UgRk9VTkQgSU4gY2FsbGJhY2sgRlVOQ1RJT04gQUJPVkVcclxuLy9BTkQgQ0FMTFMgJ0NBTENVTEFURSBESVNUQU5DRS9ESVNQTEFZIExJU1QnIEZVTkNUSU9OIFdISUNIIFdJTEwgU0hPVyBUSEUgTElTVFxyXG5NQVBTLmNyZWF0ZU1hcmtlciA9IGZ1bmN0aW9uKHBsYWNlKSB7XHJcblxyXG4gICAgLy9DUkVBVEUgTkVXIE1BUktFUlxyXG4gICAgdmFyIG1hcmtlciA9IG5ldyBnb29nbGUubWFwcy5NYXJrZXIoe1xyXG4gICAgICAgIG1hcDogdGhpcy5tYXAsXHJcbiAgICAgICAgcG9zaXRpb246IHBsYWNlLmdlb21ldHJ5LmxvY2F0aW9uLFxyXG4gICAgICAgIGljb246IHtcclxuICAgICAgICAgICAgdXJsOiAnaHR0cHM6Ly9kZXZlbG9wZXJzLmdvb2dsZS5jb20vbWFwcy9kb2N1bWVudGF0aW9uL2phdmFzY3JpcHQvaW1hZ2VzL2NpcmNsZS5wbmcnXHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLy9BREQgQ0xJQ0sgTElTVEVORVIgT04gQUNUVUFMIE1BUktFUlxyXG4gICAgZ29vZ2xlLm1hcHMuZXZlbnQuYWRkTGlzdGVuZXIobWFya2VyLCAnY2xpY2snLCBmdW5jdGlvbigpe1xyXG4gICAgICAgIHRoaXMuc2VydmljZS5nZXREZXRhaWxzKHBsYWNlLCBmdW5jdGlvbihyZXN1bHQsIHN0YXR1cyl7XHJcbiAgICAgICAgICAgIGlmIChzdGF0dXMgIT09IGdvb2dsZS5tYXBzLnBsYWNlcy5QbGFjZXNTZXJ2aWNlU3RhdHVzLk9LKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKHN0YXR1cyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vU0VUIENPTlRFTlQgT0YgSU5GT1dJTkRPVyBUSEFUIFdJTEwgT1BFTiBBRlRFUiBNQVJLRVIgSVMgQ0xJQ0tFRFxyXG4gICAgICAgICAgICB0aGlzLmluZm9XaW5kb3cuc2V0Q29udGVudCgnPGgyPicrcmVzdWx0Lm5hbWUrJzwvaDI+JyArIHJlc3VsdC5hZHJfYWRkcmVzcyApO1xyXG4gICAgICAgICAgICB0aGlzLmluZm9XaW5kb3cub3Blbih0aGlzLm1hcCwgbWFya2VyKTtcclxuICAgICAgICB9LmJpbmQodGhpcykpO1xyXG4gICAgfS5iaW5kKHRoaXMpKTtcclxuXHJcbiAgICAvL0NBTEwgRlVOQ1RJT04gVEhBVCBXSUxMIENBTENVTEFURSBUSEUgRElTVEFOQ0VcclxuICAgIE1BUFMuY2FsY3VsYXRlRGlzdGFuY2UocGxhY2UsIG1hcmtlcik7XHJcblxyXG59O1xyXG5cclxuLy9USElTIEZVTkNUSU9OIENBTENVTEFURVMgVEhFIERJU1RBTkNFIEJFVFdFRU4gVFdPIFBPSU5UUzogTUFJTiBBTkQgRUFDSCBQQUNFIEZPVU5EIElOIGNhbGxiYWNrIEZVTkNUSU9OIEFCT1ZFXHJcbi8vSVQgVEFLU0UgcGxhY2UgQU5EIG1hcmtlciBBUyBQQVJBTUVURVJTLiBNQVJLRVIgSVMgTkVFREVEIFRPIExJTksgVEhFIExJU1QgV0lUSCBBQ1RVQUwgTUFSS0VSIE9OIFRIRSBNQVAgTEFURVJcclxuTUFQUy5jYWxjdWxhdGVEaXN0YW5jZSA9IGZ1bmN0aW9uKHBsYWNlLCBtYXJrZXIpIHtcclxuXHJcbiAgICAgICAgLy9QT0lOVCBSRVRVUk5TIEFDVFVBTCBMQVQgQU5EIExORyBPRiBUSEUgUExBQ0UgVE8gSEVMUCBDQUxDVUxBVElORyBUSEUgRElTVEFOQ0VcclxuICAgICAgICBwb2ludCA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHZhciBsYXQgPSBwbGFjZS5nZW9tZXRyeS5sb2NhdGlvbi5sYXQoKSxcclxuICAgICAgICAgICAgICAgIGxuZyA9IHBsYWNlLmdlb21ldHJ5LmxvY2F0aW9uLmxuZygpO1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgbGF0OiBsYXQsXHJcbiAgICAgICAgICAgICAgICBsbmc6IGxuZ1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vR0VUIERJU1RBTkNFIEJFVFdFRU4gb3JpZ2lucyBBTkQgZGVzdGluYXRpb25zIFdJVEggJ1dBTEtJTkcnIE1PREVcclxuICAgICAgICB0aGlzLmRpc3RhbmNlLmdldERpc3RhbmNlTWF0cml4KHtcclxuICAgICAgICAgICAgb3JpZ2luczogW3RoaXMuY29yZHNdLFxyXG4gICAgICAgICAgICBkZXN0aW5hdGlvbnM6IFtwb2ludCgpXSxcclxuICAgICAgICAgICAgdHJhdmVsTW9kZTogJ1dBTEtJTkcnXHJcbiAgICAgICAgfSwgZnVuY3Rpb24ocmVzcG9uc2Usc3RhdHVzKXtcclxuICAgICAgICAgICAgLy9nZXQgZHVyYXRpb24gdmFsdWUgKGluIG1pdXRlcylcclxuICAgICAgICAgICAgdmFyIGR1cmF0aW9uID0gcmVzcG9uc2Uucm93c1swXS5lbGVtZW50c1swXS5kdXJhdGlvbi50ZXh0O1xyXG5cclxuICAgICAgICAgICAgLy9DQUxMIFRIRSBESVNQTEFZIExJU1QgZnVuY3Rpb25cclxuICAgICAgICAgICAgdGhpcy5kaXNwbGF5TGlzdChkdXJhdGlvbiwgcGxhY2UsIG1hcmtlcik7XHJcbiAgICAgICAgfS5iaW5kKHRoaXMpKTtcclxufTtcclxuXHJcblxyXG4vL1RISVMgRlVOQ1RJT04gV0lMTCBESVNQTEFZIFRIRSBMSVNUIE9GIFBMQUNFU1xyXG4vL0lUIFRBS1NFIDMgQVJHVU1FTlRTOiBkdXJhdGlvbiAtIFRSQVZFTCBUSU1FIElOIE1JTlVURVMsIHBsYWNlLCBBTkQgbWFya2VyIC0gVE8gTElOSyBMSVNUIFdJVEggTUFSS0VSIE9OIFRIRSBNQVBcclxuTUFQUy5kaXNwbGF5TGlzdCA9IGZ1bmN0aW9uKGR1cmF0aW9uLCBwbGFjZSwgbWFya2VyKXtcclxuXHJcblxyXG4gICAgLy9DUkVBVEUgRElWIFRIQVQgV0lMTCBCRSBDT05UQUlORVIgRk9SIEVBQ0ggUExBQ0UgSVRFTSBPTiBUSEUgTElTVFxyXG4gICAgdmFyIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpLFxyXG4gICAgICAgIGJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpLFxyXG4gICAgICAgIGRldGFpbHMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIGRpdi5jbGFzc0xpc3QuYWRkKCdtYXAtbGlzdF9faXRlbScpO1xyXG4gICAgYnRuLmNsYXNzTGlzdC5hZGQoJ21hcC1saXN0X19idXR0b24nKTtcclxuICAgIGRldGFpbHMuY2xhc3NMaXN0LmFkZCgnbWFwLWxpc3RfX2RldGFpbHMnKTtcclxuICAgIGRldGFpbHMuY2xhc3NMaXN0LmFkZCgnbWFwLWxpc3RfX2RldGFpbHMtLWhpZGRlbicpO1xyXG5cclxuICAgIGJ0bi5pbm5lckhUTUwgPSAnU0VFIE1PUkUgREVUQUlMUyc7XHJcblxyXG4gICAgLy92YXIgc3BhbiA9ICc8c3Bhbj4nK3BsYWNlLm5hbWUrJywgZHVyYXRpb246ICcrZHVyYXRpb24rJzwvc3Bhbj4nO1xyXG4gICAgdmFyIHNwYW4gPVxyXG4gICAgICAgICc8aDMgY2xhc3M9XCJtYXAtbGlzdF9fbmFtZVwiPicrXHJcbiAgICAgICAgICAgIHBsYWNlLm5hbWUgK1xyXG4gICAgICAgICc8L2gzPicrXHJcbiAgICAgICAgJzxzcGFuIGNsYXNzPVwibWFwLWxpc3RfX2R1cmF0aW9uXCI+JytcclxuICAgICAgICAgICAgJ0Rpc3RhbmNlIGJ5IHdhbGtpbmc6ICcgK1xyXG4gICAgICAgICAgICAnPGI+JyArZHVyYXRpb24rICc8L2I+JyArXHJcbiAgICAgICAgJzwvc3Bhbj4nO1xyXG5cclxuICAgIGRpdi5pbm5lckhUTUwgPSBzcGFuO1xyXG4gICAgZGl2LmFwcGVuZENoaWxkKGRldGFpbHMpO1xyXG4gICAgZGl2LmFwcGVuZENoaWxkKGJ0bik7XHJcbiAgICB0aGlzLnBsYWNlc0xpc3QuYXBwZW5kQ2hpbGQoZGl2KTtcclxuXHJcblxyXG4gICAgLy9BREQgRVZFTlQgTElTVEVORVJTIFdIRU4gSU5URVJBQ1RJTkcgV0lUSCBUSEUgTElTVFxyXG4gICAgZGl2LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsZnVuY3Rpb24oKXtcclxuICAgICAgICBtYXJrZXIuc2V0SWNvbignJyk7XHJcbiAgICB9LGZhbHNlKTtcclxuXHJcbiAgICBkaXYuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsZnVuY3Rpb24oKXtcclxuICAgICAgICBtYXJrZXIuc2V0SWNvbignaHR0cHM6Ly9kZXZlbG9wZXJzLmdvb2dsZS5jb20vbWFwcy9kb2N1bWVudGF0aW9uL2phdmFzY3JpcHQvaW1hZ2VzL2NpcmNsZS5wbmcnKTtcclxuICAgIH0sZmFsc2UpO1xyXG5cclxuICAgIGJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsZnVuY3Rpb24oKXtcclxuICAgICAgICB0aGlzLnNlcnZpY2UuZ2V0RGV0YWlscyhwbGFjZSwgZnVuY3Rpb24ocmVzdWx0LCBzdGF0dXMpe1xyXG4gICAgICAgICAgICBpZiAoc3RhdHVzICE9PSBnb29nbGUubWFwcy5wbGFjZXMuUGxhY2VzU2VydmljZVN0YXR1cy5PSykge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihzdGF0dXMpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBkZXRhaWxzLmlubmVySFRNTD0gJ3dvcmtzJztcclxuICAgICAgICB9LmJpbmQodGhpcykpO1xyXG4gICAgfS5iaW5kKHRoaXMpLGZhbHNlKTtcclxuXHJcblxyXG59O1xyXG5cclxuXHJcbi8vRE9NSEFORExFUlxyXG5cclxudmFyIERPTUhBTkRMRVIgPSB7XHJcbiAgICBzZXRUeXBlOiBmdW5jdGlvbih0eXBlKSB7XHJcbiAgICAgICAgdGhpcy50eXBlID0gdHlwZTtcclxuICAgIH0sXHJcbiAgICBnZXRUeXBlOiBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy50eXBlO1xyXG4gICAgfSxcclxuICAgIHNldFNvcnQ6IGZ1bmN0aW9uKHNvcnQpIHtcclxuICAgICAgICB0aGlzLnNvcnQgPSBzb3J0O1xyXG4gICAgfSxcclxuICAgIGdldFNvcnQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNvcnQ7XHJcbiAgICB9XHJcbn07XHJcblxyXG5cclxuRE9NSEFORExFUi5pbml0ID0gZnVuY3Rpb24oKXtcclxuICAgIHZhciBpbnB1dFR5cGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaW5wdXQtdHlwZScpLFxyXG4gICAgICAgIGlucHV0U29ydCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdpbnB1dC1zb3J0Jyk7XHJcbiAgICAgICAgdGhpcy5zZXRUeXBlKGlucHV0VHlwZS52YWx1ZSk7XHJcbiAgICAgICAgdGhpcy5zZXRTb3J0KGlucHV0U29ydC52YWx1ZSk7XHJcblxyXG4gICAgICAgIGlucHV0VHlwZS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCB0aGlzLmNsaWNrTGlzdGVuZXIuYmluZCh0aGlzKSwgZmFsc2UpO1xyXG4gICAgICAgIGlucHV0U29ydC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCB0aGlzLmNsaWNrTGlzdGVuZXIuYmluZCh0aGlzKSwgZmFsc2UpO1xyXG59XHJcblxyXG5cclxuRE9NSEFORExFUi5jbGlja0xpc3RlbmVyID0gZnVuY3Rpb24oZSkge1xyXG4gICAgdmFyIHNyYyA9IGUuc3JjIHx8IGUudGFyZ2V0LFxyXG4gICAgICAgIHZhbHVlID0gc3JjLnZhbHVlLFxyXG4gICAgICAgIGNvbmZpZyA9IHt9O1xyXG5cclxuICAgIGlmIChzcmMuaWQgPT09ICdpbnB1dC10eXBlJykge1xyXG4gICAgICAgIHRoaXMuc2V0VHlwZSh2YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBpZiAoc3JjLmlkID09PSAnaW5wdXQtc29ydCcpIHtcclxuICAgICAgICB0aGlzLnNldFNvcnQodmFsdWUpO1xyXG4gICAgfVxyXG4gICAgY29uZmlnID0ge1xyXG4gICAgICAgIHR5cGU6IHRoaXMuZ2V0VHlwZSgpLFxyXG4gICAgICAgIHNvcnQ6IHRoaXMuZ2V0U29ydCgpXHJcbiAgICB9XHJcblxyXG4gICAgTUFQUy5pbml0aWFsaXplKGNvbmZpZyk7XHJcblxyXG59O1xyXG5cclxuRE9NSEFORExFUi5pbml0KCk7XHJcbk1BUFMuaW5pdGlhbGl6ZSh7XHJcbiAgICB0eXBlOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaW5wdXQtdHlwZScpLnZhbHVlLFxyXG4gICAgc29ydDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2lucHV0LXNvcnQnKVxyXG59KTtcclxuIiwidmFyIFdFQVRIRVJBUEkgPSB7XHJcblxyXG59O1xyXG5cclxuV0VBVEhFUkFQSS5pbml0ID0gZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcblxyXG4gICAgeGhyLm9wZW4oJ0dFVCcsICdodHRwOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9kYXRhLzIuNS93ZWF0aGVyP3E9TG9uZG9uJmFwcGlkPWE0NzJlYmQ2NDJkYTNlNjRlMzVkYTMyOGFhZjM1MzFjJyx0cnVlKTtcclxuICAgIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbihkYXRhKSB7XHJcbiAgICAgICAgaWYgKHhoci5yZWFkeVN0YXRlICE9PSA0ICkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh4aHIuc3RhdHVzICE9PSAyMDAgKXtcclxuICAgICAgICAgICAgY29uc29sZS5lcnIoJ1N0YXR1cyBlcnJvcjogJyArIHhoci5zdGF0dXMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgcmVzdWx0cyA9IEpTT04ucGFyc2UoZGF0YS5zcmNFbGVtZW50LnJlc3BvbnNlKTtcclxuICAgICAgICAgICAgLy9jb250YWluZXJEaXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnd2VhdGhlcicpO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgeGhyLnNlbmQoKTtcclxufTtcclxuXHJcbldFQVRIRVJBUEkuaW5pdCgpO1xyXG4iXX0=
