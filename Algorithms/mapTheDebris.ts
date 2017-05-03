type spec = {name: string, avgAlt: number};
type result = {name: string, orbitalPeriod: number}

export function orbitalPeriod(arr: spec[]) : result[]{
    let GM = 398600.4418;
    let earthRadius = 6367.4447;

    return arr.map(a=>toOrbital(a));

    function toOrbital(s:spec) {
        let dist = earthRadius + s.avgAlt;
        let orb = 2 * Math.PI * Math.sqrt( Math.pow(dist,3) / GM );

        return {name: s.name, orbitalPeriod: Math.round(orb)};

    }
}