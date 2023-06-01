const express=require("express")
const { connection } = require("./config/db")
const { userRout } = require("./routs/userRouts")
const { resRout } = require("./routs/resRouts")
const { foodRout } = require("./routs/foodRout")
const { orderRout } = require("./routs/ordersRout")
const { auth } = require("./middlewares/auth")
require("dotenv").config()


const app=express()
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("hello")
})

app.use("/food",foodRout)

app.use("/user",userRout)

app.use(auth)
app.use("/res",resRout)


app.use("/order",orderRout)

app.listen(process.env.port,async ()=>{
    try {
        await connection
        console.log(`connected to DB at port ${process.env.port}`)
    } catch (error) {
        console.log("can't connect")
        connsole.log(error)
    }
})