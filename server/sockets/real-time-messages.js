const { users } = require("./connected-users");

const notifyMessageToOnlineUser = (io,userId,newMessage) =>{
    if(users[userId]){
        io.to(users[userId]).emit('newMessage',newMessage)        
    }
}

module.exports = notifyMessageToOnlineUser