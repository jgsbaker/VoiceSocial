const mongoose = require("mongoose")
const Schema = mongoose.Schema
const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description:{
        type: String,
        required: false 
    },
    imgUrl:{
        type: String,
        require: false 
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    likedUsers: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    dislikedUsers:[{
        type: Schema.Types.ObjectId,
        ref: "User"
    }]
})
module.exports = mongoose.model("Post", postSchema)