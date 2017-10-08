(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function(){



}());

var MAPS = {
    map: {},
    service: {},
    infoWindow: {},
    distance: {},
    cords: {lat: 51.524813, lng: -0.125688},
    placesList: document.getElementById('places')
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
    var div = document.createElement('div');
    div.classList.add('map-list__item');

    var span = '<span>'+place.name+', duration: '+duration+'</span>';
    div.innerHTML = span;
    this.placesList.appendChild(div);


    //ADD EVENT LISTENERS WHEN INTERACTING WITH THE LIST
    div.addEventListener('mouseover',function(){
        marker.setIcon('');
    },false);

    div.addEventListener('mouseleave',function(){
        marker.setIcon('https://developers.google.com/maps/documentation/javascript/images/circle.png');
    },false);

    div.addEventListener('click',function(){
        this.service.getDetails(place, function(result, status){
            if (status !== google.maps.places.PlacesServiceStatus.OK) {
                console.error(status);
                return;
            }
            div.innerHTML += "DUPA";
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsIm1hcHMuanMiLCJ3ZWF0aGVyYXBwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbE5BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtcclxuXHJcblxyXG5cclxufSgpKTtcclxuIiwidmFyIE1BUFMgPSB7XHJcbiAgICBtYXA6IHt9LFxyXG4gICAgc2VydmljZToge30sXHJcbiAgICBpbmZvV2luZG93OiB7fSxcclxuICAgIGRpc3RhbmNlOiB7fSxcclxuICAgIGNvcmRzOiB7bGF0OiA1MS41MjQ4MTMsIGxuZzogLTAuMTI1Njg4fSxcclxuICAgIHBsYWNlc0xpc3Q6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbGFjZXMnKVxyXG59O1xyXG5cclxuLy9JTklUSUFMSVpFIFRIRSBNQVAgKEZJUkVEIE9OIFRIRSBTVEFSVCBBTkQgT04gRVZFUlkgQ0hBTkdFIE9GIERBVEEgKEZST00gU0xFQ1QgSU5QVVQ6IFRZUEUgQU5EIFNPUlQpKVxyXG5NQVBTLmluaXRpYWxpemUgPSBmdW5jdGlvbihjb25maWcpe1xyXG5cclxuICAgIC8vQ0xFQVIgVEhFIExJU1QgT0YgUExBQ0VTIEJFRk9SRSBJTklUSUFMSVpJTkdcclxuICAgIHRoaXMucGxhY2VzTGlzdC5pbm5lckhUTUwgPSAnJztcclxuXHJcbiAgICAvL1JFUSBPQko6IFRBS0VTIFJBTkssIFRZUEUgRlJPTSBDT05GSUcgQVJHVU1FTlQgUEFTU0VEIFRPIFRISVMgRlVOQ1RJT04gQU5EIFNFVFMgREFUQSBERVBFTkRJTkcgT04gVEhBVFxyXG4gICAgdmFyIHJlcXVlc3QgPSB7XHJcbiAgICAgICAgICAgIGxvY2F0aW9uOiB0aGlzLmNvcmRzLFxyXG4gICAgICAgICAgICB0eXBlOiBbY29uZmlnLnR5cGVdLFxyXG4gICAgICAgICAgICByYW5rQnk6IChjb25maWcuc29ydCA9PT0gJ3JhbmsnKSA/IGdvb2dsZS5tYXBzLnBsYWNlcy5SYW5rQnkuUkFUSU5HIDogZ29vZ2xlLm1hcHMucGxhY2VzLlJhbmtCeS5ESVNUQU5DRSxcclxuICAgICAgICAgICAgcmFkaXVzOiAoY29uZmlnLnNvcnQgPT09ICdyYW5rJykgPyAnMTAwMCcgOiBudWxsXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAvL0NSRUFURSBORVcgR09PR0xFIE1BUFxyXG4gICAgdGhpcy5tYXAgPSBuZXcgZ29vZ2xlLm1hcHMuTWFwKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYXAtZGlzcGxheScpLHtcclxuICAgICAgICBjZW50ZXI6IHRoaXMuY29yZHMsXHJcbiAgICAgICAgem9vbTogMTUsXHJcbiAgICAgICAgY29yZHM6IHRoaXMuY29yZHMsXHJcbiAgICAgICAgZGlzYWJsZURlZmF1bHRVSTogdHJ1ZSxcclxuICAgICAgICBnZXN0dXJlSGFuZGxpbmc6ICdjb29wZXJhdGl2ZSdcclxuICAgIH0pO1xyXG5cclxuICAgIC8vQ1JFQVRFIE1BUktFUiAoSUNPTikgRk9SIENFTlRFUiBQT0lOVFxyXG4gICAgdmFyIG1hcmtlciA9IG5ldyBnb29nbGUubWFwcy5NYXJrZXIoe1xyXG4gICAgICAgIG1hcDogdGhpcy5tYXAsXHJcbiAgICAgICAgcG9zaXRpb246IHRoaXMuY29yZHNcclxuICAgIH0pO1xyXG5cclxuICAgIC8vSU5JVElBTElaRSBPVEhFUiBHT09HTEUgU0VSVklDRVNcclxuICAgIHRoaXMuaW5mb1dpbmRvdyA9IG5ldyBnb29nbGUubWFwcy5JbmZvV2luZG93KCk7XHJcbiAgICB0aGlzLnNlcnZpY2UgPSBuZXcgZ29vZ2xlLm1hcHMucGxhY2VzLlBsYWNlc1NlcnZpY2UodGhpcy5tYXApO1xyXG4gICAgdGhpcy5kaXN0YW5jZSA9IG5ldyBnb29nbGUubWFwcy5EaXN0YW5jZU1hdHJpeFNlcnZpY2UoKTtcclxuXHJcbiAgICAvL0lOSVRJQUxJWkUgbmVhcmJ5U2VhcmNoIFRPIEZJTkQgUExBQ0VTIElOIExPQ0FMIEFSRUEgQU5EIENBTEwgY2FsbGJhY2sgZnVuY3Rpb25cclxuICAgIHRoaXMuc2VydmljZS5uZWFyYnlTZWFyY2gocmVxdWVzdCwgdGhpcy5jYWxsYmFjayk7XHJcblxyXG59O1xyXG5cclxuLy9TRUFSQ0ggRk9SIERBVEEgQkFTSU5HIE9OIFJFUVVFU1QgT0JKIEZST00gQUJPVkUgQU5EIENSRUFURSBNQVJLRVJTIE9OIE1BUCBGT1IgUExBQ0VTXHJcbk1BUFMuY2FsbGJhY2sgPSBmdW5jdGlvbihyZXN1bHRzLCBzdGF0dXMpIHtcclxuICAgIGlmIChzdGF0dXMgPT0gZ29vZ2xlLm1hcHMucGxhY2VzLlBsYWNlc1NlcnZpY2VTdGF0dXMuT0spIHtcclxuICAgICAgICBmb3IgKHZhciBpPTA7IGk8cmVzdWx0cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBNQVBTLmNyZWF0ZU1hcmtlcihyZXN1bHRzW2ldKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxyXG4vL0FDVFVBTCBGVU5DVElPTiBSRVNQT05TSUJMRSBGT1IgQ1JFQVRJTkcgTUFSS0VSU1xyXG4vL0lUIFNFVFMgVEhFIE1BUktFUiBGT1IgRUFDSCBQTEFDRSBGT1VORCBJTiBjYWxsYmFjayBGVU5DVElPTiBBQk9WRVxyXG4vL0FORCBDQUxMUyAnQ0FMQ1VMQVRFIERJU1RBTkNFL0RJU1BMQVkgTElTVCcgRlVOQ1RJT04gV0hJQ0ggV0lMTCBTSE9XIFRIRSBMSVNUXHJcbk1BUFMuY3JlYXRlTWFya2VyID0gZnVuY3Rpb24ocGxhY2UpIHtcclxuXHJcbiAgICAvL0NSRUFURSBORVcgTUFSS0VSXHJcbiAgICB2YXIgbWFya2VyID0gbmV3IGdvb2dsZS5tYXBzLk1hcmtlcih7XHJcbiAgICAgICAgbWFwOiB0aGlzLm1hcCxcclxuICAgICAgICBwb3NpdGlvbjogcGxhY2UuZ2VvbWV0cnkubG9jYXRpb24sXHJcbiAgICAgICAgaWNvbjoge1xyXG4gICAgICAgICAgICB1cmw6ICdodHRwczovL2RldmVsb3BlcnMuZ29vZ2xlLmNvbS9tYXBzL2RvY3VtZW50YXRpb24vamF2YXNjcmlwdC9pbWFnZXMvY2lyY2xlLnBuZydcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvL0FERCBDTElDSyBMSVNURU5FUiBPTiBBQ1RVQUwgTUFSS0VSXHJcbiAgICBnb29nbGUubWFwcy5ldmVudC5hZGRMaXN0ZW5lcihtYXJrZXIsICdjbGljaycsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdGhpcy5zZXJ2aWNlLmdldERldGFpbHMocGxhY2UsIGZ1bmN0aW9uKHJlc3VsdCwgc3RhdHVzKXtcclxuICAgICAgICAgICAgaWYgKHN0YXR1cyAhPT0gZ29vZ2xlLm1hcHMucGxhY2VzLlBsYWNlc1NlcnZpY2VTdGF0dXMuT0spIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3Ioc3RhdHVzKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy9TRVQgQ09OVEVOVCBPRiBJTkZPV0lORE9XIFRIQVQgV0lMTCBPUEVOIEFGVEVSIE1BUktFUiBJUyBDTElDS0VEXHJcbiAgICAgICAgICAgIHRoaXMuaW5mb1dpbmRvdy5zZXRDb250ZW50KCc8aDI+JytyZXN1bHQubmFtZSsnPC9oMj4nICsgcmVzdWx0LmFkcl9hZGRyZXNzICk7XHJcbiAgICAgICAgICAgIHRoaXMuaW5mb1dpbmRvdy5vcGVuKHRoaXMubWFwLCBtYXJrZXIpO1xyXG4gICAgICAgIH0uYmluZCh0aGlzKSk7XHJcbiAgICB9LmJpbmQodGhpcykpO1xyXG5cclxuICAgIC8vQ0FMTCBGVU5DVElPTiBUSEFUIFdJTEwgQ0FMQ1VMQVRFIFRIRSBESVNUQU5DRVxyXG4gICAgTUFQUy5jYWxjdWxhdGVEaXN0YW5jZShwbGFjZSwgbWFya2VyKTtcclxuXHJcbn07XHJcblxyXG4vL1RISVMgRlVOQ1RJT04gQ0FMQ1VMQVRFUyBUSEUgRElTVEFOQ0UgQkVUV0VFTiBUV08gUE9JTlRTOiBNQUlOIEFORCBFQUNIIFBBQ0UgRk9VTkQgSU4gY2FsbGJhY2sgRlVOQ1RJT04gQUJPVkVcclxuLy9JVCBUQUtTRSBwbGFjZSBBTkQgbWFya2VyIEFTIFBBUkFNRVRFUlMuIE1BUktFUiBJUyBORUVERUQgVE8gTElOSyBUSEUgTElTVCBXSVRIIEFDVFVBTCBNQVJLRVIgT04gVEhFIE1BUCBMQVRFUlxyXG5NQVBTLmNhbGN1bGF0ZURpc3RhbmNlID0gZnVuY3Rpb24ocGxhY2UsIG1hcmtlcikge1xyXG5cclxuICAgICAgICAvL1BPSU5UIFJFVFVSTlMgQUNUVUFMIExBVCBBTkQgTE5HIE9GIFRIRSBQTEFDRSBUTyBIRUxQIENBTENVTEFUSU5HIFRIRSBESVNUQU5DRVxyXG4gICAgICAgIHBvaW50ID0gZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgdmFyIGxhdCA9IHBsYWNlLmdlb21ldHJ5LmxvY2F0aW9uLmxhdCgpLFxyXG4gICAgICAgICAgICAgICAgbG5nID0gcGxhY2UuZ2VvbWV0cnkubG9jYXRpb24ubG5nKCk7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBsYXQ6IGxhdCxcclxuICAgICAgICAgICAgICAgIGxuZzogbG5nXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy9HRVQgRElTVEFOQ0UgQkVUV0VFTiBvcmlnaW5zIEFORCBkZXN0aW5hdGlvbnMgV0lUSCAnV0FMS0lORycgTU9ERVxyXG4gICAgICAgIHRoaXMuZGlzdGFuY2UuZ2V0RGlzdGFuY2VNYXRyaXgoe1xyXG4gICAgICAgICAgICBvcmlnaW5zOiBbdGhpcy5jb3Jkc10sXHJcbiAgICAgICAgICAgIGRlc3RpbmF0aW9uczogW3BvaW50KCldLFxyXG4gICAgICAgICAgICB0cmF2ZWxNb2RlOiAnV0FMS0lORydcclxuICAgICAgICB9LCBmdW5jdGlvbihyZXNwb25zZSxzdGF0dXMpe1xyXG5cclxuICAgICAgICAgICAgLy9nZXQgZHVyYXRpb24gdmFsdWUgKGluIG1pdXRlcylcclxuICAgICAgICAgICAgdmFyIGR1cmF0aW9uID0gcmVzcG9uc2Uucm93c1swXS5lbGVtZW50c1swXS5kdXJhdGlvbi50ZXh0O1xyXG5cclxuICAgICAgICAgICAgLy9DQUxMIFRIRSBESVNQTEFZIExJU1QgZnVuY3Rpb25cclxuICAgICAgICAgICAgdGhpcy5kaXNwbGF5TGlzdChkdXJhdGlvbiwgcGxhY2UsIG1hcmtlcik7XHJcbiAgICAgICAgfS5iaW5kKHRoaXMpKTtcclxufTtcclxuXHJcblxyXG4vL1RISVMgRlVOQ1RJT04gV0lMTCBESVNQTEFZIFRIRSBMSVNUIE9GIFBMQUNFU1xyXG4vL0lUIFRBS1NFIDMgQVJHVU1FTlRTOiBkdXJhdGlvbiAtIFRSQVZFTCBUSU1FIElOIE1JTlVURVMsIHBsYWNlLCBBTkQgbWFya2VyIC0gVE8gTElOSyBMSVNUIFdJVEggTUFSS0VSIE9OIFRIRSBNQVBcclxuTUFQUy5kaXNwbGF5TGlzdCA9IGZ1bmN0aW9uKGR1cmF0aW9uLCBwbGFjZSwgbWFya2VyKXtcclxuXHJcbiAgICAvL0NSRUFURSBESVYgVEhBVCBXSUxMIEJFIENPTlRBSU5FUiBGT1IgRUFDSCBQTEFDRSBJVEVNIE9OIFRIRSBMSVNUXHJcbiAgICB2YXIgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICBkaXYuY2xhc3NMaXN0LmFkZCgnbWFwLWxpc3RfX2l0ZW0nKTtcclxuXHJcbiAgICB2YXIgc3BhbiA9ICc8c3Bhbj4nK3BsYWNlLm5hbWUrJywgZHVyYXRpb246ICcrZHVyYXRpb24rJzwvc3Bhbj4nO1xyXG4gICAgZGl2LmlubmVySFRNTCA9IHNwYW47XHJcbiAgICB0aGlzLnBsYWNlc0xpc3QuYXBwZW5kQ2hpbGQoZGl2KTtcclxuXHJcblxyXG4gICAgLy9BREQgRVZFTlQgTElTVEVORVJTIFdIRU4gSU5URVJBQ1RJTkcgV0lUSCBUSEUgTElTVFxyXG4gICAgZGl2LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsZnVuY3Rpb24oKXtcclxuICAgICAgICBtYXJrZXIuc2V0SWNvbignJyk7XHJcbiAgICB9LGZhbHNlKTtcclxuXHJcbiAgICBkaXYuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsZnVuY3Rpb24oKXtcclxuICAgICAgICBtYXJrZXIuc2V0SWNvbignaHR0cHM6Ly9kZXZlbG9wZXJzLmdvb2dsZS5jb20vbWFwcy9kb2N1bWVudGF0aW9uL2phdmFzY3JpcHQvaW1hZ2VzL2NpcmNsZS5wbmcnKTtcclxuICAgIH0sZmFsc2UpO1xyXG5cclxuICAgIGRpdi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsZnVuY3Rpb24oKXtcclxuICAgICAgICB0aGlzLnNlcnZpY2UuZ2V0RGV0YWlscyhwbGFjZSwgZnVuY3Rpb24ocmVzdWx0LCBzdGF0dXMpe1xyXG4gICAgICAgICAgICBpZiAoc3RhdHVzICE9PSBnb29nbGUubWFwcy5wbGFjZXMuUGxhY2VzU2VydmljZVN0YXR1cy5PSykge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihzdGF0dXMpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGRpdi5pbm5lckhUTUwgKz0gXCJEVVBBXCI7XHJcbiAgICAgICAgfS5iaW5kKHRoaXMpKTtcclxuICAgIH0uYmluZCh0aGlzKSxmYWxzZSk7XHJcblxyXG5cclxufTtcclxuXHJcblxyXG4vL0RPTUhBTkRMRVJcclxuXHJcbnZhciBET01IQU5ETEVSID0ge1xyXG4gICAgc2V0VHlwZTogZnVuY3Rpb24odHlwZSkge1xyXG4gICAgICAgIHRoaXMudHlwZSA9IHR5cGU7XHJcbiAgICB9LFxyXG4gICAgZ2V0VHlwZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudHlwZTtcclxuICAgIH0sXHJcbiAgICBzZXRTb3J0OiBmdW5jdGlvbihzb3J0KSB7XHJcbiAgICAgICAgdGhpcy5zb3J0ID0gc29ydDtcclxuICAgIH0sXHJcbiAgICBnZXRTb3J0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zb3J0O1xyXG4gICAgfVxyXG59O1xyXG5cclxuXHJcbkRPTUhBTkRMRVIuaW5pdCA9IGZ1bmN0aW9uKCl7XHJcbiAgICB2YXIgaW5wdXRUeXBlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2lucHV0LXR5cGUnKSxcclxuICAgICAgICBpbnB1dFNvcnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaW5wdXQtc29ydCcpO1xyXG4gICAgICAgIHRoaXMuc2V0VHlwZShpbnB1dFR5cGUudmFsdWUpO1xyXG4gICAgICAgIHRoaXMuc2V0U29ydChpbnB1dFNvcnQudmFsdWUpO1xyXG5cclxuICAgICAgICBpbnB1dFR5cGUuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgdGhpcy5jbGlja0xpc3RlbmVyLmJpbmQodGhpcyksIGZhbHNlKTtcclxuICAgICAgICBpbnB1dFNvcnQuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgdGhpcy5jbGlja0xpc3RlbmVyLmJpbmQodGhpcyksIGZhbHNlKTtcclxufVxyXG5cclxuXHJcbkRPTUhBTkRMRVIuY2xpY2tMaXN0ZW5lciA9IGZ1bmN0aW9uKGUpIHtcclxuICAgIHZhciBzcmMgPSBlLnNyYyB8fCBlLnRhcmdldCxcclxuICAgICAgICB2YWx1ZSA9IHNyYy52YWx1ZSxcclxuICAgICAgICBjb25maWcgPSB7fTtcclxuXHJcbiAgICBpZiAoc3JjLmlkID09PSAnaW5wdXQtdHlwZScpIHtcclxuICAgICAgICB0aGlzLnNldFR5cGUodmFsdWUpO1xyXG4gICAgfVxyXG4gICAgaWYgKHNyYy5pZCA9PT0gJ2lucHV0LXNvcnQnKSB7XHJcbiAgICAgICAgdGhpcy5zZXRTb3J0KHZhbHVlKTtcclxuICAgIH1cclxuICAgIGNvbmZpZyA9IHtcclxuICAgICAgICB0eXBlOiB0aGlzLmdldFR5cGUoKSxcclxuICAgICAgICBzb3J0OiB0aGlzLmdldFNvcnQoKVxyXG4gICAgfVxyXG5cclxuICAgIE1BUFMuaW5pdGlhbGl6ZShjb25maWcpO1xyXG5cclxufTtcclxuXHJcbkRPTUhBTkRMRVIuaW5pdCgpO1xyXG5NQVBTLmluaXRpYWxpemUoe1xyXG4gICAgdHlwZTogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2lucHV0LXR5cGUnKS52YWx1ZSxcclxuICAgIHNvcnQ6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdpbnB1dC1zb3J0JylcclxufSk7XHJcbiIsInZhciBXRUFUSEVSQVBJID0ge1xyXG5cclxufTtcclxuXHJcbldFQVRIRVJBUEkuaW5pdCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG5cclxuICAgIHhoci5vcGVuKCdHRVQnLCAnaHR0cDovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvd2VhdGhlcj9xPUxvbmRvbiZhcHBpZD1hNDcyZWJkNjQyZGEzZTY0ZTM1ZGEzMjhhYWYzNTMxYycsdHJ1ZSk7XHJcbiAgICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oZGF0YSkge1xyXG4gICAgICAgIGlmICh4aHIucmVhZHlTdGF0ZSAhPT0gNCApIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoeGhyLnN0YXR1cyAhPT0gMjAwICl7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyKCdTdGF0dXMgZXJyb3I6ICcgKyB4aHIuc3RhdHVzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIHJlc3VsdHMgPSBKU09OLnBhcnNlKGRhdGEuc3JjRWxlbWVudC5yZXNwb25zZSk7XHJcbiAgICAgICAgICAgIC8vY29udGFpbmVyRGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3dlYXRoZXInKTtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIHhoci5zZW5kKCk7XHJcbn07XHJcblxyXG5XRUFUSEVSQVBJLmluaXQoKTtcclxuIl19
