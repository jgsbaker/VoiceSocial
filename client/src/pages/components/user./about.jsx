import React, {useState, useContext, useEffect} from "react";
import { UserContext } from "./userContext";
import AboutInputs from "./aboutInfo";
// import EditAbout from "./editAbout";
export default function About(props){
    const {
        getAbout,
        setInfo,
        postAbout,
        info
    } = useContext(UserContext)
    function handleThisChange(e){
        const {name, value} = e.target
        setInfo(prev=>{
            return {
                ...prev,
                [name]: value
            }
        })
    }
    let pronouns
    function handleSubmit(){
        postAbout(info, info._id)
        if(info.gender === "man" || "male"){
            return pronouns = "he/him/his"
        }
        else if(info.gender === "woman" || "female"){
            return pronouns = "she/her/hers"
        }
        else if(info.gender === "other" || "nonbinary"){
            return pronouns = "they/them/theirs"
        }
    }
    useEffect(()=>{
        getAbout()
    },[])
    return (
        <div className="about">
            <AboutInputs 
                pronouns={props.pronouns}
                handleThisChange={handleThisChange}
                handleSubmit={handleSubmit}
                BtnText="Save"
            />
            {/* <EditAbout/> */}
        </div>
    )
}