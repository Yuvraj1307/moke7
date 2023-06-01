const express = require("express");
const { foodModel } = require("../model/foodModel");
const { orderModel } = require("../model/orderModel");

const orderRout = express.Router();

orderRout.post("/api/orders/:id", async (req, res) => {
  let order = req.body;
  let {
    user,
    restaurant,
    items,
    quantity,
    totalPrice,
    deliveryAddress,
    status,
  } = req.body;
  let id = req.params.id;
  console.log(order);
  try {
    let item = await foodModel.findOne({ _id: id });
    items.push({ quantity, ...item });

    let order = new orderModel({
      user,
      restaurant,
      items,
      totalPrice: quantity * item.price,
      deliveryAddress,
      status,
    });
    await order.save();

    console.log(order);
    // let neworder= new orderModel(order)
    // await neworder.save()
    res.status(200).send({ msg: "order added", order });
  } catch (error) {
    console.log(error);
    res.status(404).send({ msg: "can't add order" });
  }
});



orderRout.get("/api/orders/:id",async (req,res)=>{

    let id=req.params.id
    try {
        
      let rest=await orderModel.findOne({_id:id}) 
        console.log(rest)
        res.status(200).send({msg:"restaurant is added",rest})
 
     } catch (error) {
        console.log(error)
        res.status(404).send({msg:"can't find restaurant"})
     }
})


orderRout.patch("/api/orders/:id",async (req,res)=>{

    let id=req.params.id
    let status=req.body.status
    try {
        
      let rest=await orderModel.findByIdAndUpdate({_id:id},{status}) 
        console.log(rest)
        res.status(200).send({msg:"restaurant is added",rest})
 
     } catch (error) {
        console.log(error)
        res.status(404).send({msg:"can't find restaurant"})
     }
})
// /api/orders/:id
module.exports = { orderRout };
