import * as React from 'react';
import { World } from './world';

interface P extends React.HTMLProps<HTMLDivElement> {

};

interface S extends React.ComponentState {
    playerHP: number;
    playerAtk: number;
    playerExp: number;
    playerLevel: number;
    gameLevel: number;
}

export class GameState extends React.Component<P, S> {

    constructor(props: P) {
        super(props);

        this.state = {
            playerHP: 100,
            playerAtk: 30,
            playerExp: 0,
            playerLevel: 1,
            gameLevel: 1
        };
    }

    /** Sets all state vars for the next level (hp, atk etc) */
    setPlayerHP(){

    }

    gameOver(){
        console.log('GAME OVER MAAAN');
    }

    nextLevel() {}

    render() {
        return <div className='gameContainer'>
            <div className='gameState'>
                <span className='playerStatLabel'>HP</span>
                <span className='playerStat'>{this.state.playerHP}</span>
                <span className='playerStatLabel'>Atk</span>
                <span className='playerStat'>{this.state.playerAtk}</span>
                <span className='playerStatLabel'>Exp</span>
                <span className='playerStat'>{this.state.playerExp}</span>
                <span className='playerStatLabel'>Lv</span>
                <span className='playerStat'>{this.state.playerLevel}</span>
                <span className='playerStatLabel'>Stage</span>
                <span className='playerStat'>{this.state.gameLevel}</span>
            </div>
            <World gameOver={this.gameOver}> </World>
        </div>;
    }
}