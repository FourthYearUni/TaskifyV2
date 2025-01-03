/**
 * @author: @0verwtch
 * @description: This file contains a slice for the tasks in the Redux store.
 */

// Core libs
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

// Helpers and utilities
import { fetcher } from '../../helpers/fetch';
import env from '../../env';
import { GetAllTasks } from '../../api/tasks';

// Interfaces
export interface Task {
    id: number;
    title: string;
    description: string;
    priority: number;
    deadline: Date;
    user_id: number;
    created_at: string;
    updated_at: string;
};

interface TaskState {
    tasks: Task[];
    loading: boolean;
    error: string | null;
};

const InitialState: TaskState = {
    tasks: [],
    loading: true,
    error: null
};

// Async thunk
export const fetchTasks = createAsyncThunk<Task[]>('tasks/fetchTasks', async () => {
    console.log("Fetching tasks");
    console.log("API URL: ", env.API_URL);
    const response = await GetAllTasks();
    console.log("Response: ", response);
    return response as Task[];
});

const taskSlice = createSlice({
    name: 'tasks',
    initialState: InitialState,
    reducers: {
        setTasks: (state, action: PayloadAction<Task[]>) => {
            state.tasks = action.payload;
        }
    },
    extraReducers: (builder) => { 
        builder.addCase(fetchTasks.fulfilled, (state, action) => { 
            state.tasks = action.payload;
            state.loading = false;
        });
        builder.addCase(fetchTasks.pending, (state) => { 
            state.loading = true;
        });
        builder.addCase(fetchTasks.rejected, (state) => { 
            state.loading = false;
            state.error = 'An error occurred while fetching tasks';
        });
    }
});



export const { setTasks } = taskSlice.actions;
export default taskSlice.reducer;