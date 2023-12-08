const express = require("express")
const userRouter = express.Router()
const User = require("../models/user.js")
const jwt = require("jsonwebtoken")
userRouter.get("/:username", (req, res, next)=>{
    User.findOne(
        {_id: req.auth._id,
        username: req.params.username},
        (err, user)=>{
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(user)
    })
})
userRouter.delete("/:userId", (req, res, next)=>{
    const userId = req.params.userId
    User.findOneAndDelete(
        {_id: req.auth._id},
        (err, user)=>{
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(`Successfully deleted user with id ${user}`)
    })
})
module.exports = userRouter