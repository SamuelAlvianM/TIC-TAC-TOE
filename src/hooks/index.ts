import {configureStore} from '@reduxjs/toolkit';
import gameReducer from './gameSlice';

const konteks_redux_ttt = configureStore({
    reducer: {
        game: gameReducer,
    },
});

export type RootState = ReturnType<typeof konteks_redux_ttt.getState>;
export type AppDispatch = typeof konteks_redux_ttt.dispatch;

export default konteks_redux_ttt;