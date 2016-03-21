///<reference path="../all.d.ts" />
var Services;
(function (Services) {
    var forecastService = (function () {
        function forecastService($http) {
            this.$http = $http;
        }
        forecastService.prototype.getLocation = function () {
            return new Promise(function (res, rej) {
                navigator.geolocation.getCurrentPosition(function (position) { res({ lat: position.coords.latitude, long: position.coords.longitude }); }, function (error) { return rej(error); });
            });
        };
        forecastService.prototype.getForecastData = function (c) {
            var url = "http://crossorigin.me/http://api.openweathermap.org/data/2.5/weather?lat=" + c.lat + "&lon=" + c.long + "&APPID=19fc11eedd5da1975e9eb91633169bdd&units=imperial";
            this.apiURl + c.lat + ',' + c.long;
            return this.$http.get(url);
        };
        forecastService.prototype.getForecast = function () {
            var _this = this;
            return new Promise(function (res, rej) {
                _this.getLocation()
                    .then(function (c) { return _this.getForecastData(c); })
                    .then(function (f) { return res(f.data); })
                    .catch(function (e) { return rej(e); });
            });
        };
        forecastService.$inject = ['$http'];
        return forecastService;
    })();
    Services.forecastService = forecastService;
})(Services || (Services = {}));
///<reference path="../all.d.ts" />
var Directives;
(function (Directives) {
    function forecastPanel() {
        return {
            restrict: 'A',
            replace: true,
            template: "<div class=\"forecastpanel\">\n                        <div id=\"city\"></div>\n                        <div id=\"tempblock\">\n                            <span id=\"temperature\"></span>\n                            <sup>\u00B0</sup>\n                            <span id=\"units\">F</span>\n                        </div>\n                        <img src=\"\"></img>\n                       </div>",
            controller: ForecastPanelController,
            controllerAs: 'ctrl',
            link: function (s, e, a) {
                s.ctrl.getForecast().then(function (d) {
                    var weather = d.weather[0];
                    var temp = { F: Math.round(d.main.temp), C: Math.round((d.main.temp - 32) / 1.8) };
                    var el = e[0];
                    var div_city = el.children[0];
                    var div_tempblock = el.children[1];
                    var span_temp = div_tempblock.children[0];
                    var span_units = div_tempblock.children[2];
                    var icon = el.children[2];
                    span_temp.innerHTML = temp.F.toString();
                    div_city.innerHTML = d.name;
                    icon.src = "http://openweathermap.org/img/w/" + weather.icon + ".png";
                    console.log(d);
                    span_units.onclick = function (e) {
                        if (span_units.innerHTML === 'F') {
                            span_units.innerHTML = 'C';
                            span_temp.innerHTML = temp.C.toString();
                        }
                        else {
                            span_units.innerHTML = 'F';
                            span_temp.innerHTML = temp.F.toString();
                        }
                    };
                });
            }
        };
    }
    Directives.forecastPanel = forecastPanel;
    var ForecastPanelController = (function () {
        function ForecastPanelController(forecastService) {
            this.forecastService = forecastService;
        }
        ForecastPanelController.prototype.getForecast = function () {
            return this.forecastService.getForecast();
        };
        ForecastPanelController.$inject = ['forecastService'];
        return ForecastPanelController;
    })();
})(Directives || (Directives = {}));
///<reference path="./all.d.ts" />
var app = angular.module('weatherApp', [])
    .service('forecastService', Services.forecastService)
    .directive(Directives);
