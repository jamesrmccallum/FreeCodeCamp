var Pomodoro = (function () {
    /** Create a pomodoro clock
     * @param dur sets the pomodoro session duration (minutes)
     * @param breakdur sets the break duration (minutes)
    */
    function Pomodoro(dur, breakdur) {
        var _this = this;
        this.playDuration = dur;
        this.breakDuration = breakdur;
        this.__playRemaining = dur * 60;
        this.__breakRemaining = breakdur * 60;
        this.clockFace = document.querySelector('#clockface');
        this.settings = document.querySelector('#settings');
        this.sessionDurationCtrl = this.settings.querySelector('#sessionduration');
        this.breakDurationCtrl = this.settings.querySelector('#breakduration');
        this.playTimeDisplay = this.sessionDurationCtrl.querySelector('.val');
        this.breakTimeDisplay = this.breakDurationCtrl.querySelector('.val');
        // Bind the session duration control buttons
        this.sessionDurationCtrl.querySelector('#sessionminus').onclick = function () { _this.sessionSubtract(); };
        this.sessionDurationCtrl.querySelector('#sessionplus').onclick = function () { _this.sessionAdd(); };
        //Bind the pause duration control buttons
        this.breakDurationCtrl.querySelector('#pauseminus').onclick = function () { _this.breakSubtract(); };
        this.breakDurationCtrl.querySelector('#pauseplus').onclick = function () { _this.breakAdd(); };
        this.resetButton = document.querySelector('#reset');
        this.playButton = document.querySelector('#play');
        this.state = 'stopped';
        this.playButton.onclick = function () { return _this.playPause(); };
        this.resetButton.onclick = function () { return _this.reset(); };
        this.currentTimer = undefined;
        this.setTime(this.timeToString(this.__playRemaining));
        this.breakTimeDisplay.innerHTML = breakdur.toString();
        this.playTimeDisplay.innerHTML = dur.toString();
        this.alert = document.createElement('audio');
        this.alert.src = 'https://www.freesound.org/data/previews/342/342729_3229207-lq.mp3';
    }
    Pomodoro.prototype.tick = function () {
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
    };
    Pomodoro.prototype.playPause = function () {
        this.state == 'play' ? this.pause() : this.play();
    };
    Pomodoro.prototype.reset = function () {
        this.stop();
        this.resetPlayTimer();
        this.resetBreakTimer();
        this.playButton.querySelector('i').innerText = 'play_arrow';
        this.setTime(this.timeToString(this.__playRemaining));
    };
    Pomodoro.prototype.play = function () {
        var _this = this;
        this.state = 'play';
        this.playButton.querySelector('i').innerText = 'pause';
        this.currentTimer = setInterval(function () { return _this.tick(); }, 1000);
    };
    Pomodoro.prototype.pause = function () {
        this.state = 'paused';
        this.playButton.querySelector('i').innerText = 'play_arrow';
        clearInterval(this.currentTimer);
    };
    Pomodoro.prototype.stop = function () {
        this.state = 'stopped';
        clearInterval(this.currentTimer);
    };
    /** Make a buzz noise */
    Pomodoro.prototype.buzz = function () {
        this.alert.play();
    };
    Pomodoro.prototype.sessionAdd = function () {
        this.playDuration += 1;
        this.updatePlayDurationDisplay();
        if (this.state == 'stopped') {
            this.__playRemaining = this.playDuration * 60;
            this.setTime(this.timeToString(this.__playRemaining));
        }
    };
    Pomodoro.prototype.sessionSubtract = function () {
        this.playDuration -= 1;
        this.updatePlayDurationDisplay();
        if (this.state == 'stopped') {
            this.__playRemaining = this.playDuration * 60;
            this.setTime(this.timeToString(this.__playRemaining));
        }
    };
    Pomodoro.prototype.breakAdd = function () {
        this.breakDuration += 1;
        this.updatePauseDurationDisplay();
    };
    Pomodoro.prototype.breakSubtract = function () {
        this.breakDuration -= 1;
        this.updatePauseDurationDisplay();
    };
    Object.defineProperty(Pomodoro.prototype, "playRemaining", {
        get: function () {
            return this.__playRemaining;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Pomodoro.prototype, "breakRemaining", {
        get: function () {
            return this.__breakRemaining;
        },
        enumerable: true,
        configurable: true
    });
    Pomodoro.prototype.updatePlayDurationDisplay = function () {
        this.playTimeDisplay.innerHTML = this.playDuration.toString();
    };
    Pomodoro.prototype.updatePauseDurationDisplay = function () {
        this.breakTimeDisplay.innerHTML = this.breakDuration.toString();
    };
    Pomodoro.prototype.setTime = function (t) {
        this.clockFace.innerHTML = t;
    };
    Pomodoro.prototype.timeToString = function (d) {
        var secs = d % 60 < 10 ? '0' + d % 60 : d % 60;
        return Math.floor(d / 60) + ":" + secs;
    };
    Pomodoro.prototype.resetPlayTimer = function () {
        this.__playRemaining = this.playDuration * 60;
    };
    Pomodoro.prototype.resetBreakTimer = function () {
        this.__breakRemaining = this.breakDuration * 60;
    };
    return Pomodoro;
}());
function init() {
    var clock = new Pomodoro(1, 1);
    clock.tick();
}
document.addEventListener('DOMContentLoaded', init, false);
