
export function pairWise(arr: number[], arg: number) {

    let pairs = [];
    let arr2 = arr.slice();

    //For each element in the array
    for (let i = 0; i < arr.length; i++) {

        //Iterate through every OTHER element in the array
        for (let j = 0; j < arr.length; j++) {
            
            //Can't use the same element, mang!
            if (j === i) break;

            //Try adding them up
            if (arr[j] + arr[i] === arg) {
                if(pairs.indexOf(j)==-1 && pairs.indexOf(i)==-1) {
                    pairs.push(i);
                    pairs.push(j);
                }
            }
        }

    }

    return pairs.reduce((a, b) => a + b,0);

}