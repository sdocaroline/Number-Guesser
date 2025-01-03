let target;

const humanGuessInput = document.getElementById('human-guess');

const roundNumberDisplay = document.getElementById('round-number');

const computerGuessDisplay = document.getElementById('computer-guess');
const humanScoreDisplay = document.getElementById('human-score');
const computerScoreDisplay = document.getElementById('computer-score');
const targetNumberDisplay = document.getElementById('target-number');
const computerWinsDisplay = document.getElementById('computer-wins');

const guessButton = document.getElementById('guess');
const nextRoundButton = document.getElementById('next-round');

guessButton.addEventListener('click', () => {
    //generate target value
    target = generateTarget();
    //retrieve the player's guess
    const currentHumanGuess = humanGuessInput.value;
    //make random computer guess
    const computerGuess = Math.floor(Math.random() * 10);

    //display computer and target guess
    computerGuessDisplay.innerText = computerGuess;
    targetNumberDisplay.innerText = target;

    //determine if human or computer wins
    const humanIsWinner = compareGuesses(currentHumanGuess, computerGuess, target)
    const winner = humanIsWinner ? 'human' : 'computer'

    //update score
    updateScore(winner);

    //display winner
    if (humanIsWinner) {
        guessButton.innerText = 'You Win!';
        guessButton.classList.toggle('winning-text')
    } else {
        computerWinsDisplay.innerText = 'Computer Wins!';
    }

    //current scores
    humanScoreDisplay.innerText = humanScore;
    computerScoreDisplay.innerText = computerScore;

    //disabled state for the buttons
    guessButton.setAttribute('disabled', true)
    nextRoundButton.removeAttribute('disabled');
});

nextRoundButton.addEventListener('click', () => {
    //increase round number
    advanceRound();
    //display new round number
    roundNumberDisplay.innerText = currentRoundNumber;

    //disabled state for buttons
    nextRoundButton.setAttribute('disabled', true)
    guessButton.removeAttribute('disabled');

    //reset guess input box and target number display
    targetNumberDisplay.innerText = '?';
    guessButton.innerText = 'Make a Guess';
    humanGuessInput.value = '';
    computerGuessDisplay.innerText = '?';
    computerWinsDisplay.innerText = '';
    guessButton.classList.remove('winning-text');
});

const addButton = document.getElementById('add');
const subtractButton = document.getElementById('subtract');

addButton.addEventListener('click', () => {
    humanGuessInput.value = +humanGuessInput.value + 1;
    handleValueChange(humanGuessInput.value);
});

subtractButton.addEventListener('click', () => {
    humanGuessInput.value = +humanGuessInput.value - 1;
    handleValueChange(humanGuessInput.value);
});

const handleValueChange = value => {
    if (value > 0 && value <= 9) {
        subtractButton.removeAttribute('disabled');
        addButton.removeAttribute('disabled');
    } else if (value > 9) {
        addButton.setAttribute('disabled', true);
    } else if (value <= 0) {
        subtractButton.setAttribute('disabled', true);
    }
}

humanGuessInput.addEventListener('input', function(e) {
    handleValueChange(e.target.value);
});