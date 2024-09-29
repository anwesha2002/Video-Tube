import {createAsyncThunk , createSlice} from "@reduxjs/toolkit";
import {channelBYID ,  getUploadPlayListID , getVideosByChannel , SubStat} from "../Data/fetchApi.ts";

interface channelType {
    loading : boolean,
    channel : any,
    subscriptionStatus : boolean,
    error : null | string,
    channelVideos : any[]
}

const initialState : channelType = {
    loading : false,
    channel : {},
    subscriptionStatus : false,
    error : null,
    channelVideos : []
}

export const channelBYIDThunk = createAsyncThunk<
    {channel : any},
    {id : string},
    {rejectValue : string}
>(
    'channel/getChannel',async ({id},{rejectWithValue, getState}) => {
        try {
            const res = await channelBYID(id)
            return {channel : res.items[0]}
        }catch (error){
            return rejectWithValue(error.message)
        }
    }
)

export const SubStatThunk = createAsyncThunk<
    {subscriptionStatus : boolean},
    {channelID : string},
    {rejectValue : string}
>(
    'channel/subStat',async ({channelID},{rejectWithValue, getState}) => {
        try {
            const res = await SubStat(channelID, getState)
            console.log(res.items)
            return {subscriptionStatus : res.items.length !== 0}
        }catch (error){
            return rejectWithValue(error.response.data)
        }
    }
)

export const getVideosByChannelThunk = createAsyncThunk<
    {channelVideos : []},
    {id : string},
    {rejectValue : string}
>(
    'channel/getVideosByChannel',async ({id},{rejectWithValue, getState}) => {
        try {
            const res = await getUploadPlayListID(id)

            const uploadPlaylistId = res.items[0].contentDetails.relatedPlaylists.uploads

            const channelres = await getVideosByChannel(uploadPlaylistId)
            console.log(channelres.items)
            console.log(res.items)
            return {channelVideos : channelres.items}
        }catch (error){
            console.log(error.response.data)
            return rejectWithValue(error.response.data)
        }
    }
)


export const channelSlice = createSlice({
    name : 'channel',
    initialState,
    reducers : {
        display(initialState){
            initialState
        }
    },
    extraReducers:(builder) => {
        builder
            .addCase(channelBYIDThunk.pending,(state : channelType)=>{
                state.loading = true
                state.error = null
            })
            .addCase(channelBYIDThunk.fulfilled, (state :channelType, action)=>{
                state.loading = false
                state.error = null
                state.channel = action.payload.channel
            })
            .addCase(channelBYIDThunk.rejected, (state :channelType, action)=>{
                state.loading = false
                state.error = action.payload || 'channel not found'
            })
            .addCase(SubStatThunk.fulfilled, (state :channelType, action)=>{
                state.loading = false
                state.error = null
                state.subscriptionStatus = action.payload.subscriptionStatus
            })
            .addCase(SubStatThunk.rejected, (state :channelType, action)=>{
                state.loading = false
                state.error = action.payload || 'failed'
            })
            .addCase(getVideosByChannelThunk.pending,(state : channelType)=>{
                state.loading = true
                state.error = null
            })
            .addCase(getVideosByChannelThunk.fulfilled, (state :channelType, action)=>{
                state.loading = false
                state.error = null
                state.channelVideos = action.payload.channelVideos
            })
            .addCase(getVideosByChannelThunk.rejected, (state :channelType, action)=>{
                state.loading = false
                state.error = action.payload || 'videos not found'
            })
    }
})

