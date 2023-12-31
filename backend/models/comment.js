const mongoose = require("mongoose")
const Schema = mongoose.Schema
const commentSchema = new Schema ({
    comment: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: "Post",
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
module.exports = mongoose.model("Comment", commentSchema)