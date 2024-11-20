import {Col , Container} from "react-bootstrap";
import {CategoryBar} from "../Component/Category/CategoryBar.tsx";
import {Video} from "../Component/Video/video.tsx";
import {useEffect , useState} from "react";
import {useAppDispatch , useAppSelector} from "../redux/store.ts";
// import {getVideosByKeyword , getyoutubeVideos} from "../redux/videoSlice.ts";
import InfiniteScroll from "react-infinite-scroll-component";
import {SkeletonVideo} from "../Component/Skeleton/SkeletonVideo.tsx";
import {getVideosByKeywordThunk , getyoutubeVideosThunk} from "../redux/videoSlice.ts";

export function HomeScreen() {

    const dispatch = useAppDispatch ()

    // useEffect(()=>{
    //     axios.get("https://www.googleapis.com/youtube/v3/videos?key=AIzaSyCNLCghPaaEOQ6sRTIcU5MUnAWCbEEufBQ&chart=mostPopular&part=player&maxResults=50")
    //         .then((res)=>setVideo(res.data.items))
    // },[])

    // useEffect(()=>{
    //     axios.get("https://www.googleapis.com/youtube/v3/videoCategories?key=AIzaSyCNLCghPaaEOQ6sRTIcU5MUnAWCbEEufBQ&part=snippet&regionCode=IN")
    //         .then((res)=>setVideo(res.data.items))
    // },[])

    // console.log(video)

    // for (const key1 in video) {
    //     if (video.hasOwnProperty(key1)) {
    //         const innerObject = video[key1];
    //         for (const key2 in innerObject) {
    //             if(key2=="snippet"){
    //                 const inInnerObject = innerObject[key2]
    //                 for (const key3 in inInnerObject){
    //                     if(key3=="title")  console.log(key3, inInnerObject[key3]);
    //                 }
    //             }
    //             // if (innerObject.hasOwnProperty(key2)) {
    //             //     console.log(key1, key2, innerObject[key2]);
    //             // }
    //         }
    //     }
    // }

    const {
        videos ,
        activeCategory ,
        loading ,
        nextPageToken ,
        videoIds ,
        duration ,
        channelIcon
    } = useAppSelector ( (state) => state.homeVideos )

    const category = sessionStorage.getItem ( "keyword" )
    // const[homeVideos, setHomeVideos] = useState([])

    const [allVideoIDs , setAllVideoIDs] = useState ( [] )
    const [icons , setIcons] = useState ( [] )


    useEffect ( () => {
        dispatch ( getyoutubeVideosThunk () )

        // getyoutubeVideos().then(()=>{})
    } , [] );


    const fetData = () => {
        if (activeCategory === 'All') {
            dispatch ( getyoutubeVideosThunk () )

            // getyoutubeVideos().then(()=>{})
        } else {
            console.log ( JSON.parse ( category ) )
            dispatch ( getVideosByKeywordThunk ( { keyword : JSON.parse ( category ) } ) )

            // getVideosByKeyword({ keyword: JSON.parse(category) }).then(()=>{})
        }

    }


    // useEffect ( () => {
    //     (async ()=>{
    //         const res = await getDurationView(allVideoIDs)
    //         // setVidDuration(res.contentDetails.duration)
    //         // setViews(res.statistics.viewCount)
    //
    //         // console.log("Duration in video : ", res.contentDetails.duration)
    //         // console.log("Views in video : ", res.statistics.viewCount)
    //     })()
    // } , [] );
    //
    // useEffect ( () => {
    //     (async ()=>{
    //         const res = await getIcon(icons)
    //         // setChannelIcon(res.snippet.thumbnails.default)
    //         // console.log("ChannelIcon in video : ", res.snippet.thumbnails.default)
    //     })()
    // } , [] );


    return (
        <Container style={ { height : "90vh" } } className="overflow-y-scroll">
            <CategoryBar/>
            <InfiniteScroll
                next={ fetData }
                hasMore={ !!nextPageToken }
                loader={
                    <div className="spinner-border text-danger d-block mx-auto"></div>
                }
                dataLength={ videos.length }
                className="row"
            >

                { !loading ?
                    videos.map ( (item , index) => (
                        <Col key={ index } lg={ 3 } md={ 4 }>
                            <Video duration={ duration[index] } channelIcon={ channelIcon[index] }
                                   setAllVideoIDs={ setAllVideoIDs } setIcons={ setIcons } item={ item }
                                   key={ item.id }/>
                        </Col>
                    ) ) :
                    [...Array ( 20 )].map ( () => (
                        <Col lg={ 3 } md={ 4 }>
                            <SkeletonVideo/>
                        </Col>
                    ) )

                }


            </InfiniteScroll>

            {/*<div className="border border-primary w-100 m-0">HomeScreen</div>*/ }
        </Container>
    )
}