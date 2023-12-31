
import express from 'express';
import {userSignUp, userLogIn, checkLogin, displayAllUser, displaySingleUser, deleteUser, updateUser} from '../controller/UserController.js';
import { verifyLogin } from '../middleware/ValidateLogin.js';


import validationRequest from '../middleware/Validation.js';

const router=express.Router();

//Route 1: SignUp
router.post('/signUp' ,validationRequest,userSignUp);


//Route 2: LogIn
router.post('/logIn',userLogIn);

//Route 3: Check Login
router.get('/checkLogin',verifyLogin, checkLogin);

//Route 4: Displayall user
router.get('/displayAllUser', displayAllUser);

//Route 5: DisplaySingle user
router.get('/displaySingleUser/:id', displaySingleUser);

//Route 6: DeleteUser
router.delete('/deleteUser/:id', deleteUser);

//Route 7: Update user
router.patch('/updateUser/:id', updateUser);

export default router;





