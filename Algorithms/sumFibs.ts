
export function sumFibs(num: number) {

    let i = 0;
    let sum = 1;

    while (i <= num) {
        if (isFibonacci(i) && isOdd(i)) {
            console.log(`${i} is an odd fibonacci`)
            sum += i;
        }
        i++;
    }

    return sum;

    function isFibonacci(n: number) {

        for (let v of fibs()) {
            if (v > n) {
                return false;
            }
            if (v === n) {
                return true;
            }
        }

    }

    function isOdd(n: number) {
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