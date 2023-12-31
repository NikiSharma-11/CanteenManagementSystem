import Food from "../models/FoodSchema.js";

export const searchFood=async(req,res)=>{

  const {searchItem}=req.body;

  console.log(searchItem);

  try{

      const results=await Food.find({

          name:{$regex:searchItem,$options:'i'}

      });

      res.status(200).json(results);

  }catch(error){

      console.error('Error searching:', error);

      res.status(500).json({error:'Internal server error'});

  }

}