import mongoose from 'mongoose';

const notificationSchema= mongoose.Schema({
    name:{
        type: String
    },
    price:{
        type: String
    }
});

const notification= mongoose.model('notification', notificationSchema);

export default notification;