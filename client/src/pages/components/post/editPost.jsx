import React, {useContext, useState} from "react"
import PostInput from "./postInput"
import { PostContext } from "./postContext"
export default function EditPost(props){
    const {
        title,
        description,
        imgUrl,
        postId,
        handleThisChange,
        btnText
    } = props
    const init = {
        title: title,
        description: description,
        imgUrl: imgUrl
    }
    const {editPost} = useContext(PostContext)
    const [editInputs, setEditInputs] = useState(init)
    const [toggle, setToggle] = useState(false)
    function handleEditChange(e){
        handleThisChange(e)
        const {name, value} = e.target
        setEditInputs(prev=>({
            ...prev,
            [name]: value
        }))
    }
    const postUpdate = ()=>editPost(postId, editInputs)
    return (
        <>
        {toggle ?
        <PostInput 
            title={editInputs.title}
            description={editInputs.description}
            imgUrl={editInputs.imgUrl}
            postId={editInputs._id}
            handleSubmit={postUpdate}
            handleThisChange={handleEditChange}
            btnText={"Save Edit"}
        />
        :
        <button onClick={()=>setToggle(prev=>!prev)}>Edit</button>}
        </>
    )
}