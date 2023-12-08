import React, {createContext, useState} from "react"
import axios from "axios"
export const AContext = createContext()
export default function AContextProvider(props){
    const initState={
        user: JSON.parse(localStorage.getItem("user")) || {},
        token: localStorage.getItem("token") || "",
        errMsg: ""
    }
    const [auth, setAuth] = useState(initState)
    const [allUsers, setAllUsers] = useState([])
    function signup(credentials){
        axios.post("/auth/signup", credentials)
        .then(res=>{
            const {user, token} = res.data
            localStorage.setItem("token", token)
            localStorage.setItem("user", JSON.stringify(user))
            setAuth(prev=>({
                ...prev,
                user,
                token
            }))
            setAllUsers(prev=>[...prev,user])
        })
        .catch(err=>{
            handleAuthErr(err)
            console.log(err)
        })
    }
    function login(credentials){
        axios.post("/auth/login", credentials)
        .then(res=>{
            const {user, token} = res.data
            localStorage.setItem("token", token)
            localStorage.setItem("user", JSON.stringify(user))
            setAuth(prev=>({
                ...prev,
                user,
                token
            }))
            setAllUsers(prev=>[...prev,user])
        })
        .catch(err=>{
            handleAuthErr(err)
            console.dir(err)
        })
        getUsers()
    }
    console.log(allUsers)
    function logout(){
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        setAuth({
            user: {},
            token: "",
            posts: []
        })
    }
    function handleAuthErr(errMsg){
        setAuth(prev=>({
            ...prev,
            errMsg
        }))
    }
    function resetAuthErr(errMsg){
        setAuth(prev=>({
            ...prev,
            errMsg: ""
        }))
    }
    return (
        <AContext.Provider
            value={{
                auth,
                signup,
                login,
                logout,
                resetAuthErr,
                allUsers,
                setAllUsers
            }}
        >
            {props.children}
        </AContext.Provider>
    )
}