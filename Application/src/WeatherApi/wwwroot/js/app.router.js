(function () {
    "use strict";

    var weatherApp =  angular.module('weatherApp');

    weatherApp.config(['$routeProvider', '$locationProvider',function($routeProvide, $locationProvider){
        $routeProvider
            .when("/", {
                templateUrl: "./client/home/main.view.html"
            })
            .when("/forecast/:provider", {
                templateUrl: "./client/home/forecast.view.html",
                controller: "ForecastCtrl",
                controllerAs: "fc"

            })

         $locationProvider.html5Mode(true);

    }]);

})();