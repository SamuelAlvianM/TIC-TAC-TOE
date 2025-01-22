import { configureStore } from '@reduxjs/toolkit';
import gameReducer from '@/hooks/gameSlice';

// bikin interface dulu untuk di mock
interface GameState {
    board: string[][];
    currentPlayer: string;
    winner: string | null;
    isDraw: boolean;
}

interface RootState {
    game: GameState;
}

// buat mock state di awal
const initialState: RootState = {
    game: {
    board: Array.from({ length: 3 }, () => Array(3).fill('')),
    currentPlayer: 'X',
    winner: null,
    isDraw: false,
    },
};

// untuk penggunaan initState sama custom nya kita wrapping jadi 1 variabel dulu
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

// ini untuk dispatch mock func

/*
KARNA AKU PAKE REDUX ini cat kecil untuk kalian yang pakai juga, kemungkinan di context juga bisa pakai ini


Dispatch = untuk mengirimkan aksi / action

Action  = untuk perubahan yang akan dilakukan

Payload = informasi yang dibutuhkan untuk melakukan perubahan state

Reducer = fungsi yang dipakai untuk menerima state dan aksi yang dikirimkan.
*/
export const mockDispatch = jest.fn();

// ini export mockState untuk dipakai di file lain
export const mockState = initialState;

// Mock game.mock nya yang uda dibikin sekarang
const mockSelector = jest.fn();
export const useSelector = mockSelector;
export const useDispatch = () => mockDispatch;

// Default export  jest.mock
export default {
    useSelector: <T>(callback: (state: RootState) => T) => callback(mockState),
    useDispatch: () => mockDispatch,
};