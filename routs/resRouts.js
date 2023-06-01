
const express=require("express")
const { resModel } = require("../model/resModel")
const { foodModel } = require("../model/foodModel")

const resRout=express.Router()

resRout.post("/add", async (req,res)=>{
let data=req.body
    try {
        
       let rest=new resModel(data)
       await rest.save()
       console.log(rest)
       res.send({msg:"restaurant is added"})

    } catch (error) {
        console.log(error)
        res.status(404).send({msg:"can't add resturant"})
    }
})


	
resRout.get("/api/restaurants",async (req,res)=>{
    try {
        
      let rest=await resModel.find() 
        console.log(rest)
        res.status(200).send({msg:"restaurant is added",rest})
 
     } catch (error) {
        console.log(error)
        res.status(404).send({msg:"can't find restaurant"})
     }
})



resRout.get("/api/restaurants/:id",async (req,res)=>{

    let id=req.params.id
    try {
        
      let rest=await resModel.findOne({_id:id}) 
        console.log(rest)
        res.status(200).send({msg:"restaurant is added",rest})
 
     } catch (error) {
        console.log(error)
        res.status(404).send({msg:"can't find restaurant"})
     }
})


resRout.get("/api/restaurants/:id/menu",async (req,res)=>{

    let id=req.params.id
    try {
        
      let rest=await resModel.findOne({_id:id}) 
        console.log(rest.menu)
        res.status(200).send({msg:"restaurant is added",rest:rest.menu})
 
     } catch (error) {
        console.log(error)
        res.status(404).send({msg:"can't find restaurant"})
     }
})



resRout.patch("/api/restaurants/:id/menu",async (req,res)=>{

    let id=req.params.id
    let data=req.body
    try {
        
      let rest=await resModel.findOne({_id:id}) 
      let item=new foodModel(data)
      rest.menu.push(item)
      rest.save()
      await item.save()
        console.log(rest.menu)
        res.status(200).send({msg:"restaurant is added",rest:rest.menu})
 
     } catch (error) {
        console.log(error)
        res.status(404).send({msg:"can't find restaurant"})
     }
})

resRout.delete("/api/restaurants/:Id/menu/:id",async (req,res)=>{

    let Id=req.params.Id
    let id=req.params.id
    console.log(Id)
    console.log(id)
    
    try {
        
      let rest=await resModel.findOne({_id:Id,"menu._id":id})
    
          console.log(rest)
        res.status(200).send({msg:"restaurant is added",rest})
 
     } catch (error) {
        console.log(error)
        res.status(404).send({msg:"can't find restaurant"})
     }
})
	
// /api/restaurants/:id/menu/:id

module.exports={resRout}