
export function convertToRoman(num: number) {

    console.log(`Converting ${num} to roman numerals...`)
    var keys = [1, 5, 10, 50, 100, 500, 1000];
    var numerals = ['I', 'V', 'X', 'L', 'C', 'D', 'M'];

    var numString = num.toString();
    var strLen = numString.length;

    //Parse out ones, tens, hundreds, thousands - IF the number is that long
    var ones = numString.substr(strLen - 1).substr(0, 1);
    var tens = strLen >= 2? numString.substr(strLen - 2).substr(0, 1): '0';
    var hundreds = strLen >= 3? numString.substr(strLen - 3).substr(0, 1): '0';
    var thousands = strLen >= 4? numString.substr(strLen - 4).substr(0, 1): '0';

    //Return roman numeral string versions of each unit
    var strOnes = toNumeral(parseInt(ones), 1);
    var strTens = toNumeral(parseInt(tens), 10);
    var strHundreds = toNumeral(parseInt(hundreds), 100);
    var strThousands = toNumeral(parseInt(thousands), 1000);
    
    console.log({
        'thousands':thousands,
        'hundreds':hundreds,
        'tens':tens,
        'ones':ones
    })
    
    return [strThousands, strHundreds, strTens, strOnes].join('');

    function toNumeral(no: number, unit: number) {

        let char = numerals[keys.indexOf(unit)];
        let converted = '';

        let nextChar = numerals[keys.indexOf(unit) + 1] || '';
        let lastChar = numerals[keys.indexOf(unit) + 2] || '';

        //For numbers less than 4, and thousands - just repeat the 1 symbol.
        if (no < 4 || unit === 1000) {
            converted = new Array(no + 1).join(char);
        }
        else if (no === 4) {
            converted = char + nextChar;
        }
        else if (no === 5) {
            converted = nextChar;
        }
        else if (no < 9) {
            converted = nextChar + new Array(no + 1 - 5).join(char);
        }
        else if (no ===9) {
            converted = char + lastChar;
        }

        return converted;

    }
}