const gameGrid = document.getElementById("game__grid");
const shipsContainer = document.getElementById("ship__container");
const width = 10;

const randomNumberBetween = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
const ships = [
  {
    name: "carrier",
    size: 5,
    orientation: "horizontal",
  },
  {
    name: "battleship",
    size: 4,
    orientation: "horizontal",
  },
  {
    name: "crusier",
    size: 3,
    orientation: "horizontal",
  },
  {
    name: "submarine",
    size: 3,
    orientation: "horizontal",
  },
  {
    name: "destroyer",
    size: 2,
    orientation: "horizontal",
  },
];
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

// function placeShipsRandomly() {
//   playerBoard = createGrid();
//   console.table(playerBoard);
//   for (let i = 0; i < ships.length; i++) {
//     let currentShipLength = ships[i].size;
//     let shipOrientation = ships[i].orientation;
//     for (let j = 0; j < playerBoard.length; j++) {
//       const randomRowStart = randomNumberBetween(0, playerBoard[j].length - 1);
//       const randomRow = playerBoard[randomRowStart];
//       for (let ii = 0; ii < currentShipLength; ii++) {
//         if (currentShipLength < randomRow.length - randomRowStart) {
//           randomRow[ii] = 1;
//         }
//       }
//     }
//   }
//   console.table(playerBoard);
// }

function placeShip(playerBoard, currentShipLength, shipOrientation) {
  let shipPlaced = false;
  while (!shipPlaced) {
    const randomRowStart = randomNumberBetween(0, playerBoard.length - 1);
    const randomColStart = randomNumberBetween(0, playerBoard[0].length - 1);

    if (
      canPlaceShip(
        playerBoard,
        randomRowStart,
        randomColStart,
        currentShipLength,
        shipOrientation
      )
    ) {
      // If the ship can be placed at the chosen position, place it
      for (let ii = 0; ii < currentShipLength; ii++) {
        if (shipOrientation === "horizontal") {
          playerBoard[randomRowStart][randomColStart + ii] = 1;
        } else {
          playerBoard[randomRowStart + ii][randomColStart] = 1;
        }
      }
      shipPlaced = true; // Set the flag to true to exit the loop
    }
  }
  return false;
}

function placeShipsRandomly() {
  let playerBoard = createGrid();
  console.table(playerBoard);
  for (let i = 0; i < ships.length; i++) {
    let currentShipLength = ships[i].size;
    let shipOrientation = ships[i].orientation;

    if (!placeShip(playerBoard, currentShipLength, shipOrientation)) {
      //try other direction
      placeShip(playerBoard, currentShipLength, "vertical");
    }
  }
  console.table(playerBoard);
}

function canPlaceShip(board, row, col, length, orientation) {
  if (orientation === "horizontal") {
    if (col + length > board[0].length) {
      return false;
    }
    for (let i = 0; i < length; i++) {
      if (board[row][col + i] !== 0) {
        return false; // There's a ship or part of a ship already there
      }
    }
  } else {
    if (row + length > board.length) {
      return false; // The ship goes beyond the board's boundary
    }
    for (let i = 0; i < length; i++) {
      if (board[row + i][col] !== 0) {
        return false; // There's a ship or part of a ship already there
      }
    }
  }
  return true;
}

function singleplayerMode() {
  computerBoard = createGrid();
  playerBoard = createGrid();
  fillGridDiv();
  createShips();
  placeShipsRandomly();
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
