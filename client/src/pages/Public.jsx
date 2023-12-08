import React from "react"
import PublicPosts from "./components/post/publicPosts"
import PostContextProvider from "./components/post/postContext"
import CommentContextProvider from "./components/comments/commentContext"
import Popup from "./components/chat/chatPopup"
import ChatContextProvider from "./components/chat/chatContext"
import AuthContextProvider from "./components/auth/authContext"
import UserContextProvider from "./components/user./userContext"
export default function Public(){
    return (
        <>
            <AuthContextProvider>
                <UserContextProvider>
                    <ChatContextProvider>
                        <PostContextProvider>
                            <CommentContextProvider>
                                <PublicPosts />
                                {/* <Popup/> */}
                            </CommentContextProvider>
                        </PostContextProvider>
                    </ChatContextProvider>
                </UserContextProvider>
            </AuthContextProvider>
        </>
    )
}