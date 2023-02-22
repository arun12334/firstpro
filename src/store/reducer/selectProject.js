import { createSlice } from "@reduxjs/toolkit";

export const project = createSlice({
    name: 'project',
    initialState: {
        project: {},
        process: {}
    },
    reducers: {
        selectedProject: (state, action) => {
            state.project = action.payload
        },
        selectedProcess: (state, action) => {
            state.process = action.payload
        }

    }
});

export const { selectedProject, selectedProcess } = project.actions
export default project.reducer