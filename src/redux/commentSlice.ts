import {createAsyncThunk , createSlice} from "@reduxjs/toolkit";
import {FetchApi} from "../Data/fetchApi.ts";
import {channelBYID , SubStat} from "./channelSclice.ts";

interface commentType {
    loading : boolean,
    comments : any,
    error : null | string,
    token :  string | null
}

const initialState : commentType = {
    loading : false,
    comments : {},
    error : null,
    token :  null
}

export const GetComments = createAsyncThunk<
    {comments : any},
    {id : string},
    {rejectValue : string}
>(
    'comment/getComments',async ({id},{rejectWithValue, getState}) => {
        try {
            const res = await FetchApi("/commentThreads",{
                params : {
                    part : 'snippet',
                    videoId : id
                }
            })
            console.log(getState().auth.accessToken)
            return {comments : res.data.items}
        }catch (error){
            return rejectWithValue(error.message)
        }
    }
)

export const postComments = createAsyncThunk<
    {},
    {id? : string, text : string},
    {rejectValue : string}
>(
    'comment/postComments', async ({id, text}, {rejectWithValue, getState, dispatch})=>{

        const obj = {
            "snippet" : {
                "videoId": id,
                "topLevelComment":{
                    "snippet":{
                        "textOriginal" : text
                    }
                }
            }
        }

        try {
            await FetchApi.post("/commentThreads",obj,{
                params:{
                    part : 'snippet'
                },
                headers:{
                    Authorization : `Bearer ${getState().auth.accessToken}`,
                    // Accept: 'application/json',
                }
            })
            console.log(obj)
            setTimeout(()=>dispatch(GetComments( { id : id })), 3000)
            // console.log(getState().auth?.accessToken)
            return
        }catch (error){
            return rejectWithValue(error.response.data)
        }
    }
)

export const commentSlice = createSlice({
    name : 'comment',
    initialState,
    reducers : {
        display(initialState){
            initialState
        }
    },
    extraReducers:(builder) => {
        builder
            .addCase(GetComments.pending,(state : commentType)=>{
                state.loading = true
                state.error = null
            })
            .addCase(GetComments.fulfilled, (state :commentType, action)=>{
                state.loading = false
                state.error = null
                state.comments = action.payload.comments
            })
            .addCase(GetComments.rejected, (state :commentType, action)=>{
                state.loading = false
                state.error = action.payload || 'comments not found'
            })
            .addCase(postComments.rejected, (state :commentType, action)=>{
                state.loading = false
                state.error = action.payload || 'comments not found'
            })
            .addCase(postComments.fulfilled, (state :commentType)=>{
                state.loading = false
                state.error = null
            })
            .addCase(postComments.pending, (state :commentType)=>{
                state.loading = true
                state.error = null
            })
    }
})