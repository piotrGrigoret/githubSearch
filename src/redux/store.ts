import { configureStore } from '@reduxjs/toolkit';
import { githubApi } from './api';
import github from './slices/githubSlice';
export const store = configureStore({
    reducer: {
        github,
        [githubApi.reducerPath]: githubApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(githubApi.middleware),
    
})


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
