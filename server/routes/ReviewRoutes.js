import express from 'express';
import { addReview, displayReview } from '../controller/ReviewController.js';

const router=express.Router(); 
router.post('/addReview',addReview);
router.get('/displayReview',displayReview);

export default router;