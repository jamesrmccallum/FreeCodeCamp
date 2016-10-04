"use strict";
function sumFibs(num) {
    let i = 0;
    let sum = 1;
    while (i <= num) {
        if (isFibonacci(i) && isOdd(i)) {
            console.log(`${i} is an odd fibonacci`);
            sum += i;
        }
        i++;
    }
    return sum;
    function isFibonacci(n) {
        for (let v of fibs()) {
            if (v > n) {
                return false;
            }
            if (v === n) {
                return true;
            }
        }
    }
    function isOdd(n) {
        return !!(n % 2);
    }
    function* fibs() {
        let fn1 = 0;
        let fn2 = 1;
        while (true) {
            var current = fn1;
            fn1 = fn2;
            fn2 = current + fn1;
            yield current;
        }
    }
}
exports.sumFibs = sumFibs;
