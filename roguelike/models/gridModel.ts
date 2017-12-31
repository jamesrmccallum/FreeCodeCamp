import { Vector } from './spatial';
import { WorldObject, charMap } from './actors';

export class Grid {

    private space: (WorldObject | undefined)[][];
    private _gridMap: string[][];
    private _player: WorldObject;

    constructor(gridMap: string[][], player: WorldObject) {

        if (gridMap.length !== gridMap[0].length) {
            throw new Error('GridMap is not square');
        }

        this._gridMap = gridMap;
        this._player = player;
        this.space = [];


        // The grid stores an array of worldobjects
        // We conditionally build those here
        for (let i = 0; i < gridMap.length; i++) {
            this.space.push([]);
            for (let j = 0; j < gridMap.length; j++) {
                let char = gridMap[i][j];
                if (char !== '.') {
                    let pos = new Vector(j, i);
                    if (char !== '@') {
                        let obj = new WorldObject(charMap[char], char);
                        obj.location = pos;
                        this.space[i].push(obj);
                    } else {
                        player.location = pos;
                        this.space[i].push(player);
                    }
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
        return this._player.location;
    }

    /** Both the objects and the grid hold their locations separately */
    setPlayerPos(newPos: Vector) {
        let player = this._player;
        this.clearSquare(this._player.location);
        this.setSquare(newPos, player);
        this._player.location = newPos;
    }

    clearSquare(v: Vector) {
        this.space[v.y][v.x] = undefined;
    }

    private setSquare(v: Vector, player: WorldObject) {
        this.space[v.y][v.x] = player;
    }

    /** Return a list of classes representing the world */
    asArray() {
        let ret: string[][] = [];
        for (let row = 0; row < this.space.length; row++) {
            let tmp = [];
            for (let col = 0; col < this.space.length; col++) {
                if (this.space[row][col]) {
                    tmp.push(this.space[row][col]!.class);
                } else {
                    tmp.push('');
                }
            }
            ret.push(tmp);
        }
        return ret;
    }

    getViewPort() {
        let pos = this.getPlayerPos();
        let xMin = Math.max(pos.x - 15, 0);
        let yMin = Math.max(pos.y - 15, 0);
        let xMax = Math.min(xMin+30, this._gridMap.length);
        let yMax = Math.min(yMin + 30, this._gridMap.length);

        let ret = [];
        for (var row = yMin; row < yMax; row++) {
            let tmp = [];
            for (var col = xMin; col < xMax; col++) {
                if (this.space[row][col]) {
                    tmp.push(this.space[row][col]!.class);
                } else {
                    tmp.push('');
                }

            }
            ret.push(tmp);
        }
        return ret;
    }
}