import {createAsyncThunk , createSlice , PayloadAction} from "@reduxjs/toolkit";
import {FetchApi} from "../Data/fetchApi.ts";


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

export const getyoutubeVideos = createAsyncThunk<
    {videos  : any[],nextPageToken  : string, activeCategory : string},
    void,
    {rejectValue : string}
>(
    'auth/getvideos',
    async (_, {rejectWithValue, getState}) => {
        try {
            const res = await FetchApi("/videos",{
                params : {
                    part: 'snippet,contentDetails,statistics',
                    chart: 'mostPopular',
                    regionCode: 'IN',
                    maxResults: 20,
                    pageToken: getState().homeVideos.nextPageToken,
                }
            })
            console.log(res.data.items)
            return { videos : res.data.items, nextPageToken : res.data.nextPageToken , activeCategory : getState().homeVideos.activeCategory}
        }catch (error){
            return rejectWithValue(error.message)
        }
    }
)

export const getVideosByKeyword = createAsyncThunk<
    {videos  : any[],nextPageToken  : string, activeCategory : string},
    {keyword : string },
    {rejectValue : string}
>(
    'auth/getvideosbykeyword',
    async ({ keyword } , {rejectWithValue,getState}) => {
        try {
            const res = await FetchApi("/search",{
                params : {
                    part: 'snippet',
                    q:keyword,
                    maxResults: 20,
                    pageToken: getState().homeVideos.nextPageToken,
                    type : 'video'
                }
            })
            // console.log('keyword',keyword)
            // console.log('keyword',res.data.items)
            return { videos : res.data.items, nextPageToken : res.data.nextPageToken, activeCategory : keyword }
        }catch (error){
            return rejectWithValue(error.message)
        }
    }
)
export const videoSliceStore = createSlice({
    name : 'yt_video',
    initialState,
    reducers: {
        display(initialState){
            initialState
        }
    },
    extraReducers:(builder) => {
       builder
           .addCase(getyoutubeVideos.fulfilled,(state : ItemState, action)=>{
               state.loading = false
               state.videos =   [...state.videos , ...action.payload.videos]
               state.nextPageToken = action.payload.nextPageToken
               state.error = null
               state.activeCategory = 'All'
           })
           .addCase(getyoutubeVideos.rejected,(state : ItemState, action : PayloadAction<string | undefined>)=>{
               state.loading = false
               state.error = action.payload || 'Login failed'
           })
           .addCase(getyoutubeVideos.pending,(state : ItemState)=>{
               state.loading = true
               state.error = null
               state.activeCategory = 'All'
           })
           .addCase(getVideosByKeyword.fulfilled,(state : ItemState, action)=>{
               state.loading = false
               const prevValue = state.activeCategory;
               prevValue === action.payload.activeCategory ? state.videos = [...state.videos , ...action.payload.videos] : state.videos = action.payload.videos
               state.nextPageToken = action.payload.nextPageToken
               state.error = null
               console.log(action.payload.activeCategory)
               console.log(prevValue )
               state.activeCategory = action.payload.activeCategory
           })
           .addCase(getVideosByKeyword.rejected,(state : ItemState, action)=>{
               state.loading = false
               state.error = action.payload || 'Login failed'
               // state.activeCategory = 'All'
               // console.log(action.payload.activeCategory)
           })
           .addCase(getVideosByKeyword.pending,(state : ItemState, action)=>{
               state.loading = true
               state.error = null
               // state.activeCategory = action.payload.activeCategory
           })
    }
})