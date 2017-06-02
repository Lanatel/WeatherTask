(function () {
    'use strict';

    var weatherApp = angular.module('weatherApp');
    weatherApp.factory('forecastFactory', function cityFactory($http) {
        return {
            getCities : function(val){
                return $http.get('api/cities/search', {
                    params: {
                        byName : val
                    }
                }).then(function(response){
                    return response.data;
                });
            },

            getCoordinat : function(placeID) {
                return $http.get('api/cities/'+placeID)
                        .then(function(response){
                            return response.data;
                        });
                };

            getForecast : function(placeCoords){
                return $http.get('api/forecast', {
                    params: {
                        longitude : placeCoords.longitude,
                        latitude : placeCoords.latitude,
                        source : $routeParams.provider
                    }
                }).then(function(response){
                    return response.data;
                });
            }
        }
    });
})();

