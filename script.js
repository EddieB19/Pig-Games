"use strict";

const starTheGame = document.querySelector(".to-start");
const btnstartTheGame = document.querySelector(".btn--start");

const score0 = document.getElementById("score--0");
const score1 = document.getElementById("score--1");
const dice = document.querySelector(".dice");

const currentScore0 = document.getElementById("current--0");
const currentScore1 = document.getElementById("current--1");

const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

const player0 = document.querySelector(".player--0");
const player1 = document.querySelector(".player--1");

const winner0 = document.querySelector(".winner0");
const winner1 = document.querySelector(".winner1");

const audio1 = new Audio("./assets/audio/90s-game-ui-6-185099.mp3");
const audio2 = new Audio("./assets/audio/video-game-bonus-323603.mp3");
const audio3 = new Audio("./assets/audio/piglevelwin2mp3-14800.mp3");
const audio4 = new Audio("./assets/audio/90s-game-ui-4-185097.mp3");
const audio5 = new Audio("./assets/audio/game-start-317318.mp3");

let scores, currentScore, activePlayer, playing;

const newGame = function () {
  audio5.play();
  dice.classList.add("hidden");
  btnNew.classList.add("hidden");
  btnHold.classList.remove("hidden");
  btnRoll.classList.remove("hidden");

  winner0.classList.add("hidden");
  winner1.classList.add("hidden");

  score0.textContent = 0;
  score1.textContent = 0;

  currentScore0.textContent = 0;
  currentScore1.textContent = 0;

  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  player0.classList.remove("player--winner");
  player1.classList.remove("player--winner");
  player0.classList.add("player--active");
  player1.classList.remove("player--active");
};

newGame();

btnstartTheGame.addEventListener("click", function () {
  audio2.play();
  starTheGame.classList.add("hidden");
});

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0.classList.toggle("player--active");
  player1.classList.toggle("player--active");
};

btnRoll.addEventListener("click", function () {
  if (playing) {
    const diceRandom = Math.trunc(Math.random() * 6) + 1;
    dice.classList.remove("hidden");
    dice.src = `./assets/images/dice-${diceRandom}.png`;

    if (diceRandom !== 1) {
      currentScore += diceRandom;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    }
    // Switch Player
    else {
      switchPlayer();
      audio4.play();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    audio1.play();
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 100) {
      playing = false;
      dice.classList.add("hidden");
      btnNew.classList.remove("hidden");
      btnHold.classList.add("hidden");
      btnRoll.classList.add("hidden");

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");

      document
        .querySelector(`.winner${activePlayer}`)
        .classList.remove("hidden");
      audio3.play();
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener("click", newGame);
