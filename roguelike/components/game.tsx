import * as React from 'react';
import { World } from './world';
import { WorldObject, Player, KINDS, STATS } from '../models/actors';
import { Log } from './log';
import { LogService } from '../services/logservice';


export type playerState = { hp: number, atk: number, exp: number, lvl: number, weapon: string };

interface P extends React.HTMLProps<HTMLDivElement> { };

interface S extends React.ComponentState {

    player: WorldObject;
    gameLevel: number;
    log: LogService;
}

export class GameState extends React.Component<P, S> {

    private playerSpec = {
        kind: KINDS.player,
        class: 'player',
        name: 'Traveller',
        hp: 100,
        atk: 20,
        interactive: true,
        weapon: 'stick'
    };

    constructor(props: P) {
        super(props);
        let player = new Player(this.playerSpec, '@');
        this.state = {
            player: player,
            gameLevel: 1,
            log: new LogService()
        };
    }

    reset = () => {
        let player = new Player(this.playerSpec, '@');

        this.setState({
            player: player,
            gameLevel: 1,
            log: new LogService()
        });
    }

    setPlayerState = (p: WorldObject) => {
        this.setState({
            player: p,
            gameLevel: this.state.gameLevel
        });
    }

    /** Write a message to the central log */
    appendLog = (msg: string) => {

        let log = this.state.log.add(msg);

        this.setState({
            log: log
        });
    }

    nextLevel() { }

    render() {

        let world = <World
            player={this.state.player}
            setPlayerState={this.setPlayerState}
            logWrite={this.appendLog}
        >
        </World>;

        let gameOverPanel = <div>
            <p>GAME OVER MAAAAN</p>
            <button onClick={this.reset}>RESET</button>
        </div>;

        let mainPane = this.state.player.isAlive ? world : gameOverPanel;

        return <div className='gameContainer'>
            <div className='gameState'>
                <span className='playerStatLabel'>HP</span>
                <span className='playerStat'>{this.state.player.getStat(STATS.hp)}</span>
                <span className='playerStatLabel'>Atk</span>
                <span className='playerStat'>{this.state.player.getStat(STATS.atk)}</span>
                <span className='playerStatLabel'>Exp</span>
                <span className='playerStat'>{this.state.player.getStat(STATS.atk)}</span>
                <span className='playerStatLabel'>Lv</span>
                <span className='playerStat'>{this.state.player.getStat(STATS.lvl)}</span>
                <span className='playerStatLabel'>Stage</span>
                <span className='playerStat'>{this.state.gameLevel}</span>
            </div>
            {mainPane}
            <Log log={this.state.log}></Log>
        </div>;
    }
}