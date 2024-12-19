import {createAsyncThunk , createSlice } from "@reduxjs/toolkit";
import {getDurationView , getIcon , searchVideosByKeyword} from "../Data/fetchApi.ts";

interface searchState {
    videos : any[],
    ViewsDuration :  any[],
    channelIcons : any[],
    // nextPageToken : string | null,
    loading: boolean;
    error: string | null;
}


const initialState : searchState = {
    videos : [],
    ViewsDuration : [],
    channelIcons : [],
    loading : false,
    // nextPageToken : null,
    error : null,
}

export const searchVideosByKeywordThunk = createAsyncThunk<
    {videos  : any[], ViewsDuration : any[], channelIcons : any[]},
    {keyword : string },
    {rejectValue : string}
>(
    'searchvideo/searchVideosByKeyword',
    async ({ keyword } , {rejectWithValue}) => {
        try {
            const res = await searchVideosByKeyword(keyword)
            const ids: any[] = []
            const channelIDs : any[] = []
            res.items.map((video : any)=> {
                ids.push(video?.id?.videoId)
                channelIDs.push(video?.snippet?.resourceId?.channelId || video?.snippet?.channelId)
                // return {videoIds : video?.id?.videoId ||  video?.id || video?.contentDetails?.videoId}
            })
            const duration_and_Views = await getDurationView(ids.join(","))
            const icons = await getIcon(channelIDs.join(","))
            console.log('keyword',keyword)
            // console.log('keyword',res.data.items)
            return { videos : res.items, ViewsDuration : duration_and_Views, channelIcons : icons  }
        }catch (error : any){
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
                state.ViewsDuration = action.payload.ViewsDuration
                state.channelIcons = action.payload.channelIcons
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