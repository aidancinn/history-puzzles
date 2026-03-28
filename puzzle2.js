const correctAnswer = "FEDERAL HOUSING ADMINISTRATION";

const lettersData = [
  { letter: "F", x: 120, y: 340 },
  { letter: "E", x: 780, y: 60 },
  { letter: "D", x: 250, y: 190 },
  { letter: "E", x: 630, y: 410 },
  { letter: "R", x: 90,  y: 120 },
  { letter: "A", x: 540, y: 80 },
  { letter: "L", x: 820, y: 300 },

  { letter: "H", x: 300, y: 50 },
  { letter: "O", x: 710, y: 200 },
  { letter: "U", x: 160, y: 420 },
  { letter: "S", x: 460, y: 140 },
  { letter: "I", x: 850, y: 160 },
  { letter: "N", x: 400, y: 300 },
  { letter: "G", x: 200, y: 260 },

  { letter: "A", x: 650, y: 360 },
  { letter: "D", x: 100, y: 260 },
  { letter: "M", x: 780, y: 420 },
  { letter: "I", x: 350, y: 100 },
  { letter: "N", x: 900, y: 250 },
  { letter: "I", x: 500, y: 260 },
  { letter: "S", x: 140, y: 80 },
  { letter: "T", x: 600, y: 180 },
  { letter: "R", x: 270, y: 400 },
  { letter: "A", x: 880, y: 120 },

  { letter: "T", x: 320, y: 350 },
  { letter: "I", x: 700, y: 320 },
  { letter: "O", x: 450, y: 420 },
  { letter: "N", x: 150, y: 200 }
];

const wordLengths = [7, 7, 14];

const lettersContainer = document.getElementById("lettersContainer");
const answerDisplay = document.getElementById("answerDisplay");
const message = document.getElementById("message");
const clearBtn = document.getElementById("clearBtn");
const submitBtn = document.getElementById("submitBtn");

let rawAnswer = [];
let selectedTiles = [];

function createLetters() {
  lettersContainer.innerHTML = "";

  lettersData.forEach((item) => {
    const tile = document.createElement("div");
    tile.className = "letter-tile";
    tile.textContent = item.letter;
    tile.style.left = `${item.x}px`;
    tile.style.top = `${item.y}px`;

    tile.addEventListener("click", () => toggleLetter(tile, item.letter));

    lettersContainer.appendChild(tile);
  });
}

function toggleLetter(tile, letter) {
  const alreadySelected = tile.classList.contains("used");

  if (alreadySelected) {
    tile.classList.remove("used");

    const index = selectedTiles.indexOf(tile);
    if (index !== -1) {
      selectedTiles.splice(index, 1);
      rawAnswer.splice(index, 1);
    }
  } else {
    tile.classList.add("used");
    selectedTiles.push(tile);
    rawAnswer.push(letter);
  }

  renderAnswer();
  message.textContent = "";
  message.className = "message";
}

function formatWithSpaces(letters) {
  let result = "";
  let index = 0;

  for (let i = 0; i < wordLengths.length; i++) {
    const part = letters.slice(index, index + wordLengths[i]).join("");
    result += part;
    index += wordLengths[i];

    if (i < wordLengths.length - 1 && index < letters.length) {
      result += " ";
    }
  }

  return result;
}

function renderAnswer() {
  answerDisplay.textContent = formatWithSpaces(rawAnswer);
}

function clearAnswer() {
  rawAnswer = [];
  selectedTiles.forEach((tile) => tile.classList.remove("used"));
  selectedTiles = [];
  renderAnswer();
  message.textContent = "";
  message.className = "message";
}

function normalize(str) {
  return str.replace(/\s+/g, " ").trim().toUpperCase();
}

clearBtn.addEventListener("click", clearAnswer);

submitBtn.addEventListener("click", () => {
  const typed = normalize(formatWithSpaces(rawAnswer));
  const expected = normalize(correctAnswer);

  if (typed === expected) {
    message.textContent = "correct. opening next file...";
    message.className = "message success";

    setTimeout(() => {
      window.location.href = "puzzle3.html";
    }, 900);
  } else {
    message.textContent = "wrong order. try again.";
    message.className = "message error";
  }
});

createLetters();
renderAnswer();