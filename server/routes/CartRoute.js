import express from 'express';
import { displayAllCart, displaySingleCart, createCart, deleteCart, updateCart, updateCartInfo } from '../controller/CartController.js';
const router=express.Router();

//Route 1 display all cart
router.get('/displayAllCart',displayAllCart);

//Route 2 display single cart
router.get('/displaySingleCart/:id',displaySingleCart);

//Route 3 create a cart
router.post('/addCart',createCart);

//Route 4 delete a cart
router.delete('/deleteCart/:id',deleteCart);

//Route 5 update cart
router.patch('/updateCart/:id',updateCart);

//Route 5 update cart order status
router.patch('/updateCartInfo/:id',updateCartInfo);



export default router;