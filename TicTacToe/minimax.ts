
onmessage = (e) => {

    let grid: string[] = JSON.parse(e.data[0]);

    let move = getBestMove()
    
    function getBestMove() {
        let bestScore = -Infinity;
        let bestMove = undefined;
        let moves = this.getEmptySquares(this.grid);

        let moveScores = moves.map(move => {
            let tmpGrid = this.grid.slice();
            tmpGrid[move] = this.cpuChar;
            let score = this.miniMax(tmpGrid, false, 0);
            if (score > bestScore) {
                bestMove = move;
                bestScore = score;
            };
        });

        return bestMove
    }


    function miniMax(grid: string[], cpuPlay: boolean, depth: number) {

        //Player Wins
        if (isWin(grid, false)) return depth - 10;

        //CPU Wins
        if (isWin(grid, true)) return 10 - depth;

        //Draw
        if (!this.getEmptySquares(grid).length) return 0;

        depth++;

        let bestScore = cpuPlay ? -Infinity : +Infinity;
        let char = cpuPlay ? this.cpuChar : this.playerChar;
        let moves = this.getEmptySquares(grid);

        moves.forEach(m => {
            let tmpGrid = grid.slice();
            tmpGrid[m] = char;
            bestScore = cpuPlay ? Math.max(this.miniMax(tmpGrid, false, depth), bestScore) : Math.min(this.miniMax(tmpGrid, true, depth), bestScore);
        })

        return bestScore;

    }

    function isWin(grid: string[], cpuPlay: boolean) {

        let winChains = [[0, 1, 2], [0, 4, 8], [0, 3, 6], [1, 4, 7], [2, 4, 6], [2, 5, 8], [3, 4, 5], [6, 7, 8]];
        let winner = cpuPlay ? this.cpuChar.repeat(3) : this.playerChar.repeat(3);

        //if the concatenated grid contains any win chain then we're done

        return winChains.some(chain => {
            return winner == chain.map(a => grid[a]).join('');
        })
    }


}

