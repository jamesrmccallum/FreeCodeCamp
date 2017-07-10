import * as React from 'react'
import { Grid, IGrid } from '../models/gridModel'
import { Row } from './row'
import { grid1 } from '../assets/gridMaps'

type cellState = 'x' | 'y' | '';

interface Props extends React.HTMLProps<HTMLDivElement> {
}

interface State {
    grid: IGrid<cellState>
}

export class Board extends React.Component<Props, State> {

    interval: number

    constructor(props: Props) {
        super(props);

        let grid = grid1.split(',') as cellState[];

        this.state = {
            grid: new Grid<cellState>(grid)
        }
    }

    turn = () => {

        let cpyGrid = this.state.grid.asArray();

        for (let i = 0; i < cpyGrid.length; i++) {

            let surroundingCells = this.state.grid.getSurrounding(i);
            let cell = cpyGrid[i];
            let live = surroundingCells.filter(a => a == 'x' || 'y')

            //Kill Live Cells
            if (live.length < 2 || live.length > 3) {
                cell == ''
            }

            //Age New cells
            if (cell == 'x') { cell = 'y' }

            //Resurrect Dead Cells
            if (cell == '' && live.length == 3) {
                cell = 'x'
            }
        }

        let newGrid = new Grid(cpyGrid);

        this.setState({
            grid: newGrid
        })

    }

    componentDidMount() {
        this.interval = setInterval(this.turn, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }


    render() {
        let g = this.state.grid.asArray();
        let width = this.state.grid.width;
        let rows: cellState[][] = [];

        for (let i = 0; i < g.length; i + width) {
            rows.push(g.slice(i, width))
        }


        return <div id="board" className="">

            {rows.map(r => {
                return <Row className='row'
                    children={r}
                ></Row>
            })}

        </div>

    }
}