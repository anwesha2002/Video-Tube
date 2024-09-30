import {createAsyncThunk , createSlice , PayloadAction} from "@reduxjs/toolkit";
import { getVideosByKeyword , getyoutubeVideos} from "../Data/fetchApi.ts";


interface ItemState {
    videos : any[],
    nextPageToken : string | null,
    activeCategory: string | null; // Ensure it's initialized properly
    loading: boolean;
    error: string | null;
}


const initialState : ItemState = {
    videos : [],
    loading : false,
    nextPageToken : null,
    error : null,
    activeCategory : 'All'
}

export const getyoutubeVideosThunk = createAsyncThunk<
    {videos  : any[],nextPageToken  : string, activeCategory : string},
    void,
    {rejectValue : string}
>(
    'yt_video/getvideos',
    async (_, {rejectWithValue, getState}) => {
        try {
            const res  = await getyoutubeVideos(getState)
            // console.log(res.data.items)
            return { videos : res.items, nextPageToken : res.nextPageToken , activeCategory : getState().homeVideos.activeCategory}
        }catch (error){
            return rejectWithValue(error.message)
        }
    }
)

export const getVideosByKeywordThunk = createAsyncThunk<
    {videos  : any[],nextPageToken  : string, activeCategory : string},
    {keyword : string },
    {rejectValue : string}
>(
    'yt_video/getvideosbykeyword',
    async ({ keyword } , {rejectWithValue,getState}) => {
        try {
            const res = await getVideosByKeyword(keyword,getState)
            console.log('keyword',keyword)
            // console.log('keyword',res.data.items)
            return { videos : res.items, nextPageToken : res.nextPageToken, activeCategory : keyword }
        }catch (error){
            return rejectWithValue(error.message)
        }
    }
)


export const videoSliceStore = createSlice({
    name : 'yt_video',
    initialState,
    reducers: {},
    extraReducers:(builder) => {
       builder
           .addCase(getyoutubeVideosThunk.fulfilled,(state : ItemState, action)=>{
               state.loading = false
               state.videos =   [...state.videos , ...action.payload.videos]
               state.nextPageToken = action.payload.nextPageToken
               state.error = null
               state.activeCategory = 'All'
           })
           .addCase(getyoutubeVideosThunk.rejected,(state : ItemState, action : PayloadAction<string | undefined>)=>{
               state.loading = false
               state.error = action.payload || 'Login failed'
           })
           .addCase(getyoutubeVideosThunk.pending,(state : ItemState)=>{
               state.loading = true
               state.error = null
               state.activeCategory = 'All'
           })
           .addCase(getVideosByKeywordThunk.fulfilled,(state : ItemState, action)=>{
               state.loading = false
               const prevValue = state.activeCategory;
               prevValue === action.payload.activeCategory ? state.videos = [...state.videos , ...action.payload.videos] : state.videos = action.payload.videos
               state.nextPageToken = action.payload.nextPageToken
               state.error = null
               console.log(action.payload.activeCategory)
               console.log(prevValue )
               state.activeCategory = action.payload.activeCategory
           })
           .addCase(getVideosByKeywordThunk.rejected,(state : ItemState, action)=>{
               state.loading = false
               state.error = action.payload || 'Login failed'
               // state.activeCategory = 'All'
               // console.log(action.payload.activeCategory)
           })
           .addCase(getVideosByKeywordThunk.pending,(state : ItemState)=>{
               state.loading = true
               state.error = null
               // state.activeCategory = action.meta.arg.keyword
           })
    }
})

