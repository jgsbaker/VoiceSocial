const express = require('express')
const messageRouter = express.Router()
const Message = require("../models/message")
const User = require("../models/user")
const Chat = require("../models/chat")
messageRouter.get('/:userId', (req, res, next) => {
    Message.find({user2: req.params.chatIduserzId,
    }, (err, messages) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(messages)
    })
})
messageRouter.post("/:userID", (req, res, next)=>{
    req.body.user1 = req.auth._id
    req.body.user2 = req.params.userID
    const newMsg = new Message(req.body)
    newMsg.save((err, msg)=>{
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(201).send(msg)
    })
})
messageRouter.delete("/:userId/:msgId", (req, res, next)=>{
    Message.findOneAndDelete(
        {user1: req.auth._id,
         user2: req.params.userId,
        _id: req.params.msgId},
        (err, msg)=>{
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(200).send(`Successfully deleted chat ${msg}`)
        }
    )
})
messageRouter.get('/search', async(req, res, next) => {
    try {
        const {name} = req.query
        const user = await User.findOne({username: name})
        const thisChat = await Chat.findOne({username2: user.username, user1: req.auth._id, user2: user._id})
        return res.status(200).send(thisChat)
    } catch (err) {
        res.status(500)
        return next(err)
    }
})
module.exports = messageRouter