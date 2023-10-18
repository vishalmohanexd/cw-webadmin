// const MONGO_URI ="mongodb+srv://vishalauth-crud:1234@crud.v5vjrls.mongodb.net/?retryWrites=true&w=majority"

// const MONGO_URI = "mongodb+srv://vishalmohanh:Q1PpfEaoXnQY6QqB@grapesjs.n6kcbaa.mongodb.net/?retryWrites=true&w=majority"



const MONGO_URI = "mongodb+srv://vishalmohanh:B2CpOKZyfPABq7Fb@novelsheditor.ihoikka.mongodb.net/?retryWrites=true&w=majority"
import mongoose from "mongoose"
//mongoDb Connection
const connectMongo= async ()=>{
    try {
      const {connection} =await mongoose.connect(MONGO_URI) 
      if(connection.readyState==1){
        console.log("successfully connected to the mongodb")
      }
    } catch (error) {
        return Promise.reject(error)
    }
}

export default connectMongo