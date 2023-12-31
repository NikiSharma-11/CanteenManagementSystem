import Review from "../models/ReviewSchema.js";


//Route 1: Add review
export const addReview=async(req,res)=>{
    const {foodId,rating,comment,username}=req.body;
    const review=Review.create({foodId,rating,comment,username});
    res.status(200).json(review)
}
//Route 2: Display review
export const displayReview=async(req,res)=>{
    const review=await Review.find({});
    res.status(200).json(review)
}