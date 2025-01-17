/**
 * @author: @0verwtch
 * @description: This file contains a slice for the tasks in the Redux store.
 */

// Core libs
import { ActionReducerMapBuilder, AsyncThunk, createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

// Helpers and utilities
import { GetAllTasks, GetSingleTask, DeleteTask, SearchTasks } from '../../api/tasks';

// Interfaces
export interface Task {
    id: number;
    title: string;
    description: string;
    priority: number;
    deadline: Date;
    assigned_to: number;
    project_id: number;
    created_at: string;
    updated_at: string;
    complete: boolean;
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

// Async thunks for handling async operations to the api.
export const fetchTasks = createAsyncThunk<Task[]>('tasks/fetchTasks', async () => {
    const response = await GetAllTasks();
    return response as Task[];
});

export const fetchSingleTask = createAsyncThunk<Task, number>('tasks/fetchSingleTask', async (id: number) => {
    console.log("Dispatching fetchSingleTask");
    const response = await GetSingleTask(id);
    console.log("Response: x", response);
    return response as Task;
});

export const deleteTask = createAsyncThunk('tasks/deleteTask', async (id: number) => { 
    const response = await DeleteTask(id);
    return response;
});

export const fetchSearchTasks = createAsyncThunk<Task[], string>('tasks/search', async (search: string) => {
    const response = await SearchTasks(search);
    if (response.status == 200) {
        alert(`Search returned ${response.data.length} results`)
        return response.data as Task[]
    }
    alert("Search returned no results");
    window.location.reload()
    return [] as Task[];
})


// Helper function for creating cases for the async thunks.
const caseCreator = (
    // Fx should any async thunk with the type of any because they can be very different.
    fx: AsyncThunk<any, any, {}>,
    error: string | null,
    builder: ActionReducerMapBuilder<TaskState>,
    invalidate: boolean = false
) => {
    builder.addCase(fx.fulfilled, (state: TaskState, action: PayloadAction<Task | Task[]>) => {
        if (invalidate == true) {
            state.tasks = [];
        }

        if (Array.isArray(action.payload)) {
            state.tasks = action.payload;
        } else {
            state.tasks.push(action.payload);
        }
        state.loading = false;
    });
    builder.addCase(fx.pending, (state: TaskState) => {
        state.loading = true;
    });
    builder.addCase(fx.rejected, (state: TaskState) => {
        state.loading = false;
        state.error = error;
    });
}

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
        caseCreator(fetchSingleTask, 'An error occurred while fetching tasks', builder, true);
        caseCreator(deleteTask, 'An error occurred while deleting task', builder);
        caseCreator(fetchSearchTasks, 'An error occured while serching tasks', builder, true);
    }
});



export const { setTasks } = taskSlice.actions;
export default taskSlice.reducer;