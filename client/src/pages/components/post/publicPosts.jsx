import React, {useState, useContext, useEffect} from "react"
import { PostContext } from "./postContext"
import Post from "./post"
import { AContext } from "../auth/authContext"
export default function PublicPosts(){
    const {
        getPosts,
        downVote,
        upVote,
        deletePost,
        posts,
    } = useContext(PostContext)
    console.log(posts)
    const {token} = useContext(AContext)
    useEffect(()=>{
        getPosts()
    },[])
    const [thisPost, setThisPost] = useState({
        title: localStorage.getItem("title") || "",
        description: localStorage.getItem("description") || "",
        imgUrl: localStorage.getItem("imgUrl") || ""
    })
    const [postingList, setPostingList] = useState([])
    function handleChange(e){
        const {name, value} = e.target
        setThisPost(prev=>({
                ...prev,
                [name]: value
        }))
    }
    console.log(posts)
    const thesePosts = posts.sort((a, b)=> a.likedUsers.length+b.likedUsers.length)
    const newPosts = thesePosts.sort((a, b)=>a.dislikedUsers.length - b.dislikedUsers.length )
    console.log(newPosts)
    return (
        <>

            {newPosts.map(prev=>{
        return (
            <>
                <div>
                    <Post
                        key={prev._id+prev.title} 
                        title={prev.title}
                        description={prev.description}
                        imgUrl={prev.imgUrl}
                        postId={prev._id}
                        like={upVote}
                        dislike={downVote}
                        deleteIt={deletePost}
                        token={token}
                        likedUsers={prev.likedUsers}
                        dislikedUsers={prev.dislikedUsers}
                        getPosts={getPosts}
                        handleThisChange={handleChange}
                    />
                </div>
            </>
        )
    })}
        </>
    )
}