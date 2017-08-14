import { Vector } from './spatial';

let charMap: { [char: string]: CharSpec } = {
    "@": { kind: 'player', hp: 100, interactive: true, statEffect: { stat: 'hp', val: -20 } }
    , "$": { kind: 'enemy', hp: 30, interactive: true, statEffect: { stat: 'hp', val: -20 } }
    , "#": { kind: 'health', hp: 1, interactive: true, statEffect: { stat: 'hp', val: +10 } }
    , 'x': { kind: 'wall', hp: 1, interactive: false, statEffect: {stat: 'none', val: 0}}
    , '~': { kind: 'sword', hp: 1, interactive: true, statEffect: { stat: 'atk', val: 30 } }
    , '}': { kind: 'garotte', hp: 1, interactive: true, statEffect: { stat: 'atk', val: 20 } }
    , '{': {kind: 'axe', hp: 1, interactive: true, statEffect: {stat: 'atk', val: 40}}
};

type CharSpec = { kind: string, hp: number, interactive: boolean, statEffect: StatEffect};
type StatEffect = { stat: string, val: number };

export function applyStatEffect(target: any, effect: StatEffect) {
    target.applyStatEffect(effect);
}

/** An enemy, health, a weapon, can all be implemented as a statchanger. 
 * It must have some kind of dimishing function so it either 
 * disappears straight away like a power up, or over turns like an enemy
*/
export class WorldObject {

    private _charFrom: string;
    private _kind: string;
    private _statEffect: StatEffect;
    private _interactive: boolean;
    private _hp: number;
    private _pos: Vector;
    private _atk?: number;
    // private _lvl?: number;
    // private _hpAccrued?: number;

    constructor(pos: Vector, char: string) {
        this._pos = pos;
        this._kind = charMap[char].kind;
        this._interactive = charMap[char].interactive;
        this._charFrom = char;
        this._statEffect = charMap[char].statEffect!;
        this._hp = charMap[char].hp;
    }

    /** Return the value of a stat */
    getStatValue(stat: 'hp' | 'atk') {
        return stat === 'hp' ? this._hp : this._atk;
    }

    setStat(s: StatEffect){
        
        console.log(`Setting stat ${s.stat} on ${this._kind}`);
        s.stat === 'hp' ? this._hp += s.val : this._atk! += s.val;
        console.log(`${this._kind} hp = ${this._hp}`);
    }

    get isAlive(){
        return this._hp >= 0;
    }

    get isInteractive(){
        return this._interactive;
    }

    getKind() {
        return this._kind;
    }

    getDamage(){
        return this._statEffect.val * Math.random();
    }

    /** Get stat effect currently returns a fixed value - this should increase */
    getStatEffect() {
        return this._statEffect;
    }

    get location() {
        return this._pos;
    }

}