import React from "react"
export default function AuthForm(props){
    const {
        handleSubmit,
        handleChange,
        btnText,
        username,
        password,
        errMsg
    } = props
    return (
        <form className="auth" onSubmit={handleSubmit}>
            <input
                type="text" 
                name="username"
                placeholder="username"
                onChange={handleChange}
                value={username}
            />
            <input 
                type="text"
                name="password"
                placeholder="password"
                onChange={handleChange}
                value={password}
            />
            <button>{btnText}</button>
            <p style={{color: "red"}}>{errMsg}</p>
        </form>
    )
}