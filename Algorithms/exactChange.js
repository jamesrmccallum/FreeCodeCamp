"use strict";
function checkCashRegister(price, cash, cid) {
    // Here is your change, ma'am.
    var denominations = {
        "PENNY": 0.01,
        "NICKEL": 0.05,
        "DIME": 0.10,
        "QUARTER": 0.25,
        "ONE": 1,
        "FIVE": 5,
        "TEN": 10,
        "TWENTY": 20,
        "ONE HUNDRED": 100
    };
    let denomBudgets = {};
    //Give me denomination budgets for cash in drawer
    Object.keys(denominations)
        .forEach(a => {
        let val = cid.filter(b => {
            return b[0] === a;
        })[0];
        denomBudgets[a] = Math.round(val[1] / denominations[a]);
    });
    //Total cash in drawer for later shortcut
    let drawerTotal = cid
        .map(a => a[1])
        .reduce((a, b) => a + b)
        .toFixed(2);
    let changeDue = (cash - price).toFixed(2);
    //Is there not enough change in the drawer total?
    if (parseFloat(changeDue) > parseFloat(drawerTotal)) {
        return "Insufficient Funds";
    }
    //Is exactly the right amount in the drawer?
    if (parseFloat(changeDue) === parseFloat(drawerTotal)) {
        return "Closed";
    }
    // Attempt to give change
    //first, filter the drawer for units smaller than change due - order them largest to smallest
    let validDenominations = Object.keys(denominations)
        .filter(a => denominations[a] < changeDue)
        .sort((a, b) => { return denominations[b] - denominations[a]; });
    let change = [];
    let changeSum = 0;
    /** the total change due */
    let due = parseFloat(changeDue);
    // Go from largest to smallest denomination, adding 1 until budget blown. 
    validDenominations.forEach(a => {
        console.info(`Checking ${a}`);
        let val = denominations[a];
        let blown = false;
        let thisVal = 0;
        /** The amount of this denomination in the drawer */
        let valBudget = denomBudgets[a];
        let used = false;
        //Add as many of this denomination as possible without blowing 
        //a) overall budget 
        //b) denomination budget
        for (let i = 0; i < denomBudgets[a]; i++) {
            if ((parseFloat(due.toFixed(2)) - val) < 0) {
                break;
            }
            else {
                used = true;
                due -= val;
                thisVal += val;
            }
        }
        if (used) {
            let c = [a, thisVal];
            change.push(c);
        }
    });
    //How much change did we get after all that? 
    let chgTotal = change
        .map(a => a[1])
        .reduce((a, b) => a + b);
    return (change == [] || chgTotal < due) ? 'Insufficient Funds' : change;
}
exports.checkCashRegister = checkCashRegister;
