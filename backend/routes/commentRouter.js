const express = require("express")
const commentRouter = express.Router()
const Comment = require("../models/comment.js")
commentRouter.get("/", (req, res, next)=>{
    Comment.find((err, comment)=>{
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(comment)
    })
})
commentRouter.post("/:postId", ( req, res, next)=>{
    req.body.post = req.params.postId
    req.body.user = req.auth._id
    const newComment = new Comment(req.body)
    newComment.save((err, comment)=>{
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(201).send(comment)
    })
})
commentRouter.delete("/:commentId", (req, res, next)=>{
    Comment.findOneAndDelete(
        {
            _id: req.params.commentId,
            user: req.auth._id
        },
        (err, deleted)=>{
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(200).send(`Successfully deleted comment ${deleted}`)
        }
    )
})
commentRouter.put("/:commentId", (req, res, next)=>{
    req.body.user = req.auth._id
    Comment.findOneAndUpdate(
        {_id: req.params.commentId},
        req.body,
        {new: true},
        (err, updates)=>{
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(202).send(updates)
        }
    )
})
commentRouter.put('/upVote/:commentId', (req, res, next) => {
    Comment.findOneAndUpdate(
        { _id: req.params.commentId },
        {
            $addToSet: { likedUsers: req.auth._id },
            $pull: { dislikedUsers: req.auth._id }
        },
        { new: true },
        (err, updatedIssue) => {
            if (err) {
                res.status(500)
                return next(err)
            }
            return res.status(201).send(updatedIssue)
        }
    )
})
commentRouter.put('/downVote/:commentId', (req, res, next) => {
    Comment.findOneAndUpdate(
        { _id: req.params.commentId },
        {
            $addToSet: { dislikedUsers: req.auth.__id },
            $pull: { likedUsers: req.auth._id }
        },
        { new: true },
        (err, updated) => {
            if (err) {
                res.status(500)
                return next(err)
            }
            return res.status(201).send(updated)
        }
    )
})
module.exports = commentRouter