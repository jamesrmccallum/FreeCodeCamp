'use strict';

function steamroller(arr) {
    // I'm a steamroller, baby
    var ret = [];

    arr.forEach(a => {
        flatten(a)
    });

    function flatten(a) {
        // If it's an array - recur
        if (Array.isArray(a)) {
            a.map(a => { flatten(a); });
        } else if (a === undefined) {
            return;
        } else {
            ret.push(a);
        }
    }
    return ret;
}

function binaryAgent(str: string) {

    var ret = ''

    return str.split(' ').map(a => {
        return parseInt(a, 2);
    }).map(b => {
        return String.fromCharCode(b);
    }).join(' ');
}

function every(collection: Object[], pre: string) {
    var truthy = true;
    var chk = collection[0][pre];

    collection.forEach(a => {
        if (a[pre] !== chk) {
            truthy = false;
        }
    })

    return truthy;
}

function sumFibs(num: number) {
    
    let ret = 0;
    
    for(let i=1; i<=num; i++){
        if(isFibonacci(i)){
            ret += i;
        }
    }
    
    return ret;
    
    function isFibonacci(n: number) {

        return isPerfectSquare(5 * n * n + 4) || isPerfectSquare(5 * n * n - 4);

        function isPerfectSquare(x: number) {
            let s = Math.sqrt(x);
            return (s * s === x);
        }

    }
}

console.log(sumFibs(1000));

console.log(binaryAgent("01000001 01110010 01100101 01101110 00100111 01110100 00100000 01100010 01101111 01101110 01100110 01101001 01110010 01100101 01110011 00100000 01100110 01110101 01101110 00100001 00111111"));

console.log(steamroller([1, [2], [3, [[4]]]]));

console.log(every([{ "user": "Tinky-Winky", "sex": "male" }, { "user": "Dipsy", "sex": "male" }, { "user": "Laa-Laa", "sex": "female" }, { "user": "Po", "sex": "female" }], "sex"));