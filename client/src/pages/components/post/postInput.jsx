import React, {useState} from "react"
export default function PostInput(props){
    const {
        title,
        description,
        imgUrl,
        handleSubmit,
        handleThisChange,
        btnText,
        postId
    } = props
    const init = {
        title: title || "",
        description:description || "",
        imgUrl: imgUrl || ""
    }
    const [inputs, setInputs] = useState(init)
    const [inputList, setInputList] = useState([])
    function handleChange(e){
        handleThisChange(e)
        const {name, value} = e.target
        setInputs(prev=>({
                ...prev,
                [name]: value
        }))
    }
    return (
        <div className="postInput">
            <p>title</p>
            <input 
                type="text"
                name="title"
                placeholder="title"
                value={inputs.title}
                onChange={handleChange}
            />
            <p>Image url address</p>
            <input 
                type="text"
                name="imgUrl"
                placeholder="imgUrl"
                value={inputs.imgUrl}
                onChange={handleChange}
            />
            <p>description</p>
            <textarea
                name="description"
                placeholder="description"
                value={inputs.description}
                onChange={handleChange}
            />
            <button onClick={()=> handleSubmit(inputs._id, inputs._id)} className="postBtn">{btnText}</button>
        </div>
    )
}