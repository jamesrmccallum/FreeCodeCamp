/** All logic for interactive objects and their properties lives here */
import { Vector } from './spatial';

export enum STATS { 'hp', 'atk', 'exp', 'lvl' };
export enum KINDS { 'player', 'weapon', 'enemy', 'pickup', 'scenery' };

export type CharSpec = {
    kind: KINDS,
    class: string,
    name?: string,
    hp: number,
    interactive: boolean,
    statEffect?: StatEffect,
    atk?: number
    weapon?: string
    level?: number
};

export type StatEffect = { stat: STATS, val: number };

export let charMap: { [char: string]: CharSpec } = {
    "$": {
        kind: KINDS.enemy,
        class: 'spoopy',
        name: 'Spoopy Skeleton',
        hp: 30,
        interactive: true,
        atk: 10
    },
    "[": {
        kind: KINDS.enemy,
        class: 'lizard',
        name: 'Illuminati Lizard Person',
        hp: 50,
        interactive: true,
        atk: 15
    },
    "#": {
        kind: KINDS.pickup,
        class: 'health',
        name: 'Healing Potion',
        hp: .1,
        interactive: true,
        statEffect: { stat: STATS.hp, val: +10 }
    },
    'x': {
        kind: KINDS.scenery,
        class: 'wall',
        hp: .1,
        interactive: false
    },
    't': {
        kind: KINDS.pickup,
        class: 'mace',
        name: "Beatin' Stick",
        hp: .1,
        interactive: true,
        statEffect: { stat: STATS.atk, val: 10 }
    },
    'y': {
        kind: KINDS.weapon,
        class: 'dagger',
        name: 'Chib',
        hp: .1,
        interactive: true,
        statEffect: { stat: STATS.atk, val: 20 }
    },
    '~': {
        kind: KINDS.weapon,
        class: 'sword',
        name: 'Claymore',
        hp: .1,
        interactive: true,
        statEffect: { stat: STATS.atk, val: 30 }
    },
    '{': {
        kind: KINDS.weapon,
        class: 'axe',
        name: 'Chopper',
        hp: .1,
        interactive: true,
        statEffect: { stat: STATS.atk, val: 40 }
    },
    '+': {
        kind: KINDS.scenery,
        class: 'exit',
        name: 'exit',
        hp: .1,
        interactive: true 
    }
};

export function applyStatEffect(target: any, effect: StatEffect) {
    target.applyStatEffect(effect);
}

/** The WorldObject is the abstraction behind giving life to any character
 * on a grid. It can be interactive or not. If it's interactive 
 * some interaction will also be defined.
*/
export class WorldObject {

    private _charFrom: string;
    private _kind: KINDS;
    private _class: string;
    private _name: string;
    private _statEffect: StatEffect;
    private _interactive: boolean;
    private _hp: number;
    private _pos: Vector;
    private _atk?: number;
    private _exp?: number;
    private _lvl?: number;

    constructor(spec: CharSpec, char: string) {
        this._kind = spec.kind;
        this._class = spec.class;
        this._interactive = spec.interactive;
        this._charFrom = char;
        this._statEffect = spec.statEffect!;
        this._hp = spec.hp;
        this._lvl = spec.level;

        if (spec.name) {
            this._name = spec.name;
        }
        if (spec.atk) {
            this._atk = spec.atk;
        }
        this._exp = 0;
    }

    /** Return the value of a stat */
    getStat(stat: STATS) {

        switch (stat) {
            case STATS.hp:
                return this._hp;
            case STATS.atk:
                return this._atk;
            case STATS.exp:
                return this._exp;
            case STATS.lvl:
                return this._lvl;
        }
    }

    setStat(s: StatEffect) {

        switch (s.stat) {
            case STATS.hp:
                this._hp += s.val;
                break;
            case STATS.atk:
                this._atk! += s.val;
                break;
            case STATS.exp:
                this._exp! += s.val;
                break;
        }
    }

    getDamage() {
        return {
            stat: STATS.hp,
            val: - Math.ceil((this._atk! * Math.random()))
        };
    }

    getStatEffect() {
        return this._statEffect;
    }

    get location() {
        return this._pos;
    }

    set location(l: Vector) {
        this._pos = l;
    }

    get isAlive() {
        return this._hp >= 0;
    }

    get isInteractive() {
        return this._interactive;
    }

    get kind() {
        return this._kind;
    }

    get class() {
        return this._class;
    }

    get name() {
        return this._name;
    }

}

export class Player extends WorldObject {
    
    private _weapon: string;

    constructor(spec: CharSpec, char: string){

        super(spec, char);
        this._weapon = spec.weapon!;
    }

    get weapon(){
        return this._weapon;
    }

    set weapon(weapon: string) {
        this._weapon = weapon;
    }
}
