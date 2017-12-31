/** Implementation of an (x,y) Vector */

export type Point = { x: number, y: number };

export class Vector {

    constructor(public x: number, public y: number) {
        this.x = x;
        this.y = y;
    }

    /**Return a new Vector which represents the old plus the new */
    plus(other: Vector) {
        return new Vector(
            this.x + other.x,
            this.y + other.y
        );
    }

    equals(other: Vector) {
        return this.x === other.x && this.y === other.y;
    }
}

export var keyDirections: { [n: number]: Vector } = {
    38: new Vector(0, -1),
    37: new Vector(-1, 0),
    39: new Vector(1, 0),
    40: new Vector(0, 1)
};

/** Polygon representing a room 
 * Originates at the bottom left  
*/
export class Room {

    private _x1: number;
    private _x2: number;
    private _y1: number;
    private _y2: number;

    private _height: number;
    private _width: number;
    private _origin: Point;
    private _center: Point;

    constructor(origin: Point, height: number, width: number) {
        this._x1 = origin.x;
        this._x2 = origin.x + width;
        this._y1 = origin.y;
        this._y2 = origin.y + height;
        this._height = height;
        this._width = width;
        this._origin = origin;

        this._center = {
            x: Math.floor(this._x1 + (width / 2)),
            y: Math.floor(this._y1 + (height / 2))
        };
    }

    intersects(room: Room) {
        return (this.x1 <= room._x2 &&
            this._x2 >= room.x1 &&
            this._y1 <= room._y2 &&
            room._y2 >= room._y1);
    }

    pointIsInside(point: Point) {
        return (point.x >= this.x1 && point.x <= this._x2)
            && (point.y >= this._y1 && point.y <= this._y2);
    }

    getRandomPoint(){
        return {
            x: Math.ceil(this._x1 + (Math.random() * this._width)),
            y: Math.ceil(this._y1 + (Math.random() * this._height))
        };
    }

    print(){
        return `x: ${this.x1} - ${this.x2}; y: ${this._y1} - ${this._y2}`;
    }

    get center() {
        return this._center;
    }

    get origin() {
        return this._origin;
    }

    get height() {
        return this._height;
    }

    get width() {
        return this._width;
    }

    get x1() {
        return this._x1;
    }

    get x2() {
        return this._x2;
    }

    get y1() {
        return this._y1;
    }

    get y2() {
        return this._y2;
    }
}
