declare namespace Types {

    export interface MonthlyVariance {
        year: number;
        month: number;
        monthName: string;
        variance: number;
    }

    export interface RootObject {
        baseTemperature: number;
        monthlyVariance: MonthlyVariance[];
    }

}
