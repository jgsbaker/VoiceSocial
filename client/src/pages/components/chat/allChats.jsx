import React, {useContext, useState, useEffect} from "react"
import {AContext} from "../auth/authContext"
import { ChatContext } from "./chatContext"
import ChatInput from "./chatInput"
import ChatWindow from "./thisChat"
export default function AllChats(){
    const { auth: {user, token}, allUsers} = useContext(AContext)
    const {chat, getAllChats, allChats} = useContext(ChatContext)
    const chats = allChats.map(prevChat=>{
        console.log(prevChat)
        return (
            <>
                {token && <>
                    <ChatWindow 
                    className="container"
                    key={prevChat._id}
                    user2={prevChat.user2}
                    user1={prevChat.user1}
                    message={prevChat.message}
                    currentChat={prevChat.chat}
                    username1={prevChat.username1}
                    username2={prevChat.username2}
                    />
                </>}
            </>
            
        )
    })
    useEffect(()=>{
        getAllChats()
    },[])
    return (
        <>
            <ChatInput
                key={chat._id}
            />
            {chats}
        </>
    )
}