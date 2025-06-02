class Chessboard {
  constructor() {
    this.board = document.getElementById("chessboard");
    this.squares = [];
    this.createBoard();
    this.addEventListnerToBoard();
  }

  createBoard() {
    for (let row = 0; row < 8; ++row) {
      this.squares[row] = [];
      for (let col = 0; col < 8; ++col ) {
        const square = document.createElement("div");
        square.className = `square ${(row + col) % 2 == 0 ? "white" : "black"}`;
        square.dataset.row = row;
        square.dataset.col = col;
        this.squares[row][col] = square;
        this.board.appendChild(square);
      }
    }
  }

  addEventListnerToBoard() {
    this.board.addEventListener("click", (event) => {
      if (!event.target.className.includes("square")) return;
      this.clearHighlights();
      const { row, col } = event.target.dataset;
      console.log(row, col);
      this.showQueenMoves(parseInt(row), parseInt(col));
    });
  }

  showQueenMoves(row, col) {
    // Horizontal moves
    for (let i = 0; i < 8; ++i) {
      if (i !== col) {
        this.squares[row][i].classList.add("highlight");
      }
    }
    // Vertical moves
    for (let j = 0; j < 8; ++j) {
      if (j !== row) {
        this.squares[j][col].classList.add("highlight");
      }
    }

    // Diagonal moves
    for (let i = 1; i < 8; ++i) {
      // Top right
      if (row - i >= 0 && col + i < 8) {
        this.squares[row - i][col + i].classList.add("highlight");
      }
      // Top left
      if (row - i >= 0 && col - i >= 0) {
        this.squares[row - i][col - i].classList.add("highlight");
      }
      // Bottom Right
      if (row + i < 8 && col + i < 8) {
        this.squares[row + i][col + i].classList.add("highlight");
      }
      // Bottom Left
      if (row + i < 8 && col - i >= 0) {
        this.squares[row + i][col - i].classList.add("highlight");
      }
    }
  }

  clearHighlights() {
    this.squares
      .flat()
      .forEach((square) => square.classList.remove("highlight"));
  }
}

window.onload = () => {
  new Chessboard();
};
