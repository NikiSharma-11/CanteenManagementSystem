import express from 'express';
import { addNotification,displayNotification,addUserNotification,displayUserNotification } from '../controller/NotificationController.js';

const router=express.Router();
router.post('/addNoti',addNotification)
router.get('/displayNoti',displayNotification)

router.post('/addUserNoti',addUserNotification)
router.get('/displayUserNoti',displayUserNotification)
export default router;