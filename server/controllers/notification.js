const Notification = require("../models/Notification");
const User = require("../models/User");

const getUserNotifications = async (request,response) =>{
    try{
        const userId = request.user.id;
        const page = parseInt(request.query.page) || 1;
        const user = await User.findById(userId)

        if(!user){
            return response.status(404).json({
                'message' : 'user not found'
            })
        }

        const pageSize = 9;
        const skip = (page - 1) * pageSize; 

        const notifications = await Notification.find({user:userId})
            .populate('from_user','name headLine profile_picture')
            .populate('post','image')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(pageSize)

        if(!notifications){
            return response.status(404).json({
                'message' : 'No notifications with this user'
            })
        }
        const totalNotifications = await Notification.countDocuments({ user: userId });
        const totalPages = Math.ceil(totalNotifications / pageSize);
        const lastPage = totalPages;

        return response.json({
            'notifications' : notifications,
            'totalNotifications' : totalNotifications,
            'lastPage' : lastPage,
        })
    }catch(err){
        return response.status(500).json({
            'message' : err.message
        })
    }
}


const deleteNotification = async (request,response) =>{
    try{
        const userId = request.user.id;
        const {notificationId} = request.params;
        const user = await User.findById(userId)

        if(!user){
            return response.status(404).json({
                'message' : 'user not found'
            })
        }

        const notification = await Notification.findOneAndDelete({$and:[{user:userId},{_id:notificationId}]});
        if(notification){
            return response.json({
                'message' : 'Notification deleted successfully'
            })
        }

        return response.status(404).json({
            'message' : 'Notification could not found'
        })
    }catch(err){
        return response.status(500).json({
            'message' : err.message
        })
    }
}
module.exports = {getUserNotifications,deleteNotification}