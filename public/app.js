let computerBoard,
  playerBoard = [];
const gameGrid = document.getElementById("game__grid");
const shipsContainer = document.getElementById("ship__container");
const width = 10;

const ships = {
  carrier: {
    length: 5,
    orientation: "horizontal",
  },
  battleship: {
    length: 4,
    orientation: "horizontal",
  },
  crusier: {
    length: 3,
    orientation: "horizontal",
  },
  submarine: {
    length: 3,
    orientation: "horizontal",
  },
  destroyer: {
    length: 2,
    orientation: "horizontal",
  },
};
// from hmtl script
gameMode === "multiPlayer" ? multiplayerMode() : singleplayerMode();

function createGrid() {
  return Array.from({ length: width }, () => Array(width).fill(0));
}

function fillGridDiv() {
  if (!gameGrid) return;
  for (let i = 0; i < 100; i++) {
    const gridItem = document.createElement("div");
    gridItem.classList.add("grid__item");
    gridItem.textContent = i;
    gameGrid.appendChild(gridItem);
  }
}

function createShips() {
  if (!shipsContainer) return;

  for (const oneShip in ships) {
    const ship = document.createElement("div");
    let shipSquares;
    ship.classList.add("ship", oneShip);
    for (let i = 0; i < ships[oneShip].length; i++) {
      shipSquares = document.createElement("div");
      shipSquares.classList.add("ship__square");
      ship.appendChild(shipSquares);
    }
    shipsContainer.appendChild(ship);
  }
}

function placeShipsRandomly() {}
function singleplayerMode() {
  computerBoard = createGrid();
  playerBoard = createGrid();
  fillGridDiv();
  createShips();
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
