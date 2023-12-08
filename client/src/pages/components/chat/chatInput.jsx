import React, {useState, useContext} from "react"
import { AContext } from "../auth/authContext"
import { ChatContext } from "./chatContext"
import ChatWindow from "./thisChat"
export default function ChatInput(){
    const { auth: {user}, allUsers} = useContext(AContext)
    const {
        chat, 
        postNewChat,
        findUserChat,
        getChat
    } = useContext(ChatContext)
    const [inputs, setInputs] = useState({
        message: "",
        user1: "",
        username1: "",
        username2: "",
        user2: ""
    })
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
    allUsers.map(item=>item.user.username === inputs.username1 ? inputs.user1 = item.user._id : "")
    function handleSubmit(){
        findUserChat(inputs.username2)
        postNewChat(inputs.user2, inputs)
        // getChat(inputs.user1)
    }
    const chats = chat.map(dm=>{
        return (
            <>
                <ChatWindow
                    className="container" 
                    user2={inputs.user2}
                    user1={inputs.user1}
                    key={dm._id}
                    message={inputs.message}
                    currentChat={inputs.chat}
                    username1={inputs.username1}
                    username2={inputs.username2}
                />
            </>
        )
    })
    console.log(inputs)
    return (
        <div className="chatInput"> 
            <input
                autoComplete="on"
                type="text"
                value={inputs.username2}
                onChange={handleChange}
                name="username2"
                placeholder="send message to"
            />
            <button onClick={handleSubmit}>Send</button>
            {chats}
        </div>
    )
}