import * as React from 'react';
import {LogService} from '../services/logService';

interface P extends React.HTMLProps<HTMLDivElement> {
    log: LogService;
};

interface S extends React.ComponentState {};

/** A 50 line FIFO log that prints to the logging pane */
export class Log extends React.Component<P, S> {

    constructor(props: P) {
        super(props);
    }

    render() {

        return <div className='logPanel'>
            {this.props.log.read().map((str, i) => {
                return <span key={i} className='logMsg'>{str}</span>;
            })}
        </div>;
    }

}



