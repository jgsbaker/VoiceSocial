import React, {useState, useContext, useEffect} from "react"
import { CommentContext } from "./commentContext"
export default function CommentInput(props){
    const {
        comment,
        _id
    } = props
    const {
        editComment,
        setComment
    } = useContext(CommentContext)
    const [editInput, setEditInput] = useState({
        comment: comment.comment
    })
    const [editToggle, setEditToggle] = useState(false)
    function handleChange(e){
        const {name, value} = e.target
        setEditInput(prev=>({
            ...prev,
            comment,
            [name]: value
        }))
    }
    function handleSubmit(){
        setEditToggle(prev=>!prev)
        editComment(_id, editInput)
    }
    return (
        <>
            {editToggle ?
            <>
                <input 
                    type="text"
                    value={editInput.comment}
                    name="comment"
                    placeholder="comment"
                    onChange={handleChange}
                />
                <button onClick={handleSubmit}>Save</button>
            </>
            :
            <button onClick={()=>setEditToggle(prev=>!prev)}>Edit</button>} 
        </>
    )
}