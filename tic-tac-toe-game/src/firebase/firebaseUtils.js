import firebase from './firebaseConfig';

// Function to initialize a new game in Firebase
export const initializeGame = () => {
  const initialBoard = Array(9).fill(null);
  const initialGame = {
    board: initialBoard,
    currentPlayer: 'X',
  };
  const gameRef = firebase.database().ref('games').push();
  gameRef.set(initialGame);
  return {
    gameId: gameRef.key,
    ...initialGame,
  };
};

// Function to make a move in the game and update game state in Firebase
export const makeMove = (gameState, index) => {
  if (gameState.board[index] || !gameState.currentPlayer) {
    return gameState; // Invalid move or game ended
  }
  const updatedBoard = [...gameState.board];
  updatedBoard[index] = gameState.currentPlayer;
  const nextPlayer = gameState.currentPlayer === 'X' ? 'O' : 'X';
  const gameRef = firebase.database().ref(`games/${gameState.gameId}`);
  gameRef.update({
    board: updatedBoard,
    currentPlayer: nextPlayer,
  });
  return {
    gameId: gameState.gameId,
    board: updatedBoard,
    currentPlayer: nextPlayer,
  };
};
