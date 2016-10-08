var Pomodoro = (function () {
    function Pomodoro(dur) {
        this.domdisplay = document.querySelector('#clock');
        this.__duration = dur * 60;
    }
    Pomodoro.prototype.tick = function () {
        var _this = this;
        this.__duration -= 1;
        this.domdisplay.innerHTML = this.timeToString(this.__duration);
        setTimeout(function () { return _this.tick(); }, 1000);
    };
    Pomodoro.prototype.pause = function () {
        this.__pause = true;
    };
    Object.defineProperty(Pomodoro.prototype, "remaining", {
        get: function () {
            return this.__duration;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Pomodoro.prototype, "duration", {
        set: function (s) {
            this.__duration = s;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Pomodoro.prototype, "paused", {
        get: function () {
            return this.__pause;
        },
        enumerable: true,
        configurable: true
    });
    Pomodoro.prototype.timeToString = function (d) {
        return Math.floor(d / 60) + ":" + d % 60;
    };
    return Pomodoro;
})();
function init() {
    var clock = new Pomodoro(25);
    clock.tick();
}
document.addEventListener('DOMContentLoaded', init, false);
