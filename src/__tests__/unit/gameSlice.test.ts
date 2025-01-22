import gameReducer, { playTurn, resetGame } from '@/hooks/gameSlice';

describe('Game Slice', () => {
    const initialState = {
    board: Array(3).fill(null).map(() => Array(3).fill('')),
    currentPlayer: 'X',
    winner: null,
    isDraw: false,
    };

    it('should handle initial state', () => {
    expect(gameReducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });

    it('should handle playTurn', () => {
    const actual = gameReducer(initialState, playTurn({ row: 0, col: 0 }));
    expect(actual.board[0][0]).toBe('X');
    expect(actual.currentPlayer).toBe('O');
    });

    it('should not allow playing in occupied cell', () => {
    const stateWithMove = gameReducer(initialState, playTurn({ row: 0, col: 0 }));
    const actual = gameReducer(stateWithMove, playTurn({ row: 0, col: 0 }));
    expect(actual).toEqual(stateWithMove);
    });

    it('should handle resetGame', () => {
    const stateWithMoves = gameReducer(
        initialState,
        playTurn({ row: 0, col: 0 })
    );
    const actual = gameReducer(stateWithMoves, resetGame());
    expect(actual).toEqual(initialState);
    });
}); 