(function () {
    "use strict";

    var weatherApp =  angular.module('weatherApp');

    weatherApp.config(['$routeProvider', '$locationProvider',function($routeProvide, $locationProvider){
        $routeProvide
            .when("/", {
                templateUrl: "./client/home/main.view.html"
            })
            .when("/forecastIO", {
                templateUrl: "./client/home/forecast.view.html",
                controller: "ForecastCtrl",
                controllerAs: "fc"

            })
            .when("/worldWeather", {
                templateUrl: "./client/home/forecast.view.html",
                controller: "WorldWeatherCtrl",
                controllerAs: "fc"
            })

        // $locationProvider.html5Mode(true);

    }]);

})();