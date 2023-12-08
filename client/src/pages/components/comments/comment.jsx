import React, {useState} from "react"
import EditComment from "./editComment"
export default function Comment(props){
    const {
        commentt,
        like,
        dislike,
        likedUsers,
        dislikedUsers,
        deleted,
        token,
        _id,
        user
    } = props
    console.log('comment:', commentt)
    const votedUp = likedUsers.includes(user)
    const votedDown = dislikedUsers.includes(user)
    const [toggle, setToggle] = useState(true)
    function likeIt(){
        setToggle(false)
        like(_id)
    }
    function dislikeIt(){
        setToggle(false)
        dislike(_id)
    }
    return (
        <div className="comment">
            <p>{commentt.comment}</p>
            {/* <p>{likedUsers.length - dislikedUsers.length}</p> */}
            {toggle && 
            <>
                {!votedUp && <button onClick={likeIt}>^</button>}
                {!votedDown && <button onClick={dislikeIt}>v</button>}
            </>}
            {token && <button onClick={()=>deleted(_id)} >Delete</button>}
           <EditComment 
                comment={commentt}
                _id={_id}
           />
        </div>
    )
}