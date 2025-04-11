import { configureStore } from '@reduxjs/toolkit';
import farmslice from './farm';

export const store = configureStore({
    reducer: {
        farm: farmslice.reducer,
    },    
});