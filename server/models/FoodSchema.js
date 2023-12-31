import mongoose from "mongoose";

const foodSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },

    description:{
        type:String,
        required:true
    },

    price:{
        type:String,
        required:true
    },

    filename:{
        type:String
    },

    time:{
        type:String
    },
    status:{
        type:String
    }

})

const food=mongoose.model('food', foodSchema);
export default food;