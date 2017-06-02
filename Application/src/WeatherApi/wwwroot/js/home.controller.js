(function () {
    'use strict';

    var weatherApp = angular.module('weatherApp');
    weatherApp.controller('ForecastCtrl', ForecastCtrl);

    function ForecastCtrl($http) {

        const fc = this;

        switch($routeParams.provider) {
            case 'FORECAST_IO':
                fc.providerName = 'Forecast.io';
                break;
            case 'WORLD_WEATHER' :
                fc.providerName = 'World Weather';
                break;
        }

        fc.getCities = function(val) {
            return weatherFactory.getCities(val);
        };

    }

})();
