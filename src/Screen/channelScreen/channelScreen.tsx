import React , {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {useAppDispatch , useAppSelector} from "../../redux/store.ts";
// import {channelBYID , getVideosByChannel , SubStat} from "../../redux/channelSclice.ts";
import numeral from "numeral";
import {Col , Container , Row} from "react-bootstrap";
import Skeleton , {SkeletonTheme} from "react-loading-skeleton";
import {Video} from "../../Component/Video/video.tsx";
import "./_channlScreen.scss"
import {channelBYIDThunk , getVideosByChannelThunk} from "../../redux/channelSclice.ts";

export function ChannelScreen() {
    const { channelId } = useParams ()

    const dispatch = useAppDispatch ()


    useEffect ( () => {
        dispatch ( getVideosByChannelThunk ( { id : channelId } ) )
        dispatch ( channelBYIDThunk ( { id : channelId } ) )

        // getVideosByChannel({id : channelId}).then(()=>{})
        // channelBYID({id : channelId}).then(()=>{})
    } , [channelId] );

    const { channelVideos , loading , duration , channelIcon } = useAppSelector ( state => state.channel )
    const { channel } = useAppSelector ( state => state.channel )

    const { snippet } = channel
    const { statistics } = channel

    console.log ( duration )


    return (
        <>
            <div className='px-5 py-2 my-2 d-flex justify-content-between align-items-center channelHeader'>
                <div className='d-flex align-items-center channelHeader__left'>
                    <img src={ snippet?.thumbnails?.default?.url } alt='' className="me-2"/>

                    <div className='ml-3 channelHeader__details'>
                        <h3>{ snippet?.title }</h3>
                        <span>
                     { numeral ( statistics?.subscriberCount ).format ( '0.a' ) }{ ' ' }
                            subscribers
                  </span>
                    </div>
                </div>

                <button className="p-2">Subscribed</button>
            </div>

            <Container>
                <Row className='mt-2'>
                    { !loading
                        ? channelVideos?.map ( (video , index) => (
                            <Col md={ 3 } lg={ 3 }>
                                <Video duration={ duration[index] } channelIcon={ channelIcon[index] } item={ video }
                                       channelScreen/>
                            </Col>
                        ) )
                        : [...Array ( 15 )].map ( () => (
                            <Col md={ 3 } lg={ 3 }>
                                <SkeletonTheme
                                    color='#343a40'
                                    highlightColor='#3c4147'>
                                    <Skeleton width='100%' height='140px'/>
                                </SkeletonTheme>
                            </Col>
                        ) ) }
                </Row>
            </Container>
        </>
    );
}

