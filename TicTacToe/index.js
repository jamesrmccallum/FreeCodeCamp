class TicTacToe {
    constructor(char, grid) {
        this._container = document.querySelector('#grid');
        this._statusBar = document.querySelector('#statusBar');
        this.buildGrid();
        this.updateStatus('Your move');
        this._container.style.visibility = 'visible';
        this._statusBar.style.visibility = 'visible';
        //Game has been passed a test grid
        if (grid) {
            grid.forEach((e, i) => {
                this._grid[i].innerText = e;
            });
        }
        this._state = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.gameActive = true;
        this.playerChar = char;
        this.cpuChar = this.playerChar === -1 ? 1 : -1;
    }
    /** Build a grid div using a document fragment
     * and append it to the page */
    buildGrid() {
        let grid = document.createDocumentFragment();
        let divs = [];
        for (let i = 0; i < 9; i++) {
            let div = document.createElement('div');
            div.setAttribute('sqno', i.toString());
            div.onclick = this.click.bind(this);
            div.classList.add('square');
            //Conditionally add formatting classes
            if (i === 0 || i === 1 || i === 2) {
                div.classList.add('top');
            }
            if (i === 0 || i === 3 || i === 6) {
                div.classList.add('left');
            }
            if (i === 6 || i === 7 || i === 8) {
                div.classList.add('bottom');
            }
            if (i === 2 || i === 5 || i === 8) {
                div.classList.add('right');
            }
            if (i === 4)
                div.classList.add('mid');
            divs.push(div);
            this._grid = divs;
        }
        let rows = [0, 1, 2].map(a => {
            let div = document.createElement('div');
            div.classList.add('row');
            return div;
        });
        for (let i = 0; i < 9; i++) {
            if (i <= 2) {
                rows[0].appendChild(divs[i]);
            }
            else if (i > 2 && i < 6) {
                rows[1].appendChild(divs[i]);
            }
            else
                rows[2].appendChild(divs[i]);
        }
        rows.forEach(r => grid.appendChild(r));
        this._container.appendChild(grid);
    }
    updateStatus(txt) {
        this._statusBar.innerText = txt;
    }
    fillCell(i, char) {
        this._state[i] = char;
        this._grid[i].innerText = char === 1 ? 'x' : 'o';
        if (this.isWin(this.grid, false))
            return this.gameEnd('You win');
        if (this.isWin(this.grid, true))
            return this.gameEnd('CPU wins');
        if (!this.getEmptySquares(this.grid).length)
            return this.gameEnd('Draw');
    }
    gameEnd(string) {
        this.gameActive = false;
        this.updateStatus(string);
    }
    /** Return the index of each empty square in the grid */
    getEmptySquares(grid) {
        let empties = [];
        for (let i = 0; i < grid.length; i++) {
            if (grid[i] === 0) {
                empties.push(i);
            }
        }
        return empties;
    }
    resetGame() {
        while (this._container.firstChild) {
            this._container.removeChild(this._container.firstChild);
        }
        this._grid = [];
        this.gameActive = true;
        this._state = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.updateStatus('Your move');
        window.game.buildGrid();
    }
    /** Handle a cell click
     * if it's not empty, or the game's over then do nothing
     * Allow a little timeout so the mark can render before miniMax
    */
    click(ev) {
        let square = ev.target;
        if (square.innerHTML != '' || !this.gameActive) {
            ev.preventDefault();
            return;
        }
        let index = parseInt(square.getAttribute('sqno'));
        this.fillCell(index, this.playerChar);
        if (this.gameActive)
            setTimeout(() => this.respond(), 50);
    }
    /** Computer responds to your move */
    respond() {
        this.updateStatus('Thinking...');
        setTimeout(() => {
            let move = this.getBestMove();
            this.fillCell(move, this.cpuChar);
            if (this.gameActive) {
                this.updateStatus('Your move');
            }
        }, 500);
    }
    /** Return the grid state as an array of strings */
    get grid() {
        return this._state;
    }
    /**Rank moves by what they enable to the other player to do next
     * @param grid - an array representing the current board
     * @param cpuPlay - Is it the cpu's turn?
     * @param depth - the number of iterations it took to get to this move
     * */
    miniMax(grid, cpuPlay, depth) {
        //Player Wins
        if (this.isWin(grid, false))
            return depth - 10;
        //CPU Wins
        if (this.isWin(grid, true))
            return 10 - depth;
        //Draw
        if (!this.getEmptySquares(grid).length)
            return 0;
        depth++;
        let bestScore = cpuPlay ? -Infinity : +Infinity;
        let char = cpuPlay ? this.cpuChar : this.playerChar;
        let moves = this.getEmptySquares(grid);
        for (let i = 0; i < moves.length; i++) {
            let tmpGrid = grid.slice();
            tmpGrid[moves[i]] = char;
            bestScore = cpuPlay ? Math.max(this.miniMax(tmpGrid, false, depth), bestScore) : Math.min(this.miniMax(tmpGrid, true, depth), bestScore);
        }
        return bestScore;
    }
    /**Rank CPU moves based on how bad they are for my player
     * recursing as many times as it takes to reach a terminal state
     * */
    getBestMove() {
        let bestScore = -Infinity;
        let bestMove = undefined;
        let moves = this.getEmptySquares(this.grid);
        for (let i = 0; i < moves.length; i++) {
            let tmpGrid = this.grid.slice();
            tmpGrid[moves[i]] = this.cpuChar;
            let score = this.miniMax(tmpGrid, false, 0);
            if (score > bestScore) {
                bestMove = moves[i];
                bestScore = score;
            }
            ;
        }
        return bestMove;
    }
    isWin(grid, cpuPlay) {
        let winChains = [[0, 1, 2], [0, 4, 8], [0, 3, 6], [1, 4, 7], [2, 4, 6], [2, 5, 8], [3, 4, 5], [6, 7, 8]];
        let winner = cpuPlay ? (this.cpuChar * 3) : (this.playerChar * 3);
        //Sum the grid squares at the winchain indexes
        return winChains.some(chain => {
            let sum = chain.map(a => grid[a]).reduce((a, b) => a + b, 0);
            return winner === sum;
        });
    }
}
function main() {
    let charMap = { 'x': 1, 'o': -1 };
    let choice = document.getElementById('choice');
    let restartDiv = document.getElementById('restart');
    choice.onclick = (e) => {
        if (e.srcElement.tagName == 'DIV') {
            makeChoice(e);
        }
        else {
            e.preventDefault();
        }
    };
    restartDiv.onclick = (e) => restart();
    function makeChoice(e) {
        let char = e.target.innerText.toLowerCase();
        restartDiv.style.visibility = 'visible';
        choice.style.display = 'none';
        window.game = new TicTacToe(charMap[char]);
    }
    function restart() {
        window.game.resetGame();
    }
}
function drawGrid(grid) {
    console.log(grid[0] + grid[1] + grid[2]);
    console.log(grid[3] + grid[4] + grid[5]);
    console.log(grid[6] + grid[7] + grid[8]);
}
document.addEventListener('DOMContentLoaded', main, false);
