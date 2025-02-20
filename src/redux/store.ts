import { configureStore } from '@reduxjs/toolkit';
import repositories from './slices/repositoriesSlice';
export const store = configureStore({
    reducer:{
        repositories
    }
})


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
