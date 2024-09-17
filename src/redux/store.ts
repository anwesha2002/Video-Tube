import {configureStore } from "@reduxjs/toolkit"
import {createSliceStore} from "./authSlice.ts";
import {TypedUseSelectorHook , useDispatch , useSelector} from "react-redux";
import {videoSliceStore} from "./videoSlice.ts";

// window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()


// const reducer: Reducer<
//     { name: string, age: 21 } ,
//     {  }
// > = (inistialstate) => inistialstate;

export const store = configureStore ( {
    reducer : {
        auth : createSliceStore.reducer,
        homeVideos : videoSliceStore.reducer
    },
} )



export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
// export const useAppDispatch = useDispatch.withTypes<AppDispatch>()

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

