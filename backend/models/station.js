const mongoose=require("mongoose");


const stationSchema=mongoose.Schema({
    name:{
        type:String
    },
    location:{
        latitude:{
            type:Number
        },
         longitude:{
            type:Number
        }

    },
    status:{
        type:String,
         enum: ['Active', 'Inactive'],
    default: 'Inactive'
        
    },
    power:{
        type:Number,

    },
    connector:{
        type:String,


    }
})
module.exports=mongoose.model("station",stationSchema)