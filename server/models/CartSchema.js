import mongoose from 'mongoose';

const cartSchema=mongoose.Schema({
    name:{
        type:String
    },
    description:{
        type:String
    },
    price:{
        type:Number
    },
    quantity:{
        type:Number
    },
    userId:{
        type:String
    },
    foodId:{
        type:String
    },
    userName:{
        type:String
    },
    status:{
        type:String
    }
})

const cart=mongoose.model('cart',cartSchema);
export default cart;