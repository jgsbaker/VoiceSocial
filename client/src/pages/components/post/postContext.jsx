import React, {useState, createContext, useEffect} from "react"
import axios from "axios"
export const PostContext = createContext()
const postAxios = axios.create()
postAxios.interceptors.request.use(config=>{
    const token = localStorage.getItem("token")
    config.headers.Authorization = `Bearer ${token}`
    return config
})
export default function PostContextProvider(props){
    const initState= {
        title: localStorage.getItem("title") || "",
        description: localStorage.getItem("description") || "",
        imgUrl: localStorage.getItem("imgUrl") || ""
    }
    const [post, setPost] = useState(initState)
    const [posts, setPosts] = useState([])
    function getPosts(){
        postAxios.get("/protected/post/")
        .then(res=>{
            setPosts(res.data)
            const {title, description, imgUrl} = res.data
            localStorage.setItem("title", title)
            localStorage.setItem("description", description)
            localStorage.setItem("imgUrl", imgUrl)
        })
        .catch(err=>console.log(err))
    }
    function getOnePost(postId){
        postAxios.get(`/protected/post/${postId}`)
        .then(res=>{
            const {title, description, imgUrl} = res.data
            localStorage.setItem("title", title)
            localStorage.setItem("description", description)
            localStorage.setItem("imgUrl", imgUrl)
            setPosts(prev=>([
                ...prev,
                title,
                description,
                imgUrl
            ]))
        })
        .catch(err=>console.log(err))
    }
    function addPost(newPost){
        postAxios.post("/protected/post/", newPost)
        .then(res=>{
            const {title, description, imgUrl} = res.data
            localStorage.setItem("title", title)
            localStorage.setItem("description", description)
            localStorage.setItem("imgUrl", imgUrl)
            setPosts(prev=>([ ...prev,res.data ]))
            getPosts()
        })
        .catch(err=>console.log(err))
    }
    function downVote(postId){
        postAxios.put(`/protected/post/downvote/${postId}`)
        .then(res=>{
            setPosts(prev=> prev.map(post=> post._id !== postId ? post.dislikedUsers : res.data))
            getPosts()
            console.log(`Someone voted on this post.`)
        })
    }
    function upVote(postId){
        postAxios.put(`/protected/post/upvote/${postId}`)
        .then(res=>{
            setPosts(prev=> prev.map(post=> post._id !== postId ? post : res.data))
            getPosts()
            console.log(`Someone voted on this post.`)
        })
    }
    function editPost(postId, update){
        postAxios.put(`/protected/post/${postId}`, update)
        .then(res=>{
            setPosts(prev=> prev._id !== postId ? prev : res.data)
            getPosts()
        })
        .catch(err=>console.log(err))
    }
    function deletePost(postId){
        postAxios.delete(`/protected/post/${postId}`)
        .then(res=>{
            setPosts(prev=>prev.filter(post=>post._id !== postId))
            getPosts()
        })
        .catch(err=>console.log(err))
    }
    useEffect(()=>{
        getPosts()
    },[])
    return (
        <PostContext.Provider
            value={{
                ...post,
                posts,
                getOnePost,
                getPosts,
                addPost,
                downVote,
                upVote,
                editPost,
                deletePost
            }}
        >
            {props.children}
        </PostContext.Provider>
    )
}