const auth=(req,res,next)=>{
let token=req.headers.authorization

if(!token){
    return res.send("please login first")
}

next()

}

module.exports={auth}