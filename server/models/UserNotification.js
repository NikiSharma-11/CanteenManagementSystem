import mongoose from 'mongoose';

const userNotificationSchema= mongoose.Schema({
    status:{
        type: String
    },

    userId:{
        type:String
    }

    
});

const userNotification= mongoose.model('userNotification', userNotificationSchema);

export default userNotification;