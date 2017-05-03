
class Pomodoro {

    private clockFace: HTMLElement;
    private settings: HTMLElement;
    private playButton: HTMLElement;
    private resetButton: HTMLElement;
    private breakTimeDisplay: HTMLDivElement;
    private playTimeDisplay: HTMLDivElement;
    private playDuration: number;
    private breakDuration: number;
    private sessionDurationCtrl: HTMLDivElement;
    private breakDurationCtrl: HTMLDivElement;
    private state: 'play' | 'paused' | 'stopped' | 'break';
    private __playRemaining: number;
    private __breakRemaining: number;
    private alert: HTMLAudioElement;
    private currentTimer: any;

    /** Create a pomodoro clock 
     * @param dur sets the pomodoro session duration (minutes)
     * @param breakdur sets the break duration (minutes)
    */
    constructor(dur: number, breakdur: number) {

        this.playDuration = dur;
        this.breakDuration = breakdur;
        this.__playRemaining = dur * 60;
        this.__breakRemaining = breakdur * 60;

        this.clockFace = <HTMLDivElement>document.querySelector('#clockface');

        this.settings = <HTMLDivElement>document.querySelector('#settings');
        this.sessionDurationCtrl = <HTMLDivElement>this.settings.querySelector('#sessionduration');
        this.breakDurationCtrl = <HTMLDivElement>this.settings.querySelector('#breakduration');

        this.playTimeDisplay = <HTMLDivElement>this.sessionDurationCtrl.querySelector('.val');
        this.breakTimeDisplay = <HTMLDivElement>this.breakDurationCtrl.querySelector('.val');

        // Bind the session duration control buttons
        (<HTMLDivElement>this.sessionDurationCtrl.querySelector('#sessionminus')).onclick = () => { this.sessionSubtract() };
        (<HTMLDivElement>this.sessionDurationCtrl.querySelector('#sessionplus')).onclick = () => { this.sessionAdd() };

        //Bind the pause duration control buttons
        (<HTMLDivElement>this.breakDurationCtrl.querySelector('#pauseminus')).onclick = () => { this.breakSubtract() };
        (<HTMLDivElement>this.breakDurationCtrl.querySelector('#pauseplus')).onclick = () => { this.breakAdd() };

        this.resetButton = <HTMLElement>document.querySelector('#reset');
        this.playButton = <HTMLElement>document.querySelector('#play');

        this.state = 'stopped';
        this.playButton.onclick = () => this.playPause();
        this.resetButton.onclick = () => this.reset();
        this.currentTimer = undefined;

        this.setTime(this.timeToString(this.__playRemaining));
        this.breakTimeDisplay.innerHTML = breakdur.toString();
        this.playTimeDisplay.innerHTML = dur.toString();

        this.alert = document.createElement('audio');
        this.alert.src = 'https://www.freesound.org/data/previews/342/342729_3229207-lq.mp3';
    }

    tick() {
        if (this.state == 'play') {

            if (this.__playRemaining == 0) {
                this.buzz();
                this.resetPlayTimer();
                this.state = 'break';
            }

            this.__playRemaining -= 1;
            this.setTime(this.timeToString(this.__playRemaining));
        }

        if (this.state == 'break') {

            if (this.__breakRemaining == 0) {
                this.resetBreakTimer();
                this.state = 'play';
            }

            this.__breakRemaining -= 1;
            this.setTime(this.timeToString(this.__breakRemaining));
        }

    }

    playPause() {
        this.state == 'play' ? this.pause() : this.play();
    }

    reset() {
        this.stop();
        this.resetPlayTimer();
        this.resetBreakTimer();
        this.playButton.querySelector('i').innerText = 'play_arrow';
        this.setTime(this.timeToString(this.__playRemaining));
    }

    private play() {
        this.state = 'play';
        this.playButton.querySelector('i').innerText = 'pause';
        this.currentTimer = setInterval(() => this.tick(), 1000);
    }

    private pause() {
        this.state = 'paused';
        this.playButton.querySelector('i').innerText = 'play_arrow';
        clearInterval(this.currentTimer);
    }

    private stop() {
        this.state = 'stopped';
        clearInterval(this.currentTimer);
    }

    /** Make a buzz noise */
    buzz() {
        this.alert.play();
    }

    sessionAdd() {
        this.playDuration += 1;
        this.updatePlayDurationDisplay();

        if (this.state == 'stopped') {
            this.__playRemaining = this.playDuration * 60;
            this.setTime(this.timeToString(this.__playRemaining));
        }
    }

    sessionSubtract() {
        this.playDuration -= 1;
        this.updatePlayDurationDisplay();

        if (this.state == 'stopped') {
            this.__playRemaining = this.playDuration * 60;
            this.setTime(this.timeToString(this.__playRemaining));
        }
    }

    breakAdd() {
        this.breakDuration += 1;
        this.updatePauseDurationDisplay();
    }

    breakSubtract() {
        this.breakDuration -= 1;
        this.updatePauseDurationDisplay();
    }

    get playRemaining() {
        return this.__playRemaining;
    }

    get breakRemaining() {
        return this.__breakRemaining;
    }

    private updatePlayDurationDisplay() {
        this.playTimeDisplay.innerHTML = this.playDuration.toString();
    }

    private updatePauseDurationDisplay() {
        this.breakTimeDisplay.innerHTML = this.breakDuration.toString();
    }

    private setTime(t: string) {
        this.clockFace.innerHTML = t;
    }

    private timeToString(d) {
        let secs = d % 60 < 10 ? '0' + d % 60 : d % 60;
        return `${Math.floor(d / 60)}:${secs}`
    }

    private resetPlayTimer() {
        this.__playRemaining = this.playDuration * 60;
    }

    private resetBreakTimer() {
        this.__breakRemaining = this.breakDuration * 60;
    }
}

function init() {
    let clock = new Pomodoro(1, 1);

    clock.tick();
}

document.addEventListener('DOMContentLoaded', init, false);

