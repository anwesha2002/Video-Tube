import {createAsyncThunk , createSlice} from "@reduxjs/toolkit";
import { getVideosById} from "../Data/fetchApi.ts";


interface ItemState {
    videos : { statistics : any }[],
    // nextPageToken : string | null,
    // activeCategory: string | null; // Ensure it's initialized properly
    loading: boolean;
    error: string | null;
}


const initialState : ItemState = {
    videos : [],
    loading : false,
    // nextPageToken : null,
    error : null,
    // activeCategory : 'All'
}

export const getVideosByIdThunk = createAsyncThunk<
    { videos: any[]},
    {id : string },
    {rejectValue : string}
>(
    'yt_select_video/getByID',
    async ({id}, { rejectWithValue }) => {
        try {
            const res = await getVideosById(id)
            return {videos : res.items[0] }
        }catch (error : any){
            return rejectWithValue(error.message)
        }
    }
)

export const selectVideoSliceStore = createSlice( {
    name : 'yt_select_video' ,
    initialState ,
    reducers:{
        display(initialState){
            initialState
        }
    },
    extraReducers : (builder) => {
        builder
            .addCase(getVideosByIdThunk.pending,(state: ItemState)=>{
                state.loading = true
                state.error = null
            })
            .addCase(getVideosByIdThunk.fulfilled,(state: ItemState, action)=>{
                state.loading = false
                state.videos = action.payload.videos
                state.error = null
            })
            .addCase(getVideosByIdThunk.rejected,(state: ItemState, action)=>{
                state.loading = false
                state.error = action.payload || 'video does not exist'
            })
    }
})