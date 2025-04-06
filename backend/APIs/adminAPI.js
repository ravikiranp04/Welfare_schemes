const exp=require("express")
const adminApp=exp.Router()

const expresshandler=require('express-async-handler')

//nbody parser
adminApp.use(exp.json())
//---------------------------------------------
let welfareCollection;
let centralCollection;
let statesCollection;
let usersCollection
adminApp.use((req,res,next)=>{
    welfareCollection = req.app.get('welfareCollection')
    centralCollection=req.app.get("centralCollection")
    statesCollection=req.app.get("statesCollection")
    usersCollection=req.app.get("usersCollection")
    next()
})




adminApp.post('/add-state/:state_name',expresshandler(async(req,res)=>{
    const s=req.params.state_name
    res.send({message:"Res",payload:s})
}))

// Add all schemes
adminApp.post('/add-schema',expresshandler(async(req,res)=>{
    const body = req.body
    console.log(body)
    const updt = await welfareCollection.insertOne(body)
    console.log(updt)
    if(updt){
        res.send({message:"Scheme Added"})
    }
    else{
        res.send({message:"Try again"})
    }
  
}))

//Get all schemes
adminApp.get('/get-all-schemes',expresshandler(async(req,res)=>{
    const obj=await welfareCollection.find().toArray();
    if(obj){
        res.send({messagde:"All schemes are",payload:obj})
    }
    else{
        res.send({message:"Error"})
    }
}))

//Get Scheme by State
adminApp.get('/get-scheme-state/:state',expresshandler(async(req,res)=>{
    const state=req.params.state
    const obj=await welfareCollection.find({State_Central:state}).toArray();
    if(obj){
        res.send({messagde:"All schemes are",payload:obj})
    }
    else{
        res.send({message:"Error"})
    }
}))

//Get Scheme by category
adminApp.get('/get-scheme-category/:cat',expresshandler(async(req,res)=>{
    const cat= req.params.cat
    const obj=await welfareCollection.find({Sector:cat}).toArray();
    if(obj){
        res.send({messagde:"All schemes are",payload:obj})
    }
    else{
        res.send({message:"Error"})
    }
}))


module.exports=adminApp