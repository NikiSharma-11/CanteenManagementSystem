import express from 'express';
import { addFood,displayAllFood,deleteFood,singleFoodDisplay,updateFood } from '../controller/FoodController.js';
import multer from 'multer';
import ValidationAddFood from '../middleware/ValidateAddFood.js';



const router=express.Router();
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'ItemImage/')
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+'-'+file.originalname)
    }
}
)

const upload=multer({storage});


//Route 1 to display all food items
router.get('/displayFood', displayAllFood)


//Route 2 to Display singe/selected Food
router.get('/displayFood/:id',singleFoodDisplay);


//Route 3 to Add Food to database
router.post('/addFood', upload.single("image"), [ValidationAddFood], addFood);

//Route 4 to delete Food Item
router.delete('/deleteFood/:id', deleteFood);
 
//Route 5 update a Food item
router.patch('/updateFood/:id',  updateFood)


export default router;