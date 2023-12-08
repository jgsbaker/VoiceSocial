import React, {useContext, createContext, useState} from "react";
import axios from "axios"
import { AContext } from "../auth/authContext";
export const UserContext = createContext()
const userAxios = axios.create()
userAxios.interceptors.request.use(config=>{
    const token = localStorage.getItem("token")
    config.headers.Authorization = `Bearer ${token}`
    return config
})
export default function UserContextProvider(props){
    const {auth, setAuth, logout, setAllUsers} = useContext(AContext)
    const [info, setInfo] = useState({
            firstName: "",
            lastName: "",
            email: "",
            gender: "",
            aboutMe: "",
            imgUrl: ""
        })
    const [about, setAbout] = useState([])
    function deleteUser(userId){
        userAxios.delete(`/protected/user/${userId}`)
        .then(res=>{
            setAuth(res.data)
            setAllUsers(prev=>prev.filter(user=>user._id !== userId))
            logout()
        })
        .catch(err=>console.log(err))
    }
    function getAbout(){
        userAxios.get("/protected/about/")
        .then(res=>{
            console.log(res.data)
            setInfo(res.data)
            setAbout(res.data)
        })
        .catch(err=>console.log(err))
    }
    function postAbout(about){
        userAxios.post(`/protected/about/`, about)
        .then(res=>{
            console.log(res.data)
            setInfo(res.data)
            getAbout()
        })
        .catch(err=>console.log(err))
    }
    function editAbout(aboutId, updates){
        userAxios.put(`/protected/about/${aboutId}`, updates)
        .then(res=>{
            console.log(res.data)
            setInfo(prev=> prev._id !== aboutId ? prev : res.data)
            getAbout()
        })
        .catch(err=>console.log(err))
    }
    return (
        <UserContext.Provider
            value={{
                deleteUser,
                getAbout,
                postAbout,
                editAbout,
                info,
                about,
                setInfo,
                setAbout
            }}
        >
            {props.children}
        </UserContext.Provider>
    )
}