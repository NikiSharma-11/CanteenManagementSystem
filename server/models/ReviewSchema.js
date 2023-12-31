
import mongoose from 'mongoose';

const reviewSchema=mongoose.Schema({

    foodId:{
        type:String
    },

    rating:{
        type:Number
    },

    comment:{
        type:String
    },
    username:{
        type:String
    }
})

const review =mongoose.model('review',reviewSchema);

export default review;