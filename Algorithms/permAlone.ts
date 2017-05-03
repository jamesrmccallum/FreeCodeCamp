
export function permAlone(str: string) {


    function swap (array: any[], pos1: number, pos2: number) {
        var temp = array[pos1];
        array[pos1] = array[pos2];
        array[pos2] = temp;
    };

    let perms = [];
    var heapsPermute = function (array: string[],n?: number) {
        n = n || array.length; // set n default to array.length
        if (n === 1) {
            perms.push(array.join(''));
            return;
        } else {
            for (var i = 1; i <= n; i += 1) {
                heapsPermute(array, n - 1);
                if (n % 2) {
                    var j = 1;
                } else {
                    var j = i;
                }
                swap(array, j - 1, n - 1); // -1 to account for javascript zero-indexing
            }
        }
    };

    let strArray = str.split('');

    heapsPermute(strArray);

    var regexp = /([\w])\1+/

    return perms.filter(a => a.search(regexp) == -1).length;
}