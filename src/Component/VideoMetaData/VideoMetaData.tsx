import {MdThumbDown , MdThumbUp} from "react-icons/md";
import numeral from "numeral";
import moment from "moment";
import "./_VideoMetaData.scss"
import ShowMoreText from "react-show-more-text"
import {useAppDispatch , useAppSelector} from "../../redux/store.ts";
import {useEffect} from "react";
// import {channelBYID , SubStat} from "../../redux/channelSclice.ts";
import {AiOutlineBell} from "react-icons/ai";
import {channelBYIDThunk , SubStatThunk} from "../../redux/channelSclice.ts";

type videoMetadataProps = {
    video? : any
    videoID : string |undefined
}

export function VideoMetaData({video ,videoID} : videoMetadataProps) {

    const dispatch = useAppDispatch()

    const {snippet, statistics} = video

    if(!snippet || !statistics) return
        const { channelId, channelTitle,  description, title, publishedAt } = snippet
        const { viewCount, likeCount, dislikeCount } = statistics

    useEffect ( () => {
        dispatch(channelBYIDThunk({id : channelId}))
        dispatch(SubStatThunk({channelID : channelId}))

        // channelBYID({id : channelId}).then(()=>{})
        // SubStat({channelID : channelId}).then(()=>{})
    } , [ channelId] );

    const { channel, subscriptionStatus } = useAppSelector(state => state.channel)

    return (
        <div className='py-2 videoMetaData'>
            {/*<HelmetCustom title={title} description={description} />*/ }

            <div className='videoMetaData_top'>
                <h5>{ title } </h5>
                {/* </div>*/ }
            </div>
            <div className='py-2 my-1 videoMetaData_channel d-flex justify-content-between align-items-center'>

                    <div className="d-flex">
                        <img
                            src={ channel?.snippet?.thumbnails?.default.url }
                            alt=''
                            className='me-3 rounded-circle'
                        />
                        <div className='d-flex flex-column'>
                            <span>{ channelTitle }</span>
                            <span>{ ' ' }
                                { numeral ( channel?.statistics?.subscriberCount ).format (
                                    '0.a'
                                ) }{ ' ' }Subscribers
                            </span>
                        </div>
                        <button
                            className={ `px-2 ms-4 border-0 rounded-pill btn btn-sm ${subscriptionStatus && 'btn-gray'}` }>
                            {subscriptionStatus ?
                            <span className="d-flex align-items-center">
                                <AiOutlineBell size={20} className="me-1"/>
                                Subscribed
                            </span>    : 'Subscribe'
                            }
                        </button>
                    </div>
                    <div className='d-flex flex-row rounded-pill videoMetaData_likes p-2'>
                        <span className='mx-3 d-flex align-items-center'>
                            <MdThumbUp size={ 20 } className="me-1"/>
                            { numeral ( likeCount ).format ( '0.a' ) }
                        </span>
                        <span >|</span>
                        <span className='mx-3 d-flex align-items-center'>
                            <MdThumbDown size={ 20 } className="me-1"/>{ ' ' }
                            { numeral ( dislikeCount ).format ( '0.a' ) }
                        </span>
                    </div>
            </div>
            <div className='videoMetaData_description p-3'>
                <div className='py-1 d-flex justify-content-between align-items-center'>
                   <span>
                      { numeral ( viewCount ).format ( '0.a' ) } Views { '   ' }
                       <span className="m-1"></span>
                       { moment ( publishedAt ).fromNow () }
                   </span>
                </div>
                <ShowMoreText
                    lines={ 3 }
                    more='more'
                    less='Show less'
                    anchorClass='showMoreText'
                    expanded={ false }>
                    { description }
                </ShowMoreText>


            </div>
        </div>
    )
}