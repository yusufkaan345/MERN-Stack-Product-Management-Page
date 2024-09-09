import express from 'express';
import { connectDB } from './config/db.js';
import productRoutes from './routes/product.route.js'
import path from 'path'
const app = express();
//qh8f7Rbrdaht1eLz
app.use(express.json());
app.use('/api/products',productRoutes)
const __dirname=path.resolve()
if(process.env.NODE_ENV=='production'){
    app.use(express.static(path.join(__dirname,"/frontend/dist")))
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,"frontend","dist","index.html"))
    })
}
const port =process.env.PORT || 8080


app.listen(port,()=>{
    connectDB()
    console.log('Server is running on port '+port);
});

