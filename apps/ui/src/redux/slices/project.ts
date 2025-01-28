/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * @author @0verwtch
 * @description This file contains a slice for the projects in the Redux store.
 */
import { AsyncThunk, createSlice, createAsyncThunk, PayloadAction, ActionReducerMapBuilder } from '@reduxjs/toolkit';

import { GetAllProjects, GetSingleProject, DeleteProject, SearchProjects } from '../../api/projects';

interface Project { 
    id: number;
    name: string;
    description: string;
    deadline: string;
    owner: number;
    created_at: string;
    updated_at: string;
}

interface ProjectState {
    projects: Project[];
    loading: boolean;
    error: string | null;
}

const InitialState: ProjectState = { 
    projects: [],
    loading: true,
    error: null
}

// Helper function for creating cases for the async thunks.
const caseCreator = (
    // Fx should any async thunk with the type of any because they can be very different.
    fx: AsyncThunk<any, any, {}>,
    error: string | null,
    builder: ActionReducerMapBuilder<ProjectState>,
    invalidate: boolean = false
) => {
    builder.addCase(fx.fulfilled, (state: ProjectState, action: PayloadAction<Project | Project[]>) => {
        if (invalidate) { 
            state.projects = [];
        }
        if (Array.isArray(action.payload)) {
            state.projects = action.payload;
        } else {
            state.projects.push(action.payload);
        }
        state.loading = false;
    });
    builder.addCase(fx.pending, (state: ProjectState) => {
        state.loading = true;
    });
    builder.addCase(fx.rejected, (state: ProjectState) => {
        state.loading = false;
        state.error = error;
    });
}

export const fetchProjects = createAsyncThunk<Project[]>('projects/fetchProjects', async () => {
    const response = await GetAllProjects();
    if (response.status == 200) {
        console.log("Thunk results", response)
        return response.data as Project[]
    }
    return [] as Project[]
});
export const fetchSingleProject = createAsyncThunk<Project, number>('projects/fetchSingleProject', async (id: number) => {
    const response = await GetSingleProject(id);
    return response as Project;
});
export const deleteProject = createAsyncThunk('projects/deleteProject', async (id: number) => { 
    const response = await DeleteProject(id);
    return response;
});

export const fetchSearchProjects = createAsyncThunk<Project[], string>('projects/search', async (search: string) => { 
    const response = await SearchProjects(search);
    if (response.status == 200) {
        alert(`Search returned ${response.data.length} results`)
        return response.data as Project[]
    }
    alert("Search returned no results");
    window.location.reload()
    return [] as Project[];
})

const projectSlice = createSlice({
    name: 'projects',
    initialState: InitialState,
    reducers: {},
    extraReducers: (builder: ActionReducerMapBuilder<ProjectState>) => {
        caseCreator(fetchProjects, 'An error occurred while fetching projects', builder);
        caseCreator(fetchSingleProject, 'An error occurred while fetching project', builder, true);
        caseCreator(deleteProject, 'An error occurred while deleting project', builder);
        caseCreator(fetchSearchProjects, 'An error Occured search', builder, true);
    }
})

export default projectSlice.reducer;