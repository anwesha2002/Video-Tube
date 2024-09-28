import {createAsyncThunk , createSlice , PayloadAction} from "@reduxjs/toolkit";
import {FetchApi} from "../Data/fetchApi.ts";
import {getVideosByKeyword} from "./videoSlice.ts";

interface subscriptionsState {
    subscriptions : any[],
    // nextPageToken : string | null,
    // activeCategory: string | null; // Ensure it's initialized properly
    loading: boolean;
    error: string | null;
}


const initialState : subscriptionsState = {
    subscriptions : [],
    loading : false,
    // nextPageToken : null,
    error : null,
    // activeCategory : 'All'
}

export const getsubscriptions = createAsyncThunk<
    {subscriptions : any[]},
    void,
    {rejectValue : string}
>(
    'subscription/getsubscriptions',async (_,{rejectWithValue, getState}) => {
        try {
            const res = await FetchApi("/subscriptions",{
                params : {
                    part : 'snippet,contentDetails',
                    mine: true,
                },
                headers:{
                    Authorization : `Bearer ${getState().auth.accessToken}`
                }
            })
            console.log(res.data.items)
            return {subscriptions : res.data.items}
        }catch (error){
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
            .addCase(getsubscriptions.fulfilled,(state : subscriptionsState, action)=>{
                state.loading = false
                state.subscriptions =   action.payload.subscriptions
                // state.nextPageToken = action.payload.nextPageToken
                state.error = null
                // state.activeCategory = 'All'
            })
            .addCase(getsubscriptions.rejected,(state : subscriptionsState, action : PayloadAction<string | undefined>)=>{
                state.loading = false
                state.error = action.payload || 'Login failed'
            })
            .addCase(getsubscriptions.pending,(state : subscriptionsState)=>{
                state.loading = true
                state.error = null
                // state.activeCategory = 'All'
            })
    }
})