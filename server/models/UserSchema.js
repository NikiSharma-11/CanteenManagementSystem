import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    username:{
        type:String,
        required:true

    },
    email:{
        type:String,
        required:true

    },
    hashPassword:{
        type:String,
        required:true

    },
    role:{
        type:String,
        default:'customer',
        enum:['customer', 'staff', 'admin']
    },
    accessToken:{
        type:String
    }


})

const User = mongoose.model('user', userSchema);
export default User;
