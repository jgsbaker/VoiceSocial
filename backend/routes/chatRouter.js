const express = require("express")
const chatRouter = express.Router()
const Chat = require("../models/chat")
const User = require("../models/user")
const bodyParser = require("body-parser")
chatRouter.use(bodyParser.json())
chatRouter.get("/", (req, res, next)=>{
    Chat.find(
        {user1: req.auth._id},
        (err, msg)=>{
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(200).send(msg)
        }
    )
})
chatRouter.get("/user/:userID", (req, res, next)=>{
    User.findOne(
        {user2: req.params.userID,
        user1: req.auth._id},
        (err, user)=>{
            if(err){
                res.status(500)
                return next(err)
            }
            return req.body.username2 = user
        }
    )
    Chat.findOne(
        {user1: req.auth._id,
        username1: req.auth.username,
        user2: req.params.userID,
        username2: req.body.username2},
        (err, msg)=>{
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(200).send(msg)
        }
    )
})
chatRouter.post("/:userID", (req, res, next)=>{
    User.findOne(
        {_user2: req.params.userID,
        user1: req.auth._id},
        (err, user)=>{
            if(err){
                res.status(500)
                return next(err)
            }
            if(req.body.user2 === req.params.userID){
                return req.body.username2 = user
            }
        }
    )
    req.body.username1 = req.auth.username
    req.body.user1 = req.auth._id
    req.body.user2 = req.params.userID
    const newChat = new Chat(req.body)
    newChat.save((err, receiver)=>{
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(201).send(receiver)
    })
})
chatRouter.delete("/:userID", (req, res, next)=>{
    User.findOne(
        {user2: req.params.userID,
        user1: req.auth._id},
        (err, user)=>{
            if(err){
                res.status(500)
                return next(err)
            }
            if(req.body.user2 === req.params.userID){
                return req.body.username2 = user
            }
        }
    )
    Chat.findOneAndDelete(
        {name: req.params.username,
        user2: req.params.userID,
        username2: req.body.username2,
        username1: req.auth._id,
        user1: req.auth._id},
        (err, receiver)=>{
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(200).send(`Successfully deleted chat with ${receiver}`)
        }
    )
})
chatRouter.get('/search', async(req, res, next) => {
    try {
        const {name} = req.query
        const user = await User.findOne({username: name})
        const chats = await new Chat.save({user1: req.auth._id, user2: user})
        return res.status(200).send(chats)
    } catch (err) {
        res.status(500)
        return next(err)
    }
})
module.exports = chatRouter