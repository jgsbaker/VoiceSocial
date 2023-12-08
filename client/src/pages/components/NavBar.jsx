import React, {useState} from "react"
import {Link} from "react-router-dom"
export default function NavBar(props){
    const {logout} = props
    return (
        <div className="links">
            <Link to="/profile" className="profileLink" style={{padding: 5}}>Profile</Link>
            <Link to="/public" className="publicLink" style={{padding: 5}}>Public</Link>
            <button onClick={logout} style={{padding: 5}}>Logout</button>
        </div>
    )
}