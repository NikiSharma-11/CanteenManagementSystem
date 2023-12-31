import express from 'express';
import {KhaltiPayment, addPayment,displayPayment, displaySinglePayment, updatePayment, updatePaymentQuantity } from '../controller/PaymentController.js';

const router=express.Router();

router.post('/khaltiPayment',KhaltiPayment);
router.post('/paymentRecord',addPayment);
router.get('/displayPayment',displayPayment);
router.patch('/updatePayment/:id',updatePayment);
router.get('/displaySinglePayment/:id',displaySinglePayment);
router.patch('/updatePaymentQuantity/:id',updatePaymentQuantity);



export default router;