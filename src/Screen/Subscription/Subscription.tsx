import "./Subscription.scss"
import {useAppDispatch , useAppSelector} from "../../redux/store.ts";
import {useEffect} from "react";
// import {getsubscriptions} from "../../redux/subscriptionsSlice.ts";
import {Container} from "react-bootstrap";
import {VideoHorizontal} from "../../Component/VideoHorizontal/VideoHorizontal.tsx";
import Skeleton , {SkeletonTheme} from "react-loading-skeleton";
import {getsubscriptionsThunk} from "../../redux/subscriptionsSlice.ts";

export function Subscription() {

    const dispatch = useAppDispatch()

    useEffect ( () => {
        dispatch(getsubscriptionsThunk())
        // getsubscriptions().then(()=>{})
    } , [] );

    const { subscriptions, loading, ViewsDuration, channelIcons } = useAppSelector(state => state.subscriptions)


    return (
        <Container fluid>
             <h3 className="ms-5 m-2">All subscriptions</h3>
            {!loading ? (
                subscriptions?.map((video, index) => (
                    <VideoHorizontal viewsDuration={ViewsDuration[index]} channelIcons={channelIcons[index]} videos={video} key={index} subScreen />
                ))
            ) : (
                <SkeletonTheme color='#343a40' highlightColor='#3c4147'>
                    <Skeleton width='100%' height='160px' count={20} />
                </SkeletonTheme>
            )}
        </Container>
    );
}

