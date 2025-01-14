
// jadi ga kepake karena udah pake redux



// import { useMemo, useState } from 'react';
// import { initBoard, winningSituation, makeMove, switchPlayer } from '../utils/index';


// interface GameState {
//     winner: string | null;
//     isDraw: boolean;
// }
// export const useGameState = () => {
// const [board, setBoard] = useState(initBoard());
// const [currentPlayer, setCurrentPlayer] = useState('X');

// const gameStatus = useMemo (() => winningSituation(board), [board]);

// const playTurn = (row: number, col: number) => {
//     if (board[row][col] || gameStatus.winner) return;

//     const updatedBoard = makeMove(board, row, col, currentPlayer);
//     const gameStatus = winningSituation(updatedBoard);

//     setBoard(updatedBoard);

//     if (!gameStatus.winner && !gameStatus.isDraw) {
//         setCurrentPlayer(switchPlayer(currentPlayer));
//         }
//     };

// return { board, currentPlayer, status, playTurn };
// };
