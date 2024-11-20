import {AiFillEye} from "react-icons/ai";
import "./_video.scss"

import moment from 'moment'
import numeral from 'numeral'
import { useNavigate} from "react-router-dom";

export function Video({item, channelScreen, duration, channelIcon}){

    const {
        id,
        contentDetails ,
        snippet : {
            thumbnails : {medium},
            publishedAt,
                title,
            resourceId,
        channelTitle}, } = item

    const _videoId =  resourceId?.videoId || id?.videoId ||  id || contentDetails.videoId

    // const [allVideoIDs, setAllVideoIDs] = useState([])
    // const [icons, setIcons] = useState([])

    // useEffect(()=>{
    //     setAllVideoIDs(_videoId)
    // },[_videoId])
    //
    // useEffect(()=>{
    //     setIcons(channelId)
    // },[channelId])

    // console.log(allVideoIDs)
    // console.log(icons)


    // const [channelIcon, setChannelIcon] = useState(null)
    // const [vidDuration, setVidDuration] = useState(null)
    // const [views, setViews] = useState(null)

    const navigate = useNavigate()

    // useEffect ( () => {
    //     (async ()=>{
    //        // const res = await getDurationView(allVideoIDs)
    //        //  setVidDuration(res.contentDetails.duration)
    //        //  setViews(res.statistics.viewCount)
    //
    //         // console.log("Duration in video : ", vidDuration)
    //         // console.log("Views in video : ", views)
    //     })()
    // } , [] );

    // useEffect ( () => {
    //     (async ()=>{
    //         // const res = await getIcon(icons)
    //         // setChannelIcon(res.snippet.thumbnails.default)
    //         // console.log("ChannelIcon in video : ", channelIcon)
    //     })()
    // } , [] );

    const second = moment.duration(duration?.contentDetails?.duration).asSeconds();
    const _duration = moment.utc(second * 1000).format("mm:ss")

    function handleClick(){
        navigate(`../watch/${_videoId}`)
    }

    // console.log(duration)


    return(
        // <Link to={`watch/${_videoId}`}>
            <div className='video' onClick={handleClick}>
                <div className='video__top'>
                     {/*<img src="https://i.ytimg.com/vi/mpKKcqWnTus/default.jpg" alt='' />*/}
                     <img src={ medium.url } alt='' />
                    {/*<div dangerouslySetInnerHTML={ { __html : "\u003ciframe width=\"480\" height=\"270\" src=\"//www.youtube.com/embed/Tow6Tw0XoCg\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen\u003e\u003c/iframe\u003e" } }></div>*/}
                    {/*<LazyLoadImage src={medium.url} effect='blur' />*/}
                    <span className='video__top__duration'>{_duration}</span>
                </div>
                <div className='video__title'>{title}</div>
                <div className='video__details'>
                <span>
                   <AiFillEye /> {numeral(duration?.statistics?.viewCount).format('0.a')} Views • {'  '}
                </span>{'  '}
                    <span> {moment(publishedAt).fromNow()} </span>
                </div>
                {!channelScreen && (
                    <div className='video__channel'>
                        {/*<LazyLoadImage src={channelIcon?.url} effect='blur' />*/}
                        <img src={channelIcon?.snippet?.thumbnails?.default?.url} effect='blur' />

                        <p>{channelTitle}</p>
                    </div>
                )}
            </div>
        // </Link>
    )
}