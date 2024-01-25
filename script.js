let tile = document.querySelector('.tile')
let message = document.querySelector('.message')
let restartBut = document.querySelector('#restart')

gameBoard = function() {
    let board = [1,2,3,4,5,6,7,8,9]

    const players = function() {
        const playerMaker = (name, mark) => ({name, mark})
        const player1 = playerMaker('Player X', 'X')
        const player2 = playerMaker('Player O', 'O')
        return {player1, player2}
    }()

    const game = function() {
        let currentPlayer =  players.player1;
        let gameOver = false;
        return {currentPlayer, gameOver};  
    }()

    const gameStart = function() {
        board.forEach((item) => {
            let square = document.createElement('div')
            square.classList.add('square')
            square.addEventListener('mouseenter', (e) => { //adding wicked event listeners to show player's sign while hovering
                if (!game.gameOver) {
                e.target.textContent = game.currentPlayer.mark
            }})
            square.addEventListener('mouseout', (e) =>  e.target.textContent = '') 
            square.addEventListener('click', (e) => {
                if (typeof board[board.indexOf(item)] == 'number' && !game.gameOver) {
                    board[board.indexOf(item)] = game.currentPlayer.mark;
                    e.target.textContent = game.currentPlayer.mark;
                    let fixedMark = game.currentPlayer.mark;
                    e.target.addEventListener('mouseout', (e) =>  e.target.textContent = fixedMark)
                    e.target.addEventListener('mouseenter', (e) => e.target.textContent = fixedMark)
                    e.target.classList.add('filled')
                    gameEndCheck()
                    game.currentPlayer == players.player1 ? game.currentPlayer = players.player2 : game.currentPlayer = players.player1;
                }}
            )  
            tile.appendChild(square)
        })      
    }
    gameStart()
        
    const gameEndCheck = () => {
        if ((board[0] == board[1] && board[1] == board[2]) ||
            (board[3] == board[4] && board[4] == board[5]) ||
            (board[6] == board[7] && board[7] == board[8]) ||
            (board[0] == board[3] && board[3] == board[6]) ||
            (board[1] == board[4] && board[4] == board[7]) ||
            (board[2] == board[5] && board[5] == board[8]) ||
            (board[0] == board[4] && board[4] == board[8]) ||
            (board[2] == board[4] && board[4] == board[6])
            ) {
                message.textContent = `${game.currentPlayer.name} won!`
                game.gameOver = true;
            }
        else if (board.every(isNaN)) {
            message.textContent = `It's a draw`
            game.gameOver = true;
        }    
    }  

    const gameRestart = () => {
         while (tile.firstChild) {
                tile.removeChild(tile.firstChild);
            }
        board = [1,2,3,4,5,6,7,8,9]
        message.textContent = ``
        gameStart()
        game.gameOver = false
        game.currentPlayer = players.player1
    }  
    restartBut.addEventListener('click', gameRestart) 
}()