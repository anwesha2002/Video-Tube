import {createAsyncThunk , createSlice , PayloadAction} from "@reduxjs/toolkit";
import {getDurationView , getIcon , getVideosByKeyword , getyoutubeVideos} from "../Data/fetchApi.ts";

interface YouTubeVideo {
    id: { videoId?: string; contentDetails?: { videoId: string } } | string;
    snippet: { channelId: string };
}

interface YouTubeResponse {
    items: YouTubeVideo[];
    nextPageToken: string;
}

interface ItemState {
    videos : any[],
    videoIds : any[],
    duration : any[],
    channelIcon : any[],
    nextPageToken : string | null,
    activeCategory: string | null; // Ensure it's initialized properly
    loading: boolean;
    error: string | null;
}


const initialState : ItemState = {
    videos : [],
    videoIds : [],
    duration : [],
    channelIcon : [],
    loading : false,
    nextPageToken : null,
    error : null,
    activeCategory : 'All'
}

export const getyoutubeVideosThunk = createAsyncThunk<
    {videos  : any[],nextPageToken  : string, activeCategory : string, videoIds : any[], duration : any[], channelIcon : any[]},
    void,
    {rejectValue : string}
>(
    'yt_video/getvideos',
    async (_, {rejectWithValue, getState}) => {
        try {
            const res : YouTubeResponse = await getyoutubeVideos(getState)
            const ids: string[]  = []
            const channelIDs: string[] = []
            // const title: any[] = []
            res.items.map((video : any)=> {
                ids.push(video?.id?.videoId ||  video?.id || video?.contentDetails?.videoId)
                channelIDs.push(video?.snippet?.channelId)
                // title.push(video?.snippet.channelTitle)
                // return {videoIds : video?.id?.videoId ||  video?.id || video?.contentDetails?.videoId}
            })
            const duration = await getDurationView(ids)
            const icons = await getIcon(channelIDs.join(","))
            // console.log(res.data.items)
            // console.log(title)
            return { videos : res.items, nextPageToken : res.nextPageToken , activeCategory : (getState() as any).homeVideos.activeCategory, videoIds : ids, duration : duration, channelIcon : icons}
        }catch (error : any){
            return rejectWithValue(error.message)
        }
    }
)

export const getVideosByKeywordThunk = createAsyncThunk<
    {videos  : any[],nextPageToken  : string, activeCategory : string, videoIds : any[], duration: any[], channelIcon : any[]},
    {keyword : string },
    {rejectValue : string}
>(
    'yt_video/getvideosbykeyword',
    async ({ keyword } , {rejectWithValue,getState}) => {
        try {
            const res = await getVideosByKeyword(keyword,getState)
            console.log('keyword',keyword)
            const ids : any[] = []
            const channelIDs: any[] = []
            res.items.map((video : any)=> {
                ids.push(video?.id?.videoId ||  video?.id || video?.contentDetails?.videoId)
                channelIDs.push(video?.snippet?.channelId)
                // return {videoIds : video?.id?.videoId ||  video?.id || video?.contentDetails?.videoId}
            })
            const duration = await getDurationView(ids.join(","))
            const icons = await getIcon(channelIDs.join(","))
            // console.log('keyword',res.data.items)
            return { videos : res.items, nextPageToken : res.nextPageToken, activeCategory : keyword, videoIds : ids, duration : duration, channelIcon : icons }
        }catch (error : any){
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
           .addCase(getyoutubeVideosThunk.fulfilled,(state : ItemState, action)=>{
               state.loading = false
               state.videos =   [...state.videos , ...action.payload.videos]
               state.videoIds =   [...state.videoIds , ...action.payload.videoIds]
               state.duration =   [...state.duration , ...action.payload.duration]
               state.channelIcon =   [...state.channelIcon , ...action.payload.channelIcon]
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
               prevValue === action.payload.activeCategory ? state.videoIds = [...state.videoIds , ...action.payload.videoIds] : state.videoIds = action.payload.videoIds
               prevValue === action.payload.activeCategory ? state.duration = [...state.duration , ...action.payload.duration] : state.duration = action.payload.duration
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

