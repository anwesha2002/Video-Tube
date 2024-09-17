import {Col , Row} from "react-bootstrap";
import {Comments} from "../../Component/Comments/Comments.tsx";
import "./_watchScreen.scss"
import {VideoMetaData} from "../../Component/VideoMetaData/VideoMetaData.tsx";
import {VideoHorizontal} from "../../Component/VideoHorizontal/VideoHorizontal.tsx";

export function WatchScreen() {

    return (

        <Row>

                <title>Title</title>

            <Col lg={ 8 }>
                <div className='watchScreen__player'>
                    <iframe
                        src="https://i.ytimg.com/vi/Ys7L5rFN4PA/default.jpg"
                        // src="https://www.youtube.com/embed/VgsC_aBquUE/"
                        title="Title"
                        allowFullScreen
                        width='100%'
                        height='100%'></iframe>
                </div>
                <VideoMetaData  />


                <Comments/>
            </Col>
            <Col lg={ 4 }>
                {
                    [...Array(20)].map ( () => (
                        <VideoHorizontal  />
                        )
                ) }
            </Col>
        </Row>
    )
}