import * as React from 'react';

interface CellProps extends React.HTMLProps<HTMLDivElement> {
    cellState: 'x' | 'y' | 'z'| '.';
    clickHandler: (e)=>void;
}

interface CellState {

}

export class Cell extends React.Component<CellProps, CellState> {

    constructor(props) {
        super(props);
    }

    render() {

        var classNameMap = {
            ".": "dead",
            "x": "new",
            "y": "older",
            "z": "oldest"
        };

        let classNames = `cell ${classNameMap[this.props.cellState]}`;

        return <div 
                    id={this.props.id}
                    onClick={(e)=>this.props.clickHandler(e)} 
                    className={classNames}>
                </div>;

    }
}
