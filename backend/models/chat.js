const mongoose = require("mongoose")
const Schema = mongoose.Schema
const chatSchema = new Schema({
    user1:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    user2: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: false
    },
    username1:{
        type: Schema.Types.String,
        ref: "User",
        required: true
    },
    username2: {
        type: Schema.Types.String,
        ref: "User",
        required: false
    }
})
module.exports = mongoose.model("Chat", chatSchema)