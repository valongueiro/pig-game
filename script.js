"use strict";

let activePlayer = 0;
let currentScore = 0;
let totalScore = [0, 0];
let isGameFinished = false;
const minScoreToWin = 100;

const buttonRoll = document.querySelector(".btn--roll");
const buttonHold = document.querySelector(".btn--hold");
const buttonNew = document.querySelector(".btn--new");
const dice = document.querySelector(".dice");
const playerPanel = document.querySelectorAll(".player");
const labelScore = document.querySelectorAll(".score");
const labelCurrentScore = document.querySelectorAll(".current-score");

document.addEventListener("DOMContentLoaded", newGame);

buttonRoll.addEventListener("click", function () {
  if (isGameFinished) return;

  const diceNumber = Math.trunc(Math.random() * 6) + 1;
  showDice(diceNumber);

  if (isDiceOne(diceNumber)) switchPlayer();
  else addToCurrentScore(diceNumber);
});

buttonHold.addEventListener("click", function () {
  if (isGameFinished) return;

  totalScore[activePlayer] += currentScore;
  labelScore[activePlayer].textContent = totalScore[activePlayer];
  setCurrentScoreToZero();

  if (totalScore[activePlayer] >= minScoreToWin) playerWins();
  else switchPlayer();
});

buttonNew.addEventListener("click", newGame);

function newGame() {
  isGameFinished = false;
  resetUI();
  hideDice();
  setCurrentScoreToZero();
  setTotalScoreToZero();
}

const resetUI = function () {
  const classesToRemove = ["player--winner", "player--active"];

  for (const panel of playerPanel) panel.classList.remove(...classesToRemove);

  activePlayer = 0;
  playerPanel[activePlayer].classList.add("player--active");

  confetti.reset();
};

const showDice = function (diceNumber) {
  dice.src = `images/dice-${diceNumber}.png`;
  dice.classList.remove("hidden");
};

const hideDice = () => dice.classList.add("hidden");

const isDiceOne = (diceNumber) => (diceNumber === 1 ? true : false);

const addToCurrentScore = function (diceNumber) {
  currentScore += diceNumber;
  labelCurrentScore[activePlayer].textContent = currentScore;
};

const switchPlayer = function () {
  setCurrentScoreToZero();

  if (!activePlayer) activePlayer = 1;
  else activePlayer = 0;

  for (const panel of playerPanel) panel.classList.toggle("player--active");
};

const setCurrentScoreToZero = function () {
  currentScore = 0;
  for (const score of labelCurrentScore) score.textContent = currentScore;
};

const setTotalScoreToZero = function () {
  totalScore = [0, 0];
  for (const score of labelScore) score.textContent = 0;
};

const playerWins = function () {
  isGameFinished = true;

  confetti({
    particleCount: 250,
    spread: 100,
    origin: { y: 0.7 },
  });

  playerPanel[activePlayer].classList.add("player--winner");
  hideDice();
};
