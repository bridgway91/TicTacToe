const cells = document.querySelectorAll('.cell');
const statusText = document.querySelector('#statusText');
const restartBtn = document.querySelector('#restartBtn');

const GameBoard = {
    winConditions: [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ],
    playerTurn: 'X',
    board: [0,0,0,0,0,0,0,0,0],
    running: true,

    cellClicked() {
        const cellIndex = this.getAttribute('cellIndex')
        
        if(GameBoard.board[cellIndex] != 0 || !GameBoard.running) {
            return
        }

        GameBoard.updateCell(this,cellIndex) // this === div of cell clicked
        GameBoard.checkWinner()
    },
    updateCell(cell,index) {
        GameBoard.board[index] = GameBoard.playerTurn == 'X' ? 1 : -1
        cell.textContent = GameBoard.playerTurn
    },
    changePlayer() {
        GameBoard.playerTurn = GameBoard.playerTurn == 'X' ? 'O' : 'X'
        statusText.textContent = `${GameBoard.playerTurn}'s turn`
    },
    checkWinner() {
        let roundWon = false

        for(let i = 0; i < GameBoard.winConditions.length; i++) {
            const condition = GameBoard.winConditions[i]
            const cellA = GameBoard.board[condition[0]]
            const cellB = GameBoard.board[condition[1]]
            const cellC = GameBoard.board[condition[2]]

            if ((cellA + cellB + cellC == 3) || (cellA + cellB + cellC == -3)) {
                roundWon = true;
                break;
            }
        }

        if(roundWon) {
            statusText.textContent = `${GameBoard.playerTurn} wins!`
            GameBoard.running = false
        } else if (!GameBoard.board.includes(0)) {
            statusText.textContent = `Draw!`
            GameBoard.running = false
        } else {
            GameBoard.changePlayer()
        }
    },
    restartGame() {
        GameBoard.board = [0,0,0,0,0,0,0,0,0]
        cells.forEach(cell => cell.textContent = '')
        GameBoard.playerTurn = 'X'
        statusText.textContent = `${GameBoard.playerTurn}'s turn`
        GameBoard.running = true
        console.log('restarting')
    }
}

cells.forEach(cell => cell.addEventListener('click', GameBoard.cellClicked));
restartBtn.addEventListener('click', GameBoard.restartGame);

GameBoard.restartGame();