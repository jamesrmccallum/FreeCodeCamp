import * as React from 'react'
import * as ReactDOM from 'react-dom'

interface TableHeaderProps {
    sortRecent: (e) => void;
    sortTotal: (e) => void;
}


interface TableHeaderState {
}

export class TableHeader extends React.Component<TableHeaderProps, TableHeaderState> {

    constructor(props: TableHeaderProps) {
        super(props);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return false;
    }

    render() {

        return <div className='tableheader tr'>
            <div className='userRank th'>#</div>
            <div className='userName th'>User Name</div>
            <div className='points30 th'>
                <div className='sortable' onClick={this.props.sortRecent}>Recent</div>
            </div>
            <div className='pointsAllTime th'>
                <div className='sortable' onClick={this.props.sortTotal}>All Time</div>
            </div>
        </div>
    }
}







