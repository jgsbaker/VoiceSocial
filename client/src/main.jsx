import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import AuthContextProvider from "./pages/components/auth/authContext"
import UserContextProvider from './pages/components/user./userContext.jsx'
import PostContextProvider from './pages/components/post/postContext.jsx'
import CommentContextProvider from './pages/components/comments/commentContext.jsx'
import ChatContextProvider from './pages/components/chat/chatContext.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
    <AuthContextProvider>
        <UserContextProvider>
            <ChatContextProvider>
                <PostContextProvider>
                    <CommentContextProvider>
                        <App />
                    </CommentContextProvider>
                </PostContextProvider>
            </ChatContextProvider>
        </UserContextProvider>
    </AuthContextProvider>
)
