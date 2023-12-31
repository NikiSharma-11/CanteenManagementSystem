import  express from "express";
import { searchFood } from "../controller/SearchController.js";

const router=express.Router();

//Route 1: Search Food item
router.post('/search', searchFood);


export default router;
