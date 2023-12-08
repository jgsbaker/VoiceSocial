import React, {useState, useContext} from "react"
import AuthForm from "./components/auth/authForm"
import {AContext} from "./components/auth/authContext"
import Profile from "./Profile"
const initLogin={username: "", password: ""}
export default function Auth(){
    const {signup, login, errMsg, resetAuthErr} = useContext(AContext)
    const [user, setUser] = useState(initLogin)
    const [toggle, setToggle] = useState(false)
    function handleChange(e){
        const {name, value} = e.target
        setUser(prev=>{
            return {
                ...prev,
                [name]:value
            }
        })
        console.log(value)
    }
    function handleLogin(e){
        e.preventDefault()
        login(user)
        return <Profile />
    }
    function handleSignup(e){
        e.preventDefault()
        signup(user)
        return <Profile />
    }
    function toggleForm(){
        setToggle(prev=>!prev)
        resetAuthErr()
    }
    return (
        <div className="authPage">
            <h1>You HAVE a voice. Use It.</h1>
            {toggle ?
            <>
                <AuthForm
                    handleChange={handleChange}
                    handleSubmit={handleSignup}
                    username={user.username}
                    password={user.password}
                    btnText="Sign Up"
                    errMsg={errMsg}
                />
                <p onClick={toggleForm}>Already a member?</p>
            </>
            :
            <>
                <AuthForm
                    handleChange={handleChange}
                    handleSubmit={handleLogin}
                    username={user.username}
                    password={user.password}
                    btnText="Log In"
                    errMsg={errMsg}
                />
                <p onClick={toggleForm}>Not a member?</p>
            </>
            }
        </div>
    )
}