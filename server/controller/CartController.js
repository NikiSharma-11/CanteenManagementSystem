import mongoose from "mongoose";
import Cart from "../models/CartSchema.js";

//Route 1 Display all cart
export const displayAllCart=async(req,res)=>{
    try{
        const cart=await Cart.find({});
        res.status(200).json(cart);
    }catch(error){
        res.status(500).json({errors:'Internal server error'})
    }
}

//Route 2 Display single cart
export const displaySingleCart=async(req,res)=>{
    const {id}=req.params;
    try{
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({errors:"No such cart"})
        }
        const cart=await Cart.findById(id);
        res.status(200).json(cart);
    }catch(error){
        res.status(500).json({errors:'Internal server error'})
    }
}


//Route 3 Create a cart
export const createCart=async(req,res)=>{
    const{name,description,price,quantity,userId,foodId,userName,status}=req.body;
   console.log(req.body);
    try{
        const cart=await Cart.create({name,description,price,quantity,userId,foodId,userName,status});
        res.status(200).json(cart);
    }catch(error){
        res.status(400).json({errors:error.message})
    }
}

//Route 4 delete a cart
export const deleteCart=async(req,res)=>{
    const {id}=req.params;
    try{
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({errors:"No such cart"})
        }
        const cart=await Cart.findOneAndDelete({_id:id});
        res.status(200).json(cart);
    }catch(error){
        res.status(400).json({errors:error.message})
    }
}

//Route 5 Update an cart
export const updateCart=async(req,res)=>{
    const{id}=req.params;
    const {quantities}=req.body;
    try{
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({errors:"No such cart"})
        }
        const cart=await Cart.findOneAndUpdate({_id:id},{quantity:quantities});
        res.status(200).json(cart);
    }catch(error){
        res.status(400).json({errors:error.message})
    }

}

//Route 6 Update order status
export const updateCartInfo=async(req,res)=>{
    const{id}=req.params;
    try{
      const cart=await Cart.findOneAndUpdate({_id:id},{...req.body});
      res.status(200).json(cart);
    }catch(error){
      res.status(500).json({msg:"Internal server error"})
    }
  }