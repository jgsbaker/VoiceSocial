const express = require("express")
const postRouter = express.Router()
const Post = require("../models/post")
postRouter.get("/", (reqq, res, next)=>{
    Post.find(
        (err, post)=>{
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(200).send(post)
        }
    )
})
postRouter.get("/:postId", (req, res, next)=>{
    Post.findOne(
        {_id: req.params.postId,
        user: req.auth._id},
        (err, post)=>{
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(200).send(post)
        }
    )
})
postRouter.post("/", (req, res, next)=>{
    req.body.user   = req.auth._id
    const newPost = new Post(req.body)
    newPost.save((err, saved)=>{
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(201).send(saved)
    })
})
postRouter.delete("/:postId", (req, res, next)=>{
    Post.findOneAndDelete(
        {_id: req.params.postId,
        user: req.auth._id},
        (err, deleted)=>{
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(200).send(`Successfully deleted post ${deleted}`)
        }
    )
})
postRouter.put("/:postId", (req, res, next)=>[
    Post.findOneAndUpdate(
        {_id: req.params.postId,
        user: req.auth._id},
        req.body,
        {new: true},
        (err, update)=>{
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(202).send(update)
        }
    )
])
postRouter.put("/downvote/:postId", (req, res, next)=>{
    Post.findOneAndUpdate(
        { _id: req.params.postId },
        {
            $addToSet: { dislikedUsers: req.auth._id},
            $pull: { likedUsers: req.auth._id }
        },
        { new: true },
        (err, updatedVote) => {
            if (err) {
                res.status(500)
                return next(err)
            }
            return res.status(201).send(updatedVote)
        }
    )
})
postRouter.put("/upvote/:postId", (req, res, next)=>{
    Post.findOneAndUpdate(
        { _id: req.params.postId },
        {
            $addToSet: { likedUsers: req.auth._id },
            pull: { dislikedUsers: req.auth._id }
        },
        { new: true },
        (err, updatedVote) => {
            if (err) {
                res.status(500)
                return next(err)
            }
            return res.status(201).send(updatedVote)
        }
    )
})
module.exports = postRouter