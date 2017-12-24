import { Vector } from './spatial';
import { WorldObject, charMap} from './actors';

export class Grid {

    private space: (WorldObject | undefined)[][];
    private _width: number;
    private _height: number;
    private _player: WorldObject;

    constructor(gridMap: string, player: WorldObject) {

        let arrGrid = gridMap
            .split('\n')
            .map(a => a.split(','));

        this._player = player;
        this.space = [];
        this._height = 50;
        this._width = 50;

        for (let i = 0; i < this._width; i++) {
            this.space.push([]);
            for (let j = 0; j < this._height; j++) {
                let char = arrGrid[i][j];
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

    /** Return a stringified version of the world */
    asArray() {
        let ret: string[][] = [];
        for (let i = 0; i < this._height; i++) {
            ret.push([]);
            for (let j = 0; j < this._width; j++) {
                if (this.space[i][j]) {
                    ret[i].push(this.space[i][j]!.class);
                } else {
                    ret[i].push('');
                }
            }
        }

        return ret;
    }
}