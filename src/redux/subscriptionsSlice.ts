import {createAsyncThunk , createSlice , PayloadAction} from "@reduxjs/toolkit";
import {getDurationView , getIcon , getsubscriptions} from "../Data/fetchApi.ts";

interface subscriptionsState {
    subscriptions : any[],
    ViewsDuration : any[],
    channelIcons : any[],
    // nextPageToken : string | null,
    // activeCategory: string | null; // Ensure it's initialized properly
    loading: boolean;
    error: string | null;
}


const initialState : subscriptionsState = {
    subscriptions : [],
    ViewsDuration : [],
    channelIcons : [],
    loading : false,
    // nextPageToken : null,
    error : null,
    // activeCategory : 'All'
}

export const getsubscriptionsThunk = createAsyncThunk<
    {subscriptions : any[],ViewsDuration : any[], channelIcons : any[],},
    void,
    {rejectValue : string}
>(
    'subscription/getsubscriptions',async (_,{rejectWithValue, getState}) => {
        try {
            const res = await getsubscriptions(getState)
            const ids : any[] = []
            const channelIDs : any[] = []
            res.items.map((video : any)=> {
                ids.push(video?.id?.videoId || video?.id)
                channelIDs.push(video?.snippet?.resourceId?.channelId || video?.snippet.channelId || video.channelId)
                // return {videoIds : video?.id?.videoId ||  video?.id || video?.contentDetails?.videoId}
            })
            const duration_and_Views = await getDurationView(ids.join(","))
            const icons = await getIcon(channelIDs.join(","))
            console.log(res.items)
            return {subscriptions : res.items, ViewsDuration : duration_and_Views, channelIcons : icons}
        }catch (error : any){
            return rejectWithValue(error.response.data)
        }
    }
)


export const subscriptionSliceStore = createSlice({
    name : 'subscription',
    initialState,
    reducers: {
        display(initialState){
            initialState
        }
    },
    extraReducers:(builder) => {
        builder
            .addCase(getsubscriptionsThunk.fulfilled,(state : subscriptionsState, action)=>{
                state.loading = false
                state.subscriptions =   action.payload.subscriptions
                state.ViewsDuration = action.payload.ViewsDuration
                state.channelIcons = action.payload.channelIcons
                // state.nextPageToken = action.payload.nextPageToken
                state.error = null
                // state.activeCategory = 'All'
            })
            .addCase(getsubscriptionsThunk.rejected,(state : subscriptionsState, action : PayloadAction<string | undefined>)=>{
                state.loading = false
                state.error = action.payload || 'Login failed'
            })
            .addCase(getsubscriptionsThunk.pending,(state : subscriptionsState)=>{
                state.loading = true
                state.error = null
                // state.activeCategory = 'All'
            })
    }
})