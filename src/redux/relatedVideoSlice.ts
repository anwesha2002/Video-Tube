import {createAsyncThunk , createSlice} from "@reduxjs/toolkit";
import { getReletedVideos} from "../Data/fetchApi.ts";


interface relatedVideosState {
    relatedVideos : any[],
    loading: boolean;
    error: string | null;
}


const initialState : relatedVideosState = {
    relatedVideos : [],
    loading : false,
    error : null,
}
export const getReletedVideosTHunk = createAsyncThunk<
    {relatedVideos  : any[]},
    {id : string },
    {rejectValue : string}
>(
    'relatedVideos/getRelatedVideos',
    async ({ id } , {rejectWithValue, getState}) => {
        try {
            const res = await getReletedVideos(id)

            console.log(res)
            return { relatedVideos : res.items }
        }catch (error){
            return rejectWithValue(error.response.data)
        }
    }
)

export const relatedVieos = createSlice({
    name : 'relatedVideos',
    initialState,
    reducers:{
        display(initialState){
            initialState
        }
    },
    extraReducers : (builder) =>{
        builder
            .addCase(getReletedVideosTHunk.pending,(state : relatedVideosState)=>{
                state.loading = true
                state.error = null
                // state.activeCategory = action.meta.arg.keyword
            })
            .addCase(getReletedVideosTHunk.fulfilled,(state : relatedVideosState, action)=>{
                state.loading = false
                state.error = null
                state.relatedVideos = action.payload.relatedVideos
                // state.activeCategory = action.meta.arg.keyword
            })
            .addCase(getReletedVideosTHunk.rejected,(state : relatedVideosState, action)=>{
                state.loading = false
                state.error = action.payload || 'loading false'
                // state.activeCategory = action.meta.arg.keyword
            })

    }
})