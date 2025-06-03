//N3A0rYFFGcL7Vs4O

const cookieParser = require("cookie-parser");
const express=require("express");
const app=express();
require('dotenv').config();

require("./db");

const bcrypt=require("bcrypt")
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
const PORT=process.env.PORT || 8000;
 const userModel=require("./models/user");
 const stationModel=require("./models/station")

// app.set("view engine","ejs");
const cors = require("cors");
app.use(cors({
   origin: 'https://endearing-bavarois-316092.netlify.app',
  credentials: true
}));


const jwt=require("jsonwebtoken")

app.get("/",async(req,res)=>{
    res.send("Niloy")
})


//IsAuthenticated middleware
 const isAuthenticated=async(req,res,next)=>{
    const token=req.cookies.token;
    if(!token){
        return res.status(404).json({message:"No token.First login"})
    }
    let decoded=jwt.verify(token,"shshs");
    req.user=decoded;
    next();
 }









//CRUD operation for Stations
//1. Creating charging sation
 app.post("/createStation",async(req,res)=>{
    let {name,
        location:{latitude,longitude},
status,
power,
connector
    }=req.body;
    const stationCreated=new stationModel({
name,
        location:{latitude,longitude},
status,
power,
connector
    });
    await stationCreated.save();
    res.status(201).json({stationCreated});

 })

//2.Reading charging station
app.get("/readStation",async(req,res)=>{
    let allStations=await stationModel.find();
    res.status(200).json({allStations})
})

//3.Updating a charging station~
app.put("/updateStation/:id",async(req,res)=>{
const id=req.params.id;
  let {name,
        location:{latitude,longitude},
status,
power,
connector
    }=req.body;
    const updatedData={
            name,
        location:{latitude,longitude},
status,
power,
connector

    }
const updateStation=await stationModel.findByIdAndUpdate(id,updatedData);
res.status(200).json({updateStation})
})


//4.Deleting charging Stations
app.delete("/deleteStation/:id",async(req,res)=>{
    let id=req.params.id;
    const deleteStation=await stationModel.findByIdAndDelete(id);
    res.status(200).json({message:"station deleted",deleteStation})
})
















//Register for users
app.post("/register", async(req,res)=>{
   
   let  {name,email,password}=req.body;
   let registeredUser=await userModel.findOne({email});
   if(registeredUser){
return res.status(500).json({message:"Already existed "})
   }
   const hashPassword=await bcrypt.hash(password,12);
   let userCreated=new userModel({name:name,email:email,password:hashPassword});
await userCreated.save();
    //let user=await userModel.findOne({_id:"6830e51045d3815f6b7b2074"})
    let token=jwt.sign({email:userCreated.email},"shshs")
    res.cookie("token",token);
    res.json({message:"userCreated",userCreated});
});


//Login Users
app.post("/login",async(req,res)=>{
    const {email,password}=req.body;
    const user=await userModel.findOne({email});
    if(!user) return res.send("Not a valid user");

    
       const isMatch=await  bcrypt.compare(password,user.password);//ye login ha ,isliye db ka password amd req.body ka password ko match krenge
       if(isMatch){
     const token=   jwt.sign({email},"shshs");
res.cookie("token",token);
        return res.status(200).json({ message: "Login successful", token });
        
       }
            else{
        return res.send("Incorrect password");

            }
    
 

})


app.listen(PORT,()=>{
    console.log("server running at port")
})