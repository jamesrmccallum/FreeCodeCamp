import * as dates from './friendlyDates';
import * as nums from './romanNumeral';
import * as txt from './spinalCase'
import * as fibs from './sumFibs';
import * as com from './smallestCommons';
import * as chng from './exactChange'
import * as inv from './inventory';
import * as perm from './permAlone';
import * as pair from './pairWise'; 
//console.log(dates.makeFriendlyDates(["2022-09-05", "2023-09-05"]));
//console.log(txt.spinalCase("This Is Spinal Tap"));
//console.log(txt.spinalCase("thisIsSpinalTap"));
//console.log(fibs.sumFibs(75025));

//let test = chng.checkCashRegister(3.26, 100.00, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.10], ["QUARTER", 4.25], ["ONE", 90.00], ["FIVE", 55.00], ["TEN", 20.00], ["TWENTY", 60.00], ["ONE HUNDRED", 100.00]]);
//let test = inv.updateInventory([], [[2, "Hair Pin"], [3, "Half-Eaten Apple"], [67, "Bowling Ball"], [7, "Toothpaste"]]);
//let test = perm.permAlone('aab');
let test = pair.pairWise([1, 3, 2, 4], 4);

console.log(test);