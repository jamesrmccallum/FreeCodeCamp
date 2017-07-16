import * as React from 'react';
import { Cell } from './cell';

interface RowProps extends React.HTMLProps<HTMLDivElement> {
    children: ('x' | 'y' | 'z' | '.')[];
    clickHandler: (e)=>void;
}

interface RowState {

}

export class Row extends React.Component<RowProps, RowState> {

    constructor(props) {
        super(props);
    }

    render() {

        let cells = this.props.children.map((c, i) => {
            let id = i.toString();
            return <Cell 
                key={i}
                clickHandler={this.props.clickHandler}
                id={id}
                cellState={c}
            ></Cell>;
        });

        return <div id={this.props.id} className='row'>
            {cells}
        </div>;

    }
}
