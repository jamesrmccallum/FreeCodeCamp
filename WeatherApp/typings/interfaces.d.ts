interface ICoOrds { lat: number, long: number }

interface IForecast {
    base: string,
    clouds: Object,
    cod: number 
    coord: Object,
    dt: number,
    id: number,
    main: {temp:number}
    name: string,
    sys: Object,
    weather: {id: number, main: string, description: string, icon: string}[]
    wind : Object
}