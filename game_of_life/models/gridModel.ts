interface Lengthwise {
    length: number;
}

/** Implementation of an (x,y) Vector */
class Vector {

    constructor(public x: number, public y: number) {
        this.x = x;
        this.y = y;
    }

    move(v: Vector) {
        return new Vector(
            this.x + v.x,
            this.y + v.y
        );
    }
    /**Return a new Vector which represents the old plus the new */
    plus(other: Vector) {
        return new Vector(
            this.x + other.x,
            this.y + other.y
        );
    }

    times(factor: number) {
        return new Vector(
            this.x * factor,
            this.y * factor
        );
    }
}


var directions = [
    new Vector(0, -1),
    new Vector(1, -1),
    new Vector(1, 0),
    new Vector(1, 1),
    new Vector(0, 1),
    new Vector(-1, 1),
    new Vector(-1, 0),
    new Vector(-1, -1)
];


export class Grid<T extends Lengthwise> {
    private space: T[];
    private _width: number;
    private _height: number;

    constructor(map: T[]) {
        this.space = map;
        this._width = map[0].length;
        this._height = map.length / map[0].length;
    }

    /** Tests whether a given vector is inside the grid bounds */
    private isInside(vector: Vector) {
        return vector.x >= 0 && vector.x < this._width &&
            vector.y >= 0 && vector.y < this._height;
    }

    /** Get the value at a given Vector */
    private get(vector: Vector): T {
        let v = this.space[vector.x + (this._width * vector.y)];
        if (!v) {
            return null;
        } else {
            return v;
        }
    }

    private cellToVector(i: number) {
        let y = i / this._width;
        let x = this._width % y;
        return new Vector(x, y);
    }

    public set(i: number, value: T) {
        let v = this.cellToVector(i);
        this.space[v.x + (this._width * v.y)] = value;
    }

    public asArray(){
        return this.space;
    }

    /** Returns the value of all cells surrounding 
     * a given address, assuming they're in the grid 
     * returns null if not*/
    public getSurrounding(i: number) {

        let v = this.cellToVector(i);

        return directions.map(a => {
            let newVec = v.plus(a);
            return this.isInside(newVec) ? this.get(newVec) : null;
        })
    }

    forEach(f: Function, context) {

        for (var y = 0; y < this._height; y++) {
            for (var x = 0; x < this._width; x++) {
                var value = this.space[x + y * this._width];
                if (value != null)
                    f.call(context, value, new Vector(x, y));
            }
        }
    }

    get width() {
        return this._width;
    }

    get height() {
        return this._height
    }
}

export interface IGrid<T extends Lengthwise> extends Grid<T>{}