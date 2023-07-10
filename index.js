/* Variables */
let playerScore = 0;
let computerScore = 0;
let roundWinner = '';

/* Appending to DOM */
const rockBtn = document.getElementById("rockbtn");
const paperBtn = document.getElementById("paperbtn");
const scissorsBtn = document.getElementById("scissorsbtn");
const runBtn = document.getElementById("runbtn");
const updateInfo = document.getElementById("updateInfo");
const playerScoreText = document.getElementById("playerScore");
const computerScoreText = document.getElementById("computerScore");
const imageDiv = document.getElementsByClassName("imagediv")[0];

/* Buttons */
rockBtn.addEventListener('click', playGame);
paperBtn.addEventListener('click', playGame);
scissorsBtn.addEventListener('click', playGame);
runBtn.addEventListener('click', run);

/* Game */
function playGame() {
    const playerSelection = this.dataset.button;
    const computerSelection = getComputerChoice();

    /* Computer choosing */
    function getComputerChoice() {
        const randomNumber = Math.floor(Math.random() * 3);
        switch (randomNumber) {
            case 0:
                return 'rock';
            case 1:
                return 'paper';
            case 2:
                return 'scissors';
        }
    }

    /* Tie */
    if (
        (playerSelection === 'rock' && computerSelection === 'rock') ||
        (playerSelection === 'paper' && computerSelection === 'paper') ||
        (playerSelection === 'scissors' && computerSelection === 'scissors')
    ) {
        roundWinner = 'tie';
    }
    /* Player wins */
    else if (
        (playerSelection === 'rock' && computerSelection === 'scissors') ||
        (playerSelection === 'paper' && computerSelection === 'rock') ||
        (playerSelection === 'scissors' && computerSelection === 'paper')
    ) {
        playerScore++;
        roundWinner = 'player';
    }
    /* Computer wins */
    else if (
        (playerSelection === 'rock' && computerSelection === 'paper') ||
        (playerSelection === 'paper' && computerSelection === 'scissors') ||
        (playerSelection === 'scissors' && computerSelection === 'rock')
    ) {
        computerScore++;
        roundWinner = 'computer';
    }
             
    console.log('Player Selection:', playerSelection);
    console.log('Computer Selection:', computerSelection);
    console.log('Round Winner:', roundWinner);
    updateText(roundWinner, playerSelection, computerSelection);
    updateScore ();
    gameOver ();
}

/* Run */
function run() {
    imageDiv.style.backgroundImage = "url(run.gif)";
    updateInfo.textContent = 'Pikachu chose not to fight and ran!';
}


/* Update Game Text */
function updateText(roundWinner, playerSelection, computerSelection) {
    if (roundWinner === 'tie') {
        updateInfo.textContent = `${capitalizeFirstLetter(playerSelection)} ties with ${computerSelection.toLowerCase()}`;
    } else if (roundWinner === 'player') {
        updateInfo.textContent = `Yay! ${capitalizeFirstLetter(playerSelection)} beats ${computerSelection.toLowerCase()}`;
    } else if (roundWinner === 'computer') {
        updateInfo.textContent = `Oh no... ${capitalizeFirstLetter(playerSelection)} is beaten by ${computerSelection.toLowerCase()}`;
    }
    
}

/* Helper function (capitalize) */
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

/* Update Score */
function updateScore () {
    playerScoreText.textContent = `Pikachu: ${playerScore}`;
    computerScoreText.textContent = `Pidgey: ${computerScore}`; 
}

/* Game Over */
function gameOver () {
    if (computerScore === 5) {
        console.log('computer wins');
        imageDiv.style.backgroundImage = "url(pidgey.jpg)";
        updateInfo.textContent = 'Pidgey wins!';
    } else if (playerScore === 5) {
        console.log('user wins');
        imageDiv.style.backgroundImage = "url(pikachu.jpg)";
        updateInfo.textContent = 'Pikachu wins!';
    } else if (roundWinner === 'Pikachu ran') {
        imageDiv.style.backgroundImage = "url(run.gif)";
        updateInfo.textContent = 'Pikachu chose not to fight and ran!';
    }
}