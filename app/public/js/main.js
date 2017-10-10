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
        details = document.createElement('div');
    div.classList.add('map-list__item');
    btn.classList.add('map-list__button');
    details.classList.add('map-list__details-list');
    details.classList.add('map-list__details-list--hidden');

    btn.innerHTML = 'SEE MORE DETAILS';

    //var span = '<span>'+place.name+', duration: '+duration+'</span>';
    var span = '';

    if (place.photos !== undefined) {
            span += '<img src="'+ place.photos[0].getUrl({maxWidth: 75, maxHeight: 750})+'" alt="">';
    } else {
            span += '<img src="'+ place.icon+'" alt="">';
    }
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

    btn.addEventListener('click',function(){
        this.service.getDetails(place, function(result, status){
            if (status !== google.maps.places.PlacesServiceStatus.OK) {
                console.error(status);
                return;
            }

            details.classList.toggle('map-list__details-list--hidden');
            details.classList.toggle('map-list__details-list--visible');


            var resultsData = '';

                console.log(result);
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
                if (result.website !== undefined) {
                    resultsData +=
                        '<a class="details-list__link" href="'+result.website+'" title="Link to place in google maps app" target="_blank">'+
                            '<span class="details-list__icon fa fa-globe" aria-hidden="true">'+
                            '</span>'+
                            '<span class="details-list__description">'+
                                'Website'+
                            '</span>'+
                        '</a>';
                }
                if (result.rating !== undefined) {
                    resultsData +=
                            '<span class="details-list__icon fa fa-star" aria-hidden="true">'+
                            '</span>'+
                            '<span class="details-list__description">'+
                                result.rating+
                            '</span>';
                }




            details.innerHTML= resultsData;

                /*'<a href="'+resultsData.website+'" title="Link to place\'s webiste" target="_blank">'+
                    '<span class="map-list__icon fa fa-globe" aria-hidden="true">'+
                    '</span>'+
                '</a>';*/
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsIm1hcHMuanMiLCJ3ZWF0aGVyYXBwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdlJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtcclxuXHJcblxyXG5cclxufSgpKTtcclxuIiwidmFyIE1BUFMgPSB7XHJcbiAgICBtYXA6IHt9LFxyXG4gICAgc2VydmljZToge30sXHJcbiAgICBpbmZvV2luZG93OiB7fSxcclxuICAgIGRpc3RhbmNlOiB7fSxcclxuICAgIGNvcmRzOiB7bGF0OiA1MS41MjQ4MTMsIGxuZzogLTAuMTI1Njg4fSxcclxuICAgIHBsYWNlc0xpc3Q6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYXAtbGlzdCcpXHJcbn07XHJcblxyXG4vL0lOSVRJQUxJWkUgVEhFIE1BUCAoRklSRUQgT04gVEhFIFNUQVJUIEFORCBPTiBFVkVSWSBDSEFOR0UgT0YgREFUQSAoRlJPTSBTTEVDVCBJTlBVVDogVFlQRSBBTkQgU09SVCkpXHJcbk1BUFMuaW5pdGlhbGl6ZSA9IGZ1bmN0aW9uKGNvbmZpZyl7XHJcblxyXG4gICAgLy9DTEVBUiBUSEUgTElTVCBPRiBQTEFDRVMgQkVGT1JFIElOSVRJQUxJWklOR1xyXG4gICAgdGhpcy5wbGFjZXNMaXN0LmlubmVySFRNTCA9ICcnO1xyXG5cclxuICAgIC8vUkVRIE9CSjogVEFLRVMgUkFOSywgVFlQRSBGUk9NIENPTkZJRyBBUkdVTUVOVCBQQVNTRUQgVE8gVEhJUyBGVU5DVElPTiBBTkQgU0VUUyBEQVRBIERFUEVORElORyBPTiBUSEFUXHJcbiAgICB2YXIgcmVxdWVzdCA9IHtcclxuICAgICAgICAgICAgbG9jYXRpb246IHRoaXMuY29yZHMsXHJcbiAgICAgICAgICAgIHR5cGU6IFtjb25maWcudHlwZV0sXHJcbiAgICAgICAgICAgIHJhbmtCeTogKGNvbmZpZy5zb3J0ID09PSAncmFuaycpID8gZ29vZ2xlLm1hcHMucGxhY2VzLlJhbmtCeS5QUk9NSU5FTkNFIDogZ29vZ2xlLm1hcHMucGxhY2VzLlJhbmtCeS5ESVNUQU5DRSxcclxuICAgICAgICAgICAgcmFkaXVzOiAoY29uZmlnLnNvcnQgPT09ICdyYW5rJykgPyAnMTAwMCcgOiBudWxsXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAvL0NSRUFURSBORVcgR09PR0xFIE1BUFxyXG4gICAgdGhpcy5tYXAgPSBuZXcgZ29vZ2xlLm1hcHMuTWFwKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYXAtZGlzcGxheScpLHtcclxuICAgICAgICBjZW50ZXI6IHRoaXMuY29yZHMsXHJcbiAgICAgICAgem9vbTogMTUsXHJcbiAgICAgICAgY29yZHM6IHRoaXMuY29yZHMsXHJcbiAgICAgICAgZGlzYWJsZURlZmF1bHRVSTogdHJ1ZSxcclxuICAgICAgICBnZXN0dXJlSGFuZGxpbmc6ICdjb29wZXJhdGl2ZSdcclxuICAgIH0pO1xyXG5cclxuICAgIC8vQ1JFQVRFIE1BUktFUiAoSUNPTikgRk9SIENFTlRFUiBQT0lOVFxyXG4gICAgdmFyIG1hcmtlciA9IG5ldyBnb29nbGUubWFwcy5NYXJrZXIoe1xyXG4gICAgICAgIG1hcDogdGhpcy5tYXAsXHJcbiAgICAgICAgcG9zaXRpb246IHRoaXMuY29yZHNcclxuICAgIH0pO1xyXG5cclxuICAgIC8vSU5JVElBTElaRSBPVEhFUiBHT09HTEUgU0VSVklDRVNcclxuICAgIHRoaXMuaW5mb1dpbmRvdyA9IG5ldyBnb29nbGUubWFwcy5JbmZvV2luZG93KCk7XHJcbiAgICB0aGlzLnNlcnZpY2UgPSBuZXcgZ29vZ2xlLm1hcHMucGxhY2VzLlBsYWNlc1NlcnZpY2UodGhpcy5tYXApO1xyXG4gICAgdGhpcy5kaXN0YW5jZSA9IG5ldyBnb29nbGUubWFwcy5EaXN0YW5jZU1hdHJpeFNlcnZpY2UoKTtcclxuXHJcbiAgICAvL0lOSVRJQUxJWkUgbmVhcmJ5U2VhcmNoIFRPIEZJTkQgUExBQ0VTIElOIExPQ0FMIEFSRUEgQU5EIENBTEwgY2FsbGJhY2sgZnVuY3Rpb25cclxuICAgIHRoaXMuc2VydmljZS5uZWFyYnlTZWFyY2gocmVxdWVzdCwgdGhpcy5jYWxsYmFjayk7XHJcblxyXG59O1xyXG5cclxuLy9TRUFSQ0ggRk9SIERBVEEgQkFTSU5HIE9OIFJFUVVFU1QgT0JKIEZST00gQUJPVkUgQU5EIENSRUFURSBNQVJLRVJTIE9OIE1BUCBGT1IgUExBQ0VTXHJcbk1BUFMuY2FsbGJhY2sgPSBmdW5jdGlvbihyZXN1bHRzLCBzdGF0dXMpIHtcclxuICAgIGlmIChzdGF0dXMgPT0gZ29vZ2xlLm1hcHMucGxhY2VzLlBsYWNlc1NlcnZpY2VTdGF0dXMuT0spIHtcclxuICAgICAgICBmb3IgKHZhciBpPTA7IGk8cmVzdWx0cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBNQVBTLmNyZWF0ZU1hcmtlcihyZXN1bHRzW2ldKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxyXG4vL0FDVFVBTCBGVU5DVElPTiBSRVNQT05TSUJMRSBGT1IgQ1JFQVRJTkcgTUFSS0VSU1xyXG4vL0lUIFNFVFMgVEhFIE1BUktFUiBGT1IgRUFDSCBQTEFDRSBGT1VORCBJTiBjYWxsYmFjayBGVU5DVElPTiBBQk9WRVxyXG4vL0FORCBDQUxMUyAnQ0FMQ1VMQVRFIERJU1RBTkNFL0RJU1BMQVkgTElTVCcgRlVOQ1RJT04gV0hJQ0ggV0lMTCBTSE9XIFRIRSBMSVNUXHJcbk1BUFMuY3JlYXRlTWFya2VyID0gZnVuY3Rpb24ocGxhY2UpIHtcclxuXHJcbiAgICAvL0NSRUFURSBORVcgTUFSS0VSXHJcbiAgICB2YXIgbWFya2VyID0gbmV3IGdvb2dsZS5tYXBzLk1hcmtlcih7XHJcbiAgICAgICAgbWFwOiB0aGlzLm1hcCxcclxuICAgICAgICBwb3NpdGlvbjogcGxhY2UuZ2VvbWV0cnkubG9jYXRpb24sXHJcbiAgICAgICAgaWNvbjoge1xyXG4gICAgICAgICAgICB1cmw6ICdodHRwczovL2RldmVsb3BlcnMuZ29vZ2xlLmNvbS9tYXBzL2RvY3VtZW50YXRpb24vamF2YXNjcmlwdC9pbWFnZXMvY2lyY2xlLnBuZydcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvL0FERCBDTElDSyBMSVNURU5FUiBPTiBBQ1RVQUwgTUFSS0VSXHJcbiAgICBnb29nbGUubWFwcy5ldmVudC5hZGRMaXN0ZW5lcihtYXJrZXIsICdjbGljaycsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdGhpcy5zZXJ2aWNlLmdldERldGFpbHMocGxhY2UsIGZ1bmN0aW9uKHJlc3VsdCwgc3RhdHVzKXtcclxuICAgICAgICAgICAgaWYgKHN0YXR1cyAhPT0gZ29vZ2xlLm1hcHMucGxhY2VzLlBsYWNlc1NlcnZpY2VTdGF0dXMuT0spIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3Ioc3RhdHVzKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy9TRVQgQ09OVEVOVCBPRiBJTkZPV0lORE9XIFRIQVQgV0lMTCBPUEVOIEFGVEVSIE1BUktFUiBJUyBDTElDS0VEXHJcbiAgICAgICAgICAgIHRoaXMuaW5mb1dpbmRvdy5zZXRDb250ZW50KCc8aDI+JytyZXN1bHQubmFtZSsnPC9oMj4nICsgcmVzdWx0LmFkcl9hZGRyZXNzICk7XHJcbiAgICAgICAgICAgIHRoaXMuaW5mb1dpbmRvdy5vcGVuKHRoaXMubWFwLCBtYXJrZXIpO1xyXG4gICAgICAgIH0uYmluZCh0aGlzKSk7XHJcbiAgICB9LmJpbmQodGhpcykpO1xyXG5cclxuICAgIC8vQ0FMTCBGVU5DVElPTiBUSEFUIFdJTEwgQ0FMQ1VMQVRFIFRIRSBESVNUQU5DRVxyXG4gICAgTUFQUy5jYWxjdWxhdGVEaXN0YW5jZShwbGFjZSwgbWFya2VyKTtcclxuXHJcbn07XHJcblxyXG4vL1RISVMgRlVOQ1RJT04gQ0FMQ1VMQVRFUyBUSEUgRElTVEFOQ0UgQkVUV0VFTiBUV08gUE9JTlRTOiBNQUlOIEFORCBFQUNIIFBBQ0UgRk9VTkQgSU4gY2FsbGJhY2sgRlVOQ1RJT04gQUJPVkVcclxuLy9JVCBUQUtTRSBwbGFjZSBBTkQgbWFya2VyIEFTIFBBUkFNRVRFUlMuIE1BUktFUiBJUyBORUVERUQgVE8gTElOSyBUSEUgTElTVCBXSVRIIEFDVFVBTCBNQVJLRVIgT04gVEhFIE1BUCBMQVRFUlxyXG5NQVBTLmNhbGN1bGF0ZURpc3RhbmNlID0gZnVuY3Rpb24ocGxhY2UsIG1hcmtlcikge1xyXG5cclxuICAgICAgICAvL1BPSU5UIFJFVFVSTlMgQUNUVUFMIExBVCBBTkQgTE5HIE9GIFRIRSBQTEFDRSBUTyBIRUxQIENBTENVTEFUSU5HIFRIRSBESVNUQU5DRVxyXG4gICAgICAgIHBvaW50ID0gZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgdmFyIGxhdCA9IHBsYWNlLmdlb21ldHJ5LmxvY2F0aW9uLmxhdCgpLFxyXG4gICAgICAgICAgICAgICAgbG5nID0gcGxhY2UuZ2VvbWV0cnkubG9jYXRpb24ubG5nKCk7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBsYXQ6IGxhdCxcclxuICAgICAgICAgICAgICAgIGxuZzogbG5nXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy9HRVQgRElTVEFOQ0UgQkVUV0VFTiBvcmlnaW5zIEFORCBkZXN0aW5hdGlvbnMgV0lUSCAnV0FMS0lORycgTU9ERVxyXG4gICAgICAgIHRoaXMuZGlzdGFuY2UuZ2V0RGlzdGFuY2VNYXRyaXgoe1xyXG4gICAgICAgICAgICBvcmlnaW5zOiBbdGhpcy5jb3Jkc10sXHJcbiAgICAgICAgICAgIGRlc3RpbmF0aW9uczogW3BvaW50KCldLFxyXG4gICAgICAgICAgICB0cmF2ZWxNb2RlOiAnV0FMS0lORydcclxuICAgICAgICB9LCBmdW5jdGlvbihyZXNwb25zZSxzdGF0dXMpe1xyXG4gICAgICAgICAgICAvL2dldCBkdXJhdGlvbiB2YWx1ZSAoaW4gbWl1dGVzKVxyXG4gICAgICAgICAgICB2YXIgZHVyYXRpb24gPSByZXNwb25zZS5yb3dzWzBdLmVsZW1lbnRzWzBdLmR1cmF0aW9uLnRleHQ7XHJcblxyXG4gICAgICAgICAgICAvL0NBTEwgVEhFIERJU1BMQVkgTElTVCBmdW5jdGlvblxyXG4gICAgICAgICAgICB0aGlzLmRpc3BsYXlMaXN0KGR1cmF0aW9uLCBwbGFjZSwgbWFya2VyKTtcclxuICAgICAgICB9LmJpbmQodGhpcykpO1xyXG59O1xyXG5cclxuXHJcbi8vVEhJUyBGVU5DVElPTiBXSUxMIERJU1BMQVkgVEhFIExJU1QgT0YgUExBQ0VTXHJcbi8vSVQgVEFLU0UgMyBBUkdVTUVOVFM6IGR1cmF0aW9uIC0gVFJBVkVMIFRJTUUgSU4gTUlOVVRFUywgcGxhY2UsIEFORCBtYXJrZXIgLSBUTyBMSU5LIExJU1QgV0lUSCBNQVJLRVIgT04gVEhFIE1BUFxyXG5NQVBTLmRpc3BsYXlMaXN0ID0gZnVuY3Rpb24oZHVyYXRpb24sIHBsYWNlLCBtYXJrZXIpe1xyXG5cclxuXHJcbiAgICAvL0NSRUFURSBESVYgVEhBVCBXSUxMIEJFIENPTlRBSU5FUiBGT1IgRUFDSCBQTEFDRSBJVEVNIE9OIFRIRSBMSVNUXHJcbiAgICB2YXIgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JyksXHJcbiAgICAgICAgYnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyksXHJcbiAgICAgICAgZGV0YWlscyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgZGl2LmNsYXNzTGlzdC5hZGQoJ21hcC1saXN0X19pdGVtJyk7XHJcbiAgICBidG4uY2xhc3NMaXN0LmFkZCgnbWFwLWxpc3RfX2J1dHRvbicpO1xyXG4gICAgZGV0YWlscy5jbGFzc0xpc3QuYWRkKCdtYXAtbGlzdF9fZGV0YWlscy1saXN0Jyk7XHJcbiAgICBkZXRhaWxzLmNsYXNzTGlzdC5hZGQoJ21hcC1saXN0X19kZXRhaWxzLWxpc3QtLWhpZGRlbicpO1xyXG5cclxuICAgIGJ0bi5pbm5lckhUTUwgPSAnU0VFIE1PUkUgREVUQUlMUyc7XHJcblxyXG4gICAgLy92YXIgc3BhbiA9ICc8c3Bhbj4nK3BsYWNlLm5hbWUrJywgZHVyYXRpb246ICcrZHVyYXRpb24rJzwvc3Bhbj4nO1xyXG4gICAgdmFyIHNwYW4gPSAnJztcclxuXHJcbiAgICBpZiAocGxhY2UucGhvdG9zICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgc3BhbiArPSAnPGltZyBzcmM9XCInKyBwbGFjZS5waG90b3NbMF0uZ2V0VXJsKHttYXhXaWR0aDogNzUsIG1heEhlaWdodDogNzUwfSkrJ1wiIGFsdD1cIlwiPic7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBzcGFuICs9ICc8aW1nIHNyYz1cIicrIHBsYWNlLmljb24rJ1wiIGFsdD1cIlwiPic7XHJcbiAgICB9XHJcbiAgICAgICAgc3BhbiArPVxyXG4gICAgICAgICAgICAnPGgzIGNsYXNzPVwibWFwLWxpc3RfX25hbWVcIj4nK1xyXG4gICAgICAgICAgICAgICAgcGxhY2UubmFtZSArXHJcbiAgICAgICAgICAgICc8L2gzPicrXHJcbiAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cIm1hcC1saXN0X19kdXJhdGlvblwiPicrXHJcbiAgICAgICAgICAgICAgICAnRGlzdGFuY2UgYnkgd2Fsa2luZzogJyArXHJcbiAgICAgICAgICAgICAgICAnPGI+JyArZHVyYXRpb24rICc8L2I+JyArXHJcbiAgICAgICAgICAgICc8L3NwYW4+JztcclxuXHJcbiAgICBkaXYuaW5uZXJIVE1MID0gc3BhbjtcclxuICAgIGRpdi5hcHBlbmRDaGlsZChkZXRhaWxzKTtcclxuICAgIGRpdi5hcHBlbmRDaGlsZChidG4pO1xyXG4gICAgdGhpcy5wbGFjZXNMaXN0LmFwcGVuZENoaWxkKGRpdik7XHJcblxyXG4gICAgLy9BREQgRVZFTlQgTElTVEVORVJTIFdIRU4gSU5URVJBQ1RJTkcgV0lUSCBUSEUgTElTVFxyXG4gICAgZGl2LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsZnVuY3Rpb24oKXtcclxuICAgICAgICBtYXJrZXIuc2V0SWNvbignJyk7XHJcbiAgICB9LGZhbHNlKTtcclxuXHJcbiAgICBkaXYuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsZnVuY3Rpb24oKXtcclxuICAgICAgICBtYXJrZXIuc2V0SWNvbignaHR0cHM6Ly9kZXZlbG9wZXJzLmdvb2dsZS5jb20vbWFwcy9kb2N1bWVudGF0aW9uL2phdmFzY3JpcHQvaW1hZ2VzL2NpcmNsZS5wbmcnKTtcclxuICAgIH0sZmFsc2UpO1xyXG5cclxuICAgIGJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsZnVuY3Rpb24oKXtcclxuICAgICAgICB0aGlzLnNlcnZpY2UuZ2V0RGV0YWlscyhwbGFjZSwgZnVuY3Rpb24ocmVzdWx0LCBzdGF0dXMpe1xyXG4gICAgICAgICAgICBpZiAoc3RhdHVzICE9PSBnb29nbGUubWFwcy5wbGFjZXMuUGxhY2VzU2VydmljZVN0YXR1cy5PSykge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihzdGF0dXMpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBkZXRhaWxzLmNsYXNzTGlzdC50b2dnbGUoJ21hcC1saXN0X19kZXRhaWxzLWxpc3QtLWhpZGRlbicpO1xyXG4gICAgICAgICAgICBkZXRhaWxzLmNsYXNzTGlzdC50b2dnbGUoJ21hcC1saXN0X19kZXRhaWxzLWxpc3QtLXZpc2libGUnKTtcclxuXHJcblxyXG4gICAgICAgICAgICB2YXIgcmVzdWx0c0RhdGEgPSAnJztcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdC51cmwgIT09dW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHRzRGF0YSArPVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPGEgY2xhc3M9XCJkZXRhaWxzLWxpc3RfX2xpbmtcIiBocmVmPVwiJytyZXN1bHQudXJsKydcIiB0aXRsZT1cIkxpbmsgdG8gcGxhY2UgaW4gZ29vZ2xlIG1hcHMgYXBwXCIgdGFyZ2V0PVwiX2JsYW5rXCI+JytcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cImRldGFpbHMtbGlzdF9faWNvbiBmYSBmYS1nb29nbGVcIiBhcmlhLWhpZGRlbj1cInRydWVcIj4nK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJzwvc3Bhbj4nK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJzxzcGFuIGNsYXNzPVwiZGV0YWlscy1saXN0X19kZXNjcmlwdGlvblwiPicrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ09wZW4gaW4gTWFwcycrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPC9zcGFuPicrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc8L2E+JztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQud2Vic2l0ZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0c0RhdGEgKz1cclxuICAgICAgICAgICAgICAgICAgICAgICAgJzxhIGNsYXNzPVwiZGV0YWlscy1saXN0X19saW5rXCIgaHJlZj1cIicrcmVzdWx0LndlYnNpdGUrJ1wiIHRpdGxlPVwiTGluayB0byBwbGFjZSBpbiBnb29nbGUgbWFwcyBhcHBcIiB0YXJnZXQ9XCJfYmxhbmtcIj4nK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJzxzcGFuIGNsYXNzPVwiZGV0YWlscy1saXN0X19pY29uIGZhIGZhLWdsb2JlXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+JytcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8L3NwYW4+JytcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cImRldGFpbHMtbGlzdF9fZGVzY3JpcHRpb25cIj4nK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdXZWJzaXRlJytcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8L3NwYW4+JytcclxuICAgICAgICAgICAgICAgICAgICAgICAgJzwvYT4nO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5yYXRpbmcgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdHNEYXRhICs9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJkZXRhaWxzLWxpc3RfX2ljb24gZmEgZmEtc3RhclwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPicrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPC9zcGFuPicrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJkZXRhaWxzLWxpc3RfX2Rlc2NyaXB0aW9uXCI+JytcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQucmF0aW5nK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJzwvc3Bhbj4nO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgZGV0YWlscy5pbm5lckhUTUw9IHJlc3VsdHNEYXRhO1xyXG5cclxuICAgICAgICAgICAgICAgIC8qJzxhIGhyZWY9XCInK3Jlc3VsdHNEYXRhLndlYnNpdGUrJ1wiIHRpdGxlPVwiTGluayB0byBwbGFjZVxcJ3Mgd2ViaXN0ZVwiIHRhcmdldD1cIl9ibGFua1wiPicrXHJcbiAgICAgICAgICAgICAgICAgICAgJzxzcGFuIGNsYXNzPVwibWFwLWxpc3RfX2ljb24gZmEgZmEtZ2xvYmVcIiBhcmlhLWhpZGRlbj1cInRydWVcIj4nK1xyXG4gICAgICAgICAgICAgICAgICAgICc8L3NwYW4+JytcclxuICAgICAgICAgICAgICAgICc8L2E+JzsqL1xyXG4gICAgICAgIH0pO1xyXG4gICAgfS5iaW5kKHRoaXMpLGZhbHNlKTtcclxuXHJcblxyXG59O1xyXG5cclxuXHJcbi8vRE9NSEFORExFUlxyXG5cclxudmFyIERPTUhBTkRMRVIgPSB7XHJcbiAgICBzZXRUeXBlOiBmdW5jdGlvbih0eXBlKSB7XHJcbiAgICAgICAgdGhpcy50eXBlID0gdHlwZTtcclxuICAgIH0sXHJcbiAgICBnZXRUeXBlOiBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy50eXBlO1xyXG4gICAgfSxcclxuICAgIHNldFNvcnQ6IGZ1bmN0aW9uKHNvcnQpIHtcclxuICAgICAgICB0aGlzLnNvcnQgPSBzb3J0O1xyXG4gICAgfSxcclxuICAgIGdldFNvcnQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNvcnQ7XHJcbiAgICB9XHJcbn07XHJcblxyXG5cclxuRE9NSEFORExFUi5pbml0ID0gZnVuY3Rpb24oKXtcclxuICAgIHZhciBpbnB1dFR5cGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaW5wdXQtdHlwZScpLFxyXG4gICAgICAgIGlucHV0U29ydCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdpbnB1dC1zb3J0Jyk7XHJcbiAgICAgICAgdGhpcy5zZXRUeXBlKGlucHV0VHlwZS52YWx1ZSk7XHJcbiAgICAgICAgdGhpcy5zZXRTb3J0KGlucHV0U29ydC52YWx1ZSk7XHJcblxyXG4gICAgICAgIGlucHV0VHlwZS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCB0aGlzLmNsaWNrTGlzdGVuZXIuYmluZCh0aGlzKSwgZmFsc2UpO1xyXG4gICAgICAgIGlucHV0U29ydC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCB0aGlzLmNsaWNrTGlzdGVuZXIuYmluZCh0aGlzKSwgZmFsc2UpO1xyXG59XHJcblxyXG5cclxuRE9NSEFORExFUi5jbGlja0xpc3RlbmVyID0gZnVuY3Rpb24oZSkge1xyXG4gICAgdmFyIHNyYyA9IGUuc3JjIHx8IGUudGFyZ2V0LFxyXG4gICAgICAgIHZhbHVlID0gc3JjLnZhbHVlLFxyXG4gICAgICAgIGNvbmZpZyA9IHt9O1xyXG5cclxuICAgIGlmIChzcmMuaWQgPT09ICdpbnB1dC10eXBlJykge1xyXG4gICAgICAgIHRoaXMuc2V0VHlwZSh2YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBpZiAoc3JjLmlkID09PSAnaW5wdXQtc29ydCcpIHtcclxuICAgICAgICB0aGlzLnNldFNvcnQodmFsdWUpO1xyXG4gICAgfVxyXG4gICAgY29uZmlnID0ge1xyXG4gICAgICAgIHR5cGU6IHRoaXMuZ2V0VHlwZSgpLFxyXG4gICAgICAgIHNvcnQ6IHRoaXMuZ2V0U29ydCgpXHJcbiAgICB9XHJcblxyXG4gICAgTUFQUy5pbml0aWFsaXplKGNvbmZpZyk7XHJcblxyXG59O1xyXG5cclxuRE9NSEFORExFUi5pbml0KCk7XHJcbk1BUFMuaW5pdGlhbGl6ZSh7XHJcbiAgICB0eXBlOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaW5wdXQtdHlwZScpLnZhbHVlLFxyXG4gICAgc29ydDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2lucHV0LXNvcnQnKVxyXG59KTtcclxuIiwidmFyIFdFQVRIRVJBUEkgPSB7XHJcblxyXG59O1xyXG5cclxuV0VBVEhFUkFQSS5pbml0ID0gZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcblxyXG4gICAgeGhyLm9wZW4oJ0dFVCcsICdodHRwOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9kYXRhLzIuNS93ZWF0aGVyP3E9TG9uZG9uJmFwcGlkPWE0NzJlYmQ2NDJkYTNlNjRlMzVkYTMyOGFhZjM1MzFjJyx0cnVlKTtcclxuICAgIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbihkYXRhKSB7XHJcbiAgICAgICAgaWYgKHhoci5yZWFkeVN0YXRlICE9PSA0ICkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh4aHIuc3RhdHVzICE9PSAyMDAgKXtcclxuICAgICAgICAgICAgY29uc29sZS5lcnIoJ1N0YXR1cyBlcnJvcjogJyArIHhoci5zdGF0dXMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgcmVzdWx0cyA9IEpTT04ucGFyc2UoZGF0YS5zcmNFbGVtZW50LnJlc3BvbnNlKTtcclxuICAgICAgICAgICAgLy9jb250YWluZXJEaXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnd2VhdGhlcicpO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgeGhyLnNlbmQoKTtcclxufTtcclxuXHJcbldFQVRIRVJBUEkuaW5pdCgpO1xyXG4iXX0=
