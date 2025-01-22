import { makeMove, switchPlayer, initBoard, winningSituation } from '@/utils/index';

describe('Game Utility Functions', () => {
describe('makeMove', () => {
    it('should place a player mark in empty cell', () => {
    const board = initBoard();
    const newBoard = makeMove(board, 0, 0, 'X');
    expect(newBoard[0][0]).toBe('X');
    });

    it('should throw error when cell is already occupied', () => {
    const board = initBoard();
    const occupiedBoard = makeMove(board, 0, 0, 'X');
    expect(() => makeMove(occupiedBoard, 0, 0, 'O')).toThrow();
    });
});

describe('switchPlayer', () => {
    it('should switch from X to O', () => {
    expect(switchPlayer('X')).toBe('O');
    });

    it('should switch from O to X', () => {
    expect(switchPlayer('O')).toBe('X');
    });
});

describe('winningSituation', () => {
    it('should detect horizontal win', () => {
    const board = [
        ['X', 'X', 'X'],
        ['O', 'O', ''],
        ['', '', '']
    ];
    expect(winningSituation(board)).toEqual({ winner: 'X', isDraw: false });
    });

    it('should detect vertical win', () => {
    const board = [
        ['O', 'X', ''],
        ['O', 'X', ''],
        ['O', '', '']
    ];
    expect(winningSituation(board)).toEqual({ winner: 'O', isDraw: false });
    });

    it('should detect diagonal win', () => {
    const board = [
        ['X', 'O', ''],
        ['O', 'X', ''],
        ['', '', 'X']
    ];
    expect(winningSituation(board)).toEqual({ winner: 'X', isDraw: false });
    });

    it('should detect draw', () => {
    const board = [
        ['X', 'O', 'X'],
        ['X', 'O', 'O'],
        ['O', 'X', 'X']
    ];
    expect(winningSituation(board)).toEqual({ winner: null, isDraw: true });
    });
});
});