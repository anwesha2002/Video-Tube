import {createAsyncThunk , createSlice , PayloadAction} from "@reduxjs/toolkit";
import { getsubscriptions} from "../Data/fetchApi.ts";

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

export const getsubscriptionsThunk = createAsyncThunk<
    {subscriptions : any[]},
    void,
    {rejectValue : string}
>(
    'subscription/getsubscriptions',async (_,{rejectWithValue, getState}) => {
        try {
            const res = await getsubscriptions(getState)
            console.log(res.items)
            return {subscriptions : res.items}
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
            .addCase(getsubscriptionsThunk.fulfilled,(state : subscriptionsState, action)=>{
                state.loading = false
                state.subscriptions =   action.payload.subscriptions
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