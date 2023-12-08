import React, {useState, useContext, useEffect} from "react"
import { CommentContext } from "./commentContext"
import CommentList from "./commentList"
export default function CommentInput(props){
    const {
        getAllComments,
        addComment
    } = useContext(CommentContext)
    const [toggle, setToggle] = useState(false)
    const [toggleView, setToggleView] = useState(false)
    const [input, setInput] = useState({
        comment: ""
    })
    function handleSubmit(){
        setToggle(prev=>!prev)
        addComment(input, props.postId)
    }
    function handleChange(e){
        const {name, value} = e.target
        setInput({
            [name]: value
        })
    }
    useEffect(()=>{
        getAllComments()
    }, [])
    return (
        <>
            {toggle ?
            <>
                <input 
                    type="text"
                    value={input.comment}
                    name="comment"
                    placeholder="comment"
                    onChange={handleChange}
                />
                <button onClick={handleSubmit}>Post</button>
            </>
            :
            <button onClick={()=>setToggle(prev=>!prev)}>Comment</button>}
            <button onClick={()=>setToggleView(prev=>!prev)}>View Comments</button>
            {toggleView && <CommentList postId={props.postId} />}
        </> 
    )
}