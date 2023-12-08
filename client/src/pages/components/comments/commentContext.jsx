import React, {useState, createContext, useEffect} from "react"
import axios from "axios"
export const CommentContext = createContext()
const commentAxios = axios.create()
commentAxios.interceptors.request.use(config=>{
    const token = localStorage.getItem("token")
    config.headers.Authorization = `Bearer ${token}`
    return config
})
export default function CommentContextProvider(props){
    const [comment, setComment] = useState({
        comment: ""
    })
    const [allComments, setAllComments] = useState([])
    function getAllComments(){
        commentAxios.get("/protected/comment/")
        .then(res=>{
            setAllComments(res.data)
        })
        .catch(err=>console.log(err))
    }
    function addComment(newComment, postId){
        commentAxios.post(`/protected/comment/${postId}`, newComment)
        .then(res=>{
            setAllComments(prev=>([
                    ...prev,
                    res.data
                ]))
            getAllComments()
        })
        .catch(err=>console.log(err))
    }
    function editComment(commentId, updates){
        commentAxios.put(`/protected/comment/${commentId}`, updates)
        .then(res=>{
            setAllComments(prev=>prev.map(comment=>comment._id !== commentId ? comment : res.data))
            getAllComments()
        })
        .catch(err=>console.log(err))
    }
    function deleteComment(commentId){
        commentAxios.delete(`/protected/comment/${commentId}`)
        .then(res=>{
            setAllComments(prev=>prev.filter(msg=>msg._id !==commentId))
            getAllComments()
        })
        .catch(err=>console.log(err))
    }
    function upVoteComment(commentId, updates){
        commentAxios.put(`/protected/comment/upvote/${commentId}`, updates)
        .then(res=>{
            setAllComments(prev=> prev.map(comment=> comment._id !== commentId ? comment : res.data))
            getAllComments()
        })
        .catch(err=>console.log(err))
    }
    function downVoteComment(commentId, updates){
        commentAxios.put(`/protected/comment/downvote/${commentId}`, updates)
        .then(res=>{
            setAllComments(prev=> prev.map(comment=> comment._id !== commentId ? comment : res.data))
            getAllComments()
        })
        .catch(err=>console.log(err))
    }
    return (
        <CommentContext.Provider
            value={{
                getAllComments,
                addComment,
                editComment,
                deleteComment,
                upVoteComment,
                downVoteComment,
                ...comment,
                allComments
            }}
        >
            {props.children}
        </CommentContext.Provider>
    )
}