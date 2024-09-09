import mongoose from "mongoose"
import dotenv from 'dotenv'
dotenv.config()
export const connectDB= async ()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_CONN)
        console.log(`MONGO CONNECTED :${conn.connection.host}`)
    }catch(error){
        console.error(error.message)
        process.exit(1)
    }
}