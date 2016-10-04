
export function makeFriendlyDates(arr) {

  var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  //Break dates out into [y,m,d]
  var year1 = arr[0].split('-').map(a => parseInt(a));
  var year2 = arr[1].split('-').map(a => parseInt(a));

  //Create new dates with times at 00:00:00 for inputs
  var startYear = new Date(year1[0], year1[1], year1[2]);
  var endYear = new Date(year2[0], year2[1], year2[2]);

  console.log(`Startyear is ${startYear}`)
  console.log(`Endyear is ${endYear}`)

  console.log(`Endyearpoint is ${new Date(year1[0] + 1, year1[1], year1[2])}`)
  //Compare both dates
  var sameDate: boolean = year1.join('') === year2.join('');
  var gapOverYear: boolean = new Date(year1[0] + 1, year1[1], year1[2]) <= endYear;
  var currentYearStart: boolean = new Date().getFullYear() === year1[0];
  var sameMonth: boolean = year1[0] === year2[0] && year1[1] === year2[1];

  var startYearStr = !gapOverYear && currentYearStart ? '' : ', ' + year1[0].toString();
  var endYearStr = !gapOverYear ? '' : ', ' + year2[0].toString();
  var startMonthDay = monthNames[year1[1] - 1] + ' ' + year1[2].toString() + ordinal(year1[2]);
  var endMonth = sameMonth ? '' : monthNames[year2[1] - 1] + ' ';
  var endMonthDay = endMonth + year2[2].toString() + ordinal(year2[2]);

  if (sameDate) {
    return [startMonthDay + startYearStr];
  } else {
    return [startMonthDay + startYearStr, endMonthDay + endYearStr];
  }

  function ordinal(d) {
    if (d > 3 && d < 21) return 'th';
    switch (d % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  }
}