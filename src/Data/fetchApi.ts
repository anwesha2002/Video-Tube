import axios from "axios";
import {getsubscriptions} from "../redux/subscriptionsSlice.ts";
import {searchVideosByKeyword} from "../redux/searchVideoSlice.ts";

export const FetchApi  = axios.create({
        baseURL:"https://youtube.googleapis.com/youtube/v3",
        params:{
            key : process.env.REACT_APP_API_KEY
        }
    })

export async function getyoutubeVideos(){
    try {
        await console.log("get all videos")
    }catch (error){
        console.log(error)
    }
}

export async function getVideosByKeyword({keyword } : {keyword : string}){
    try {
        await console.log(`get videos by keyword ${keyword}` )
    }catch (error){
        console.log(error)
    }
}

export async function getsubscriptions(){
    try {
        await console.log("get all scriptions" )
    }catch (error){
        console.log(error)
    }
}

export async function getVideosById({id} :{id : string | undefined }){
    try {
        await console.log("get Videos By Id : " , id )
    }catch (error){
        console.log(error)
    }
}

export async function searchVideosByKeyword({keyword } : {keyword : string | undefined}){
    try {
        await console.log("search Videos By Keyword : " , keyword )
    }catch (error){
        console.log(error)
    }
}

export async function getReletedVideos({id} :{id : string | undefined }){
    try {
        await console.log("get Releted Videos : " , id )
    }catch (error){
        console.log(error)
    }
}

export async function GetComments({id} :{id : string | undefined }){
    try {
        await console.log("get all Comments : " , id )
    }catch (error){
        console.log(error)
    }
}

export async function postComments({id, text} : {id? : string, text : string}){
    try {
        await console.log("post Comments : " , id )
        await console.log("text : " , text )
    }catch (error){
        console.log(error)
    }
}

export async function channelBYID({id} : {id : string | undefined}){
    try {
        await console.log("get channel By Id : " , id )
    }catch (error){
        console.log(error)
    }
}

export async function SubStat({channelID} : {channelID : string}){
    try {
        await console.log("subscription status  : " , channelID )
    }catch (error){
        console.log(error)
    }
}

export async function getVideosByChannel({id} : {id : string | undefined}){
    try {
        await console.log("get videos By Channel  : " , id )
    }catch (error){
        console.log(error)
    }
}





