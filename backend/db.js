const mongoose=require("mongoose");
// mongoose.connect(`mongodb://127.0.0.1:27017/station`).then(()=>{
// console.log('DB Connected')
// }).catch((err)=>{
//     console.log('Connection Error:', err)

// })
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(()=>{
 console.log('DB Connected')
 }).catch((err)=>{
     console.log('Connection Error:', err)

 })
