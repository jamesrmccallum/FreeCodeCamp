var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define("models/gridModel", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /** Implementation of an (x,y) Vector */
    var Vector = (function () {
        function Vector(x, y) {
            this.x = x;
            this.y = y;
            this.x = x;
            this.y = y;
        }
        Vector.prototype.move = function (v) {
            return new Vector(this.x + v.x, this.y + v.y);
        };
        /**Return a new Vector which represents the old plus the new */
        Vector.prototype.plus = function (other) {
            return new Vector(this.x + other.x, this.y + other.y);
        };
        return Vector;
    }());
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
    var Grid = (function () {
        function Grid(gridMap) {
            this.space = gridMap;
            this._width = this.space[0].length;
            this._height = gridMap.length;
        }
        /** Tests whether a given vector is inside the grid bounds */
        Grid.prototype.isInside = function (vector) {
            return vector.x >= 0 && vector.x < this._width &&
                vector.y >= 0 && vector.y < this._height;
        };
        /** Get the value at a given Vector */
        Grid.prototype.get = function (vector) {
            var v = this.space[vector.y][vector.x];
            if (!v) {
                return null;
            }
            else {
                return v;
            }
        };
        /** Turns a cell address into a vector  */
        Grid.prototype.cellToVector = function (i) {
            var y = i / this._width;
            var x = this._width % y;
            return new Vector(x, y);
        };
        Grid.prototype.set = function (i, value) {
            var v = this.cellToVector(i);
            this.space[v.y][v.x] = value;
        };
        Grid.prototype.asArray = function () {
            return this.space;
        };
        /** Returns the value of all cells surrounding
         * a given address, assuming they're in the grid
         * returns null if not*/
        Grid.prototype.getSurrounding = function (i, j) {
            var _this = this;
            var v = new Vector(j, i);
            return directions.map(function (a) {
                var newVec = v.plus(a);
                return _this.isInside(newVec) ? _this.get(newVec) : null;
            });
        };
        Grid.prototype.forEach = function (f, context) {
            for (var y = 0; y < this._height; y++) {
                for (var x = 0; x < this._width; x++) {
                    var value = this.space[x + y * this._width];
                    if (value !== null) {
                        f.call(context, value, new Vector(x, y));
                    }
                }
            }
        };
        Object.defineProperty(Grid.prototype, "width", {
            get: function () {
                return this._width;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Grid.prototype, "height", {
            get: function () {
                return this._height;
            },
            enumerable: true,
            configurable: true
        });
        return Grid;
    }());
    exports.Grid = Grid;
});
define("components/cell", ["require", "exports", "react"], function (require, exports, React) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Cell = (function (_super) {
        __extends(Cell, _super);
        function Cell(props) {
            return _super.call(this, props) || this;
        }
        Cell.prototype.render = function () {
            var classNameMap = {
                "": "dead",
                "x": "new",
                "y": "old"
            };
            var classNames = "cell " + classNameMap[this.props.cellState];
            return React.createElement("div", { className: classNames });
        };
        return Cell;
    }(React.Component));
    exports.Cell = Cell;
});
define("components/row", ["require", "exports", "react", "components/cell"], function (require, exports, React, cell_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Row = (function (_super) {
        __extends(Row, _super);
        function Row(props) {
            return _super.call(this, props) || this;
        }
        Row.prototype.render = function () {
            var cells = this.props.children.map(function (c, i) {
                return React.createElement(cell_1.Cell, { cellState: c });
            });
            return React.createElement("div", { className: 'row' }, cells);
        };
        return Row;
    }(React.Component));
    exports.Row = Row;
});
define("assets/gridMaps", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.grid1 = [',,,x,,,,,x,,,,x,,,x,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,',
        ',x,,x,,x,,,,x,,x,,x,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,',
        ',,,x,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,',
        ',,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,',
        ',,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,',
        ',,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,',
        ',,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,',
        ',,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,',
        ',,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,',
        ',,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,',
        ',,,,,,,,,,,,,,x,,x,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,',
        ',,,,,,,,,,,,,,,x,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,',
        ',,,,,,,,,,,,,,x,,x,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,',
        ',,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,',
        ',,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,',
        ',,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,',
        ',,,,,,,,,,,,,,,,,,,,,,,,,,,x,x,x,x,,,,,,,,,,,,,,,,,,,',
        ',,,,,,,,,,,,,,,,,,,,,,,,,,,x,,,x,,,,,,,,,,,,,,,,,,,',
        ',,,,,,,,,,,,,,,,,,,,,,,,,,,x,,,x,,,,,,,,,,,,,,,,,,,',
        ',,,,,,,,,,,,,,,,,,,,,,,,,,,x,,,x,,,,,,,,,,,,,,,,,,,',
        ',,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,',
        ',,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,x,x,x,x,x,,,,,,,',
        ',,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,x,,,x,,,,,,,,',
        ',,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,x,,x,x,,,,,,,,',
        ',,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,x,,,,,,,,,,,',
        ',,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,x,x,x,x,x,x,x,,,,,,,,,,',
        ',,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,x,,,x,,,x,,,,,,,,,,',
        ',,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,',
        ',,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,',
        ',,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,'];
});
define("components/board", ["require", "exports", "react", "models/gridModel", "components/row", "assets/gridMaps"], function (require, exports, React, gridModel_1, row_1, gridMaps_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Board = (function (_super) {
        __extends(Board, _super);
        function Board(props) {
            var _this = _super.call(this, props) || this;
            _this.turn = function () {
                var cpyGrid = _this.state.grid.asArray();
                // 2 dimensional loop
                for (var i = 0; i < cpyGrid.length; i++) {
                    for (var j = 0; j < cpyGrid[0].length; j++) {
                        var surroundingCells = _this.state.grid.getSurrounding(i, j);
                        var cell = cpyGrid[i][j];
                        var live = surroundingCells.filter(function (a) { return a === 'x' || 'y'; });
                        //Kill Live Cells
                        if (live.length < 2 || live.length > 3) {
                            cell = '';
                        }
                        //Age New cells
                        if (cell === 'x') {
                            cell = 'y';
                        }
                        //Resurrect Dead Cells
                        if (cell === '' && live.length === 3) {
                            cell = 'x';
                        }
                    }
                }
                var newGrid = new gridModel_1.Grid(cpyGrid);
                _this.setState({
                    grid: newGrid
                });
            };
            var g = gridMaps_1.grid1.map(function (a) { return a.split(''); });
            _this.state = {
                grid: new gridModel_1.Grid(g)
            };
            return _this;
        }
        Board.prototype.componentDidMount = function () {
            this.interval = setInterval(this.turn, 1000);
        };
        Board.prototype.componentWillUnmount = function () {
            clearInterval(this.interval);
        };
        Board.prototype.render = function () {
            var g = this.state.grid.asArray();
            var width = this.state.grid.width;
            var rows = [];
            for (var i = 0; i < g.length; i + width) {
                rows.push(g[i]);
            }
            return React.createElement("div", { id: "board", className: "" }, rows.map(function (r) {
                return React.createElement(row_1.Row, { className: 'row', children: r });
            }));
        };
        return Board;
    }(React.Component));
    exports.Board = Board;
});
define("index", ["require", "exports", "react", "react-dom", "components/board"], function (require, exports, React, ReactDOM, board_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var App = function () { return React.createElement(board_1.Board, null); };
    ReactDOM.render(React.createElement(App, null), document.getElementById('appRoot'));
});
