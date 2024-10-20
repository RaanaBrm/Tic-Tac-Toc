// Game Board Module
const gameBoard = (() => {
    let board = ["", "", "", "", "", "", "", "", ""];
  
    const getBoard = () => board;
  
    const updateBoard = (index, symbol) => {
      if (board[index] === "") {
        board[index] = symbol;
        return true;
      }
      return false;
    };
  
    const resetBoard = () => {
      board = ["", "", "", "", "", "", "", "", ""];
    };
  
    return { getBoard, updateBoard, resetBoard };
  })();
  
  // Player Factory
  const Player = (name, symbol) => {
    return { name, symbol };
  };
  
  // Game Flow Module
  const gameController = (() => {
    let players = [];
    let currentPlayerIndex = 0;
    let gameOver = false;
  
    const init = () => {
      players = [Player("Player 1", "X"), Player("Player 2", "O")];
      currentPlayerIndex = 0;
      gameOver = false;
      gameBoard.resetBoard();
      displayController.updateMessage(`${players[currentPlayerIndex].name}'s turn`);
    };
  
    const switchPlayer = () => {
      currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
    };
  
    const playRound = (index) => {
      if (gameOver) return;
  
      const boardUpdated = gameBoard.updateBoard(index, players[currentPlayerIndex].symbol);
      if (!boardUpdated) return;
  
      displayController.updateBoard();
  
      if (checkWinner()) {
        gameOver = true;
        displayController.updateMessage(`${players[currentPlayerIndex].name} wins!`);
        return;
      }
  
      if (isBoardFull()) {
        gameOver = true;
        displayController.updateMessage("It's a tie!");
        return;
      }
  
      switchPlayer();
      displayController.updateMessage(`${players[currentPlayerIndex].name}'s turn`);
    };
  
    const checkWinner = () => {
      const board = gameBoard.getBoard();
      const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
      ];
  
      return winConditions.some((combination) => {
        return combination.every((index) => board[index] === players[currentPlayerIndex].symbol);
      });
    };
  
    const isBoardFull = () => {
      return gameBoard.getBoard().every(cell => cell !== "");
    };
  
    return { playRound, init };
  })();
  
  // Display Controller Module
  const displayController = (() => {
    const cells = document.querySelectorAll(".cell");
    const messageElement = document.getElementById("message");
    const restartButton = document.getElementById("restart");
  
    cells.forEach(cell => {
      cell.addEventListener("click", (e) => {
        gameController.playRound(parseInt(e.target.dataset.index));
      });
    });
  
    restartButton.addEventListener("click", () => {
      gameController.init();
      updateBoard();
    });
  
    const updateBoard = () => {
      const board = gameBoard.getBoard();
      cells.forEach((cell, index) => {
        cell.textContent = board[index];
      });
    };
  
    const updateMessage = (message) => {
      messageElement.textContent = message;
    };
  
    return { updateBoard, updateMessage };
  })();
  
  // Initialize Game
  gameController.init();
  