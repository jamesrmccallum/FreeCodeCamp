
interface Window { calculator: Calculator }

type Div = HTMLDivElement

interface FuncMap { [func: string]: { char: string, func: Function } }

class Calculator {

    /** The main dom object */
    private _dom: HTMLDivElement;
    /** Maps functions to their symbols */
    private _funcMap: FuncMap;
    private _currentOpReadout: HTMLDivElement;
    /** Holds the current input until it's delimited by an operator */
    private _currentBuffer: string;
    private _opQueueReadout: HTMLDivElement;
    private _opQueue: Array<number | Function>;
    private _calcVal: number;
    private _readOut: HTMLDivElement;
    private _prevChar: string;

    constructor(dom: HTMLDivElement) {

        //Get the dom bindings
        this._dom = dom;
        this._currentOpReadout = <Div>this._dom.querySelector('#readout_current');
        this._opQueueReadout = <Div>this._dom.querySelector('#readout_queue');

        //Register clickhandlers
        this._dom.addEventListener('click', e => {
            e.preventDefault();
            let el = <Div>e.target;
            if (el.classList.contains('button')) {
                this.handleClicK(el);
            }
        });

        //Map buttons to symbols to operations
        this._funcMap = {
            'div': { char: '÷', func: (a, b) => a / b },
            'times': { char: '×', func: (a, b) => a * b },
            'plus': { char: '+', func: (a, b) => a + b },
            'minus': { char: '-', func: (a, b) => a - b }
        }

        this._opQueue = [];
        this._currentBuffer = '';
        this._prevChar ='';
    }

    /** Get the current button press and decide what to do with it */
    private handleClicK(el: Div) {

        if (el.id == 'ac') {
            this.clearAll();
            return;
        }

        if (el.id == 'ce') {
            this.clearEntry();
            return;
        }

        //Evaluate
        if (el.id == 'equals') {
            if (this._prevChar != 'equals') {
                this.opQueueDisplay += this._currentBuffer;
                this._opQueue.push(parseFloat(this._currentBuffer))
                this.calculate();
            }
            this._prevChar ='equals';
            return;
        }
        //An operator pushes the current buffer to the op stack
        if (/div|times|plus|minus/g.test(el.id)) {

            let thisOp = this._funcMap[el.id];

            if (this._prevChar != 'equals') {
                this._opQueue.push(parseFloat(this._currentBuffer));
            }

            this._prevChar= el.id;
            this._opQueue.push(thisOp.func);

            this.opQueueDisplay += this._currentBuffer + thisOp.char;
            this.currentOpDisplay = thisOp.char;
            this._currentBuffer = ''
            return;
        //Handle numbers
        } else {
            if (this._prevChar != 'equals') {
                if(this._prevChar=='') {
                    this._currentBuffer = el.id;
                    this.currentOpDisplay = el.id;
                } else {
                    this._currentBuffer += el.id;
                    this.currentOpDisplay += el.id;
                }
            } else {
                this.clearAll();
                this._currentBuffer += el.id;
                this.currentOpDisplay += el.id;
            }
            this._prevChar = el.id;
        }
    }

    /** Evaluate the function queue **/
    private calculate() {

        let val = <number>this._opQueue[0];

        for (let i = 1; i < this._opQueue.length; i += 2) {
            val = (<Function>this._opQueue[i]).apply(this, [val, this._opQueue[i + 1]]);
        }

        this.currentOpDisplay = val.toString();
        this._currentBuffer = '';
    }

    /** Clear the current entry from screen */
    private clearEntry() {
        this.currentOpDisplay = '0';
        this._currentBuffer = '';
    }

    private clearAll() {
        this._opQueue = [];
        this._currentBuffer = '';
        this.opQueueDisplay = '0';
        this.currentOpDisplay = '0';
        this._prevChar = '';
    }

    get readOut() {
        return this._readOut.innerText;
    }

    /** Get the current value of the opqueue div **/
    get opQueueDisplay() {
        return this._opQueueReadout.innerText;
    }

    /** Set the current value of the opqueue div **/
    set opQueueDisplay(s: string) {
        if (s.length >= 30) {
            this._currentOpReadout.innerText = '0';
            this.opQueueDisplay = 'Display limit exceeded';
            this._opQueue = [];
            this._currentBuffer = '';
        } else {
            this._opQueueReadout.innerText = s;
        }
    }

    get currentOpDisplay() {
        return this._currentOpReadout.innerText;
    }

    set currentOpDisplay(s: string) {
        if (s.length >= 10) {
            this._currentOpReadout.innerText = '0';
            this.opQueueDisplay = 'Display limit exceeded';
            this._opQueue = [];
            this._currentBuffer = '';
        } else {
            this._currentOpReadout.innerText = s;
        }
    }
}

function main() {
    let gui = <Div>document.querySelector('#calculator');
    window.calculator = new Calculator(gui);
}
document.addEventListener('DOMContentLoaded', main, false);
