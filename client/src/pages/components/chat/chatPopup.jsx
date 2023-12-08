import React, {useState, useContext, useEffect} from "react"
import { ChatContext } from "./chatContext"
import AllChats from "./allChats"
export default function Popup(){
    const [toggle, setToggle] = useState(false)
    const {getAllChats} = useContext(ChatContext)
    useEffect(()=>{
        getAllChats()
    },[])
    return (
        <div className="chats">
            <button onClick={()=>setToggle(prev=>!prev)}>Chats</button>
            {toggle && <AllChats/>}
        </div>
    )
}