document.addEventListener('DOMContentLoaded', () => {
    let player1Score = 0;
    let player2Score = 0;
    let player1Chances = 0;
    let player2Chances = 0;
    let currentPlayer = 1; // Updated to start with player 1
    const maxChances = 10;

    const player1ScoreEl = document.getElementById('player1Score');
    const player2ScoreEl = document.getElementById('player2Score');
    const player1ChancesEl = document.getElementById('player1Chances');
    const player2ChancesEl = document.getElementById('player2Chances');
    const diceImage = document.getElementById('diceImage');
    const newGameBtn = document.getElementById('newGameBtn');
    const rollDiceBtn = document.getElementById('rollDiceBtn');
    const winnerMessageEl = document.getElementById('winnerMessage');
    const player1El = document.getElementById('player1');
    const player2El = document.getElementById('player2');


    const diceFaces = [
        'dice1 (1).png',
        'dice2.png',
        'dice3.png',
        'dice4.png',
        'dice5.png',
        'dice6.png'
    ];

    function rollDice() {
        const diceValue = Math.floor(Math.random() * 6) + 1;
        diceImage.src = diceFaces[diceValue - 1];
        

        if (currentPlayer === 1) {
            if (diceValue === 1) {
                player1Score = 0;
            } else {
                player1Score += diceValue;
            }
            player1Chances++;
            player1ScoreEl.textContent = player1Score;
            player1ChancesEl.textContent = player1Chances;

            currentPlayer = 2;

        } else {
            if (diceValue === 1) {
                player2Score = 0;
            } else {
                player2Score += diceValue;
            }
            player2Chances++;
            player2ScoreEl.textContent = player2Score;
            player2ChancesEl.textContent = player2Chances;
            currentPlayer = 1;
        }
        updateActivePlayer();
        if (player1Chances >= maxChances && player2Chances >= maxChances) {
            determineWinner();
        }
    }

    function updateActivePlayer() {
        if (currentPlayer === 1) {
            player1El.classList.add('active-player');
            player1El.classList.remove('inactive-player');
            player2El.classList.add('inactive-player');
            player2El.classList.remove('active-player');
        } else {
            player2El.classList.add('active-player');
            player2El.classList.remove('inactive-player');
            player1El.classList.add('inactive-player');
            player1El.classList.remove('active-player');
        }
    }

    function determineWinner() {
        rollDiceBtn.disabled = true;

        let message;
        if (player1Score > player2Score) {
            message = 'Player 1 wins!';
        } else if (player2Score > player1Score) {
            message = 'Player 2 wins!';
        } else {
            message = 'Its a tie!';
        }
        const winnerMessageEl=document.querySelector('.winner-message');
        winnerMessageEl.textContent=message;
        winnerMessageEl.classList.add('active');
        

    }

    function newGame() {
        const winnerMessageEl=document.querySelector('.winner-message');
        
        winnerMessageEl.classList.remove('active');
        player1Score = 0;
        player2Score = 0;
        player1Chances = 0;
        player2Chances = 0;
        currentPlayer = 1; // Reset to start with player 1

        player1ScoreEl.textContent = player1Score;
        player2ScoreEl.textContent = player2Score;
        player1ChancesEl.textContent = player1Chances;
        player2ChancesEl.textContent = player2Chances;
        diceImage.src = diceFaces[0];
        winnerMessageEl.textContent = ''; // Clear the winner message
        rollDiceBtn.disabled = false;
        updateActivePlayer();
    }

    rollDiceBtn.addEventListener('click', rollDice);
    newGameBtn.addEventListener('click', newGame);
    updateActivePlayer();
});
