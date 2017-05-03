
interface Window { game: Simon, AudioContext: any, webkitAudioContext: any }

interface ButtonToneDict { [id: number]: { freq: number, waveform: string } }

class Simon {

    private _cpuMoveArray: number[] //state can e modelled as a list of numbers
    private _playerMoveArray: number[];
    private _tones: ButtonToneDict;
    private _endBuzzer: HTMLAudioElement;
    private _DOM: HTMLDivElement;
    private _colourButtons: HTMLDivElement[];
    private _scoreCounter: HTMLDivElement;
    private _startButton: HTMLButtonElement;
    private _strictButton: HTMLButtonElement;
    private _strictLED: HTMLDivElement;
    private _onOffSwitch: HTMLDivElement;
    private _onOffIndicator: HTMLDivElement;
    private _playingSequence: number;
    private _audioContext: AudioContext;
    private powerOn: boolean;
    private gameActive: boolean;
    strict: boolean;
    turn: 'cpu' | 'player';

    constructor(dom: HTMLDivElement) {

        //Get the DOM
        this._DOM = dom;
        this._colourButtons = [].slice.call(this._DOM.querySelectorAll('.button'));
        this._scoreCounter = <HTMLDivElement>this._DOM.querySelector('#counter');
        this._startButton = <HTMLButtonElement>this._DOM.querySelector('#start');
        this._strictButton = <HTMLButtonElement>this._DOM.querySelector('#strict');
        this._strictLED = <HTMLDivElement>this._DOM.querySelector('.led');
        this._onOffSwitch = <HTMLDivElement>this._DOM.querySelector('.btn.onoff');
        this._onOffIndicator = <HTMLDivElement>this._DOM.querySelector('.btn.onoff_inner');

        this._audioContext = new (window.AudioContext || window.webkitAudioContext);

        //Array of oscillator configs
        this._tones = {
            0: { freq: 200, waveform: 'sine' },
            1: { freq: 300, waveform: 'sine' },
            2: { freq: 400, waveform: 'sine' },
            3: { freq: 500, waveform: 'sine' },
            4: { freq: 100, waveform: 'square' }
        }

        //bind events
        this._colourButtons.forEach(b => {
            b.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleClick(e);
            })
        })

        this._scoreCounter.innerText = '';

        this._strictButton.addEventListener('click', () => { this.toggleStrict() });
        this._startButton.addEventListener('click', () => { this.Start() });
        this._onOffSwitch.addEventListener('click', () => { this.toggleOnOff() });

        //State vars
        this.powerOn = false;
        this.gameActive = false;
        this.strict = false;
        this._cpuMoveArray = [];
        this._playerMoveArray = [];
    }

    private clearState() {
        this._cpuMoveArray = [];
        this._playerMoveArray = [];
        this._scoreCounter.innerText = '';
    }

    /** Turn strict mode on or off - set the LED */
    private toggleStrict() {

        if (!this.strict) {
            this.strict = true;
            this._strictLED.style.backgroundColor = 'red';
        } else {
            this.strict = false;
            this._strictLED.style.backgroundColor = '#400000';
        }
    }

    private Start() {

        //Power on - mid game reset
        if (this.gameActive && this.powerOn) {
            this.clearState();
            this.cpuMove(true);

            //Power on - game uninitialized
        } else if (this.powerOn && !this.gameActive) {
            this.gameActive = true;
            this.cpuMove(true);
        }
    }

    /** Turns the game on or off */
    private toggleOnOff() {
        if (this.powerOn) {
            this._onOffIndicator.classList.remove('on');
            this.clearState();
            clearInterval(this._playingSequence);
            this.gameActive = false;
            this.powerOn = false;
        } else {
            this._onOffIndicator.classList.add('on');
            this._scoreCounter.innerText = '--';
            this.gameActive = true;
            this.powerOn = true;
        }
    }


    /** Set the external move counter */
    private incrementCounter() {
        let i = this._cpuMoveArray.length;
        let num = '';
        if (i < 10) {
            num = '0' + i.toString();
        } else {
            num = i.toString();
        }

        this._scoreCounter.innerText = num;
    }

    /** Handle all button push effects */
    private pushButton(i: number) {

        this.playTone(i);
        this._colourButtons[i].classList.toggle('lit');

        setTimeout(() => {
            this._colourButtons[i].classList.toggle('lit')
        }, 500);

    }

    //Play a tone in the window audio context for 1 second
    private playTone(i: number) {
        let tone = this._tones[i]
        let o: OscillatorNode = this._audioContext.createOscillator();
        o.type = tone.waveform;
        o.frequency.value = tone.freq;
        o.connect(this._audioContext.destination);
        o.start(this._audioContext.currentTime);
        o.stop(this._audioContext.currentTime + .5);
    }

    /** Should wait 5 seconds then changes the turn to CPU **/
    private capturePlayerMoves() {

        return new Promise<number[]>((res, rej) => {
            setTimeout(() => {
                this.turn = 'cpu';
                res();
            }, 5000);
        })
    }

    /** Recursively pick new move, push it on the array, check for equality
     * @param increment - whether to add a new move to the stack or not - false repeats a turn 
    */
    private cpuMove(increment: boolean) {

        this.turn = 'cpu';

        if (increment) {
            let move = Math.floor(Math.random() * 4);
            this._cpuMoveArray.push(move);
            this.incrementCounter();
        }

        this.playCpuMoves().then(() => {
            this.turn = 'player'
            return this.capturePlayerMoves()
        }).then(() => {
            let match = this.playerMatchesCpu;

            //Player has 20 in a row correct
            if (match && this._playerMoveArray.length == 20) {
                this._scoreCounter.innerText = 'WIN';
                this.cpuMove(true);

                //Player matches so far..
            } else if (match) {
                this._playerMoveArray = [];
                this.cpuMove(true);

                //Strict mode is on - no match - reset
            } else if (this.strict && !match) {
                this._scoreCounter.innerText = '! !';
                this.playTone(4);
                setTimeout(() => {
                    this.clearState();
                    this.Start()
                }, 1000);

                // No Match - no strict - reset
            } else {
                this._playerMoveArray = [];
                this.cpuMove(false);
            }
        })

    }

    /** Run through the CPU move combo and play sounds */
    private playCpuMoves() {

        if (this.powerOn && this.gameActive) {
            var i = 0;

            return new Promise((res, rej) => {

                this._playingSequence = setInterval(() => {
                    this.pushButton(this._cpuMoveArray[i])
                    i++;
                    if (i == this._cpuMoveArray.length) {
                        clearInterval(this._playingSequence);
                        res();
                    }
                }, 1000)
            })
        }
    }


    /** Checks whether the player move array matches the CPU move array */
    get playerMatchesCpu() {

        if (this._cpuMoveArray.length != this._playerMoveArray.length) {
            return false;
        }

        for (let i = 0; i < this._cpuMoveArray.length; i++) {
            if (this._cpuMoveArray[i] != this._playerMoveArray[i]) {
                return false
            }
        }

        return true;
    }

    /** Handle a click on one of the main color buttons */
    private handleClick(e: MouseEvent) {
        if (this.gameActive && this.turn == 'player') {

            //Get the element 
            let el = (<HTMLDivElement>e.target)
            let id = parseInt(el.dataset.idx);
            this._playerMoveArray.push(id);
            this.pushButton(id);
        } else {
            e.preventDefault();
        }
    }

}

function main() {
    let gui = <HTMLDivElement>document.querySelector('#simon')
    window.game = new Simon(gui);
}
document.addEventListener('DOMContentLoaded', main, false);