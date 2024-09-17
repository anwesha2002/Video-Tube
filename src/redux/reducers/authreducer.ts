import {
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGIN_REQUEST,
    LOGIN_PROFILE
} from "../actionType.ts"
import {createAction , createSlice , PayloadAction} from "@reduxjs/toolkit";
import firebase from "firebase/compat";
import {auth} from "../../firebase.ts";

// interface UserData {
//     name : string,
//     picture : string
// }
//
// interface InfoState {
//
//     accessToken: string,
//     user: PayloadAction<UserData>,
//     loading : boolean
//
// }

export const initialState = {
    accessToken: null,
    user: null,
    loading : false
}

export const authreducer = (prevState = initialState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST: {
            return{
                ...prevState,
                loading : true
            }
        }
        case LOGIN_SUCCESS: {
            return{
                ...prevState,
                accessToken : action.payload,
                loading : false
            }
        }
        case LOGIN_FAIL: {
            return{
                ...prevState,
                accessToken : null,
                loading : false,
                error : action.payload
            }
        }
        case LOGIN_PROFILE: {
            return{
                ...prevState,
                user : action.payload,
            }
        }
        default :
            return prevState
    }

}

export const userSlice = createSlice ( {
    name : 'user' ,
    initialState,
    reducers : {
        auth : authreducer
    }
})
