
class Pomodoro {

    private domdisplay: HTMLElement;
    private __pause: boolean;
    private __duration: number;
    private __breakduration: number;
    private alert: HTMLAudioElement;
    
    /** Create a pomodoro clock 
     * @param dur sets the pomodoro session duration (minutes)
     * @param breakdur sets the break duration (minutes)
    */
    constructor(dur: number, breakdur: number) {
        this.domdisplay = <HTMLDivElement>document.querySelector('#clock');
        this.__duration = dur * 60;
        this.alert = document.createElement('audio');
        this.alert.src = 'https://www.freesound.org/data/previews/342/342729_3229207-lq.mp3';
    }

    tick() {
        this.__duration -= 1;
        this.domdisplay.innerHTML = this.timeToString(this.__duration);
        if (!this.paused) {
            setTimeout(() => this.tick(), 1000);
        }
    }

    pause() {
        this.__pause = true;
    }

    get remaining() {
        return this.__duration;
    }

    set duration(s: number) {
        this.__duration = s;
    }

    get paused() {
        return this.__pause;
    }
    private timeToString(d) {
        return `${Math.floor(d / 60)}:${d % 60}`
    }
}

function init() {
    let clock = new Pomodoro(25, 5);

    clock.tick();
}

document.addEventListener('DOMContentLoaded', init, false);

