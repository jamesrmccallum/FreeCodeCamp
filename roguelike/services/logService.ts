
export class LogService {

    private _queue: string[] = [];

    constructor() {
        this._queue = [];
    }

    add(msg: string) {
        let tmp = [];
        if (this._queue.length > 20) {
            tmp = this._queue.slice(1, this._queue.length - 1);
        } else {
            tmp = this._queue.slice();
        }

        tmp.push(msg);
        this._queue = tmp;
        return this;
    }

    read() {
        return this._queue;
    }

    clear() {
        this._queue = [];
        return this;
    }
}