import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";


    const connectDB = async function () {
        try{
          const connectInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
          console.log(`\n MONGODB connected !! DB HOST:${connectInstance.connection.host}`)

          
        }
        catch(error){
            console.log(`MONGODB connection error`,error)
            process.exit(1);
      
        }
        
    }

export default connectDB