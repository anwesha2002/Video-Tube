import {createAsyncThunk , createSlice} from "@reduxjs/toolkit";
import {FetchApi} from "../Data/fetchApi.ts";


interface ItemState {
    videos : any[],
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

export const getVideosById = createAsyncThunk<
    { videos: any[]},
    {id : string },
    {rejectValue : string}
>(
    'yt_select_video/getByID',
    async ({id}, { rejectWithValue }) => {
        try {
            const res = await FetchApi("/videos",{
                params:{
                    part : 'snippet,contentDetails,statistics',
                    id : id
                }
            })
            return {videos : res.data.items[0] }
        }catch (error){
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
            .addCase(getVideosById.pending,(state: ItemState)=>{
                state.loading = true
                state.error = null
            })
            .addCase(getVideosById.fulfilled,(state: ItemState, action)=>{
                state.loading = false
                state.videos = action.payload.videos
                state.error = null
            })
            .addCase(getVideosById.rejected,(state: ItemState, action)=>{
                state.loading = false
                state.error = action.payload || 'video does not exist'
            })
    }
})