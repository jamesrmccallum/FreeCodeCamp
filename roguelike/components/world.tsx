import * as React from 'react';
import { Grid } from '../models/gridModel';
import { gridMap } from '../assets/grids';
import { Row } from '../components/row';
import { WorldObject } from '../models/actors';
import { keyDirections } from '../models/spatial';

interface P extends React.HTMLProps<HTMLDivElement> {
    gameOver: Function;
};

interface S extends React.ComponentState {
    grid: Grid;
}

export class World extends React.Component<P, S> {

    constructor(props: P) {
        super(props);

        this.state = {
            grid: new Grid(gridMap[0])
        };
    }

    keyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {

        if (keyDirections[e.keyCode]) {
            console.log(e.keyCode);
            let pos = this.state.grid.getPlayerPos();
            let target = pos.plus(keyDirections[e.keyCode]);
            let atTarget = this.state.grid.getCharAt(target);

            if (atTarget === undefined) {
                this.state.grid.setPlayerPos(target);
                this.setState(this.state);
            } else {
                if (atTarget.isInteractive) {
                    let player = this.state.grid.getCharAt(pos);
                    this.interact(player!, atTarget!);
                }
            }
        }
    }

    interact(player: WorldObject, other: WorldObject) {

        let otherEffect = other.getStatEffect();
        let playerEffect = player.getStatEffect();

        other.setStat(playerEffect);
        player.setStat(otherEffect);

        if (player.isAlive) {
            if (!other!.isAlive) {
                this.state.grid.clearSquare(other.location);
                this.state.grid.setPlayerPos(other.location);
                this.setState(this.state);
            }
        } else {
            this.props.gameOver();
        }
    }

    render() {

        let rows = this.state.grid.asArray()
            .map((r, i) => {
                return <Row
                    cells={r}
                    key={i}
                ></Row>;
            });

        return <div
            className='game'
            onKeyDown={this.keyDown}
            tabIndex={0}
        >{rows}</div>;
    }
}