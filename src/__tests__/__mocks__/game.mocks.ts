import { configureStore } from '@reduxjs/toolkit';
import gameReducer from '@/hooks/gameSlice';

// Define the game state interface
interface GameState {
    board: string[][];
    currentPlayer: string;
    winner: string | null;
    isDraw: boolean;
}

// Define the root state interface
interface RootState {
    game: GameState;
}

// Define initial mock state
const initialState: RootState = {
    game: {
    board: Array.from({ length: 3 }, () => Array(3).fill('')),
    currentPlayer: 'X',
    winner: null,
    isDraw: false,
    },
};

// Create mock store with optional custom state
export const createMockStore = (customState: Partial<RootState> = {}) => {
const state = {
    ...initialState,
    ...customState,
};

return configureStore({
    reducer: {
        game: gameReducer,
    },
    preloadedState: state,
    });
};

// Mock dispatch function
export const mockDispatch = jest.fn();

// Export mock state for individual tests
export const mockState = initialState;

// Mock the react-redux hooks
const mockSelector = jest.fn();
export const useSelector = mockSelector;
export const useDispatch = () => mockDispatch;

// Default export for jest.mock
export default {
    useSelector: <T>(callback: (state: RootState) => T) => callback(mockState),
    useDispatch: () => mockDispatch,
};