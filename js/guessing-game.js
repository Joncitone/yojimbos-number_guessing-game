/*
Write your guess-game code here! Don't forget to look at the test specs as a guide. You can run the specs by running "testem".

In this file, you will also include the event listeners that are needed to interact with your HTML file when a user clicks a button or adds a guess to the input field.
*/

function generateWinningNumber () {
    const winNum = Math.floor(Math.random()*100) +1;
    return winNum;
}

function shuffle(array) {
    var m = array.length, t, i;
    // While there remain elements to shuffle…
    while (m) {
      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);
      // And swap it with the current element.
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }
    return array;
  }

class Game {
    constructor() {
        this.winningNumber = generateWinningNumber();
        this.playersGuess = null;
        this.pastGuesses = [];
    }

    difference() {
        return Math.abs(this.winningNumber - this.playersGuess);
    }

    isLower() {
        if ((this.winningNumber - this.playersGuess) > 0){
            return true
        } else { return false}
    }

    provideHint() {
        let hintArray = [this.winningNumber];
        hintArray.push(generateWinningNumber());
        hintArray.push(generateWinningNumber());
        let shuffArray = shuffle(hintArray);
        return shuffArray;
    }

    playersGuessSubmission(numArg) {
        if (numArg<1 || numArg>100 || typeof numArg !== 'number'){
            throw 'That is an invalid guess.';
        }
        this.playersGuess = numArg;
        return this.checkGuess();
    }

    checkGuess() {
        if (this.playersGuess === this.winningNumber){
            playWin();
            return 'You Win!';
        } else if (this.pastGuesses.includes(this.playersGuess)){
            return 'You have already guessed that number.'
        } else {
            this.pastGuesses.push(this.playersGuess);

            if (this.pastGuesses.length < 5){
                if (this.difference() < 10){
                    return `You're burning up!`;
                } else if (this.difference() < 25){
                    return `You're lukewarm.`;
                } else if (this.difference() < 50){
                    return `You're a bit chilly.`;
                } else if (this.difference() < 100){
                    return `You're ice cold!`;
                }
            }
            if (this.pastGuesses.length >= 5){
                playLose();
                return 'You Lose.';
            }
        }
    }
}

function newGame () {
    return new Game();
}

const enter = document.getElementById('enter');
const newgame = document.getElementById('newgame');
const lose = document.getElementById('lose');
const win = document.getElementById('win');

function playEnter(){
    enter.play();
}
function playNewGame(){
    newgame.play();
}
function playLose(){
    lose.play();
}
function playWin(){
    win.play();
}

function playGame () {
    let game = newGame();
    const guess = document.getElementById('guess'); //number guess input
    const submit = document.getElementById('submit'); //submit button
    const reset = document.getElementById('reset'); //play again button
    const hint = document.getElementById('hint'); //hint button
    const guesses = document.getElementsByTagName('li');
    const headline = document.getElementsByTagName('h2');

    submit.addEventListener('click', function () {
      headline[0].textContent = game.playersGuessSubmission(Number(guess.value));
      guesses[game.pastGuesses.length - 1].textContent = game.pastGuesses[game.pastGuesses.length - 1];
    })

    guess.addEventListener('keypress', function (event) {
        if (event.key === 'Enter'){
            playEnter();
            headline[0].textContent = game.playersGuessSubmission(Number(guess.value));
            guesses[game.pastGuesses.length - 1].textContent = game.pastGuesses[game.pastGuesses.length - 1];
        }
    })

    hint.addEventListener('click', () => {
      headline[0].textContent = `The number is one of these: ${game.provideHint().join(', ')}`;
    })
    reset.addEventListener('click', () => {
      for (let i = 0; i < guesses.length; i++) {
        guesses[i].textContent = "";
      }
      headline[0].textContent = 'You have five guesses.'
      game = newGame();
    })
}

  playGame()
