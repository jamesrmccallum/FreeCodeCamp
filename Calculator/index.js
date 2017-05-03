var Calculator = (function () {
    function Calculator(dom) {
        var _this = this;
        //Get the dom bindings
        this._dom = dom;
        this._currentOpReadout = this._dom.querySelector('#readout_current');
        this._opQueueReadout = this._dom.querySelector('#readout_queue');
        //Register clickhandlers
        this._dom.addEventListener('click', function (e) {
            e.preventDefault();
            var el = e.target;
            if (el.classList.contains('button')) {
                _this.handleClicK(el);
            }
        });
        //Map buttons to symbols to operations
        this._funcMap = {
            'div': { char: '÷', func: function (a, b) { return a / b; } },
            'times': { char: '×', func: function (a, b) { return a * b; } },
            'plus': { char: '+', func: function (a, b) { return a + b; } },
            'minus': { char: '-', func: function (a, b) { return a - b; } }
        };
        this._opQueue = [];
        this._currentBuffer = '';
        this._prevChar = '';
    }
    /** Get the current button press and decide what to do with it */
    Calculator.prototype.handleClicK = function (el) {
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
                this._opQueue.push(parseFloat(this._currentBuffer));
                this.calculate();
            }
            this._prevChar = 'equals';
            return;
        }
        //An operator pushes the current buffer to the op stack
        if (/div|times|plus|minus/g.test(el.id)) {
            var thisOp = this._funcMap[el.id];
            if (this._prevChar != 'equals') {
                this._opQueue.push(parseFloat(this._currentBuffer));
            }
            this._prevChar = el.id;
            this._opQueue.push(thisOp.func);
            this.opQueueDisplay += this._currentBuffer + thisOp.char;
            this.currentOpDisplay = thisOp.char;
            this._currentBuffer = '';
            return;
            //Handle numbers
        }
        else {
            if (this._prevChar != 'equals') {
                if (this._prevChar == '') {
                    this._currentBuffer = el.id;
                    this.currentOpDisplay = el.id;
                }
                else {
                    this._currentBuffer += el.id;
                    this.currentOpDisplay += el.id;
                }
            }
            else {
                this.clearAll();
                this._currentBuffer += el.id;
                this.currentOpDisplay += el.id;
            }
            this._prevChar = el.id;
        }
    };
    /** Evaluate the function queue **/
    Calculator.prototype.calculate = function () {
        var val = this._opQueue[0];
        for (var i = 1; i < this._opQueue.length; i += 2) {
            val = this._opQueue[i].apply(this, [val, this._opQueue[i + 1]]);
        }
        this.currentOpDisplay = val.toString();
        this._currentBuffer = '';
    };
    /** Clear the current entry from screen */
    Calculator.prototype.clearEntry = function () {
        this.currentOpDisplay = '0';
        this._currentBuffer = '';
    };
    Calculator.prototype.clearAll = function () {
        this._opQueue = [];
        this._currentBuffer = '';
        this.opQueueDisplay = '0';
        this.currentOpDisplay = '0';
        this._prevChar = '';
    };
    Object.defineProperty(Calculator.prototype, "readOut", {
        get: function () {
            return this._readOut.innerText;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Calculator.prototype, "opQueueDisplay", {
        /** Get the current value of the opqueue div **/
        get: function () {
            return this._opQueueReadout.innerText;
        },
        /** Set the current value of the opqueue div **/
        set: function (s) {
            if (s.length >= 30) {
                this._currentOpReadout.innerText = '0';
                this.opQueueDisplay = 'Display limit exceeded';
                this._opQueue = [];
                this._currentBuffer = '';
            }
            else {
                this._opQueueReadout.innerText = s;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Calculator.prototype, "currentOpDisplay", {
        get: function () {
            return this._currentOpReadout.innerText;
        },
        set: function (s) {
            if (s.length >= 10) {
                this._currentOpReadout.innerText = '0';
                this.opQueueDisplay = 'Display limit exceeded';
                this._opQueue = [];
                this._currentBuffer = '';
            }
            else {
                this._currentOpReadout.innerText = s;
            }
        },
        enumerable: true,
        configurable: true
    });
    return Calculator;
}());
function main() {
    var gui = document.querySelector('#calculator');
    window.calculator = new Calculator(gui);
}
document.addEventListener('DOMContentLoaded', main, false);
