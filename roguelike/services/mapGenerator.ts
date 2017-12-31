import { Room, Point } from '../models/spatial';

/** Returns a grid - always square
 * @param width How many squares wide the grid will be (height will be the same)
 * 
*/
export class MapGenerator {

    private rooms: Array<Room>;
    private _grid: string[][];
    private _width: number;
    private _height: number;
    private _charList: string[];

    /** 
     * Generate a NxN map for the given parameters
     * @param width The width of the grid
     * @param height The height of the grid
     * @param noRooms # of rooms to carve out
    */
    constructor(width: number, height: number, noRooms: number,
        maxRoomWidth: number, maxRoomHeight: number, charList: string[]) {
        this.rooms = [];
        this._grid = [];
        this._width = width;
        this._height = height;
        this._charList = charList;

        // Create the space 
        for (var row = 0; row < this._height; row++) {
            let tmpRow = [];
            for (var col = 0; col < this._width; col++) {
                tmpRow.push('x');
            }
            this._grid.push(tmpRow);
        }

        // Generate some rooms
        let currCenter = undefined;
        let prevCenter = undefined;
        let roomIdx = 0;
        while (roomIdx < noRooms) {

            let tmpHeight = Math.ceil(Math.random() * maxRoomHeight);
            let tmpWidth = Math.ceil(Math.random() * maxRoomWidth);
            let origin: Point = {
                x: Math.ceil(Math.random() * this._width),
                y: Math.ceil(Math.random() * this._height)
            };

            let tmpRoom = new Room(origin, tmpHeight, tmpWidth);
            let push = true;

            // Room doesn't spill out of grid 
            push = !(tmpRoom.y1 <= 0 || tmpRoom.y2 >= this._height - 1 ||
                tmpRoom.x1 <= 0 || tmpRoom.x2 >= this._width - 1);

            // Room doesn't intersect another room
            if (push) {
                for (let room of this.rooms) {
                    if (tmpRoom.intersects(room)) {
                        push = false;
                    }
                }
            }

            if (push) {
                this.rooms.push(tmpRoom);

                // Connect rooms with tunnels
                if (roomIdx > 1) {
                    currCenter = tmpRoom.center;
                    prevCenter = this.rooms[roomIdx - 1].center;
                    this.tunnel(prevCenter, currCenter);
                }
                roomIdx += 1;
            }
        }

        // Carve out the rooms
        for (let room of this.rooms) {
            this.hollowRoom(room);
        }

        //Randomly place player 
        let point = this.rooms[Math.ceil(Math.random() * this.rooms.length-1)].center;
        this._grid[point.y][point.x] = '@';

        // Fill out the characters 
        for (let char of this._charList) {
            let point = this.rooms[Math.ceil(Math.random() * (this.rooms.length-1))].getRandomPoint();
            this._grid[point.y][point.x] = char;
        }
    }

    /** To tunnel we either go across or down in 3 steps 
     * Tunnel 1 way from {from, to}
     * store the midway
     * tunnel from {midway, to}
    */
    tunnel(from: Point, to: Point) {

        if (Math.random() <= .5) {
            // The midway is x done, y not
            let midway = { x: to.x, y: from.y };
            this.hCorridoor(from, to); // X 
            this.vCorridoor(midway, to);
        } else {
            let midway = { x: from.x, y: to.y };
            this.vCorridoor(from, to);
            this.hCorridoor(midway, to);
        }
    }

    hollowRoom(room: Room) {
        for (var row = room.y1; row <= room.y2; row++) {
            for (var col = room.x1; col <= room.x2; col++) {
                this._grid[row][col] = '.';
            }
        }
    }

    /** A to B along x
     * (forward only so flip points if needed) 
     **/
    hCorridoor(from: Point, to: Point) {
        if (from.x > to.x) {
            [to, from] = [from, to];
        }
        let row = from.y;
        for (var col = from.x; col <= to.x; col++) {
            this._grid[row][col] = '.';
        }
    }

    /** A to B down Y */
    vCorridoor(from: Point, to: Point) {
        if (from.y > to.y) {
            [to, from] = [from, to];
        }
        let col = from.x;
        for (var row = from.y; row <= to.y; row++) {
            this._grid[row][col] = '.';
        }
    }

    toString() {
        return this._grid;
    }

    debugPrint() {

        console.log(` ${this._grid[0].map((a, i) => i).join('')}`);
        for (let i = 0; i < this._height; i++) {
            console.log(`${zeroPad(i)} ${this._grid[i].join('')}`);
        }

        function zeroPad(n: number) {
            return n < 10 ? `0${n}` : `${n}`;
        }

    }
}