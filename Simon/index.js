var Simon = (function () {
    function Simon(dom) {
        var _this = this;
        //Get the DOM
        this._DOM = dom;
        this._colourButtons = [].slice.call(this._DOM.querySelectorAll('.button'));
        this._scoreCounter = this._DOM.querySelector('#counter');
        this._startButton = this._DOM.querySelector('#start');
        this._strictButton = this._DOM.querySelector('#strict');
        this._strictLED = this._DOM.querySelector('.led');
        this._onOffSwitch = this._DOM.querySelector('.btn.onoff');
        this._onOffIndicator = this._DOM.querySelector('.btn.onoff_inner');
        this._audioContext = new (window.AudioContext || window.webkitAudioContext);
        //Array of oscillator configs
        this._tones = {
            0: { freq: 200, waveform: 'sine' },
            1: { freq: 300, waveform: 'sine' },
            2: { freq: 400, waveform: 'sine' },
            3: { freq: 500, waveform: 'sine' },
            4: { freq: 100, waveform: 'square' }
        };
        //bind events
        this._colourButtons.forEach(function (b) {
            b.addEventListener('click', function (e) {
                e.preventDefault();
                _this.handleClick(e);
            });
        });
        this._scoreCounter.innerText = '';
        this._strictButton.addEventListener('click', function () { _this.toggleStrict(); });
        this._startButton.addEventListener('click', function () { _this.Start(); });
        this._onOffSwitch.addEventListener('click', function () { _this.toggleOnOff(); });
        //State vars
        this.powerOn = false;
        this.gameActive = false;
        this.strict = false;
        this._cpuMoveArray = [];
        this._playerMoveArray = [];
    }
    Simon.prototype.clearState = function () {
        this._cpuMoveArray = [];
        this._playerMoveArray = [];
        this._scoreCounter.innerText = '';
    };
    /** Turn strict mode on or off - set the LED */
    Simon.prototype.toggleStrict = function () {
        if (!this.strict) {
            this.strict = true;
            this._strictLED.style.backgroundColor = 'red';
        }
        else {
            this.strict = false;
            this._strictLED.style.backgroundColor = '#400000';
        }
    };
    Simon.prototype.Start = function () {
        //Power on - mid game reset
        if (this.gameActive && this.powerOn) {
            this.clearState();
            this.cpuMove(true);
            //Power on - game uninitialized
        }
        else if (this.powerOn && !this.gameActive) {
            this.gameActive = true;
            this.cpuMove(true);
        }
    };
    /** Turns the game on or off */
    Simon.prototype.toggleOnOff = function () {
        if (this.powerOn) {
            this._onOffIndicator.classList.remove('on');
            this.clearState();
            clearInterval(this._playingSequence);
            this.gameActive = false;
            this.powerOn = false;
        }
        else {
            this._onOffIndicator.classList.add('on');
            this._scoreCounter.innerText = '--';
            this.gameActive = true;
            this.powerOn = true;
        }
    };
    /** Set the external move counter */
    Simon.prototype.incrementCounter = function () {
        var i = this._cpuMoveArray.length;
        var num = '';
        if (i < 10) {
            num = '0' + i.toString();
        }
        else {
            num = i.toString();
        }
        this._scoreCounter.innerText = num;
    };
    /** Handle all button push effects */
    Simon.prototype.pushButton = function (i) {
        var _this = this;
        this.playTone(i);
        this._colourButtons[i].classList.toggle('lit');
        setTimeout(function () {
            _this._colourButtons[i].classList.toggle('lit');
        }, 500);
    };
    //Play a tone in the window audio context for 1 second
    Simon.prototype.playTone = function (i) {
        var tone = this._tones[i];
        var o = this._audioContext.createOscillator();
        o.type = tone.waveform;
        o.frequency.value = tone.freq;
        o.connect(this._audioContext.destination);
        o.start(this._audioContext.currentTime);
        o.stop(this._audioContext.currentTime + .5);
    };
    /** Should wait 5 seconds then changes the turn to CPU **/
    Simon.prototype.capturePlayerMoves = function () {
        var _this = this;
        return new Promise(function (res, rej) {
            setTimeout(function () {
                _this.turn = 'cpu';
                res();
            }, 5000);
        });
    };
    /** Recursively pick new move, push it on the array, check for equality
     * @param increment - whether to add a new move to the stack or not - false repeats a turn
    */
    Simon.prototype.cpuMove = function (increment) {
        var _this = this;
        this.turn = 'cpu';
        if (increment) {
            var move = Math.floor(Math.random() * 4);
            this._cpuMoveArray.push(move);
            this.incrementCounter();
        }
        this.playCpuMoves().then(function () {
            _this.turn = 'player';
            return _this.capturePlayerMoves();
        }).then(function () {
            var match = _this.playerMatchesCpu;
            //Player has 20 in a row correct
            if (match && _this._playerMoveArray.length == 20) {
                _this._scoreCounter.innerText = 'WIN';
                _this.cpuMove(true);
                //Player matches so far..
            }
            else if (match) {
                _this._playerMoveArray = [];
                _this.cpuMove(true);
                //Strict mode is on - no match - reset
            }
            else if (_this.strict && !match) {
                _this._scoreCounter.innerText = '! !';
                _this.playTone(4);
                setTimeout(function () {
                    _this.clearState();
                    _this.Start();
                }, 1000);
                // No Match - no strict - reset
            }
            else {
                _this._playerMoveArray = [];
                _this.cpuMove(false);
            }
        });
    };
    /** Run through the CPU move combo and play sounds */
    Simon.prototype.playCpuMoves = function () {
        var _this = this;
        if (this.powerOn && this.gameActive) {
            var i = 0;
            return new Promise(function (res, rej) {
                _this._playingSequence = setInterval(function () {
                    _this.pushButton(_this._cpuMoveArray[i]);
                    i++;
                    if (i == _this._cpuMoveArray.length) {
                        clearInterval(_this._playingSequence);
                        res();
                    }
                }, 1000);
            });
        }
    };
    Object.defineProperty(Simon.prototype, "playerMatchesCpu", {
        /** Checks whether the player move array matches the CPU move array */
        get: function () {
            if (this._cpuMoveArray.length != this._playerMoveArray.length) {
                return false;
            }
            for (var i = 0; i < this._cpuMoveArray.length; i++) {
                if (this._cpuMoveArray[i] != this._playerMoveArray[i]) {
                    return false;
                }
            }
            return true;
        },
        enumerable: true,
        configurable: true
    });
    /** Handle a click on one of the main color buttons */
    Simon.prototype.handleClick = function (e) {
        if (this.gameActive && this.turn == 'player') {
            //Get the element 
            var el = e.target;
            var id = parseInt(el.dataset.idx);
            this._playerMoveArray.push(id);
            this.pushButton(id);
        }
        else {
            e.preventDefault();
        }
    };
    return Simon;
}());
function main() {
    var gui = document.querySelector('#simon');
    window.game = new Simon(gui);
}
document.addEventListener('DOMContentLoaded', main, false);
