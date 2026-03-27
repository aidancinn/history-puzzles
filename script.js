const GRID_SIZE = 36;
const WORD = "FEDERALDEPOSITINSURANCECORPORATION";

const grid = document.getElementById("grid");
const message = document.getElementById("message");
const codeBox = document.getElementById("codeBox");
const codeInput = document.getElementById("codeInput");
const submitCode = document.getElementById("submitCode");

let matrix = [];
let solutionPath = [];
let selectedPath = [];
let isSelecting = false;
let solved = false;

let startCell = null;
let currentDirection = null;

function randomLetter() {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return letters[Math.floor(Math.random() * letters.length)];
}

function buildMatrix() {
  matrix = Array.from({ length: GRID_SIZE }, () =>
    Array.from({ length: GRID_SIZE }, () => randomLetter())
  );
}

function placeWord() {
  const targetCol = 15;
  const targetRow = 13;
  const tIndex = 13;

  const startRow = targetRow - tIndex;
  const startCol = targetCol - tIndex;

  solutionPath = [];

  for (let i = 0; i < WORD.length; i++) {
    const row = startRow + i;
    const col = startCol + i;
    matrix[row][col] = WORD[i];
    solutionPath.push(`${row}-${col}`);
  }
}

function renderGrid() {
  grid.innerHTML = "";

  for (let row = 0; row < GRID_SIZE; row++) {
    for (let col = 0; col < GRID_SIZE; col++) {
      const cell = document.createElement("div");
      cell.className = "cell";
      cell.textContent = matrix[row][col];
      cell.dataset.row = row;
      cell.dataset.col = col;
      cell.dataset.key = `${row}-${col}`;

      cell.addEventListener("pointerdown", (e) => {
        e.preventDefault();
        startSelection(cell);
      });

      cell.addEventListener("pointerenter", () => {
        extendSelection(cell);
      });

      grid.appendChild(cell);
    }
  }
}

function clearPreview() {
  document.querySelectorAll(".cell.preview").forEach(cell => {
    cell.classList.remove("preview");
  });
}

function getCoords(cell) {
  return {
    row: Number(cell.dataset.row),
    col: Number(cell.dataset.col)
  };
}

function normalizeStep(value) {
  if (value === 0) return 0;
  return value > 0 ? 1 : -1;
}

function getDirection(start, end) {
  const rowDiff = end.row - start.row;
  const colDiff = end.col - start.col;

  const rowStep = normalizeStep(rowDiff);
  const colStep = normalizeStep(colDiff);

  const isHorizontal = rowDiff === 0 && colDiff !== 0;
  const isVertical = colDiff === 0 && rowDiff !== 0;
  const isDiagonal = Math.abs(rowDiff) === Math.abs(colDiff) && rowDiff !== 0;

  if (!isHorizontal && !isVertical && !isDiagonal) {
    return null;
  }

  return { rowStep, colStep };
}

function buildPath(start, end, direction) {
  const path = [];
  let row = start.row;
  let col = start.col;

  path.push(`${row}-${col}`);

  while (row !== end.row || col !== end.col) {
    row += direction.rowStep;
    col += direction.colStep;
    path.push(`${row}-${col}`);
  }

  return path;
}

function previewPath(path) {
  clearPreview();
  path.forEach(key => {
    const cell = document.querySelector(`.cell[data-key="${key}"]`);
    if (cell) cell.classList.add("preview");
  });
}

function startSelection(cell) {
  if (solved) return;

  isSelecting = true;
  startCell = getCoords(cell);
  currentDirection = null;
  selectedPath = [cell.dataset.key];

  clearPreview();
  cell.classList.add("preview");
}

function extendSelection(cell) {
  if (!isSelecting || solved || !startCell) return;

  const endCell = getCoords(cell);

  if (endCell.row === startCell.row && endCell.col === startCell.col) {
    selectedPath = [`${startCell.row}-${startCell.col}`];
    previewPath(selectedPath);
    return;
  }

  const direction = getDirection(startCell, endCell);

  if (!direction) {
    return;
  }

  currentDirection = direction;
  selectedPath = buildPath(startCell, endCell, currentDirection);
  previewPath(selectedPath);
}

function sameArray(a, b) {
  if (a.length !== b.length) return false;
  return a.every((value, index) => value === b[index]);
}

function finishSelection() {
  if (!isSelecting || solved) return;

  isSelecting = false;

  if (sameArray(selectedPath, solutionPath)) {
    solved = true;

    selectedPath.forEach(key => {
      const cell = document.querySelector(`.cell[data-key="${key}"]`);
      if (cell) {
        cell.classList.remove("preview");
        cell.classList.add("correct");
      }
    });

    message.textContent = "correct. enter initials";
    codeBox.classList.remove("hidden");
  } else {
    clearPreview();
    selectedPath = [];
    message.textContent = "try again";

    setTimeout(() => {
      if (!solved) message.textContent = "";
    }, 700);
  }

  startCell = null;
  currentDirection = null;
}

document.addEventListener("pointerup", finishSelection);

submitCode.addEventListener("click", () => {
  const value = codeInput.value.trim().toUpperCase();

  if (value === "FDIC") {
    window.location.href = "puzzle2.html";
  } else {
    message.textContent = "wrong code";
  }
});

codeInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    submitCode.click();
  }
});

function init() {
  buildMatrix();
  placeWord();
  renderGrid();
}

init();