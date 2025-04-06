const exp=require("express")
const userApp=exp.Router()

const { createUserOrStaff, loginUserOrStaff } = require('./Util');
const expresshandler=require('express-async-handler')
//------------------------------------------------
let welfareCollection;
let centralCollection;
let statesCollection;
let usersCollection
userApp.use((req,res,next)=>{
    welfareCollection = req.app.get('welfareCollection')
    centralCollection=req.app.get("centralCollection")
    statesCollection=req.app.get("statesCollection")
    usersCollection=req.app.get("usersCollection")
    next()
})

// User Creation 
userApp.post('/user', expresshandler(createUserOrStaff));

// User Login
userApp.post('/login', expresshandler(loginUserOrStaff));




module.exports = userApp