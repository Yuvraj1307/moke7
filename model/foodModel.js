const mongoose=require("mongoose")

const foodSchema=mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    image: String
  })

  const foodModel=mongoose.model("Food",foodSchema)

  module.exports={
    foodModel
  }