import { render, fireEvent, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createMockStore } from '../__mocks__/game.mocks';
import Game from '@/pages/game';

describe('Game Page', () => {
it('renders game board and controls', () => {
    const store = createMockStore();
    render(
    <Provider store={store}>
        <Game />
    </Provider>
    );

    expect(screen.getByText('Main XO XO GAS')).toBeInTheDocument();
    expect(screen.getByText('Current Player: X')).toBeInTheDocument();
    expect(screen.getByText('Reset Game')).toBeInTheDocument();
});

it('handles player moves correctly', () => {
    const store = createMockStore();
    render(
    <Provider store={store}>
        <Game />
    </Provider>
    );

    const cells = screen.getAllByRole('button');
    fireEvent.click(cells[0]); // Click first cell
    expect(screen.getByText('Current Player: O')).toBeInTheDocument();
});

it('handles game reset', () => {
    const store = createMockStore();
    render(
    <Provider store={store}>
        <Game />
    </Provider>
    );

    const resetButton = screen.getByText('Reset Game');
    const cells = screen.getAllByRole('button');
    
    // Make some moves
    fireEvent.click(cells[0]);
    fireEvent.click(cells[1]);
    
    // Reset game
    fireEvent.click(resetButton);
    expect(screen.getByText('Current Player: X')).toBeInTheDocument();
});

it('displays winner when game is won', () => {
    const winningState = {
    game: {
        board: [
        ['X', 'X', 'X'],
        ['O', 'O', ''],
        ['', '', '']
        ],
        currentPlayer: 'O',
        winner: 'X',
        isDraw: false,
    }
    };
    
    const store = createMockStore(winningState);
    render(
    <Provider store={store}>
        <Game />
    </Provider>
    );

    expect(screen.getByText('The winner is : X')).toBeInTheDocument();
});
});