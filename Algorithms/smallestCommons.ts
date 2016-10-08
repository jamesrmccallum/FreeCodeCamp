
export function smallestCommons(arr: number[]) {

    arr.sort()

    let first = multiples(arr[0]);
    let second = multiples(arr[1]);

    let BINGO = false;
    let results = [];

    let range = [];
    let result = 0;

    for (var i = arr[0]; i <= arr[1]; i++) {
        range.push(i);
    }

    let chk = second.next().value;

    while (!BINGO) {

        if (!(chk%arr[0])) {
            result = chk;
            BINGO = isDivisible(chk, range);
        }

        chk = second.next().value;
    }

    return result;

    /** is each element of the range argument divisible evenly by the num argument? */
    function isDivisible(num: number, range: number[]) {
        let result = true;
        range.forEach(a => {
            if (!!(num % a)) {
                result = false;
            }
        })

        return result;
    }

    /** sequence returning multiples of a number */
    function* multiples(n: number) {
        let num = n;
        let times = 1;
        while (true) {
            var current = n * times;
            times++;
            yield current;
        }
    }

}