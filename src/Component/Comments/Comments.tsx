import "./_comments.scss"
import {Comment} from "../Comment/Comment.tsx";
export function Comments(){


    return (
        <div className='comments'>
            <p> Comments</p>
            <div className='my-2 comments__form d-flex w-100'>
                <img src="https://i.ytimg.com/vi/Ys7L5rFN4PA/default.jpg" alt='avatar' className='mr-3 rounded-circle' />
                <form className='d-flex flex-grow-1'>
                    <input
                        type='text'
                        className='flex-grow-1'
                        placeholder='Write a comment...'
                    />
                    <button className='p-2 border-0'>Comment</button>
                </form>
            </div>
            <div className='comments__list'>
                {[...Array(20)].map(() => (
                    <Comment  />
                ))}
            </div>
        </div>
    )
}