(function () {
    'use strict';

    var weatherApp = angular.module('weatherApp');
    weatherApp.controller('ForecastCtrl', ForecastCtrl);

    function ForecastCtrl($http) {
        const fc = this;

        fc.name = "Forecast IO";
        fc.getCities = function(val){

            return $http.get('api/cities/search', {
             params: {
                byName : val
             }
            }).then(function(response){ console.log(response.data);

                return response.data.map(function(item){
            return item.description;
            });
        });
        };
    }


    weatherApp.controller('WorldWeatherCtrl', WorldWeatherCtrl);


    function WorldWeatherCtrl( $http) {
        const fc = this;
        fc.name = "World Weather";
        console.log(fc.name);

        fc.getCities = function(val){

            return $http.get('api/cities/search', {
             params: {
                byName : val
             }
            }).then(function(response){ console.log(response.data);

                return response.data.map(function(item){
            return item.description;
            });
        });
    };


}

})();
