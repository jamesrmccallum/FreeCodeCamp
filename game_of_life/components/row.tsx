import * as React from 'react';
import { Cell } from './cell'

interface Props extends React.HTMLProps<HTMLDivElement> {
    children: any;
}

interface State {

}

export class Row extends React.Component<Props, State> {

    constructor(props) {
        super(props);
    }

    render() {

        let cells = this.props.children.map((c, i) => {
            return <Cell cellState={c}></Cell>
        })

        return <div className='row'>
            {cells}
        </div>

    }
}
