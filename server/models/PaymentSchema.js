
import mongoose from 'mongoose';

const paymentSchema=mongoose.Schema({

    userId:{
        type:String
    },

    status:{
        type:String
    },

    username:{
        type:String
    },

    productId:{
        type:String
    },

    productName:{
        type:String
    },
   

    productPrice:{
        type:Number
    },
    quantity:{
        type:Number
    }
})

const payment=mongoose.model('payment',paymentSchema);

export default payment;