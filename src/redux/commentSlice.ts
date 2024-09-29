import {createAsyncThunk , createSlice} from "@reduxjs/toolkit";
import { GetComments , postComments} from "../Data/fetchApi.ts";

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

export const GetCommentsThunk = createAsyncThunk<
    {comments : any},
    {id : string},
    {rejectValue : string}
>(
    'comment/getComments',async ({id},{rejectWithValue, getState}) => {
        try {
            const res = await GetComments(id)
            console.log(getState().auth.accessToken)
            return {comments : res.items}
        }catch (error){
            return rejectWithValue(error.message)
        }
    }
)

export const postCommentsThunk = createAsyncThunk<
    {},
    {id? : string, text : string},
    {rejectValue : string}
>(
    'comment/postComments', async ({id, text}, {rejectWithValue, getState, dispatch})=>{
        try {
            await postComments(text, getState, id)

            setTimeout(()=>dispatch(GetCommentsThunk( { id : id })), 3000)
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
            .addCase(GetCommentsThunk.pending,(state : commentType)=>{
                state.loading = true
                state.error = null
            })
            .addCase(GetCommentsThunk.fulfilled, (state :commentType, action)=>{
                state.loading = false
                state.error = null
                state.comments = action.payload.comments
            })
            .addCase(GetCommentsThunk.rejected, (state :commentType, action)=>{
                state.loading = false
                state.error = action.payload || 'comments not found'
            })
            .addCase(postCommentsThunk.rejected, (state :commentType, action)=>{
                state.loading = false
                state.error = action.payload || 'comments not found'
            })
            .addCase(postCommentsThunk.fulfilled, (state :commentType)=>{
                state.loading = false
                state.error = null
            })
            .addCase(postCommentsThunk.pending, (state :commentType)=>{
                state.loading = true
                state.error = null
            })
    }
})