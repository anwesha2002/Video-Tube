import moment from "moment";
import "./_comment.scss"

export function Comment(){


return (
    <div className='p-2 comment d-flex'>
        <img
            src="https://i.ytimg.com/vi/Ys7L5rFN4PA/default.jpg"
            alt=''
            className='mr-3 rounded-circle'
        />
        <div className='comment__body'>
            <p className='mb-1 comment__header'>
                name• {moment(4.45).fromNow()}
            </p>
            <p className='mb-0'>txt</p>
        </div>
    </div>
)
}