import { configureStore } from "@reduxjs/toolkit";
import projectValue from '../../src/store/reducer/selectProject'

export default configureStore({
    reducer: {
        project: projectValue
    }
})