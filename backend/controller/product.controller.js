import Product from '../models/product.model.js'
import mongoose from 'mongoose';

export const getProducts =  async(req, res) => {
    try{
      const products = await Product.find({});
      res.status(200).json({success:true,data:products})
    }catch(err){
      console.error("Error occured fetching products",err.message);
      res.status(500).json({success:false,msg: 'Server Error'})
    }
}
export const postProduct =async(req, res) => {
    const product=req.body
    if(!product.name || !product.price || !product.image){
      return res.status(400).json({success:false,msg: 'Please include all fields'});
    }
    const newProduct = new Product(product)
    try{
       await newProduct.save()
       res.status(200).json({success:true,data:newProduct})
    }catch(err){
       console.error("Error occured creating product",err.message);
       res.status(500).json({success:false,msg: 'Server Error'})
    }
 }

export const updateProduct = async(req, res) => {
    const {id}=req.params
    const product = req.body
    if(!mongoose.Types.ObjectId.isValid(id)){
      return res.status(404).json({success:false,msg: 'Invalid product id'});
    }
    try{
         const updatedProduct= await Product.findByIdAndUpdate(id,product,{new:true})
         res.status(200).json({success:true,msg:'Data updated successfully', data:updatedProduct})
    }catch(err){
      console.error("Error occured updating product",err.message);
      res.status(500).json({success:false,msg: 'Server Error'})
    }

}

export const deleteProduct = async(req, res) => {
    try{
      const {id}=req.params
      
      const product = await Product.findByIdAndDelete(req.params.id);
      if(!mongoose.Types.ObjectId.isValid(id) || !product){
        return res.status(404).json({success:false,msg: 'Invalid product id or product does not exist'});
      }

      res.status(200).json({success:true,msg: 'Product deleted'});
      
    }catch(err){
      console.error("Error occured deleting product",err.message);
      res.status(500).json({success:false,msg: 'Server Error'})
    }
}