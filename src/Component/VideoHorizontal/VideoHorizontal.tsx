import {Col , Row} from "react-bootstrap";
import "./_videoHorizontal.scss"
import {AiFillEye} from "react-icons/ai";
import moment from "moment";
import numeral from "numeral";

export function VideoHorizontal(){

    return (
        <Row
            className='py-2 m-1 videoHorizontal align-items-center'>
            {/* //TODO refractor grid */}
            <Col
                xs={6}
                className='videoHorizontal__left'>
                <img
                    src="https://i.ytimg.com/vi/Ys7L5rFN4PA/default.jpg"
                    // className={`videoHorizontal__thumbnail ${thumbnail} `}
                    // wrapperClassName='videoHorizontal__thumbnail-wrapper'
                />

                    <span className='videoHorizontal__duration'>5.4</span>

            </Col>
            <Col
                xs={6}
                // md={searchScreen || subScreen ? 8 : 6}
                className='p-0 videoHorizontal__right'>
                <p className='mb-1 videoHorizontal__title'>titl</p>


                    <div className='videoHorizontal__details'>
                        <AiFillEye /> {numeral(100000).format('0.a')} Views •
                        {moment(4.5).fromNow()}
                    </div>


                    <p className='mt-1 videoHorizontal__desc'>description</p>


                <div className='my-1 videoHorizontal__channel d-flex align-items-center'>

                        <img src="https://i.ytimg.com/vi/Ys7L5rFN4PA/default.jpg"  />

                    <p className='mb-0'>ctitle</p>
                </div>

                    <p className='mt-2'>
                         Videos
                    </p>

            </Col>
        </Row>
    )
}