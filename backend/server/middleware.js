const express = require("express")
const app = express()
const port = process.env.port || 3800
app.use((err, req, res, next)=>{
    console.log(err)
    console.log("Succes!")
    next()
})
app.get((req, res, next)=>{
    console.log("Get successful")
    next()
})
app.listen(port, ()=>{
    console.log(`Listening to port ${port}`)
})