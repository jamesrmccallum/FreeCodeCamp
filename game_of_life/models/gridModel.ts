/** Implementation of an (x,y) Vector */
class Vector {

    constructor(public x: number, public y: number) {
        this.x = x;
        this.y = y;
    }

    move(v) {
        return new Vector(
            this.x + v.x,
            this.y + v.y
        );
    }
    /**Return a new Vector which represents the old plus the new */
    plus(other) {
        return new Vector(
            this.x + other.x,
            this.y + other.y
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

export type gridVal = ('x' | 'y' | 'z'| '.');

export type GridOpts = {
    height?: number,
    width?: number,
    populated?: boolean,
    grid?: gridVal[][];
};

export class Grid {

    private _height: number;
    private _width: number;
    private _grid: gridVal[][];

    // Can either construct a new grid from the dimensions given
    // OR assemble a grid from a given 2d string array
    constructor(opts: GridOpts) {

        if (opts.grid) {
            this._grid = opts.grid;
        } else {


            this._grid = [];

            for (var i = 0; i < opts.height; i++) {
                let tmp: gridVal[] = [];
                for (var j = 0; j < opts.width; j++) {

                    // We want to randomly generate a grid
                    if (opts.populated) {
                        let r = Math.random();

                        if (r <= .95) {
                            tmp.push('.');
                        } else {
                            tmp.push('x');
                        }
                    } else {
                        tmp.push('.');
                    }
                }
                this._grid.push(tmp);

            }
            this._height = opts.height;
            this._width = opts.width;
        }
    }

    loadgrid(grid: gridVal[][]) {
        this._grid = grid;
    }

    getSurrounding(x, y) {

        let cell = new Vector(x, y);
        let found = [];
        for (let i = 0; i < directions.length; i++) {
            let n = cell.plus(directions[i]);
            found.push(this.getCell(n.x, n.y));
        }

        return found;
    }

    getCell(x: number, y: number) {

        if (x > this._width || x < 0 || y > this._height || y < 0) {
            return null;
        } else {
            return this._grid[x][y];
        }
    }

    setCell(x, y, val) {
        this._grid[x][y] = val;
    }

    asArray() {
        let cpy: gridVal[][] = [];

        for (let i = 0; i < this._grid.length; i++) {
            cpy.push(this._grid[i].slice());
        }

        return cpy;

    }

    get width() {
        return this._width;
    }

    get height() {
        return this._height;
    }
}