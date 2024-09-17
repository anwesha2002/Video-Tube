// import firebase from "firebase/compat";
// import {auth} from "../../firebase.ts";
import {createAction , createAsyncThunk} from "@reduxjs/toolkit";
import {LOGIN_FAIL , LOGIN_PROFILE , LOGIN_REQUEST , LOGIN_SUCCESS} from "../actionType.ts";
// // import {login} from "../authSlice.ts";
//
//
// // export const loginRequest = createAction('LOGIN_SUCCESS')
// // export const loginFail = createAction('LOGIN_FAIL')
// // export const loadingProfile = createAction<any>('LOGIN_PROFILE', {name: String, picture : String})
// // export const loginSuccess = createAction('LOGIN_REQUEST')
//
//
// // const login = () => {
// //     (async (dispatch)=>{
// //         try {
// //
// //             dispatch({
// //                 type: LOGIN_REQUEST,
// //             })
// //
// //             const provider = new firebase.auth.GoogleAuthProvider
// //             const res = await auth.signInWithPopup(provider)
// //             console.log(res)
// //
// //             const accesstoken = res.credential.accessToken
// //             const profile = {
// //                 name : res.additionalUserInfo?.profile.name,
// //                 picture : res.additionalUserInfo?.profile.picture
// //             }
// //
// //             // dispatch({
// //             //     type : LOGIN_SUCCESS,
// //             //     payload : accesstoken
// //             // })
// //             // dispatch({
// //             //     type : LOGIN_PROFILE,
// //             //     payload : profile
// //             // })
// //         }catch (error){
// //             console.log(error.measure)
// //         }
// //     })()
// // }
//
// // const login = createAction<>(dispatch)
//
// // let action  = loginRequest()
//
// // const login = createAsyncThunk('auth', async (_{ dispatch  } ) => {
// //     try {
// //         const provider = new firebase.auth.GoogleAuthProvider
// //             const res = await auth.signInWithPopup(provider)
// //             console.log(res)
// //
// //             const accesstoken = res.credential.accessToken
// //             const profile = {
// //                 name : res.additionalUserInfo?.profile.name,
// //                 picture : res.additionalUserInfo?.profile.picture
// //             }
// //     }catch (error){
// //         console.log(error.message)
// //     }
// // })
//


export const loginRequest = createAction(LOGIN_REQUEST)

export const loadingProfile = createAction(LOGIN_PROFILE,function prepare(profile: {name,picture}){
    return{
        payload:{
            profile
        }
    }
})

export const loginSuccess = createAction(LOGIN_SUCCESS,function prepare(accessToken){
    return{
        payload:{
            accessToken
        }
    }
})

export const loginFail = createAction(LOGIN_FAIL,function prepare(error){
    return{
        payload:{
            error
        }
    }
})


// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import {auth} from "../../firebase.ts";
// import firebase from "firebase/compat/app";
//
// const initialState = {
//     user: null,
//     accessToken: null,
//     loading: false,
//     error: null,
// };
//
// // Create an async thunk for login using GoogleAuthProvider
// export const login = createAsyncThunk(
//     'auth/login',
//     async (dispatch, { rejectWithValue }) => {
//         try {
//             const provider = new firebase.auth.GoogleAuthProvider();
//             const res = await auth.signInWithPopup(provider);
//             console.log(res)
//
//             const accessToken = res.credential.accessToken;
//             const profile = {
//                 name: res.additionalUserInfo.profile.name,
//                 photoURL: res.additionalUserInfo.profile.picture,
//             };
//
//
//             return { accessToken, profile }; // Return combined data
//         } catch (error) {
//             console.error('Login error:', error.message);
//             return rejectWithValue(error.message); // Reject with error message
//         }
//     }
// );


