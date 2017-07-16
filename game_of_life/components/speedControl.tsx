import * as React from 'react';

type cellState = 'x' | 'y' | '';

interface P extends React.HTMLProps<HTMLDivElement> {
    setSpeed: (number) => void;
}

interface S {
    speeds: { [idx: string]: number };
}

export class SpeedControl extends React.Component<P, S>{

    constructor(props: P) {
        super(props);

        this.state = {
            speeds: {
                "slow": 1700,
                "medium": 1000,
                "fast": 300
            }
        };
    }

    render() {

        return <div className='speedControls'>
            <div className='speedbutton' id='slow' onClick={()=>this.props.setSpeed(this.state.speeds.slow)}>slow</div>
            <div className='speedbutton' id='medium' onClick={()=>this.props.setSpeed(this.state.speeds.medium)}>medium</div>
            <div className='speedbutton' id='fast' onClick={()=>this.props.setSpeed(this.state.speeds.fast)}>fast</div>
        </div>;
    }
}
