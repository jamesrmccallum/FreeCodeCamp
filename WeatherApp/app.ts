///<reference path="./all.d.ts" />

let app = angular.module('weatherApp', [])
    .service('forecastService', Services.forecastService)
    .directive(Directives);



