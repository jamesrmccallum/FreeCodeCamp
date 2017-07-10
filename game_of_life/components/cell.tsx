import * as React from 'react';

interface CellProps extends React.HTMLProps<HTMLDivElement> {
    cellState: 'x' | 'y' | ''
}

interface CellState {

}

export class Cell extends React.Component<CellProps, CellState> {

    constructor(props) {
        super(props);
    }

    render() {

        var classNameMap = {
            "": "dead",
            "x": "new",
            "y": "old"
        }

        let classNames = `cell ${classNameMap[this.props.cellState]}`;

        return <div
            className={classNames}>
        </div>

    }
}
