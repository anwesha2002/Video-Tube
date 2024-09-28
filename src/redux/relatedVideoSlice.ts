import {createAsyncThunk , createSlice} from "@reduxjs/toolkit";
import {FetchApi} from "../Data/fetchApi.ts";


interface relatedVideosState {
    relatedVideos : any[],
    loading: boolean;
    error: string | null;
}


const initialState : relatedVideosState = {
    relatedVideos : [],
    loading : false,
    error : null,
}
export const getReletedVideos = createAsyncThunk<
    {relatedVideos  : any[]},
    {id : string },
    {rejectValue : string}
>(
    'relatedVideos/getRelatedVideos',
    async ({ id } , {rejectWithValue, getState}) => {
        try {
            const res = await FetchApi("/search",{
                params : {
                    part: 'snippet',
                    id:id,
                    maxResults: 20,
                    type : 'video'
                },
                // headers:{
                //     Authorization : `Bearer ${getState().auth.accessToken}`
                // }
            })

            console.log(res.data)
            return { relatedVideos : res.data.items }
        }catch (error){
            return rejectWithValue(error.response.data)
        }
    }
)

export const relatedVieos = createSlice({
    name : 'relatedVideos',
    initialState,
    reducers:{
        display(initialState){
            initialState
        }
    },
    extraReducers : (builder) =>{
        builder
            .addCase(getReletedVideos.pending,(state : relatedVideosState)=>{
                state.loading = true
                state.error = null
                // state.activeCategory = action.meta.arg.keyword
            })
            .addCase(getReletedVideos.fulfilled,(state : relatedVideosState, action)=>{
                state.loading = false
                state.error = null
                state.relatedVideos = action.payload.relatedVideos
                // state.activeCategory = action.meta.arg.keyword
            })
            .addCase(getReletedVideos.rejected,(state : relatedVideosState, action)=>{
                state.loading = false
                state.error = action.payload || 'loading false'
                // state.activeCategory = action.meta.arg.keyword
            })

    }
})