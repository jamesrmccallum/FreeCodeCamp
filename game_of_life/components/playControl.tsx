import * as React from 'react';

type cellState = 'x' | 'y' | '';

interface P extends React.HTMLProps<HTMLDivElement> {
    setPlayState: (boolean) => void;
    clearFunc: ()=>void;
}

interface S {
}

export class PlayControl extends React.Component<P, S>{

    constructor(props: P) {
        super(props);
    }

    render() {

        return <div className='controls'>
            <div className="controlNode" onClick={() => this.props.setPlayState(true)}>Play</div>
            <div className="controlNode" onClick={() => this.props.setPlayState(false)}>Pause</div>
            <div className="controlNode" onClick={()=> this.props.clearFunc()}>Clear</div>
        </div>;
    }
}
