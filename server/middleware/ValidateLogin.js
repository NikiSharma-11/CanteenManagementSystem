import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/UserSchema.js';

dotenv.config();

export const verifyLogin=async(req, res, next)=>{
    const token=req.header('Authorization');
    if(!token){
        return res.status(401).json({error:"Unauthorized"})
    }
    try{
        const data=jwt.verify(token,process.env.SECRET);
        const user=await User.findById(data.userId);
        if(!user){
            return res.status(401).json({error:"Unauthoorized"})
        }
        req.userRole=user.role;
        req.userId=user._id;
        req.username=user.username;
        next();
        
    }catch(error){
        return res.status(500).json({error:"Internal server error"})

    }
}