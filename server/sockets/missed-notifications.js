const Notification = require("../models/Notification")


const getMissedNotifications = async (userId) =>{
    try{
        const missedNotfiications = await Notification.find({
            user : userId,
            status : 'delivred',
        });
        return missedNotfiications;
    }catch(err){
        return response.status(500).json({
            'message' : err.message
        })
    }
}

module.exports = getMissedNotifications