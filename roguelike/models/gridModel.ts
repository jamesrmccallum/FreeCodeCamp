import { Vector } from './spatial';
import { WorldObject } from './actors';

export class Grid {

    private space: (WorldObject | undefined)[][];
    private _playerPos: Vector;
    private _width: number;
    private _height: number;

    constructor(gridMap: string) {

        let arrGrid = gridMap
            .split('\n')
            .map(a => a.split(','));

        this.space = [];
        this._height = 50;
        this._width = 50;

        for (let i = 0; i < this._width; i++) {
            this.space.push([]);
            for (let j = 0; j < this._height; j++) {
                let char = arrGrid[i][j];
                if (char !== '.') {
                    let pos = new Vector(j, i);
                    let obj = new WorldObject(pos, char);
                    if (char === '@') { this._playerPos = pos; }
                    this.space[i].push(obj);
                } else {
                    this.space[i].push(undefined);
                }
            }
        }
    }

    /** Get the character at (x,y) */
    getCharAt(v: Vector) {
        return this.space[v.y][v.x];
    }

    /** Get the player position in an (x,y) pair */
    getPlayerPos() {
        return this._playerPos;
    }


    /** Move the player around */
    setPlayerPos(pos: Vector) {
        let player = this.getCharAt(this._playerPos);
        this.clearSquare(this._playerPos);
        this.setSquare(pos, player!);
        this._playerPos = pos;
    }

    clearSquare(v: Vector) {
        this.space[v.y][v.x] = undefined;
    }

    private setSquare(v: Vector, player: WorldObject) {
        this.space[v.y][v.x] = player;
    }

    /** Return a stringified version of the world */
    asArray() {
        let ret: string[][] = [];
        for (let i = 0; i < this._height; i++) {
            ret.push([]);
            for (let j = 0; j < this._width; j++) {
                if (this.space[i][j]) {
                    ret[i].push(this.space[i][j]!.getKind());
                } else {
                    ret[i].push('');
                }
            }
        }

        return ret;
    }
}