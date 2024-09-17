import {MdThumbDown , MdThumbUp} from "react-icons/md";
import numeral from "numeral";
import moment from "moment";
import "./_VideoMetaData.scss"

export function VideoMetaData(){

    return (
        <div className='py-2 videoMetaData'>
            {/*<HelmetCustom title={title} description={description} />*/}

            <div className='videoMetaData__top'>
                <h5>title</h5>
                <div className='py-1 d-flex justify-content-between align-items-center'>
               <span>
                  {numeral(4.5).format('0.a')} Views •{' '}
                   {moment(4.5).fromNow()}
               </span>

                    <div>
                  <span className='mr-3'>
                     <MdThumbUp size={26} /> {numeral(4.5).format('0.a')}
                  </span>
                        <span className='mr-3'>
                     <MdThumbDown size={26} />{' '}
                            {numeral(5.2).format('0.a')}
                  </span>
                    </div>
                </div>
            </div>
            <div className='py-3 my-2 videoMetaData__channel d-flex justify-content-between align-items-center'>
                <div className='d-flex'>
                    <img
                        src="https://i.ytimg.com/vi/Ys7L5rFN4PA/default.jpg"
                        alt=''
                        className='mr-3 rounded-circle'
                    />
                    <div className='d-flex flex-column'>
                        <span>channelTitle</span>
                        <span>
                     {' '}
                            {numeral(7.5).format(
                                '0.a'
                            )}{' '}
                            Subscribers
                  </span>
                    </div>
                </div>

                <button
                    className={`p-2 m-2 border-0 btn `}>
                     {/*{subscriptionStatus ? 'Subscribed' : 'Subscribe'}*/}
                    subscribe
                </button>
            </div>
            <div className='videoMetaData__description'>
                {/*<ShowMoreText*/}
                {/*    lines={3}*/}
                {/*    more='SHOW MORE'*/}
                {/*    less='SHOW LESS'*/}
                {/*    anchorClass='showMoreText'*/}
                {/*    expanded={false}>*/}
                {/*    {description}*/}
                {/*</ShowMoreText>*/}
            </div>
        </div>
    )
}