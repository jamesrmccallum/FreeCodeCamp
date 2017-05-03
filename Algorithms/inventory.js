"use strict";
function updateInventory(currInv, newInv) {
    ///Loop through new array - for each item 
    // If it's in the old array, patch the old array with the quantity
    // If it's not - then add the whole element to the old array
    //Return the first array sorted aplhabetically by item
    newInv.forEach(a => {
        let match = currInv.findIndex(b => {
            return b[1] == a[1];
        });
        if (match != -1) {
            currInv[match][0] += a[0];
        }
        else {
            currInv.push(a);
        }
    });
    currInv.sort((a, b) => {
        if (a[1] < b[1])
            return -1;
        if (a[1] > b[1])
            return 1;
        return 0;
    });
    return currInv;
}
exports.updateInventory = updateInventory;
