import axios from "axios";

export const FetchApi  = axios.create({
        baseURL:"https://youtube.googleapis.com/youtube/v3",
        params:{
            key : "AIzaSyBbVmPvtpFZ5MqyVdGzPFaKzU0scOL7OXs"
        }
    })
