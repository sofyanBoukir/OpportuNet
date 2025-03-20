const { users } = require("./connected-users");

const notifyOnlineUser = (io,userId,notification) =>{
    if(users[userId]){
        io.to(users[userId]).emit('newNotification',notification)        
    }
}

module.exports = notifyOnlineUser;