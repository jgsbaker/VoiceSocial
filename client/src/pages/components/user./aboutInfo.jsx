import React, {useState, useContext} from "react"
import ProfileInfo from "./profileInfo";
import { UserContext } from "./userContext";
export default function AboutInputs(props){
    const {info} = useContext(UserContext)
    const [initInputs, setInitInputs] = useState({
        firstName: info.firstName,
        lastName: info.lastName,
        email: info.email,
        gender: info.gender,
        about: info.aboutMe,
        imgUrl: info.imgUrl
    })
    const [toggle, setToggle] = useState(false)
    function handleChange(e){
        props.handleThisChange(e)
        const {name, value} = e.target
        setInitInputs(prev=>{
            return {
                ...prev,
                [name]: value
            }
        })
    }
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
                    value={initInputs.firstName}
                    onChange={handleChange}
                />
                <p>last name</p>
                <input
                    autoComplete="on" 
                    type="text"
                    name="lastName"
                    placeholder="last name"
                    value={initInputs.lastName}
                    onChange={handleChange}
                />
                <p>email</p>
                <input
                    autoComplete="on" 
                    type="text"
                    name="email"
                    placeholder="email"
                    value={initInputs.email}
                    onChange={handleChange}
                />
                <p>Image url address</p>
                <input
                    autoComplete="off" 
                    type="text"
                    name="imgUrl"
                    placeholder="imgUrl"
                    value={initInputs.imgUrl}
                    onChange={handleChange}
                />
                <p>gender</p>
                <input
                    autoComplete="on" 
                    type="text"
                    name="gender"
                    placeholder="gender"
                    value={initInputs.gender}
                    onChange={handleChange}
                />
                <p>About</p>
                <textarea
                    name="about"
                    placeholder="about"
                    value={initInputs.about}
                    onChange={handleChange}
                />
                <button onClick={()=>props.handleSubmit()}>Save</button>
            </div>
            :
            <button onClick={()=>setToggle(prev=>!prev)}>Post About</button>}
            <ProfileInfo 
                firstName={initInputs.firstName}
                lastName={initInputs.lastName}
                gender={initInputs.gender}
                aboutMe={initInputs.aboutMe}
                imgUrl={initInputs.imgUrl}
                pronouns={props.pronouns}
            />
        </>
    )
}