import React, { useContext, useEffect } from "react";
import { UserContext } from "./userContext";
export default function ProfileInfo(props){
    const {getAbout, info} = useContext(UserContext)
    useEffect(()=>{
        getAbout()
    },[])
    return (
        <>
            <img src={info.imgUrl} alt={info.imgUrl} width="200px"/>
            <h3>{info.firstName} {info.lastName}</h3>
            <p>{info.gender} </p>
            <p>{props.pronouns}</p>
            <p>{info.aboutMe}</p>
        </>
    )
}