import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {auth} from "../firebase.ts";
import firebase from "firebase/compat/app";

// import {LOGIN_REQUEST , LOGIN_SUCCESS} from "./actionType.ts";


type profile = {
    name : string,
    picture : string
}

interface AuthState  {
    user : {name : string , profileURL : string} | null
    loading: boolean,
    accessToken : string | null,
    error : string | null
}

export const initialState : AuthState = {
    user :  sessionStorage.getItem('yt-user')? JSON.parse(sessionStorage.getItem('yt-user') as string) : null,
    loading: false,
    accessToken : sessionStorage.getItem('yt-accessToken')? sessionStorage.getItem('yt-accessToken') :  null,
    error : null
}

export const login = createAsyncThunk<
    {accessToken  : string, profile : {name : string ,profileURL : string }},
    void,
    {rejectValue : string}
>(
    'auth/login',
    async (_, { rejectWithValue }) => {
        try {
            const provider = new firebase.auth.GoogleAuthProvider();
            provider.addScope("https://www.googleapis.com/auth/youtube.force-ssl")

            const res = await auth.signInWithPopup(provider) ;
            console.log(res)

            const accessToken = (res.credential as firebase.auth.OAuthCredential)?.accessToken;
            if (!accessToken) {
                throw new Error("Access token is missing");
            }

            // const accessToken =  (res.credential as credential)?.accessToken ;
            const profile = {
                name: (res.additionalUserInfo?.profile as profile)?.name as string,
                profileURL: (res.additionalUserInfo?.profile as profile)?.picture as string,
            };

            return { accessToken : accessToken!, profile : profile }; // Return combined data
        } catch (error : any) {
            console.error('Login error:', error.message);
            return rejectWithValue(error.message); // Reject with error message
        }
    }
);

export const logout = createAsyncThunk(
    'auth/logout',
    async (_) => {
            await auth.signOut()
            sessionStorage.removeItem('yt-accessToken')
            sessionStorage.removeItem('yt-user')
            return
    }
)

export const createSliceStore = createSlice ( {
    name : 'auth' ,
    initialState,
    reducers : {
        // logout(state : AuthState) {
        //     (async ()=>{
        //         await auth.signOut()
        //         state.user = null;
        //         state.accessToken = null;
        //         sessionStorage.removeItem('yt-accessToken')
        //         sessionStorage.removeItem('yt-user')
        //     })()
        // },
        // loginUser: (builder) => {
        //     builder
        //         .addCase(login.pending, (state) => {
        //             state.loading = true;
        //         })
        //         .addCase(login.fulfilled, (state, action) => {
        //             state.loading = false;
        //             state.user = action.payload.profile;
        //             state.accessToken = action.payload.accessToken;
        //         })
        //         .addCase(login.rejected, (state, action) => {
        //             state.loading = false;
        //             state.error = action.payload; // Set error message from rejected action
        //         })
        //         .addCase(login.rejected, (state, action) => {
        //             state.loading = false;
        //             state.error = action.payload; // Set error message from rejected action
        //         });
        // },
        // loginrequest : (state) => {
        //     state.loading = true;
        // },
        // loginSuccess: (state, action) => {
        //     state.loading = false;
        //     state.accessToken = action.payload;
        // },
        // loadProfile: (state, action) => {
        //     state.user = action.payload;
        // },
        // loginFail: (state, action) => {
        //     state.loading = false;
        //     state.error = action.payload;
        // }
        // loginauth :

        display(user){
            user
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state : AuthState) => {
                state.loading = true;
                state.error = null
            })
            .addCase(login.fulfilled, (state : AuthState, action : PayloadAction<{accessToken  : string, profile : {name : string ,profileURL : string }}>) => {
                state.loading = false;
                state.user = action.payload.profile
                state.accessToken =action.payload.accessToken
                state.error = null
                sessionStorage.setItem('yt-accessToken', state.accessToken)
                sessionStorage.setItem('yt-user', JSON.stringify(state.user))
            })
            .addCase(login.rejected, (state : AuthState, action : PayloadAction<string | undefined>) => {
                state.loading = false;
                state.accessToken = null
                state.error = action.payload || 'Login failed'; // Set error message from rejected action
            })
            .addCase(logout.fulfilled, (state : AuthState) => {
                state.user = null;
                state.accessToken = null;
            })
    },
})

// const authSlice = createSlice({
//     name: 'auth',
//     initialState,
//     reducers: {
//         logout(state) {
//             state.user = null;
//             state.accessToken = null;
//         },
//     },
//     extraReducers: (builder) => {
//         builder
//             .addCase(login.pending, (state) => {
//                 state.loading
//                     = true;
//                 state.error = null; // Clear previous error
//             })
//             .addCase(login.fulfilled, (state, action) => {
//                 state.loading = false;
//                 state.user = action.payload.profile;
//                 state.accessToken = action.payload.accessToken;
//             })
//             .addCase(login.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload; // Set error message from rejected action
//             });
//     },
// });


// export const {logout} = createSliceStore.actions