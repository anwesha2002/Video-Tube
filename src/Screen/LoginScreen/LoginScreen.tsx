import "./_loginScreen.scss"
import {RootState , useAppDispatch , useAppSelector} from "../../redux/store.ts";
import { unwrapResult } from '@reduxjs/toolkit';
import {login} from "../../redux/authSlice.ts";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";


export function LoginScreen(){

    const dispatch = useAppDispatch()

    const { loading,accessToken, user, error} = useAppSelector((state) => state.auth)
    const navigate = useNavigate()

    function handleClick(){
        dispatch(login())
    }

    useEffect(()=>{
        if(accessToken ) navigate("/")
    },[accessToken, navigate])


    return(
        <div className='login'>
            <div className='login__container'>
                <h2>Youtube Clone</h2>
                <img
                    src='http://pngimg.com/uploads/youtube/youtube_PNG2.png'
                    alt=''
                />
                <button onClick={handleClick}>Login With google</button>
                <p>This Project is made using YOUTUBE DATA API</p>
            </div>
        </div>
    )
}