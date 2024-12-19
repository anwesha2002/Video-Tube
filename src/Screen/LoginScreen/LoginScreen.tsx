import "./_loginScreen.scss"
import {useAppDispatch , useAppSelector} from "../../redux/store.ts";
import {login} from "../../redux/authSlice.ts";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";


export function LoginScreen() {

    const dispatch = useAppDispatch ()

    const {  accessToken  } = useAppSelector ( (state) => state.auth )
    const navigate = useNavigate ()

    function handleClick() {
        dispatch ( login () )
    }

    useEffect ( () => {
        if (accessToken) navigate ( "/" )
    } , [accessToken , navigate] )


    return (
        <div className='login'>
            <div className='login__container'>
                <h2>Video streaming and viewing platform</h2>
                <img
                    src='http://pngimg.com/uploads/youtube/youtube_PNG2.png'
                    alt=''
                />
                <button onClick={ handleClick }>Login With google</button>
                {/*<p>This Project is made using YOUTUBE DATA API</p>*/}
            </div>
        </div>
    )
}