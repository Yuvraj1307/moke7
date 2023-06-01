const express=require("express")
const { foodModel } = require("../model/foodModel")

const foodRout=express.Router()

foodRout.post("/add", async (req,res)=>{
    let food=req.body

    try {

        let newfood= new foodModel(food)
        await newfood.save()
        res.status(200).send({msg:"food added"})
        
    } catch (error) {
        console.log(error)
        res.status(404).send({msg:"can't add food"})
    }
})



module.exports={foodRout}