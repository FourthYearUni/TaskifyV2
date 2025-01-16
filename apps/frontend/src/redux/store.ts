import { configureStore } from '@reduxjs/toolkit';
import TaskReducer from './slices/task';
import ProjectReducer from './slices/project';
import UserReducer from './slices/user';

export const store = configureStore({
    reducer: {
        tasks: TaskReducer,
        projects: ProjectReducer,
        users: UserReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;