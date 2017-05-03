///<reference path="../all.d.ts" />
module Directives {

    interface IforecastPanelScope extends ng.IScope { ctrl: ForecastPanelController }

    export function forecastPanel(): ng.IDirective {
        return {
            restrict: 'A',
            replace: true,
            template: `<div class="forecastpanel">
                        <div id="city"></div>
                        <div id="tempblock">
                            <span id="temperature"></span>
                            <sup>°</sup>
                            <span id="units">F</span>
                        </div>
                        <img src=""></img>
                       </div>`,
            controller: ForecastPanelController,
            controllerAs: 'ctrl',
            link: (s: IforecastPanelScope, e, a) => {
                s.ctrl.getForecast().then(d => {
                    let weather = d.weather[0];
                    let temp = {F: Math.round(d.main.temp), C: Math.round((d.main.temp-32) /1.8)}

                    let el = <HTMLDivElement>e[0];
                    let div_city = <HTMLDivElement>el.children[0];
                    let div_tempblock = <HTMLDivElement>el.children[1];
                    
                    let span_temp = <HTMLSpanElement>div_tempblock.children[0];
                    let span_units = <HTMLSpanElement>div_tempblock.children[2];
                    
                    let icon = <HTMLImageElement>el.children[2];

                    span_temp.innerHTML = temp.F.toString();
                    div_city.innerHTML = d.name;
                    icon.src = `http://openweathermap.org/img/w/${weather.icon}.png`
                    console.log(d)

                    span_units.onclick = (e) => {
                        if (span_units.innerHTML === 'F') {
                            span_units.innerHTML = 'C'
                            span_temp.innerHTML = temp.C.toString();
                        } else {
                            span_units.innerHTML = 'F';
                            span_temp.innerHTML = temp.F.toString();
                        }
                    }
                })
            }
        }
    }

    class ForecastPanelController {
        static $inject = ['forecastService'];

        constructor(private forecastService: Services.forecastService) {

        }

        getForecast() {
            return this.forecastService.getForecast();
        }
    }
}