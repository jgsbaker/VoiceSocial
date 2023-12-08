import React, {useEffect, useState} from "react"
import EditPost from "./editPost"
import CommentInput from "../comments/CommentInput"
export default function Post(props){
    const {
        title,
        description,
        imgUrl,
        postId,
        like,
        deleteIt,
        dislike,
        token,
        likedUsers,
        dislikedUsers,
        getPosts,
        handleSubmit,
        handleThisChange,
        user
    } = props
    useEffect(()=>{
        getPosts()
    }, [])
    const voters = [...likedUsers, ...dislikedUsers]
    const votedUp = likedUsers.includes(user)
    const votedDown = dislikedUsers.includes(user)
    const [toggle, setToggle] = useState(true)
    function likeIt(){
        setToggle(false)
        like(postId)
    }
    function dislikeIt(){
        setToggle(false)
        dislike(postId)
    }
    const votes = likedUsers.length - dislikedUsers.length
    return (
        <div className="post">
             <h3>{title}</h3>
             {description != "" && <h4>{description}</h4>}
             {imgUrl != "" && <img src={imgUrl} alt={imgUrl} width="300px"/>}
             {/* <p>{votes}</p> */}
             {toggle && 
             <>
                 {!votedUp && <button onClick={likeIt}>^</button>}
                 {!votedDown && <button onClick={dislikeIt}>v</button>}
             </>}
             {token && <button onClick={()=>deleteIt(postId)}>Delete</button>}
             {token && 
             <EditPost 
                title={title}
                description={description}
                imgUrl={imgUrl}
                postId={postId}
                btnText="Edit Post"
                token={token}
                likedUsers={likedUsers}
                dislikedUsers={dislikedUsers}
                handleSubmit={handleSubmit}
                handleThisChange={handleThisChange}
            /> }
            <CommentInput postId={postId}/>
        </div>
    )
    }
