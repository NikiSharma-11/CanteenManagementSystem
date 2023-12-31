import mongoose from 'mongoose';
import Food from '../models/FoodSchema.js';

//Route 1 Displaying all course
export const displayAllFood=async(req,res)=>{
    try{
        const food= await Food.find({});
        res.status(200).json(food);
    }
    catch(error){
        res.status(400).json({error:error.message})
    }
}


//Route 2 Display single food
export const singleFoodDisplay=async(req, res)=>{
    const {id}=req.params;
    try{
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({error:"No such food exists"});
        }
        const food=await Food.findById(id);
        if(!food){
            return req.status(404).json({error:"No such food exists"})
        }
        res.status(200).json(food);
    }
    catch(error){
        res.status(400).json({error:error.message});
    }
  
}

//Route 3 Adding a Food
export const addFood=async(req, res)=>{
    const{name,description,price, time, status}=req.body;
    const{filename}=req.file;

    const food= await Food.findOne({name});
        if(food){
            return res.status(400).json({errors: ["Food already exists"]});
        }

    try{
        const food=await Food.create({name,description,price,filename,time, status});
        res.status(200).json(food)
    }
    catch(error){
        res.status(400).json({error: error.message});
    }

}
//Route 4 Deleting a food
export const deleteFood=async(req,res)=>{
const{id}=req.params;
const food=await Food.findOneAndDelete({_id:id})
res.status(200).json(food);
}

//Route 5 Update a food
export const updateFood=async(req,res)=>{
    const {id}=req.params;
    const food=await Food.findOneAndUpdate({_id:id},{...req.body});
    res.status(200).json(food);

}


