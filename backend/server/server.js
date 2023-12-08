const xpress = require("express")
const morgan = require("morgan")
const mongoose = require("mongoose")
const {expressjwt} = require("express-jwt")
require("dotenv").config()
const app = xpress()
const port = process.env.port || 3800
mongoose.set('strictQuery', false)
mongoose.connect("mongodb+srv://jgsbaker:XpCfId2bUEENh3Ym@cluster0.wbuwqvk.mongodb.net/?retryWrites=true&w=majority",
{useNewUrlParser: true}
)
.then(()=>console.log("Connected to MongoDB"))
.catch(err=>console.log(err))
app.use(xpress.json())
app.use(morgan("dev"))
app.use("/protected", expressjwt({secret: process.env.SECRET, algorithms: ['HS256']}))
app.use("/auth", require("../routes/authRouter.js"))
app.use("/protected/user", require("../routes/userRouter.js")) 
app.use("/protected/post", require("../routes/postRouter.js"))
app.use("/protected/comment", require("../routes/commentRouter.js"))
app.use("/protected/chat", require("../routes/chatRouter.js"))
app.use("/protected/about", require("../routes/aboutRouter.js"))
app.use("/protected/message", require("../routes/messageRouter.js"))
app.use((err, req, res, next) => {
    console.log(err);
    if (err.name === "UnauthorizedError") {
        res.status(err.status);
    }
    return res.send({ errMsg: err.message });
})
app.listen(port, ()=>{
    console.log(`Server running on port ${port}`)
})