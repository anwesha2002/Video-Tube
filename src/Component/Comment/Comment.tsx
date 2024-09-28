import moment from "moment";
import "./_comment.scss"

export function Comment({comment}){

    const {
        authorDisplayName,
        authorProfileImageUrl,
        publishedAt,
        textDisplay,
    } = comment


return (
    <div className='p-2  comment d-flex'>
        <img
            src={ authorProfileImageUrl }
            alt=''
            className='me-3 rounded-circle'
        />
        <div className='comment_body'>
            <p className='mb-1 comment_header'>
                { authorDisplayName } • <span className="text-secondary ">{moment(publishedAt).fromNow()}</span>
            </p>
            <p className='mb-0'>{ textDisplay }</p>
        </div>
    </div>
)
}