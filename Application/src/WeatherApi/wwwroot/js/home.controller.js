(function () {
    'use strict';

    var weatherApp = angular.module('weatherApp');

    weatherApp.factory('forecastFactory', function ($http) {
        return {
            getCities : function(val){
                return $http.get('/api/cities/search', {
                    params: {
                        byName : val
                    }
                }).then(function(response){
                    return response.data;
                });
            },

            getCoordinats : function(placeID) {
                return $http.get('/api/cities/'+placeID)
                        .then(function(response){
                            return response.data;
                        });
                },

            getForecast : function(placeCoords, provider){
                var coords = placeCoords.latitude + "longitude="+placeCoords.longitude;
                return $http.get('/api/forecast', {
                    params: {
                        latitude : coords,
                        //longitude : placeCoords.longitude,
                        source : provider
                    }
                }).then(function(response){
                    return response.data;
                });
            }
        }
    });
    weatherApp.controller('ForecastCtrl', ForecastCtrl);

    function ForecastCtrl($routeParams, forecastFactory) {

        const fc = this;

        switch($routeParams.provider) {
            case 'FORECAST_IO':
                fc.providerName = 'Forecast.io';
                break;
            case 'WORLD_WEATHER' :
                fc.providerName = 'World Weather';
                break;
        }

        fc.loading = false;
        fc.loaded = false;
        fc.forecasts = [];

        fc.getCities = function(val) {
            console.log(val);
            return forecastFactory.getCities(val);
        };

        fc.citySelected = function($item, $model, $label, $event)
        {
            console.log($item.placeId);
            fc.loading = true;
            fc.loaded = false;
            fc.forecasts = [];
            loadPlaceCoords($item.placeId);
        };

        var loadPlaceCoords = function(placeId){
            return forecastFactory.getCoordinats(placeId)
                .then(function(result){
                    console.log(result);
                    return getWeatherInfo(result);
                })
        };

        var getWeatherInfo = function(placeCoords, provider){
            forecastFactory.getForecast(placeCoords, $routeParams.provider)
                .then(function(result){
                    fc.forecasts[0] = result.currently;
                    fc.forecasts[0].img = chooseImage(fc.forecasts[0].cloudCover);

                    result.futureForecasts.forEach(function(item){
                        fc.forecasts.push(modifyItem(item));
                    });
                    fc.forecasts.length = 7;
                    fc.loading = false;
                    fc.loaded = true;
                });
        };

        var modifyItem = function(item){
            item.temperature = item.temperatureMax;
            item.apparentTemperature = item.apparentTemperatureMax;
            item.img = chooseImage(item.cloudCover);
            item.apparentTemperatureMin = item.apparentTemperatureMin +'\u2109';
            item.temperatureMin = item.temperatureMin +'\u2109';
            if(fc.providerName == 'World Weather'){
                delete item.apparentTemperatureMin;
            };
            return item;
        };

        var chooseImage = function(cloudCover)
        {
            if(cloudCover < 0.125) {
                return '/images/weezle_sun.png';
            }

            if(cloudCover < 0.376) {
                return '/images/weezle_sun_minimal_clouds.png';
            }

            if(cloudCover < 0.625) {
                return '/images/weezle_sun_maximum_clouds.png';
            }

            if(cloudCover < 0.875) {
                return '/images/weezle_cloud.png';
            }
            return '/images/weezle_max_cloud.png';
        }

    }

})();
