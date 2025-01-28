/**
 * @author @0verwtch
 * @description This file contains the slices of the user resources.
 */

// Core libs
import { ActionReducerMapBuilder, AsyncThunk, createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

// Helpers and utilities
import { getAllUsers, getSingleUser } from "../../api/users";


export interface User {
    name: string;
    email: string;
    id: string;
}

interface UserState {
    users: User[];
    loading: boolean;
    error: string | null;
}


const InitialState: UserState = {
    users: [],
    loading: true,
    error: null
}


export const fetchUsers = createAsyncThunk<User[]>('users/fetchUsers', async () => {
    const response = await getAllUsers();
    if (response.status == 200) {
        console.log(response.data)
        return response.data as User[];
    }
    return [] as User[];
})

export const fetchSingleUser = createAsyncThunk<User[], number>('users/fetchSingleUser', async (id: number) => {
    const response = await getSingleUser(id);
    if (response.status == 200) {
        return response.data;
    }
    return [];
})



const caseCreator = (
    // Fx should any async thunk with the type of any because they can be very different.
    fx: AsyncThunk<any, any, {}>,
    error: string | null,
    builder: ActionReducerMapBuilder<UserState>,
    invalidate: boolean = false
) => {
    builder.addCase(fx.fulfilled, (state: UserState, action: PayloadAction<User | User[]>) => {
        if (invalidate) {
            state.users = [];
        }
        if (Array.isArray(action.payload)) {
            state.users = action.payload;
        } else {
            state.users.push(action.payload);
        }
        state.loading = false;
    });
    builder.addCase(fx.pending, (state: UserState) => {
        state.loading = true;
    });
    builder.addCase(fx.rejected, (state: UserState) => {
        state.loading = false;
        state.error = error;
    });
}

const userSlice = createSlice({
    name: 'users',
    initialState: InitialState,
    reducers: {},
    extraReducers: (builder) => {
        caseCreator(fetchUsers, 'An error occurred while fetching users', builder);
        caseCreator(fetchSingleUser, 'An error occured while fetching a user', builder, true);
        // caseCreator(deleteTask, 'An error occurred while deleting task', builder);
    }
});

export default userSlice.reducer;