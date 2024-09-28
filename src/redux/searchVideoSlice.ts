import {createAsyncThunk , createSlice , PayloadAction} from "@reduxjs/toolkit";
import {FetchApi} from "../Data/fetchApi.ts";
import {getVideosByKeyword , getyoutubeVideos} from "./videoSlice.ts";

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

export const searchVideosByKeyword = createAsyncThunk<
    {videos  : any[]},
    {keyword : string },
    {rejectValue : string}
>(
    'searchvideo/searchVideosByKeyword',
    async ({ keyword } , {rejectWithValue}) => {
        try {
            const res = await FetchApi("/search",{
                params : {
                    part: 'snippet',
                    maxResults: 20,
                    q: keyword,
                    type: 'video,channel',
                }
            })
            console.log('keyword',keyword)
            // console.log('keyword',res.data.items)
            return { videos : res.data.items }
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
            .addCase(searchVideosByKeyword.fulfilled,(state : searchState, action)=>{
                state.loading = false
                state.error = null
                state.videos = action.payload.videos
            })
            .addCase(searchVideosByKeyword.rejected,(state : searchState, action)=>{
                state.loading = false
                state.error = action.payload || 'Login failed'
                // state.activeCategory = 'All'
                // console.log(action.payload.activeCategory)
            })
            .addCase(searchVideosByKeyword.pending,(state : searchState)=>{
                state.loading = true
                state.error = null
                // state.activeCategory = action.meta.arg.keyword
            })
    }
})