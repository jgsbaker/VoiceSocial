import React, {useState, useContext, useEffect} from "react"
import { PostContext } from "./postContext"
import PostInput from "./postInput"
import Post from "./post"
import { AContext } from "../auth/authContext"
const init={
    title: "",
    description: "",
    imgUrl: ""
}
export default function PostList(props){
    const {
        getPosts,
        addPost,
        downVote,
        upVote,
        deletePost,
        posts
    } = useContext(PostContext)
    const {auth: {token, user}} = useContext(AContext)
    const [initPost, setInitPost] = useState(init)
    const [thisPost, setThisPost] = useState({
        title: localStorage.getItem("title") || "",
        description: localStorage.getItem("description") || "",
        imgUrl: localStorage.getItem("imgUrl") || ""
    })
    const [postingList, setPostingList] = useState([])
    function handleInitChange(e){
        const {name, value} = e.target
        setInitPost(prev=>({
                ...prev,
                [name]: value
        }))
    }
    function handleEditChange(e){
        const {name, value} = e.target
        setThisPost(prev=>({
            ...prev,
            [name]: value
        }))
    }
    function postThePost(){
        addPost(initPost)
        setPostingList(prev=>{
            return [
                ...prev,
                initPost
            ]
        })
        setInitPost(init)
    }
    useEffect(()=>{
        getPosts()
    },[])
    const allPosts = posts.map(prev=>{
        return (
            <>
                {prev.user===user._id && <Post
                    key={prev._id} 
                    title={prev.title}
                    description={prev.description}
                    imgUrl={prev.imgUrl}
                    postId={prev._id}
                    like={upVote}
                    dislike={downVote}
                    deleteIt={deletePost}
                    token={token}
                    user={prev.user}
                    userId={user._id}
                    likedUsers={prev.likedUsers}
                    dislikedUsers={prev.dislikedUsers}
                    getPosts={getPosts}
                    btnText={prev.btnText}
                    handleThisChange={handleEditChange}
                />}
            </>
        )
    })
    return (
        <div className="post">
            <PostInput
                key={thisPost._id+thisPost.description} 
                title={thisPost.title}
                description={thisPost.description}
                imgUrl={thisPost.imgUrl}
                postId={thisPost._id}
                setPostingList={setPostingList}
                handleSubmit={postThePost}
                handleThisChange={handleInitChange}
                btnText="Post"
            />
            {allPosts}
        </div>
    )
}