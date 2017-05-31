(function () {
    'use strict';

    var weatherApp = angular.module('weatherApp');
    weatherApp.controller('ForecastCtrl', ForecastCtrl);

    function ForecastCtrl($http) {
        const fc = this;

        fc.name = "Forecast IO";
        fc.getCities = function(val) {
            console.log(val);

            return $http.get('//maps.googleapis.com/maps/api/geocode/json', {
              params: {
                address: val,
                sensor: false
              }
            }).then(function(response){
              return response.data.results.map(function(item){
                return item.formatted_address;
              });
            });
        };
    }


    weatherApp.controller('WorldWeatherCtrl', WorldWeatherCtrl);


    function WorldWeatherCtrl() {
        const fc = this;
        fc.name = "World Weather";
        console.log(fc.name);
    }
})();
