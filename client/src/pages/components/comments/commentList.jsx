import React, {useContext, useEffect, useState} from "react";
import { AContext } from "../auth/authContext"
import { CommentContext } from "./commentContext";
import Comment from "./comment"
export default function CommentList(props){
    const {postId} = props
    const {
        getAllComments,
        deleteComment,
        upVoteComment,
        downVoteComment,
        allComments
    } = useContext(CommentContext)
    const {auth :{user, token} }= useContext(AContext)
    useEffect(()=>{
        getAllComments()
    }, [])
    console.log(allComments)
    const filteredComments = allComments.filter(comment=> comment.post === postId)
    return (
        <div>
            {filteredComments.map(comment=>{
                return (    
                    <>
                        {token && <Comment
                            key={comment._id}
                            like={upVoteComment}
                            dislike={downVoteComment}
                            token={token}
                            commentt={comment}
                            deleted={deleteComment}
                            likedUsers={comment.likedUsers}
                            dislikedUsers={comment.dislikedUsers}
                            _id={comment._id}
                            user={comment.user._id}
                        />}
                    </>
                    )
                })
            }
        </div>
    )
}