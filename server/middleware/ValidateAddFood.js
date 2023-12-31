import {body, validationResult} from 'express-validator';
const isValidPrice = (value) => {
    if (value === '') {
      throw new Error('Please enter the price of the Food');
    }
    if (!Number.isInteger(Number(value)) || value <= 0) {
      throw new Error('Price must be a positive integer');
    }
    return true;
  };
const ValidationAddFood=[
    body('name','Please enter a valid item name').notEmpty(),
    body('description','Please enter a item description').notEmpty(),
    body('time','Please enter time duration').notEmpty(),
    body('status','Please enter status').notEmpty(),
    body('price').custom(isValidPrice),
    (req,res,next)=>{
        const errors=validationResult(req);
        if(!errors.isEmpty()){
            const errorMessage=errors.array().map((error)=>error.msg)
            return res.status(400).json({errors:errorMessage})
        }
        next();
    }
]
export default ValidationAddFood;