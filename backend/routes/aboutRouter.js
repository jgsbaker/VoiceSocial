const express = require("express")
const aboutRouter = express.Router()
const About = require("../models/about")
aboutRouter.get("/", (req, res, next)=>{
    About.findOne(
        {user: req.auth._id},
        (err, about)=>{
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(200).send(about)
        }
    )
})
aboutRouter.post("/", (req, res, next)=>{
    req.body.user = req.auth._id
    const newAbout = new About(req.body)
    newAbout.save(
        (err, about)=>{
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(201).send(about)
        }
    )
})
// aboutRouter.put("/:aboutId", (req, res, next)=>{
//     About.findOneAndUpdate(
//         {_id: req.params.aboutId,
//         user: req.auth._id},
//         req.body,
//         {new: true},
//         (err, updates)=>{
//             if(err){
//                 res.status(500)
//                 return next(err)
//             }
//             return res.status(202).send(updates)
//         }
//     )
// })
module.exports = aboutRouter