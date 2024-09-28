import React , {useEffect , useState} from 'react';
import {useParams} from "react-router-dom";
import {useAppDispatch , useAppSelector} from "../../redux/store.ts";
import {searchVideosByKeyword} from "../../redux/searchVideoSlice.ts";
import {Container} from "react-bootstrap";
import {VideoHorizontal} from "../../Component/VideoHorizontal/VideoHorizontal.tsx";
import Skeleton , {SkeletonTheme} from "react-loading-skeleton";

export function SearchScreen() {

    const { query } = useParams()
    const dispatch = useAppDispatch()

    const [searchresult, setSearchResult] = useState<boolean>(false)

    console.log("query" , query)

    useEffect ( () => {
        dispatch(searchVideosByKeyword( {keyword : query }))
        query?.trim() !== "" && setSearchResult(true)
    } , [dispatch,query] );

    const { videos , loading } =  useAppSelector(state => state.searchedVideo)

    return (
        <Container>
            {!loading ? (
                videos?.map(video => (
                    <VideoHorizontal
                        searchresult={searchresult}
                        videos={video}
                        key={video?.id?.videoId}
                        searchScreen
                    />
                ))
            ) : (
                <SkeletonTheme color='#343a40' highlightColor='#3c4147'>
                    <Skeleton width='100%' height='160px' count={20} />
                </SkeletonTheme>
            )}
        </Container>
    );
}
