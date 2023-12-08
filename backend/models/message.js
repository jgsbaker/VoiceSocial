const mongoose = require("mongoose")
const Schema = mongoose.Schema
const messageSchema = new Schema({
    message: {
        type: String,
        required: true 
    },
    user1: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: false 
    },
    user2: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    timeStamp: {
        type: Date,
        default: Date.now
    }
})
module.exports = mongoose.model("Message", messageSchema)