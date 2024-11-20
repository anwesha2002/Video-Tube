import axios from "axios";

export const FetchApi  = axios.create({
        baseURL:"https://youtube.googleapis.com/youtube/v3",
        params:{
            key : process.env.REACT_APP_API_KEY
        }
    })

export async function getyoutubeVideos(getState){
    try {
        const res = await FetchApi("/videos",{
            params : {
                part: 'snippet,contentDetails,statistics',
                // fields : 'items,items%2Fstatistics%2FviewCount',
                chart: 'mostPopular',
                regionCode: 'IN',
                maxResults: 20,
                pageToken: getState().homeVideos.nextPageToken,
            }
        })
        await console.log("get all videos")
        return res.data
    }catch (error){
        return error
    }
}

export async function getVideosByKeyword( keyword : string, getState ){
    try {
        const res = await FetchApi("/search",{
            params : {
                part: 'snippet',
                q:keyword,
                maxResults: 20,
                pageToken: getState().homeVideos.nextPageToken,
                type : 'video',
                // fields : 'items,items%2Fstatistics%2FviewCount,items%2FcontentDetails%2Fduration'
            }
        })
        await console.log(`get videos by keyword ${keyword}` )
        return res.data
    }catch (error){
        return error
    }
}

export async function getsubscriptions(getState){
    try {
        const res = await FetchApi("/subscriptions",{
            params : {
                part : 'snippet,contentDetails',
                mine: true,
            },
            headers:{
                Authorization : `Bearer ${getState().auth.accessToken}`
            }
        })
        await console.log("get all scriptions" )
        return res.data
    }catch (error){
        return error
    }
}

export async function getVideosById(id : string  ){
    try {
        const res = await FetchApi("/videos",{
            params:{
                part : 'snippet,contentDetails,statistics',
                id : id
            }
        })
        await console.log("get Videos By Id : " , id )
        return res.data
    }catch (error){
        return error
    }
}

export async function searchVideosByKeyword(keyword : string | undefined){
    try {
        const res = await FetchApi("/search",{
            params : {
                part: 'snippet',
                maxResults: 20,
                q: keyword,
                type: 'video,channel',
            }
        })
        await console.log("search Videos By Keyword : " , keyword )
        return res.data
    }catch (error){
        return  error
    }
}

export async function getReletedVideos(id : string | undefined ){
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
        await console.log("get Releted Videos : " , id )
        return res.data
    }catch (error){
        return error
    }
}

export async function GetComments(id : string | undefined ){
    try {
        const res = await FetchApi("/commentThreads",{
            params : {
                part : 'snippet',
                videoId : id
            }
        })
        await console.log("get all Comments : " , id )
        return res.data
    }catch (error){
        return error
    }
}

export async function postComments(text : string, getState ,id : string,  ){

    const obj = {
        "snippet" : {
            "videoId": id,
            "topLevelComment":{
                "snippet":{
                    "textOriginal" : text
                }
            }
        }
    }

    try {
        await FetchApi.post("/commentThreads",obj,{
            params:{
                part : 'snippet'
            },
            headers:{
                Authorization : `Bearer ${getState().auth.accessToken}`,
                // Accept: 'application/json',
            }
        })
        console.log(obj)

        await console.log("post Comments : " , id )
        await console.log("text : " , text )
    }catch (error){
        return error
    }
}

export async function channelBYID(id : string | undefined){
    try {
        const res = await FetchApi("/channels",{
            params : {
                part : 'snippet,contentDetails,statistics',
                id
            }
        })
        await console.log("get channel By Id : " , id )
        return res.data
    }catch (error){
        return error
    }
}

export async function SubStat(channelID : string, getState){
    try {
        const res = await FetchApi("/subscriptions",{
            params : {
                part : 'snippet',
                forChannelId : channelID,
                mine: true,
            },
            headers:{
                Authorization : `Bearer ${getState().auth.accessToken}`
            }
        })
        await console.log("subscription status  : " , channelID )
        return res.data
    }catch (error){
        return error
    }
}

export const getUploadPlayListID = async ( id : string )=>{
    try {
        const res = await FetchApi("/channels",{
            params : {
                part: 'contentDetails',
                id: id,
            }
        })

        return  res.data
    }catch (error){
        return error
    }
}

export async function getVideosByChannel(uploadPlaylistId : string | undefined){
    try {
        const channelres = await FetchApi("/playlistItems",{
            params : {
                part: 'snippet,contentDetails',
                playlistId: uploadPlaylistId,
                maxResults: 30,
            }
        })

        await console.log("get videos By Channel  : " , uploadPlaylistId )

        return channelres.data
    }catch (error){
        return error
    }
}

export async function getDurationView(videoIds : string){
    try {
        const res = await FetchApi('/videos',{
            params:{
                part: 'contentDetails,statistics',
                id:`${videoIds}`
            }
        })
        console.log(res.data)
        return res.data.items
    }catch(error){
        return error
    }
}

export async function getIcon(channelIds : string){
    try {
        const res = await FetchApi('/channels',{
            params:{
                part: 'snippet, statistics',
                id:channelIds
            }
        })
        console.log(res.data.items)
        return res.data.items
    }catch(error){
        return error
    }
}





