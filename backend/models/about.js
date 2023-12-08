const mongoose = require("mongoose")
const Schema = mongoose.Schema
const aboutSchema = new Schema ({
    firstName: {
        type: String,
        required: false
    },
    lastName:{
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false
    },
    gender: {
        type: String,
        required: false
    },
    aboutMe: {
        type: String,
        required: false
    },
    imgUrl: {
        type: String,
        required: false
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
})
module.exports = mongoose.model("About", aboutSchema)