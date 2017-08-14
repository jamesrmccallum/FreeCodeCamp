import * as React from 'react';
import { Cell } from './cell';

interface P extends React.HTMLProps<HTMLDivElement> {
    cells: string[];
}

interface S extends React.ComponentState {

}

export class Row extends React.Component<P, S> {

    constructor(props: P) {
        super(props);
    }

    render() {

        let _cells = this.props.cells.map((a, i) => {
            return <Cell
                resident={a}
                key={i}
            ></Cell>;
        });

        return <div className='row'>
            {_cells}
        </div>;


    }
}