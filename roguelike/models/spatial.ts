/** Implementation of an (x,y) Vector */
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

export var keyDirections: {[n:number]: Vector} = {
    38: new Vector(0,-1),
    37: new Vector(-1,0),
    39: new Vector(1,0),
    40: new Vector(0,1)
};