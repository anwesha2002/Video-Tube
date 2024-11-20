import "./_comments.scss"
import {Comment} from "../Comment/Comment.tsx";
import {Form} from "react-bootstrap";
import {useAppDispatch , useAppSelector} from "../../redux/store.ts";
import {useEffect , useState} from "react";
import {GetCommentsThunk , postCommentsThunk} from "../../redux/commentSlice.ts";


type CommentsProps = {
    videoId? : string,
    totalComments : any
}

export function Comments({videoId, totalComments} : CommentsProps){

    const[commentText, setCommentText] = useState("")

    const dispatch = useAppDispatch()

    useEffect ( () => {
        dispatch(GetCommentsThunk({id : videoId}))
        // GetComments({id : videoId}).then(()=>{})
    } , [videoId] );

    const { comments } = useAppSelector(state => state.comment)

    let commentList = []
    for(let i = 0 ;i<comments.length ; i++ ){
        commentList.push(comments[i])
    }

    const _comments = commentList.map(
        (comment) => comment.snippet.topLevelComment.snippet
    )

    function handleSubmit(e){
        e.preventDefault()
        setCommentText(commentText)
        if(commentText.length == 0) return
        dispatch(postCommentsThunk({id : videoId, text : commentText}))
        // postComments({id : videoId, text : commentText}).then(()=>{})
        setCommentText("")
    }


    return (
        <div className="comments">
            <p>{ totalComments }{' '} comments</p>
            <div className="comments_form d-flex mb-4">
                <img
                    src="https://i.ytimg.com/vi/Ys7L5rFN4PA/default.jpg"
                    alt=''
                    className='me-3 rounded-circle'
                />
                <Form onSubmit={handleSubmit} className="d-flex flex-grow-1">
                    <input value={commentText} onChange={(e)=>setCommentText(e.target.value)} type="text" placeholder="write a comment" className="flex-grow-1"/>
                    <button type="submit" className="border-0 p-2">Comment</button>
                </Form>
            </div>
            <div className="comment_list">
                {_comments?.map((comment, i)=>(
                    <Comment comment={comment} key={i}/>
                ))}
            </div>
            {/*<Comment/>*/}
        </div>
    )
}