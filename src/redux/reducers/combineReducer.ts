import { combineReducers } from '@reduxjs/toolkit'
import { userSlice} from "./authreducer.ts"
import {createSliceStore} from "../authSlice.ts";


export const rootReducer = combineReducers({
    auth : userSlice.reducer,
    login : createSliceStore.reducer
})
export type RootState = ReturnType<typeof rootReducer>