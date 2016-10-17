
class TicTacToe {

    private container: HTMLDivElement;
    private grid: HTMLDivElement[];
    private playerChar: 'x' | 'o';
    private cpuChar: 'x' | 'o';
    private playerLastPos: number;
    private cpuLastPos: number;

    constructor(char: 'x' | 'o') {
        this.container = <HTMLDivElement>document.querySelector('#grid');
        this.grid = Array.prototype.slice.call(document.querySelectorAll('.square'))

        this.grid.forEach((a, i) => {
            a.setAttribute('sqno', i.toString());
            a.onclick = this.click.bind(this);
        });

        this.playerChar = char;
        this.cpuChar = this.playerChar == 'x' ? 'o' : 'x';
    }

    fillGridCell(i: number, char: string) {
        this.grid[i].innerText = char;
    }

    click(ev: Event) {
        let t = (<HTMLDivElement>ev.target);
        this.playerLastPos = parseInt(t.getAttribute('sqno'));
        t.innerText = this.playerChar;
        this.respond();
    }

    respond() {
        let grid = this.getGrid();
        let moves = this.findMoves(grid);
        let nextMove = this.getBestMove(moves, grid, this.cpuChar);

        if (nextMove) {
            this.fillGridCell(nextMove.idx, this.cpuChar);
        } else {
            alert('DRAW');
        }
    }

    private getGrid() {
        return this.grid.map(e => e.innerText);
    }

    private findMoves(g: string[]) {
        let moves = [];
        for (var i = 0; i < g.length; i++) {
            if (g[i] == '') moves.push(i);
        }
        return moves;
    }

    /** miniMax algorithm for each available move: 
     * find the potential max score by following all potential moves trees through to completion 
     * @param {number[]} moves An array of valid moves remaining
     * @param {string[]} grid The state of the current grid
     * @param {string} char The character for the current turn
     **/
    private getBestMove(moves: number[], grid: string[], char: string) {

        type IScore = { idx: number, score: number };
        let scores: IScore[] = [];
        let _this = this;

        //If there are no moves left escape and declare draw
        if (!moves.length) {
            return undefined;
        }
        //For each move - walk the move tree and accumulate points based on wins (+1) draws (0) and 
        moves.forEach(m => {
            let score = { idx: m, score: 0 };
            let tmpgrid = Array.prototype.slice.call(grid);

            let s = walk(tmpgrid, char, score);

            scores.push(s);

        });
        /** Walk the remaning moves tree
         * for each branch check for win (+1) or loss (-1) or switch players and continue
         * recursively accumulate possible scores for the path**/
        function walk(grid: string[], char: string, s: IScore) {

            let playersTurn = char == _this.playerChar;
            let moves = _this.findMoves(grid);
            grid[moves[0]] = char;

            if (_this.isWin(grid)) {
                playersTurn ? s.score += 1 : s.score -= 1;
                return s;
            } else if (_this.isLoss(grid)) {
                playersTurn ? s.score -= 1 : s.score += 1;
                return s;
            } else if (!moves.length) {
                return s;
            } else {
                let c = char == 'x' ? 'o' : 'x';
                walk(grid, c, s);
            }
        }

        return scores.sort((a, b) => a.score - b.score)[0];
    }

    private isWin(g: string[]) {
        let chain = this.playerChar.repeat(3);
        return this.chain(g, chain);
    }

    private isLoss(g: string[]) {
        let chain = this.playerChar.repeat(3);
        return this.chain(g, chain);
    }

    private chain(grid: string[], char: string) {
        //Check an array for any valid row of 3
        let chains = ['012', '048', '036', '147', '258', '345', '678', '246']
        let win: boolean = false;

        chains.forEach(chain => {
            let cells = chain.split('').map(a => parseInt(a));
            if (cells.map(a => grid[a]).join('') === char) { win = true; };
        })
        return win;
    }

}

function main() {
    let game = new TicTacToe('x');
}

document.addEventListener('DOMContentLoaded', main, false);