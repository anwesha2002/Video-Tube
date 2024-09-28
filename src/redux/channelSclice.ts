import {createAsyncThunk , createSlice} from "@reduxjs/toolkit";
import {createBootstrapComponent} from "react-bootstrap/ThemeProvider";
import {FetchApi} from "../Data/fetchApi.ts";
import {getVideosById} from "./selectVideoSlice.ts";

interface channelType {
    loading : boolean,
    channel : any,
    subscriptionStatus : boolean,
    error : null | string
}

const initialState : channelType = {
    loading : false,
    channel : {},
    subscriptionStatus : false,
    error : null
}

export const channelBYID = createAsyncThunk<
    {channel : any},
    {id : string},
    {rejectValue : string}
>(
    'channel/getChannel',async ({id},{rejectWithValue, getState}) => {
        try {
            const res = await FetchApi("/channels",{
                params : {
                    part : 'snippet,contentDetails,statistics',
                    id
                }
            })
            console.log(getState().auth.accessToken)
            return {channel : res.data.items[0]}
        }catch (error){
            return rejectWithValue(error.message)
        }
    }
)

export const SubStat = createAsyncThunk<
    {subscriptionStatus : boolean},
    {channelID : string},
    {rejectValue : string}
>(
    'channel/subStat',async ({channelID},{rejectWithValue, getState}) => {
        try {
            const res = await FetchApi("/subscriptions",{
                params : {
                    part : 'snippet',
                    forChannelId : channelID,
                    mine: true,
                },
                headers:{
                    Authorization : `Bearer ${getState().auth.accessToken}`
                }
            })
            console.log(res.data.items)
            return {subscriptionStatus : res.data.items.length !== 0}
        }catch (error){
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
            .addCase(channelBYID.pending,(state : channelType)=>{
                state.loading = true
                state.error = null
            })
            .addCase(channelBYID.fulfilled, (state :channelType, action)=>{
                state.loading = false
                state.error = null
                state.channel = action.payload.channel
            })
            .addCase(channelBYID.rejected, (state :channelType, action)=>{
                state.loading = false
                state.error = action.payload || 'channel not found'
            })
            .addCase(SubStat.fulfilled, (state :channelType, action)=>{
                state.loading = false
                state.error = null
                state.subscriptionStatus = action.payload.subscriptionStatus
            })
            .addCase(SubStat.rejected, (state :channelType, action)=>{
                state.loading = false
                state.error = action.payload || 'failed'
            })
    }
})

