import React from "react"
export default function Messages(){
    $("#send").click(()=>{
        sendMessage({
            name: $("#name").val(),
            message: $("#message").val()
        })
        getMessages()
    })
    function addMessages(message){
        $("#messages").append(
            `<h5>${message.name}</h5>
            <p className="message">${message.name}</p>`
        )
    }
    function getMessages(){
        $.get("http://localhost:300/messages", (data)=>{
            data.forEach(addMessages)
        })
    }
    function sendMessage(message){
        $.post("http:localhost:300/messages", message)
    }
    const http= require("http").Server(app)
    const io = require("socket.io")(http)
    const socket = io()
    socket.on("message", addMessages)
    return (
        <div class="container">
            <h1 class="display-4">Send Message</h1>
            <input id="name" class="form-control" placeholder="send to"/>
            <textarea id="message" class="form-control" placeholder="your message"/>
            <button id="send" class="btn btn-success">Send</button>
            {$("#messages").map(message=><p>{message}</p>)}
            <script src="/socket.io/socket.io.js"></script>
        </div>
        
    )
}