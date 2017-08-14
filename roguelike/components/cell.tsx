import * as React from 'react';

interface P extends React.HTMLProps<HTMLDivElement> {
    resident: string;
}

interface S extends React.ComponentState {
    char: string;
}

export class Cell extends React.Component<P, S> {

    constructor(props: P) {
        super(props);
    }

    turn() {

    }

    render() {

        let classes = ['cell'];

        let clss = this.props.resident|| undefined;
        if (clss) { classes.push(clss); }
        return <div className={classes.join(' ')}></div>;
    }
}