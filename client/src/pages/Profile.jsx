import React, {useContext, useEffect} from "react";
import {AContext} from "./components/auth/authContext"
import{ UserContext } from "./components/user./userContext"
import PostList from "./components/post/postList"
import Popup from "./components/chat/chatPopup";
import About from "./components/user./about"
import "../App.css"
export default function Profile(){
    const {auth: {user, token}, logout} =  useContext(AContext)
    const {deleteUser} = useContext(UserContext)
    function deletedUser(userId){
        deleteUser(userId)
        logout()
    }
    return (
        <div className="profile">
            <h1>Hello @{user.username}!</h1>
            <button onClick={()=>deletedUser(user._id)}>Delete User</button>
            <About />
            <PostList 
                token={token}
                user={user}
            />
            {/* <Popup/> */}
        </div>
    )
}