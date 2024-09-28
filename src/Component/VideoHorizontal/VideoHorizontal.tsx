import {Col , Row} from "react-bootstrap";
import "./_videoHorizontal.scss"
import {AiFillEye} from "react-icons/ai";
import moment from "moment";
import numeral from "numeral";
import {useEffect , useState} from "react";
import {FetchApi} from "../../Data/fetchApi.ts";
import {redirect , replace , useNavigate} from "react-router-dom";

export function VideoHorizontal({videos, searchScreen, searchresult, subScreen}){

    const [views, setViews] = useState()
    const [duration, setDuration] = useState()
    const [channelIcon, setChannelIcon] = useState(null)
    const [subscriberCount, setsubscriberCount] = useState(null)

    const navigate = useNavigate()

    const descWidth = {
        width : searchresult ? "auto" :""
    }

    const {
        id,
        snippet: {
            channelId,
            channelTitle,
            description,
            title,
            publishedAt,
            thumbnails: { medium },
            resourceId,
        },
    } = videos

    if(!id) return

    const isVideo = !(id.kind === 'youtube#channel' || subScreen)

    const _channelId = resourceId?.channelId || channelId


    useEffect ( () => {
        isVideo && (async ()=>{
            const res = await FetchApi('/videos',{
                params:{
                    part: 'contentDetails,statistics',
                    id: id.videoId
                }
            })
            setDuration(res.data.items[0].contentDetails.duration)
            setViews(res.data.items[0].statistics.viewCount)
        })()
    } , [id, isVideo] );

    useEffect ( () => {
        (async ()=>{
            const res = await FetchApi('/channels',{
                params:{
                    part: 'snippet, statistics',
                    id:_channelId
                }
            })
            setChannelIcon(res.data.items[0].snippet.thumbnails.default)
            {subScreen &&
                setsubscriberCount ( res.data.items[0].statistics.subscriberCount )
            }
        })()
    } , [_channelId] );

    const seconds = moment.duration(duration).asSeconds()
    const _duration = moment.utc(seconds * 1000).format('mm:ss')

    const _videoId : string = id.videoId
    function handleClick(){
        isVideo ?
        navigate(`../${_videoId}`,{relative : "path", replace : true, state : _videoId})
            : navigate(`../${_channelId}`,{relative : "path", replace : true, state : _channelId})
    }

    const thumbnail = !isVideo && 'videoHorizontal_thumbnail_channel'

    console.log(channelIcon)

    return (
        <Row className='py-2 m-1 videoHorizontal align-items-center' onClick={handleClick}>
            {/* //TODO refractor grid */}



            <Col
                xs={6}
                md={ searchScreen || subScreen  ? 4 : 6}
                className='videoHorizontal_left'>
                {/*<LazyLoadImage*/}
                {/*    src={medium.url}*/}
                {/*    effect='blur'*/}
                {/*    className={`videoHorizontal__thumbnail ${thumbnail} `}*/}
                {/*    wrapperClassName='videoHorizontal__thumbnail-wrapper'*/}
                {/*/>*/}
                <img
                    src={ medium?.url }
                    alt=''
                    className={ ` videoHorizontal_thumbnail ${thumbnail}` }
                />
                {isVideo &&
                    <span className='videoHorizontal_duration'>{_duration}</span>
                }
            </Col>
            <Col
                xs={6}
                md={ searchScreen || subScreen  ? 8 : 6}
                className='p-0 videoHorizontal_right' >
                <p className='mb-1 videoHorizontal_title'>{ title }</p>

                <p className='mb-0 text-secondary videoHorizontal_channel'>{channelTitle}</p>

                { isVideo &&
                    <div className='videoHorizontal_details text-secondary'>
                    { numeral ( views ).format ( '0.a' ) } Views •
                    { moment ( publishedAt ).fromNow () }
                </div>
                }

                {subScreen &&
                    <div className='videoHorizontal_details ' style={{fontSize: "0.7rem"}}>{numeral ( subscriberCount ).format ( '0.a' )} Subscribers</div>
                }

                <div className='my-1 videoHorizontal_channel d-flex align-items-center'>
                    {isVideo && searchresult &&
                        <img src={channelIcon?.url}  />
                    }
                    { isVideo && searchresult && <p className='mb-0'>{ channelTitle }</p> }
                </div>

                { searchScreen || searchresult || subScreen && <p className='mt-1 videoHorizontal_desc text-secondary'>{ description }</p> }

                {subScreen && (
                    <p className='mt-2'>
                        {videos?.contentDetails?.totalItemCount} Videos
                    </p>
                )}
            </Col>
        </Row>
    )
}