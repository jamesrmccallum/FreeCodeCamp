"use strict";
function sym(args) {
    let argsArray = Array.prototype.slice.call(arguments);
    let a = argsArray[0];
    let ret = [];
    //Recursively call symmetric difference
    return argsArray.reduce((a, b) => {
        console.log(`Reducing ${a} and ${b}`);
        return diff(a, b);
    });
    //Should take two arrays and return the symmetric difference
    function diff(a, b) {
        let adiff = a.filter(x => b.indexOf(x) == -1);
        let bdiff = b.filter(x => a.indexOf(x) == -1);
        let unionDiff = adiff.concat(bdiff).sort((a, b) => a - b);
        console.log(`The unioned difference is ${unionDiff}`);
        return unionDiff.filter((a, i) => {
            return a !== unionDiff[i + 1];
        }); // Take out the duplicates
    }
}
exports.sym = sym;
