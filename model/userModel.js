const mongoose=require("mongoose")

const userSchema=mongoose.Schema({
    name: String,
    email: String,
    password: String,
    address: {type: Object,
      street: String,
      city: String,
      state: String,
      country: String,
      zip: String
    }
  })

const userModel=mongoose.model("User",userSchema)

module.exports={
    userModel
}
