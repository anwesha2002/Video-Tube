import {AiFillEye} from "react-icons/ai";
import "./_video.scss"
import parse from 'html-react-parser'

import moment from 'moment'
import numeral from 'numeral'
import {useEffect , useState} from "react";
import {FetchApi} from "../../Data/fetchApi.ts";

export function Video({item}){

    const {
        id,
        contentDetails ,
        snippet : {
            thumbnails : {medium},
            channelId,
            publishedAt,
                title,
        channelTitle}, } = item

    const _videoId = id?.videoId ||  id || contentDetails.videoId

    const [channelIcon, setChannelIcon] = useState(null)
    const [vidDuration, setVidDuration] = useState(null)
    const [views, setViews] = useState(null)

    useEffect ( () => {
        (async ()=>{
           const res = await FetchApi('/videos',{
               params:{
                   part: 'contentDetails,statistics',
                   id:_videoId
               }
           })
            setVidDuration(res.data.items[0].contentDetails.duration)
            setViews(res.data.items[0].statistics.viewCount)
        })()
    } , [_videoId] );

    useEffect ( () => {
        (async ()=>{
            const res = await FetchApi('/channels',{
                params:{
                    part: 'snippet',
                    id:channelId
                }
            })
            setChannelIcon(res.data.items[0].snippet.thumbnails.default)
        })()
    } , [channelId] );

    const second = moment.duration(vidDuration).asSeconds();
    const _duration = moment.utc(second * 1000).format("mm:ss")


    return(
        <div className='video' >
            <div className='video__top'>
                 <img src={medium.url} alt='' />
                {/*<LazyLoadImage src={medium.url} effect='blur' />*/}
                <span className='video__top__duration'>{_duration}</span>
            </div>
            <div className='video__title'>{title}</div>
            <div className='video__details'>
            <span>
               <AiFillEye /> {numeral(views).format('0.a')} Views • {'  '}
            </span>{'  '}
                <span> {moment(publishedAt).fromNow()} </span>
            </div>
            {/*{!channelScreen && (*/}
                <div className='video__channel'>
                    {/*<LazyLoadImage src={channelIcon?.url} effect='blur' />*/}
                    <img src={channelIcon?.url} effect='blur' />

                    <p>{channelTitle}</p>
                </div>
            {/*)}*/}
        </div>
    )
}