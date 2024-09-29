import {createAsyncThunk , createSlice , PayloadAction} from "@reduxjs/toolkit";
import { searchVideosByKeyword} from "../Data/fetchApi.ts";

interface searchState {
    videos : any[],
    // nextPageToken : string | null,
    loading: boolean;
    error: string | null;
}


const initialState : searchState = {
    videos : [],
    loading : false,
    // nextPageToken : null,
    error : null,
}

export const searchVideosByKeywordThunk = createAsyncThunk<
    {videos  : any[]},
    {keyword : string },
    {rejectValue : string}
>(
    'searchvideo/searchVideosByKeyword',
    async ({ keyword } , {rejectWithValue}) => {
        try {
            const res = await searchVideosByKeyword(keyword)
            console.log('keyword',keyword)
            // console.log('keyword',res.data.items)
            return { videos : res.items }
        }catch (error){
            return rejectWithValue(error.message)
        }
    }
)

export const searchVideoStore = createSlice({
    name : 'searchvideo',
    initialState,
    reducers: {
        display(initialState){
            initialState
        }
    },
    extraReducers:(builder) => {
        builder
            .addCase(searchVideosByKeywordThunk.fulfilled,(state : searchState, action)=>{
                state.loading = false
                state.error = null
                state.videos = action.payload.videos
            })
            .addCase(searchVideosByKeywordThunk.rejected,(state : searchState, action)=>{
                state.loading = false
                state.error = action.payload || 'Login failed'
                // state.activeCategory = 'All'
                // console.log(action.payload.activeCategory)
            })
            .addCase(searchVideosByKeywordThunk.pending,(state : searchState)=>{
                state.loading = true
                state.error = null
                // state.activeCategory = action.meta.arg.keyword
            })
    }
})