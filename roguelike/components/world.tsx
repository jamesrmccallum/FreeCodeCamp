import * as React from 'react';
import { Grid } from '../models/gridModel';
import { gridMap } from '../assets/grids';
import { Row } from '../components/row';
import { WorldObject, Player, KINDS, STATS, StatEffect } from '../models/actors';
import { keyDirections } from '../models/spatial';

interface P extends React.HTMLProps<HTMLDivElement> {
    player: WorldObject;
    setPlayerState: (p: WorldObject) => void;
    logWrite: (msg: string) => void;
};

interface S extends React.ComponentState {
    grid: Grid;
}

enum ACTOR { 'player', 'enemy' };

export class World extends React.Component<P, S> {

    constructor(props: P) {
        super(props);

        let _grid = new Grid(gridMap[0], this.props.player);

        this.state = {
            grid: _grid
        };
    }

    /** Process a keystroke and handle the interaction if there is one */
    keyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {

        if (keyDirections[e.keyCode]) {
            let pos = this.state.grid.getPlayerPos();
            let target = pos.plus(keyDirections[e.keyCode]);
            let atTarget = this.state.grid.getCharAt(target);

            // There's no target here
            if (atTarget === undefined) {
                this.state.grid.setPlayerPos(target);
                this.setState(this.state);

                // Theres an interactive object here
            } else {
                if (atTarget.isInteractive) {
                    let player = this.state.grid.getCharAt(pos) as Player;
                    this.interact(player, atTarget!);
                }
            }
        }
    }

    /** Handle an interaction between player and an interactive object */
    interact(player: Player, target: WorldObject) {

        let effectOnTarget = player.getDamage();
        let enemy = target.kind === KINDS.enemy;
        let weapon = target.kind === KINDS.weapon;
        let effectOnPlayer = enemy ? target.getDamage() : target.getStatEffect();

        let playerAction = this.generateLogMsg(ACTOR.player, player.name, target.kind,
            target.name, false, effectOnPlayer, effectOnTarget);

        this.props.logWrite(playerAction);

        // Exchange stat effects
        target.setStat(effectOnTarget);
        
        if (enemy){
            let msg = this.generateLogMsg(ACTOR.enemy, target.name, target.kind, 
                target.name, false, effectOnPlayer, effectOnTarget);
            this.props.logWrite(msg);
        }

        if (weapon) {
            player.weapon = target.name;
        }
        
        player.setStat(effectOnPlayer);

        // Pass the player back to react
        this.props.setPlayerState(player);

        // Did the player die?
        if (player.isAlive) {
            // Did the target 'die' (or was it picked up) ?
            if (!target!.isAlive) {
                if (enemy) {
                    this.props.logWrite(`Player killed ${target.name}`);
                }
                this.state.grid.clearSquare(target.location);
                this.state.grid.setPlayerPos(target.location);
                this.setState(this.state);
            }
        }
    }

    /** Derive a log message for the interaction
     * @param actor The one making the move
     * @param actorName The name of the actor
     * @param target The one affected by the move
     * @param targetName The string name of the target
     * @param terminal Was the move fatal to the actee?
     * @param actorEffect The effect the move had on the actor
     * @param targetEffect The effect the move had on the target
    */
    generateLogMsg(actor: ACTOR, actorName: string, target: KINDS,
        targetName: string, terminal: boolean, effectOnPlayer: StatEffect, effectOnTarget: StatEffect) {

        let strEffectOnPlayer = `(${STATS[effectOnPlayer.stat]} ${effectOnPlayer.val})`;
        let strEffectOnTarget = `(${STATS[effectOnTarget.stat]} ${effectOnTarget.val})`;
        let msg = undefined;

        if (actor === ACTOR.enemy) {
            msg = `Player was attacked by ${actorName} ${strEffectOnPlayer}`;
        } else {
            if (actor === ACTOR.player) {
                if (target === KINDS.enemy) {
                    msg = `Player attacked ${targetName} ${strEffectOnTarget}`;
                } else {
                    msg = `Player picked up a ${targetName} ${strEffectOnPlayer}`;
                }
            }
        }

        return msg!;
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