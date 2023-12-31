import Notification from "../models/NotificationSchema.js";
import UserNotification from "../models/UserNotification.js";
//Route 1: Add notification
export const addNotification=async(req,res)=>{
    const {name,price}=req.body;
    const notification=Notification.create({name,price});
    res.status(200).json(notification)
}
//Route 2: Display notification
export const displayNotification=async(req,res)=>{
    const notification=await Notification.find({});
    res.status(200).json(notification)
}


//Route 3: Add user notification
export const addUserNotification=async(req,res)=>{
    const {status,userId}=req.body;
    const notification=UserNotification.create({status,userId});
    res.status(200).json(notification)
}
//Route 4: Display user notification
export const displayUserNotification=async(req,res)=>{
    const notification=await UserNotification.find({});
    res.status(200).json(notification)
}