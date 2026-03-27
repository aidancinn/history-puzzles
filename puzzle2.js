const correctAnswer = "NATIONAL HOUSING ADMINISTRATION";

const lettersData = [
  { letter: "M", x: 90,  y: 40 },
  { letter: "A", x: 260, y: 18 },
  { letter: "N", x: 430, y: 52 },
  { letter: "T", x: 610, y: 26 },
  { letter: "I", x: 790, y: 46 },

  { letter: "O", x: 150, y: 108 },
  { letter: "H", x: 345, y: 132 },
  { letter: "U", x: 560, y: 100 },
  { letter: "S", x: 740, y: 138 },
  { letter: "N", x: 875, y: 112 },

  { letter: "A", x: 70,  y: 200 },
  { letter: "D", x: 235, y: 180 },
  { letter: "G", x: 420, y: 214 },
  { letter: "I", x: 595, y: 186 },
  { letter: "R", x: 785, y: 220 },

  { letter: "N", x: 120, y: 288 },
  { letter: "A", x: 310, y: 260 },
  { letter: "L", x: 495, y: 300 },
  { letter: "O", x: 680, y: 272 },
  { letter: "T", x: 860, y: 298 },

  { letter: "I", x: 180, y: 355 },
  { letter: "N", x: 370, y: 338 },
  { letter: "A", x: 540, y: 368 },
  { letter: "L", x: 720, y: 348 },

  { letter: "H", x: 95,  y: 438 },
  { letter: "O", x: 280, y: 410 },
  { letter: "U", x: 470, y: 446 },
  { letter: "S", x: 655, y: 420 },
  { letter: "I", x: 830, y: 452 },

  { letter: "N", x: 210, y: 500 },
  { letter: "G", x: 610, y: 510 },

  { letter: "A", x: 60,  y: 560 },
  { letter: "D", x: 255, y: 590 },
  { letter: "M", x: 450, y: 565 },
  { letter: "I", x: 640, y: 598 },
  { letter: "N", x: 835, y: 570 },

  { letter: "I", x: 145, y: 650 },
  { letter: "S", x: 335, y: 625 },
  { letter: "T", x: 520, y: 660 },
  { letter: "R", x: 715, y: 632 },
  { letter: "A", x: 880, y: 665 },

  { letter: "T", x: 245, y: 730 },
  { letter: "I", x: 455, y: 708 },
  { letter: "O", x: 650, y: 740 },
  { letter: "N", x: 830, y: 715 }
];

const wordLengths = [8, 7, 14];

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
    tile.dataset.letter = item.letter;

    tile.addEventListener("click", () => toggleLetter(tile, item.letter));

    lettersContainer.appendChild(tile);
  });
}

function toggleLetter(tile, letter) {
  const alreadySelected = tile.classList.contains("used");

  if (alreadySelected) {
    tile.classList.remove("used");

    const tileIndex = selectedTiles.indexOf(tile);
    if (tileIndex !== -1) {
      selectedTiles.splice(tileIndex, 1);
      rawAnswer.splice(tileIndex, 1);
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
    const length = wordLengths[i];
    result += letters.slice(index, index + length).join("");
    index += length;

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
  selectedTiles.forEach(tile => tile.classList.remove("used"));
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