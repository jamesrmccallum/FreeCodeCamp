"use strict";
function orbitalPeriod(arr) {
    let GM = 398600.4418;
    let earthRadius = 6367.4447;
    return arr.map(a => toOrbital(a));
    function toOrbital(s) {
        let dist = earthRadius + s.avgAlt;
        let orb = 2 * Math.PI * Math.sqrt(Math.pow(dist, 3) / GM);
        return { name: s.name, orbitalPeriod: Math.round(orb) };
    }
}
exports.orbitalPeriod = orbitalPeriod;
