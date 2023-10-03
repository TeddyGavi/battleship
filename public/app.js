let computerBoard,
  playerBoard = [];
const gameGrid = document.getElementsByClassName("game__grid");
const width = 10;

const carrier = {
  length: 5,
  orientation: horizontal,
};
const battleship = {
  length: 4,
  orientation: horizontal,
};
const crusier = {
  length: 3,
  orientation: horizontal,
};
const submarine = {
  length: 3,
  orientation: horizontal,
};
const destroyer = {
  length: 2,
  orientation: horizontal,
};
// from hmtl script
gameMode === "multiPlayer" ? multiplayerMode() : singleplayerMode();

function createGrid() {
  return Array.from({ length: width }, () => Array(width).fill(0));
}

function fillGridDiv() {
  for (let i = 0; i < 100; i++) {
    const gridItem = document.createElement("div");
    gridItem.classList.add("grid__item");
    gridItem.textContent = i + 1;
  }

  gameGrid.appendChile(gridItem);
}

function placeShipsRandomly() {}
function singleplayerMode() {
  console.log("single player");
  computerBoard = createGrid();
  playerBoard = createGrid();
  fillGridDiv();
}

function multiplayerMode() {
  const socket = io();
  socket.on("connection", () => {
    console.log("hi from client");
  });
}

/* 
create grid
populate grid with ships
- need to make sure that grid and ships are placed correctly and aren't over lapping
player goes first
- need to keep track of how many times a ship are hit
computer randomly selects a point on the grid


*/
