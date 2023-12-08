import React, { useContext, useState} from "react"
import { UserContext } from "./userContext"
import { AContext } from "../auth/authContext"
import ProfileInfo from "./profileInfo"
export default function EditAbout(props){
    const {
        editAbout,
        setInfo,
        info
    } = useContext(UserContext)
    const [toggle, setToggle] = useState(false)
    const {auth: {user, token}} = useContext(AContext)
    const [editInputs, setEditInputs] = useState({
        firstName: info.firstName,
        lastName: info.lastName,
        email: info.email,
        gender: info.gender,
        about: info.about,
        imgUrl: info.imgUrl
    })
    function handleChange(e){
        const {name, value} = e.target
        setInfo(prev=>{
            return {
                ...prev,
                [name]: value
            }
        })
        console.log(value)
    }
    function handleSubmit(){
        setToggle(prev=>!prev)
        editAbout(info._id, editInputs)
        if(editInputs.gender === "man" || editInputs.gender ===  "male"){
            return pronouns = "he/him/his"
        }
        else if(editInputs.gender === "woman" || editInputs.gender ===  "female"){
            return pronouns = "she/her/hers"
        }
        else if(editInputs.gender === "other" || editInputs.gender === "nonbinary"){
            return pronouns = "they/them/theirs"
        }
    }
    console.log(info)
    return (
        <>
             {toggle ?
            <div className="postInputs">
                <p>first Name</p>
                <input 
                    autoComplete="on"
                    type="text"
                    name="firstName"
                    placeholder="first Name"
                    value={info.firstName}
                    onChange={handleChange}
                />
                <p>last name</p>
                <input
                    autoComplete="on" 
                    type="text"
                    name="lastName"
                    placeholder="last name"
                    value={info.lastName}
                    onChange={handleChange}
                />
                <p>email</p>
                <input
                    autoComplete="on" 
                    type="text"
                    name="email"
                    placeholder="email"
                    value={info.email}
                    onChange={handleChange}
                />
                <p>Image url address</p>
                <input
                    autoComplete="off" 
                    type="text"
                    name="imgUrl"
                    placeholder="imgUrl"
                    value={info.imgUrl}
                    onChange={handleChange}
                />
                <p>gender</p>
                <input
                    autoComplete="on" 
                    type="text"
                    name="gender"
                    placeholder="gender"
                    value={info.gender}
                    onChange={handleChange}
                />
                <p>About</p>
                <textarea
                    name="about"
                    placeholder="about"
                    value={info.aboutMe}
                    onChange={handleChange}
                />
                <button onClick={handleSubmit}>Save</button>
            </div>
            :
            <button onClick={()=>setToggle(prev=>!prev)}>Edit</button>}
            <ProfileInfo />
        </>
    )
}