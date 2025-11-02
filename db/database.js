import mongoose from "mongoose";

let ctd=false

export const CD=async()=>{
  mongoose.set('strictQuery',true)
  if(ctd){console.log('connected before');return}
  try {
    await mongoose.connect(process.env.MONGODB_URI,{
      dbName:'MehDB',
      useNewUrlParser:true,
      useUnifiedTopology:true
    })
    ctd=true
    console.log("connected now")
  } catch (error) {
    console.log(error)
  }
}