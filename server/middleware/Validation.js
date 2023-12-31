import {body, validationResult} from 'express-validator';

const validationRequest=[
    body('username','Username must be 3 character long').isLength({min:3}),
    body('email','Please enter a valid email').isEmail(),
    body('password','Password must contain atleast 8 characters including Uppercase, Lowercase and special character').isStrongPassword({
      minLength:8,minLowercase:1, minUppercase:1, minSymbols:1,

    }),
    

    //Custom middleware to check for validation errors
    (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
        const errorMessages= errors.array().map((error) => error.msg);

            return res.status(400).json({errors: errorMessages});
        }
        next();

    }
]

export default validationRequest;
