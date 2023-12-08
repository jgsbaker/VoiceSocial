import React, {useState, createContext, useContext, useEffect} from "react"
import { AContext } from "../auth/authContext"
import axios from "axios"
const chatAxios = axios.create()
chatAxios.interceptors.request.use(config=>{
    const token = localStorage.getItem("token")
    config.headers.Authorization = `Bearer ${token}`
    return config
})
export const ChatContext = createContext()
export default function ChatContextProvider(props){
    const {allUsers, setAllUsers} = useContext(AContext)
    const [msg, setMsg] = useState({
        message: "",
        user1: "",
        username2: "",
        username1:"",
        user2: "",
    })
    const [chat, setChat] = useState([])
    const [allMsgs, setAllMsgs] = useState([])
    const [allChats, setAllChats] = useState([])
    function findUserChat(username){
        chatAxios.get("/protected/chat/search", username)
        .then(res=>{
            console.log(res.data)
            const {_id, username} = res.data
            setMsg(prev=>{
                return {
                    ...prev,
                    user2: _id,
                    username2: username
                }
            })
            setChat(prev=>[...prev, msg])
            setAllChats(prev=>[...prev, chat])
        })
        .catch(err=>console.log(err))
    }
    function findUserMsgs(username){
        chatAxios.get("/protected/messages/search", username)
        .then(res=>{
            console.log(res.data)
            const {_id, username} = res.data
            setMsg(prev=>{
                return {
                    ...prev,
                    user2: _id,
                    username2: username
                }
            })
            setChat(prev=>[...prev, msg])
            setAllChats(prev=>[...prev, chat])
        })
        .catch(err=>console.log(err))
    }
    function getAllChats(){
        chatAxios.get(`/protected/chat/`)
        .then(res=>{
            console.log(res.data)
            setAllChats(res.data)
        })
        .catch(err=>console.log(err))
    }
    function getChat(userID){
        chatAxios.get(`/protected/chat/${userID}`)
        .then(res=>{
            console.log(res.data)
           setChat(res.data)
        })
        .catch(err=>console.log(err))
    }
    function getMsgs(userID){
        chatAxios.get(`/protected/message/${userID}`)
        .then(res=>{
            console.log(res.data)
            setMsg(res.data)
            setAllMsgs(prev=>[...prev,msg])
            setChat(prev=>[...prev, allMsgs])
        })
        .catch(err=>console.log(err))
        getChat(userID)
    }
    function postNewChat(userID, newChat){
        chatAxios.post(`/protected/chat/${userID}`, newChat)
        .then(res=>{
            console.log(res.data)
            setChat(prev=>[...prev, res.data])
            setAllChats(prev=>[...prev, chat])
        })
        .catch(err=>console.log(err))
        getChat(userID)
    }
    function postNewMsg(userID, newMsg){
        chatAxios.post(`/protected/message/${userID}`, newMsg)
        .then(res=>{
            console.log(res.data)
            setMsg(res.data)
            setAllMsgs(prev=>[...prev, msg])
            setChat(prev=>[...prev, msg])
        })
        .catch(err=>console.log(err))
        getMsgs(chat._id, userID)
    }
    function deleteChat(userID){
        chatAxios.delete(`/protected/chat/${userID}`)
        .then(res=>{
            console.log(res.data)
            setChat(prev=>prev.filter(prevChat=> prevChat._id !== userID))
            setAllChats(prev=>prev.filter(prevChat=> prevChat._id !== userID))
        })
        .catch(err=>console.log(err))
        getChat(userID)
    }
    function deleteMsg(userId, msgId){
        chatAxios.delete(`/protected/message/${userId}/${msgId}`)
        .then(res=>{
            console.log(res.data)
            setMsg(prev=>prev.filter(prevChat=> prevChat.message._id !== msgId))
            setChat(prev=>prev.filter(prevChat=> prevChat.message._id !== msgId))
        })
        .catch(err=>console.log(err))
        getMsgs(userId)
    }
    return (
        <ChatContext.Provider
            value={{
                findUserChat,
                findUserMsgs,
                getAllChats,
                getChat,
                getMsgs,
                postNewChat,
                postNewMsg,
                deleteChat,
                deleteMsg,
                msg,
                chat,
                setMsg,
                setChat,
                allMsgs,
                setAllMsgs,
                allChats,
                setAllChats
            }}
        >
            {props.children}
        </ChatContext.Provider>
    )
}