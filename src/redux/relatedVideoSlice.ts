import {createAsyncThunk , createSlice} from "@reduxjs/toolkit";
import {getDurationView , getIcon , getReletedVideos} from "../Data/fetchApi.ts";


interface relatedVideosState {
    relatedVideos : any[],
    ViewsDuration :  any[],
    channelIcons : any[],
    loading: boolean;
    error: string | null;
}


const initialState : relatedVideosState = {
    relatedVideos : [],
    ViewsDuration :  [],
    channelIcons : [],
    loading : false,
    error : null,
}
export const getReletedVideosTHunk = createAsyncThunk<
    {relatedVideos  : any[], ViewsDuration : any[], channelIcons : any[]},
    {id : string },
    {rejectValue : string}
>(
    'relatedVideos/getRelatedVideos',
    async ({ id } , {rejectWithValue}) => {
        try {
            const res = await getReletedVideos(id)
            const ids: any[] = []
            const channelIDs: any[] = []
            res.items.map((video : any)=> {
                ids.push(video?.id?.videoId)
                channelIDs.push(video?.snippet?.resourceId?.channelId || video?.snippet?.channelId || video?.channelId)
                // return {videoIds : video?.id?.videoId ||  video?.id || video?.contentDetails?.videoId}
            })
            console.log(channelIDs)
            console.log(ids)

            const duration_and_Views = await getDurationView(ids.join(","))
            const icons = await getIcon(channelIDs.join(","))
            console.log(res)
            return { relatedVideos : res.items, ViewsDuration : duration_and_Views, channelIcons : icons }
        }catch (error : any){
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
                state.ViewsDuration = action.payload.ViewsDuration
                state.channelIcons = action.payload.channelIcons
                // state.activeCategory = action.meta.arg.keyword
            })
            .addCase(getReletedVideosTHunk.rejected,(state : relatedVideosState, action)=>{
                state.loading = false
                state.error = action.payload || 'loading false'
                // state.activeCategory = action.meta.arg.keyword
            })

    }
})