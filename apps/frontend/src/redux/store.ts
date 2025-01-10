import { configureStore } from '@reduxjs/toolkit';
import TaskReducer from './slices/task';
import ProjectReducer from './slices/project';

export const store = configureStore({
    reducer: {
        tasks: TaskReducer,
        projects: ProjectReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;