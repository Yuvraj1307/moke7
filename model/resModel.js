const mongoose=require("mongoose")

const resSchema=mongoose.Schema({
    name: String,
    address: {type:Object,
      street: String,
      city: String,
      state: String,
      country: String,
      zip: String
    },
    menu: [{type:Object,
        name: String,
        description: String,
        price: Number,
        image: String
      }]
  })

  const resModel=mongoose.model("Restaurant",resSchema)

  module.exports={
    resModel
  }