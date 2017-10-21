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
            console.error('Status error: ' + xhr.status);
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
