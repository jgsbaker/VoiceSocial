import React, {useContext, useState, useEffect} from "react"
import { ChatContext } from "./chatContext"
export default function ChatWindow(props){
    const {
        user1, 
        user2, 
        currentChat, 
        message, 
        username1, 
        username2
    } = props
    const {
        chat, 
        postNewMsg,
        getChat,
        getMsgs,
        findUserChat,
        findUserMsgs
    } = useContext(ChatContext)
    const [inputs, setInputs] = useState({
        message: message,
        user1: user1,
        username1: username1,
        chat: currentChat,
        username2: username2
    })
    const [toggle, setToggle] = useState(false)
    function handleChange(e){
        const {name, value} = e.target
        setInputs(prev=>{
            return {
                ...prev,
                [name] : value
            }
        })
        console.log(value)
    }
    function handleSubmit(){
        findUserChat(username2)
        findUserMsgs(username2)
        postNewMsg(user2, inputs)
        console.log(inputs)
    }
    const thisChat = chat.map(msg=>{
        return (
            <>
                <p>{msg.message}</p>
            </>
        )
    })
    useEffect(()=>{
        findUserChat(username2)
        findUserMsgs(username2)
        getChat(user2)
        getChat(user1)
        getMsgs(user2)
    },[])
    return (
        <>
            <p>{username2}</p>
            <button onClick={()=>setToggle(prev=>!prev)}>View</button> 
            {toggle && <div>
                {thisChat}
                <textarea 
                    value={inputs.message}
                    onChange={handleChange}
                    name="message"
                    placeholder="message"
                />
                <button onClick={handleSubmit}>Send</button>
            </div>}
        </>
    )
}