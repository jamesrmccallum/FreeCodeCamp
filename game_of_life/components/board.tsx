import * as React from 'react';
import { Grid, gridVal } from '../models/gridModel';
import { Row } from './row';
import { SpeedControl } from './speedControl';
import { PlayControl } from './playControl';

type cellState = 'x' | 'y' | '';

interface BoardProps extends React.HTMLProps<HTMLDivElement> {
}

interface BoardState {
    grid: Grid;
    generation: number;
    playing: boolean;
    speed: number;
}

export class Board extends React.Component<BoardProps, BoardState> {

    interval: number;
    speed: number;

    constructor(props: BoardProps) {
        super(props);

        this.state = {
            grid: new Grid({ width: 50, height: 50, populated: true }),
            generation: 0,
            playing: true,
            speed: 1000
        };
    }

    setSpeed = (speed: number) => {
        console.log('speed changed');
        this.setState({
            speed: speed
        });
    }

    cellClick = (e: React.MouseEvent<HTMLDivElement>) => {

        let _grid = this.state.grid.asArray();
        let x = +(e.target as HTMLDivElement).id;
        let y = +(e.target as HTMLDivElement).parentElement.id;

        if (_grid[y][x] === '.') {
            _grid[y][x] = 'x';
        } else {
            _grid[y][x] = '.';
        }

        this.setState({
            grid: new Grid({ grid: _grid })
        });

    }

    setPlayState = (playing: boolean) => {

        if (playing !== this.state.playing) {
            this.setState({
                playing: playing
            });
        }
    }

    clear = () => {

        this.setState({
            grid: new Grid({ width: 50, height: 50, populated: false }),
            generation: 0,
            playing: false,
            speed: 1000
        });
    }

    turn = () => {

        if (this.state.playing) {

            let cpyGrid = this.state.grid.asArray();

            // 2 dimensional loop
            for (let i = 0; i < cpyGrid.length - 1; i++) {
                for (let j = 0; j < cpyGrid[0].length - 1; j++) {

                    let surroundingCells = this.state.grid.getSurrounding(i, j);

                    let cell = cpyGrid[i][j];
                    let live = surroundingCells.filter(a => a === 'x' || a === 'y' || a === 'z');
                    let newVal: gridVal = '.';

                    //Kill Live Cells
                    if (live.length < 2 || live.length > 3) {
                        newVal = '.';
                    }

                    //Age New cells
                    if (cell === 'x') {
                        newVal = 'y';
                    }

                    //Age Medium cells
                    if (cell === 'y') {
                        newVal = 'z';
                    }

                    //Kill Aged Cells
                    if (cell === 'z') {
                        newVal = '.';
                    }

                    //Resurrect Dead Cells
                    if (cell === '.' && live.length === 3) {
                        newVal = 'x';
                    }

                    cpyGrid[i][j] = newVal;

                }
            }

            let newGrid = new Grid({ grid: cpyGrid });
            let gen = this.state.generation + 1;
            this.setState({
                grid: newGrid,
                generation: gen
            });
        }
    }

    componentDidMount() {
        this.interval = setInterval(this.turn, this.state.speed);
    }

    // This will update the interval on each state change
    componentDidUpdate(prevProps: BoardProps, prevState: BoardState) {

        if (prevState.speed !== this.state.speed) {
            clearInterval(this.interval);
            this.interval = setInterval(this.turn, this.state.speed);
        }
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }


    render() {
        let g = this.state.grid.asArray();
        let rows: gridVal[][] = [];

        for (let i = 0; i < g.length; i++) {
            rows.push(g[i]);
        }

        return <div id="board" className="">

            <div className='readOut'>
                <p className='readOutNode'>Generation: {this.state.generation}</p>
                <p className='readOutNode'>State: {this.state.playing ? 'Playing' : 'Paused'} </p>
            </div>

            <SpeedControl setSpeed={this.setSpeed}></SpeedControl>

            <div id='gridContainer'>
                {rows.map((r, i) => {
                    return <Row
                        key={i}
                        clickHandler={this.cellClick}
                        id={i.toString()}
                        className='row'
                        children={r}
                    ></Row>;
                })}
            </div>

            <PlayControl
                setPlayState={this.setPlayState}
                clearFunc={this.clear}
            ></PlayControl>
        </div>;

    }
}