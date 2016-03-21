///<reference path="../all.d.ts" />
module Services {
    export class forecastService {

    static $inject = ['$http'];

    constructor(private $http: ng.IHttpService) {

    }

    private getLocation(): Promise<ICoOrds> {

        return new Promise((res, rej) => {

            navigator.geolocation.getCurrentPosition(
                (position) => { res({ lat: position.coords.latitude, long: position.coords.longitude }); }
                ,(error) => rej(error));
        })

    }

    private getForecastData(c: ICoOrds): ng.IHttpPromise<ng.IHttpPromiseCallback<IForecast>> {
        let url = `http://crossorigin.me/http://api.openweathermap.org/data/2.5/weather?lat=${c.lat}&lon=${c.long}&APPID=19fc11eedd5da1975e9eb91633169bdd&units=imperial` 
        
        this.apiURl + c.lat + ',' + c.long;
        return this.$http.get(url);
    }

    public getForecast(): Promise<IForecast> {
        return new Promise((res, rej) => {
            this.getLocation()
                .then(c => this.getForecastData(c))
                .then(f => res(f.data))
                .catch(e => rej(e))
        })
    }
}
}