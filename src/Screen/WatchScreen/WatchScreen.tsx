import {Col , Row} from "react-bootstrap";
import {Comments} from "../../Component/Comments/Comments.tsx";
import "./_watchScreen.scss"
import {VideoMetaData} from "../../Component/VideoMetaData/VideoMetaData.tsx";
import {VideoHorizontal} from "../../Component/VideoHorizontal/VideoHorizontal.tsx";
import {useParams} from "react-router-dom";
import {useAppDispatch , useAppSelector} from "../../redux/store.ts";
import {useEffect} from "react";
// import {getVideosById} from "../../redux/selectVideoSlice.ts";
// import {getReletedVideos} from "../../redux/relatedVideoSlice.ts";
import {SkeletonVideo} from "../../Component/Skeleton/SkeletonVideo.tsx";
import Skeleton , {SkeletonTheme} from "react-loading-skeleton";
import {getVideosByIdThunk} from "../../redux/selectVideoSlice.ts";
import {getReletedVideosTHunk} from "../../redux/relatedVideoSlice.ts";

export function WatchScreen() {

    const {id } = useParams()

    const dispatch = useAppDispatch()

    useEffect ( () => {
        dispatch(getVideosByIdThunk({id : id}))
        dispatch(getReletedVideosTHunk({id : id}))

        // getVideosById({id : id}).then(()=>{})
        // getReletedVideos({id : id}).then(()=>{})
        // dispatch(GetComments({id : id}))
    } , [dispatch, id] );

    const { videos, loading } = useAppSelector(state => state.selectVideo)

    const { relatedVideos, loading : relatedVideoLoading } = useAppSelector(state => state.relatedVideo)

    // const {comments} = useAppSelector(state => state.comment)

    // console.log(relatedVideos)

    return (
        <Row>
            {/*<title>{videos.snippet?.title}</title>*/}
            <Col lg={ 8 }>
                <div className='watchScreen_player'>
                    <iframe
                        // src="https://i.ytimg.com/vi/Ys7L5rFN4PA/default.jpg"
                        src={ `https://www.youtube.com/embed/${id}` }
                        title="my video"
                        allowFullScreen
                        width='100%'
                        height='100%'>

                    </iframe>
                </div>
                <VideoMetaData video = {videos}  videoID={id}/>


                <Comments videoId = {id} totalComments={videos?.statistics?.commentCount}/>
            </Col>
            <Col lg={ 4 }>
                {!loading ?
                    relatedVideos?.map ( (video) => (
                        <VideoHorizontal videos={video} key={video.id?.videoId} />
                        )
                ) :

                        <SkeletonTheme baseColor='#343a40' highlightColor='#3c4147'>
                            <Skeleton width="100%" height={130} count={20}/>
                        </SkeletonTheme>

                }
            </Col>
        </Row>
    )
}