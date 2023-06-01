const express=require("express")
const { userModel } = require("../model/userModel")
const bcrypt=require("bcrypt")
const userRout=express.Router()
var jwt = require('jsonwebtoken');
userRout.post("/api/register", async (req,res)=>{
    let {name,email,password,address}=req.body

    try {

        bcrypt.hash(password, 5, async function(err, hash) {
            // Store hash in your password DB.
            let user=new userModel({name,email,password:hash,address})
            await user.save()
            console.log(user)
        });
        res.status(201).send({msg:"user is added"})
    } catch (error) {
         console.log(error)
         res.status(404).send({msg:"can't add user"})
    }
})


userRout.post("/api/login",async (req,res)=>{
    let {email,password}=req.body
    try {

        let user=await userModel.findOne({email})
        if(!user){
            return res.status(404).send({msg:"register first"})
        }

        bcrypt.compare(password, user.password, function(err, result) {
            if(result == true){
                var token = jwt.sign({userid:user._id}, 'masai');
                res.status(201).send({msg:"login success",token})

            }else{
                res.status(404).send({msg:"wrong details"})
            }
        });
        
    } catch (error) {
        console.log(error)
        res.status(404).send({msg:"can't find user"})
    }
})



userRout.put("/api/user/:id/reset",async (req,res)=>{
    let id=req.params.id
    let {old,newpass}=req.body

    try {
        let user=await userModel.findOne({_id:id})
        
        bcrypt.compare(old, user.password,async function(err, result) {
            if(result == true){

                bcrypt.hash(newpass, 5, async function(err, hash) {
                    // Store hash in your password DB.
                    let user=await userModel.findByIdAndUpdate({_id:id},{password:hash})
                    res.status(201).send({msg:"password change success"})
                });
              

            }else{
                res.status(404).send({msg:"wrong details"})
            }
        });
        
        
    } catch (error) {
        console.log(error)
        res.status(404).send({msg:"can't find user"})
    }
})

module.exports={
    userRout
}