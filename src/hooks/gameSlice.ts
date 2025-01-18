import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initBoard, winningSituation, makeMove, switchPlayer } from '../utils/index';


interface GameState {
    board: string[][];
    currentPlayer: string;
    winner: string | null;
    isDraw: boolean;
}

const initialState: GameState = {
    board: initBoard(),
    currentPlayer: 'X',
    winner: null,
    isDraw: false,
}

const gameSlice = createSlice ({
    name: 'tic-tac-toe-sam',
    initialState,
    reducers: {
        playTurn: ( state, action: PayloadAction<{row: number, col: number }>) => {
            const { row, col } = action.payload;
            if(state.board[row][col] || state.winner) return;

            state.board = makeMove (state.board, row, col, state.currentPlayer);
            
            const gameStatus = winningSituation(state.board);

            state.winner = gameStatus.winner;
            state.isDraw = gameStatus.isDraw;

            if(!gameStatus.winner && !gameStatus.isDraw) {
                state.currentPlayer = switchPlayer(state.currentPlayer);
            }
        },

        resetGame: (state) => {
            state.board = initBoard(),
            state.currentPlayer = 'X',
            state.winner = null;
            state.isDraw = false;
        },
    },
});

export const { playTurn, resetGame} = gameSlice.actions;
export default gameSlice.reducer;