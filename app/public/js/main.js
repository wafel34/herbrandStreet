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

            details.classList.toggle('map-list__details--hidden');
            details.classList.toggle('map-list__details--visible');

            var resultsData = {
                url: result.url || '',
                website: result.website || ''
            };
            details.innerHTML=

                '<a href="'+resultsData.url+'" title="Link to place in google maps app" target="_blank">'+
                    '<span class="map-list__icon fa fa-google" aria-hidden="true">'+
                    '</span>'+
                '</a>'+
                '<a href="'+resultsData.website+'" title="Link to place\'s webiste" target="_blank">'+
                    '<span class="map-list__icon fa fa-globe" aria-hidden="true">'+
                    '</span>'+
                '</a>';
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsIm1hcHMuanMiLCJ3ZWF0aGVyYXBwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNwUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe1xyXG5cclxuXHJcblxyXG59KCkpO1xyXG4iLCJ2YXIgTUFQUyA9IHtcclxuICAgIG1hcDoge30sXHJcbiAgICBzZXJ2aWNlOiB7fSxcclxuICAgIGluZm9XaW5kb3c6IHt9LFxyXG4gICAgZGlzdGFuY2U6IHt9LFxyXG4gICAgY29yZHM6IHtsYXQ6IDUxLjUyNDgxMywgbG5nOiAtMC4xMjU2ODh9LFxyXG4gICAgcGxhY2VzTGlzdDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hcC1saXN0JylcclxufTtcclxuXHJcbi8vSU5JVElBTElaRSBUSEUgTUFQIChGSVJFRCBPTiBUSEUgU1RBUlQgQU5EIE9OIEVWRVJZIENIQU5HRSBPRiBEQVRBIChGUk9NIFNMRUNUIElOUFVUOiBUWVBFIEFORCBTT1JUKSlcclxuTUFQUy5pbml0aWFsaXplID0gZnVuY3Rpb24oY29uZmlnKXtcclxuXHJcbiAgICAvL0NMRUFSIFRIRSBMSVNUIE9GIFBMQUNFUyBCRUZPUkUgSU5JVElBTElaSU5HXHJcbiAgICB0aGlzLnBsYWNlc0xpc3QuaW5uZXJIVE1MID0gJyc7XHJcblxyXG4gICAgLy9SRVEgT0JKOiBUQUtFUyBSQU5LLCBUWVBFIEZST00gQ09ORklHIEFSR1VNRU5UIFBBU1NFRCBUTyBUSElTIEZVTkNUSU9OIEFORCBTRVRTIERBVEEgREVQRU5ESU5HIE9OIFRIQVRcclxuICAgIHZhciByZXF1ZXN0ID0ge1xyXG4gICAgICAgICAgICBsb2NhdGlvbjogdGhpcy5jb3JkcyxcclxuICAgICAgICAgICAgdHlwZTogW2NvbmZpZy50eXBlXSxcclxuICAgICAgICAgICAgcmFua0J5OiAoY29uZmlnLnNvcnQgPT09ICdyYW5rJykgPyBnb29nbGUubWFwcy5wbGFjZXMuUmFua0J5LlBST01JTkVOQ0UgOiBnb29nbGUubWFwcy5wbGFjZXMuUmFua0J5LkRJU1RBTkNFLFxyXG4gICAgICAgICAgICByYWRpdXM6IChjb25maWcuc29ydCA9PT0gJ3JhbmsnKSA/ICcxMDAwJyA6IG51bGxcclxuICAgICAgICB9O1xyXG5cclxuICAgIC8vQ1JFQVRFIE5FVyBHT09HTEUgTUFQXHJcbiAgICB0aGlzLm1hcCA9IG5ldyBnb29nbGUubWFwcy5NYXAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hcC1kaXNwbGF5Jykse1xyXG4gICAgICAgIGNlbnRlcjogdGhpcy5jb3JkcyxcclxuICAgICAgICB6b29tOiAxNSxcclxuICAgICAgICBjb3JkczogdGhpcy5jb3JkcyxcclxuICAgICAgICBkaXNhYmxlRGVmYXVsdFVJOiB0cnVlLFxyXG4gICAgICAgIGdlc3R1cmVIYW5kbGluZzogJ2Nvb3BlcmF0aXZlJ1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy9DUkVBVEUgTUFSS0VSIChJQ09OKSBGT1IgQ0VOVEVSIFBPSU5UXHJcbiAgICB2YXIgbWFya2VyID0gbmV3IGdvb2dsZS5tYXBzLk1hcmtlcih7XHJcbiAgICAgICAgbWFwOiB0aGlzLm1hcCxcclxuICAgICAgICBwb3NpdGlvbjogdGhpcy5jb3Jkc1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy9JTklUSUFMSVpFIE9USEVSIEdPT0dMRSBTRVJWSUNFU1xyXG4gICAgdGhpcy5pbmZvV2luZG93ID0gbmV3IGdvb2dsZS5tYXBzLkluZm9XaW5kb3coKTtcclxuICAgIHRoaXMuc2VydmljZSA9IG5ldyBnb29nbGUubWFwcy5wbGFjZXMuUGxhY2VzU2VydmljZSh0aGlzLm1hcCk7XHJcbiAgICB0aGlzLmRpc3RhbmNlID0gbmV3IGdvb2dsZS5tYXBzLkRpc3RhbmNlTWF0cml4U2VydmljZSgpO1xyXG5cclxuICAgIC8vSU5JVElBTElaRSBuZWFyYnlTZWFyY2ggVE8gRklORCBQTEFDRVMgSU4gTE9DQUwgQVJFQSBBTkQgQ0FMTCBjYWxsYmFjayBmdW5jdGlvblxyXG4gICAgdGhpcy5zZXJ2aWNlLm5lYXJieVNlYXJjaChyZXF1ZXN0LCB0aGlzLmNhbGxiYWNrKTtcclxuXHJcbn07XHJcblxyXG4vL1NFQVJDSCBGT1IgREFUQSBCQVNJTkcgT04gUkVRVUVTVCBPQkogRlJPTSBBQk9WRSBBTkQgQ1JFQVRFIE1BUktFUlMgT04gTUFQIEZPUiBQTEFDRVNcclxuTUFQUy5jYWxsYmFjayA9IGZ1bmN0aW9uKHJlc3VsdHMsIHN0YXR1cykge1xyXG4gICAgaWYgKHN0YXR1cyA9PSBnb29nbGUubWFwcy5wbGFjZXMuUGxhY2VzU2VydmljZVN0YXR1cy5PSykge1xyXG4gICAgICAgIGZvciAodmFyIGk9MDsgaTxyZXN1bHRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIE1BUFMuY3JlYXRlTWFya2VyKHJlc3VsdHNbaV0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuXHJcbi8vQUNUVUFMIEZVTkNUSU9OIFJFU1BPTlNJQkxFIEZPUiBDUkVBVElORyBNQVJLRVJTXHJcbi8vSVQgU0VUUyBUSEUgTUFSS0VSIEZPUiBFQUNIIFBMQUNFIEZPVU5EIElOIGNhbGxiYWNrIEZVTkNUSU9OIEFCT1ZFXHJcbi8vQU5EIENBTExTICdDQUxDVUxBVEUgRElTVEFOQ0UvRElTUExBWSBMSVNUJyBGVU5DVElPTiBXSElDSCBXSUxMIFNIT1cgVEhFIExJU1RcclxuTUFQUy5jcmVhdGVNYXJrZXIgPSBmdW5jdGlvbihwbGFjZSkge1xyXG5cclxuICAgIC8vQ1JFQVRFIE5FVyBNQVJLRVJcclxuICAgIHZhciBtYXJrZXIgPSBuZXcgZ29vZ2xlLm1hcHMuTWFya2VyKHtcclxuICAgICAgICBtYXA6IHRoaXMubWFwLFxyXG4gICAgICAgIHBvc2l0aW9uOiBwbGFjZS5nZW9tZXRyeS5sb2NhdGlvbixcclxuICAgICAgICBpY29uOiB7XHJcbiAgICAgICAgICAgIHVybDogJ2h0dHBzOi8vZGV2ZWxvcGVycy5nb29nbGUuY29tL21hcHMvZG9jdW1lbnRhdGlvbi9qYXZhc2NyaXB0L2ltYWdlcy9jaXJjbGUucG5nJ1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8vQUREIENMSUNLIExJU1RFTkVSIE9OIEFDVFVBTCBNQVJLRVJcclxuICAgIGdvb2dsZS5tYXBzLmV2ZW50LmFkZExpc3RlbmVyKG1hcmtlciwgJ2NsaWNrJywgZnVuY3Rpb24oKXtcclxuICAgICAgICB0aGlzLnNlcnZpY2UuZ2V0RGV0YWlscyhwbGFjZSwgZnVuY3Rpb24ocmVzdWx0LCBzdGF0dXMpe1xyXG4gICAgICAgICAgICBpZiAoc3RhdHVzICE9PSBnb29nbGUubWFwcy5wbGFjZXMuUGxhY2VzU2VydmljZVN0YXR1cy5PSykge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihzdGF0dXMpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvL1NFVCBDT05URU5UIE9GIElORk9XSU5ET1cgVEhBVCBXSUxMIE9QRU4gQUZURVIgTUFSS0VSIElTIENMSUNLRURcclxuICAgICAgICAgICAgdGhpcy5pbmZvV2luZG93LnNldENvbnRlbnQoJzxoMj4nK3Jlc3VsdC5uYW1lKyc8L2gyPicgKyByZXN1bHQuYWRyX2FkZHJlc3MgKTtcclxuICAgICAgICAgICAgdGhpcy5pbmZvV2luZG93Lm9wZW4odGhpcy5tYXAsIG1hcmtlcik7XHJcbiAgICAgICAgfS5iaW5kKHRoaXMpKTtcclxuICAgIH0uYmluZCh0aGlzKSk7XHJcblxyXG4gICAgLy9DQUxMIEZVTkNUSU9OIFRIQVQgV0lMTCBDQUxDVUxBVEUgVEhFIERJU1RBTkNFXHJcbiAgICBNQVBTLmNhbGN1bGF0ZURpc3RhbmNlKHBsYWNlLCBtYXJrZXIpO1xyXG5cclxufTtcclxuXHJcbi8vVEhJUyBGVU5DVElPTiBDQUxDVUxBVEVTIFRIRSBESVNUQU5DRSBCRVRXRUVOIFRXTyBQT0lOVFM6IE1BSU4gQU5EIEVBQ0ggUEFDRSBGT1VORCBJTiBjYWxsYmFjayBGVU5DVElPTiBBQk9WRVxyXG4vL0lUIFRBS1NFIHBsYWNlIEFORCBtYXJrZXIgQVMgUEFSQU1FVEVSUy4gTUFSS0VSIElTIE5FRURFRCBUTyBMSU5LIFRIRSBMSVNUIFdJVEggQUNUVUFMIE1BUktFUiBPTiBUSEUgTUFQIExBVEVSXHJcbk1BUFMuY2FsY3VsYXRlRGlzdGFuY2UgPSBmdW5jdGlvbihwbGFjZSwgbWFya2VyKSB7XHJcblxyXG4gICAgICAgIC8vUE9JTlQgUkVUVVJOUyBBQ1RVQUwgTEFUIEFORCBMTkcgT0YgVEhFIFBMQUNFIFRPIEhFTFAgQ0FMQ1VMQVRJTkcgVEhFIERJU1RBTkNFXHJcbiAgICAgICAgcG9pbnQgPSBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICB2YXIgbGF0ID0gcGxhY2UuZ2VvbWV0cnkubG9jYXRpb24ubGF0KCksXHJcbiAgICAgICAgICAgICAgICBsbmcgPSBwbGFjZS5nZW9tZXRyeS5sb2NhdGlvbi5sbmcoKTtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIGxhdDogbGF0LFxyXG4gICAgICAgICAgICAgICAgbG5nOiBsbmdcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvL0dFVCBESVNUQU5DRSBCRVRXRUVOIG9yaWdpbnMgQU5EIGRlc3RpbmF0aW9ucyBXSVRIICdXQUxLSU5HJyBNT0RFXHJcbiAgICAgICAgdGhpcy5kaXN0YW5jZS5nZXREaXN0YW5jZU1hdHJpeCh7XHJcbiAgICAgICAgICAgIG9yaWdpbnM6IFt0aGlzLmNvcmRzXSxcclxuICAgICAgICAgICAgZGVzdGluYXRpb25zOiBbcG9pbnQoKV0sXHJcbiAgICAgICAgICAgIHRyYXZlbE1vZGU6ICdXQUxLSU5HJ1xyXG4gICAgICAgIH0sIGZ1bmN0aW9uKHJlc3BvbnNlLHN0YXR1cyl7XHJcbiAgICAgICAgICAgIC8vZ2V0IGR1cmF0aW9uIHZhbHVlIChpbiBtaXV0ZXMpXHJcbiAgICAgICAgICAgIHZhciBkdXJhdGlvbiA9IHJlc3BvbnNlLnJvd3NbMF0uZWxlbWVudHNbMF0uZHVyYXRpb24udGV4dDtcclxuXHJcbiAgICAgICAgICAgIC8vQ0FMTCBUSEUgRElTUExBWSBMSVNUIGZ1bmN0aW9uXHJcbiAgICAgICAgICAgIHRoaXMuZGlzcGxheUxpc3QoZHVyYXRpb24sIHBsYWNlLCBtYXJrZXIpO1xyXG4gICAgICAgIH0uYmluZCh0aGlzKSk7XHJcbn07XHJcblxyXG5cclxuLy9USElTIEZVTkNUSU9OIFdJTEwgRElTUExBWSBUSEUgTElTVCBPRiBQTEFDRVNcclxuLy9JVCBUQUtTRSAzIEFSR1VNRU5UUzogZHVyYXRpb24gLSBUUkFWRUwgVElNRSBJTiBNSU5VVEVTLCBwbGFjZSwgQU5EIG1hcmtlciAtIFRPIExJTksgTElTVCBXSVRIIE1BUktFUiBPTiBUSEUgTUFQXHJcbk1BUFMuZGlzcGxheUxpc3QgPSBmdW5jdGlvbihkdXJhdGlvbiwgcGxhY2UsIG1hcmtlcil7XHJcblxyXG5cclxuICAgIC8vQ1JFQVRFIERJViBUSEFUIFdJTEwgQkUgQ09OVEFJTkVSIEZPUiBFQUNIIFBMQUNFIElURU0gT04gVEhFIExJU1RcclxuICAgIHZhciBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSxcclxuICAgICAgICBidG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKSxcclxuICAgICAgICBkZXRhaWxzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICBkaXYuY2xhc3NMaXN0LmFkZCgnbWFwLWxpc3RfX2l0ZW0nKTtcclxuICAgIGJ0bi5jbGFzc0xpc3QuYWRkKCdtYXAtbGlzdF9fYnV0dG9uJyk7XHJcbiAgICBkZXRhaWxzLmNsYXNzTGlzdC5hZGQoJ21hcC1saXN0X19kZXRhaWxzJyk7XHJcbiAgICBkZXRhaWxzLmNsYXNzTGlzdC5hZGQoJ21hcC1saXN0X19kZXRhaWxzLS1oaWRkZW4nKTtcclxuXHJcbiAgICBidG4uaW5uZXJIVE1MID0gJ1NFRSBNT1JFIERFVEFJTFMnO1xyXG5cclxuICAgIC8vdmFyIHNwYW4gPSAnPHNwYW4+JytwbGFjZS5uYW1lKycsIGR1cmF0aW9uOiAnK2R1cmF0aW9uKyc8L3NwYW4+JztcclxuICAgIHZhciBzcGFuID1cclxuICAgICAgICAnPGgzIGNsYXNzPVwibWFwLWxpc3RfX25hbWVcIj4nK1xyXG4gICAgICAgICAgICBwbGFjZS5uYW1lICtcclxuICAgICAgICAnPC9oMz4nK1xyXG4gICAgICAgICc8c3BhbiBjbGFzcz1cIm1hcC1saXN0X19kdXJhdGlvblwiPicrXHJcbiAgICAgICAgICAgICdEaXN0YW5jZSBieSB3YWxraW5nOiAnICtcclxuICAgICAgICAgICAgJzxiPicgK2R1cmF0aW9uKyAnPC9iPicgK1xyXG4gICAgICAgICc8L3NwYW4+JztcclxuXHJcbiAgICBkaXYuaW5uZXJIVE1MID0gc3BhbjtcclxuICAgIGRpdi5hcHBlbmRDaGlsZChkZXRhaWxzKTtcclxuICAgIGRpdi5hcHBlbmRDaGlsZChidG4pO1xyXG4gICAgdGhpcy5wbGFjZXNMaXN0LmFwcGVuZENoaWxkKGRpdik7XHJcblxyXG4gICAgLy9BREQgRVZFTlQgTElTVEVORVJTIFdIRU4gSU5URVJBQ1RJTkcgV0lUSCBUSEUgTElTVFxyXG4gICAgZGl2LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsZnVuY3Rpb24oKXtcclxuICAgICAgICBtYXJrZXIuc2V0SWNvbignJyk7XHJcbiAgICB9LGZhbHNlKTtcclxuXHJcbiAgICBkaXYuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsZnVuY3Rpb24oKXtcclxuICAgICAgICBtYXJrZXIuc2V0SWNvbignaHR0cHM6Ly9kZXZlbG9wZXJzLmdvb2dsZS5jb20vbWFwcy9kb2N1bWVudGF0aW9uL2phdmFzY3JpcHQvaW1hZ2VzL2NpcmNsZS5wbmcnKTtcclxuICAgIH0sZmFsc2UpO1xyXG5cclxuICAgIGJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsZnVuY3Rpb24oKXtcclxuICAgICAgICB0aGlzLnNlcnZpY2UuZ2V0RGV0YWlscyhwbGFjZSwgZnVuY3Rpb24ocmVzdWx0LCBzdGF0dXMpe1xyXG4gICAgICAgICAgICBpZiAoc3RhdHVzICE9PSBnb29nbGUubWFwcy5wbGFjZXMuUGxhY2VzU2VydmljZVN0YXR1cy5PSykge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihzdGF0dXMpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBkZXRhaWxzLmNsYXNzTGlzdC50b2dnbGUoJ21hcC1saXN0X19kZXRhaWxzLS1oaWRkZW4nKTtcclxuICAgICAgICAgICAgZGV0YWlscy5jbGFzc0xpc3QudG9nZ2xlKCdtYXAtbGlzdF9fZGV0YWlscy0tdmlzaWJsZScpO1xyXG5cclxuICAgICAgICAgICAgdmFyIHJlc3VsdHNEYXRhID0ge1xyXG4gICAgICAgICAgICAgICAgdXJsOiByZXN1bHQudXJsIHx8ICcnLFxyXG4gICAgICAgICAgICAgICAgd2Vic2l0ZTogcmVzdWx0LndlYnNpdGUgfHwgJydcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgZGV0YWlscy5pbm5lckhUTUw9XHJcblxyXG4gICAgICAgICAgICAgICAgJzxhIGhyZWY9XCInK3Jlc3VsdHNEYXRhLnVybCsnXCIgdGl0bGU9XCJMaW5rIHRvIHBsYWNlIGluIGdvb2dsZSBtYXBzIGFwcFwiIHRhcmdldD1cIl9ibGFua1wiPicrXHJcbiAgICAgICAgICAgICAgICAgICAgJzxzcGFuIGNsYXNzPVwibWFwLWxpc3RfX2ljb24gZmEgZmEtZ29vZ2xlXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+JytcclxuICAgICAgICAgICAgICAgICAgICAnPC9zcGFuPicrXHJcbiAgICAgICAgICAgICAgICAnPC9hPicrXHJcbiAgICAgICAgICAgICAgICAnPGEgaHJlZj1cIicrcmVzdWx0c0RhdGEud2Vic2l0ZSsnXCIgdGl0bGU9XCJMaW5rIHRvIHBsYWNlXFwncyB3ZWJpc3RlXCIgdGFyZ2V0PVwiX2JsYW5rXCI+JytcclxuICAgICAgICAgICAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJtYXAtbGlzdF9faWNvbiBmYSBmYS1nbG9iZVwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPicrXHJcbiAgICAgICAgICAgICAgICAgICAgJzwvc3Bhbj4nK1xyXG4gICAgICAgICAgICAgICAgJzwvYT4nO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfS5iaW5kKHRoaXMpLGZhbHNlKTtcclxuXHJcblxyXG59O1xyXG5cclxuXHJcbi8vRE9NSEFORExFUlxyXG5cclxudmFyIERPTUhBTkRMRVIgPSB7XHJcbiAgICBzZXRUeXBlOiBmdW5jdGlvbih0eXBlKSB7XHJcbiAgICAgICAgdGhpcy50eXBlID0gdHlwZTtcclxuICAgIH0sXHJcbiAgICBnZXRUeXBlOiBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy50eXBlO1xyXG4gICAgfSxcclxuICAgIHNldFNvcnQ6IGZ1bmN0aW9uKHNvcnQpIHtcclxuICAgICAgICB0aGlzLnNvcnQgPSBzb3J0O1xyXG4gICAgfSxcclxuICAgIGdldFNvcnQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNvcnQ7XHJcbiAgICB9XHJcbn07XHJcblxyXG5cclxuRE9NSEFORExFUi5pbml0ID0gZnVuY3Rpb24oKXtcclxuICAgIHZhciBpbnB1dFR5cGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaW5wdXQtdHlwZScpLFxyXG4gICAgICAgIGlucHV0U29ydCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdpbnB1dC1zb3J0Jyk7XHJcbiAgICAgICAgdGhpcy5zZXRUeXBlKGlucHV0VHlwZS52YWx1ZSk7XHJcbiAgICAgICAgdGhpcy5zZXRTb3J0KGlucHV0U29ydC52YWx1ZSk7XHJcblxyXG4gICAgICAgIGlucHV0VHlwZS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCB0aGlzLmNsaWNrTGlzdGVuZXIuYmluZCh0aGlzKSwgZmFsc2UpO1xyXG4gICAgICAgIGlucHV0U29ydC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCB0aGlzLmNsaWNrTGlzdGVuZXIuYmluZCh0aGlzKSwgZmFsc2UpO1xyXG59XHJcblxyXG5cclxuRE9NSEFORExFUi5jbGlja0xpc3RlbmVyID0gZnVuY3Rpb24oZSkge1xyXG4gICAgdmFyIHNyYyA9IGUuc3JjIHx8IGUudGFyZ2V0LFxyXG4gICAgICAgIHZhbHVlID0gc3JjLnZhbHVlLFxyXG4gICAgICAgIGNvbmZpZyA9IHt9O1xyXG5cclxuICAgIGlmIChzcmMuaWQgPT09ICdpbnB1dC10eXBlJykge1xyXG4gICAgICAgIHRoaXMuc2V0VHlwZSh2YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBpZiAoc3JjLmlkID09PSAnaW5wdXQtc29ydCcpIHtcclxuICAgICAgICB0aGlzLnNldFNvcnQodmFsdWUpO1xyXG4gICAgfVxyXG4gICAgY29uZmlnID0ge1xyXG4gICAgICAgIHR5cGU6IHRoaXMuZ2V0VHlwZSgpLFxyXG4gICAgICAgIHNvcnQ6IHRoaXMuZ2V0U29ydCgpXHJcbiAgICB9XHJcblxyXG4gICAgTUFQUy5pbml0aWFsaXplKGNvbmZpZyk7XHJcblxyXG59O1xyXG5cclxuRE9NSEFORExFUi5pbml0KCk7XHJcbk1BUFMuaW5pdGlhbGl6ZSh7XHJcbiAgICB0eXBlOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaW5wdXQtdHlwZScpLnZhbHVlLFxyXG4gICAgc29ydDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2lucHV0LXNvcnQnKVxyXG59KTtcclxuIiwidmFyIFdFQVRIRVJBUEkgPSB7XHJcblxyXG59O1xyXG5cclxuV0VBVEhFUkFQSS5pbml0ID0gZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcblxyXG4gICAgeGhyLm9wZW4oJ0dFVCcsICdodHRwOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9kYXRhLzIuNS93ZWF0aGVyP3E9TG9uZG9uJmFwcGlkPWE0NzJlYmQ2NDJkYTNlNjRlMzVkYTMyOGFhZjM1MzFjJyx0cnVlKTtcclxuICAgIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbihkYXRhKSB7XHJcbiAgICAgICAgaWYgKHhoci5yZWFkeVN0YXRlICE9PSA0ICkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh4aHIuc3RhdHVzICE9PSAyMDAgKXtcclxuICAgICAgICAgICAgY29uc29sZS5lcnIoJ1N0YXR1cyBlcnJvcjogJyArIHhoci5zdGF0dXMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgcmVzdWx0cyA9IEpTT04ucGFyc2UoZGF0YS5zcmNFbGVtZW50LnJlc3BvbnNlKTtcclxuICAgICAgICAgICAgLy9jb250YWluZXJEaXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnd2VhdGhlcicpO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgeGhyLnNlbmQoKTtcclxufTtcclxuXHJcbldFQVRIRVJBUEkuaW5pdCgpO1xyXG4iXX0=
