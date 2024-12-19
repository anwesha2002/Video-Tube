import  {useEffect , useState} from 'react';
import {useParams} from "react-router-dom";
import {useAppDispatch , useAppSelector} from "../../redux/store.ts";
// import {searchVideosByKeyword} from "../../redux/searchVideoSlice.ts";
import {Container} from "react-bootstrap";
import {VideoHorizontal} from "../../Component/VideoHorizontal/VideoHorizontal.tsx";
import Skeleton , {SkeletonTheme} from "react-loading-skeleton";
import {searchVideosByKeywordThunk} from "../../redux/searchVideoSlice.ts";

export function SearchScreen() {

    const { query } = useParams ()
    const dispatch = useAppDispatch ()

    const [searchresult , setSearchResult] = useState<boolean> ( false )

    console.log ( "query" , query )

    useEffect ( () => {

        if(!query) return

        dispatch ( searchVideosByKeywordThunk ( { keyword : query } ) )
        // searchVideosByKeyword( {keyword : query }).then(()=>{})

        query?.trim () !== "" && setSearchResult ( true )
    } , [query] );

    const { videos , loading , ViewsDuration , channelIcons } = useAppSelector ( state => state.searchedVideo )

    return (
        <Container>
            { !loading ? (
                videos?.map ( (video , index) => (
                    <VideoHorizontal
                        searchresult={ searchresult }
                        viewsDuration={ ViewsDuration[index] }
                        channelIcon={ channelIcons[index] }
                        videos={ video }
                        key={ video?.id?.videoId }
                        searchScreen
                    />
                ) )
            ) : (
                <SkeletonTheme baseColor='#343a40' highlightColor='#3c4147'>
                    <Skeleton width='100%' height='160px' count={ 20 }/>
                </SkeletonTheme>
            ) }
        </Container>
    );
}
