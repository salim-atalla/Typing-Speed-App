// Words Collection
const words = [
  "Hello",
  "Programming",
  "Code",
  "Javascript",
  "Town",
  "Country",
  "Testing",
  "Youtube",
  "Linkedin",
  "Twitter",
  "Github",
  "Leetcode",
  "Internet",
  "Python",
  "Scala",
  "Destructuring",
  "Paradigm",
  "Styling",
  "Cascade",
  "Documentation",
  "Coding",
  "Funny",
  "Working",
  "Dependencies",
  "Task",
  "Runner",
  "Roles",
  "Test",
  "Rust",
  "Playing",
];

// Settings
const levels = {
  Hard: 3,
  Normal: 4,
  Easy: 7,
};

const defaultLevel = "Normal";
const defaultTime = levels[defaultLevel];

// Selectors
let startButton = document.querySelector(".start-btn");
let levelName = document.querySelector(".game-info .level-number");
let secondsNumber = document.querySelector(".game-info .seconds-number");
let currentWord = document.querySelector(".random-word");
let wordInput = document.querySelector(".word-input");
let wordsLeftContainer = document.querySelector(".words-left");
let timeLeft = document.querySelector(".counters .time-count .time-left");
let currentWordNumber = document.querySelector(
  ".counters .word-count .word-number"
);
let TotalWordsNumber = document.querySelector(
  ".counters .word-count .total-words-number"
);
let gameSection = document.querySelector(".game-section");
let finishMessage = document.querySelector(".finish");

// Events Handlers
let gameStarted = false;

startButton.addEventListener("click", () => {
  gameStarted = true;
  startButton.parentElement.remove();
  wordInput.focus();

  // Setting of the game
  levelName.innerHTML = defaultLevel;
  secondsNumber.innerHTML = defaultTime;
  timeLeft.innerHTML = defaultTime;
  currentWordNumber.innerHTML = 0;
  TotalWordsNumber.innerHTML = words.length;

  // Display the game section
  gameSection.style.display = "block";

  // Generate the first word
  nextWord();

  // Handle The Game
  handleGame();
});

// Handle start button on keyboard (on press Enter or Space)
document.body.addEventListener("keypress", (event) => {
  console.log(event.key);
  if ((event.key === "Enter" || event.key === " ") && !gameStarted) {
    event.preventDefault();
    startButton.click();
  }
});

// Functions
function handleGame() {
  let start = setInterval(() => {
    timeLeft.innerHTML--;

    if (timeLeft.textContent === "0") {
      if (gameOver()) {
        clearInterval(start);
        gameSection.style.display = "none";
      }
    }
  }, 1000);
}

function generateWord() {
  let randomWord = words[Math.floor(Math.random() * words.length)];
  let wordIndex = words.indexOf(randomWord);
  words.splice(wordIndex, 1);

  // Handle left words
  // Clean up the div
  wordsLeftContainer.innerHTML = "";
  for (let i = 0; i < words.length; i++) {
    wordsLeftContainer.innerHTML += `
      <span>${words[i]}</span>
    `;
  }
  return randomWord;
}

function gameOver() {
  // Winning Case
  if (
    currentWordNumber.textContent === TotalWordsNumber.textContent &&
    wordInput.value.toLowerCase() === currentWord.textContent.toLowerCase()
  ) {
    finishMessage.style.display = "block";
    finishMessage.innerHTML = "You Win!";
    finishMessage.classList.add("good");
    return true;
  }
  // Losing Case
  if (wordInput.value.toLowerCase() !== currentWord.textContent.toLowerCase()) {
    finishMessage.style.display = "block";
    finishMessage.innerHTML = "You Lose";
    finishMessage.classList.add("bad");
    return true;
  }
  // Playing Case
  nextWord();
  return false;
}

function nextWord() {
  // Get the next word
  currentWordNumber.innerHTML++;
  timeLeft.innerHTML = defaultTime;
  wordInput.value = "";
  // Generate a random word and handle the words left
  currentWord.innerHTML = generateWord();
}
