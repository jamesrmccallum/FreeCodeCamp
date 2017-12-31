import * as React from 'react';
import { World } from './world';
import { Player, KINDS, STATS } from '../models/actors';
import { MapGenerator } from '../services/mapGenerator';
import { Log } from './log';
import { LogService } from '../services/logservice';
import { Grid } from '../models/gridModel';


/** TODO 
 * Make the grid set by the game and passed into the world
 * Keep a count of the enemies
 * implement exp as a pickup on death
 * **/


export type playerState = { hp: number, atk: number, exp: number, lvl: number, weapon: string };

interface P extends React.HTMLProps<HTMLDivElement> { };

interface S extends React.ComponentState {

    player: Player;
    gameLevel: number;
    log: LogService;
    grid: Grid;
}

export class GameState extends React.Component<P, S> {

    private playerSpec = {
        kind: KINDS.player,
        class: 'player',
        name: 'Traveller',
        hp: 100,
        atk: 20,
        level: 1,
        interactive: true,
        weapon: 'stick'
    };

    private charLists = [
        ['$', '$', '$', '$', '$', '[', '#', '#', '#', '#', '#', 't', '+'],
        ['$', '$', '$', '$', '[', '[', '[', '#', '#', '#', '#', '#', 'y', '+'],
        ['$', '[', '[', '[', '#', '#', '#', '+']
    ];

    constructor(props: P) {
        super(props);

        let player = new Player(this.playerSpec, '@');
        let map = new MapGenerator(100, 100, 15, 35, 35, this.charLists[0]).toString();
        let grid = new Grid(map, player);

        this.state = {
            player: player,
            gameLevel: 1,
            log: new LogService(),
            grid: grid
        };
    }

    reset = () => {
        let player = new Player(this.playerSpec, '@');
        let map = new MapGenerator(100, 100, 15, 35, 35, this.charLists[0]).toString();
        let grid = new Grid(map, player);

        this.setState({
            player: player,
            gameLevel: 1,
            log: new LogService(),
            grid: grid
        });
    }

    setPlayerState = (p: Player) => {
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

    nextLevel = () => {

        let level = this.state.gameLevel + 1;
        let newMap = new MapGenerator(100, 100, 15, 35, 35, this.charLists[level - 1]).toString();
        let grid = new Grid(newMap, this.state.player);

        this.setState({
            gameLevel: level,
            grid: grid
        });
    }

    render() {

        let world = <World
            player={this.state.player}
            setPlayerState={this.setPlayerState}
            logWrite={this.appendLog}
            grid={this.state.grid}
            levelUp={this.nextLevel}
        >
        </World>;

        let gameOverPanel = <div>
            <p>GAME OVER MAAAAN</p>
            <button onClick={this.reset}>RESET</button>
        </div>;

        let mainPane = this.state.player.isAlive ? world : gameOverPanel;

        return <div className='gameContainer'>
            <div className='gameState'>
                <span className='playerStatLabel'>HP:</span>
                <span className='playerStat'>{this.state.player.getStat(STATS.hp)}</span>
                <span className='playerStatLabel'>Atk:</span>
                <span className='playerStat'>{this.state.player.getStat(STATS.atk)}</span>
                <span className='playerStatLabel'>Exp:</span>
                <span className='playerStat'>{this.state.player.getStat(STATS.atk)}</span>
                <span className='playerStatLabel'>Lv:</span>
                <span className='playerStat'>{this.state.player.getStat(STATS.lvl)}</span>
                <span className='playerStatLabel'>Stage:</span>
                <span className='playerStat'>{this.state.gameLevel}</span>
                <span className='playerStatLabel'>Weapon:</span>
                <span className='playerStat'>{this.state.player.weapon}</span>
            </div>
            {mainPane}
            <Log log={this.state.log}></Log>
        </div>;
    }
}