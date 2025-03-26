const { users } = require("./connected-users");

const notifyOnlineUser = (io,userId,notification) =>{
    if(users[userId]){
        io.to(users[userId]).emit('newNotification',notification)        
    }
}

const notifyMessageToOnlineUser = (io,userId,message) =>{
    if(users[userId]){
        io.to(users[userId]).emit('newMessage',message)        
    }}
    
module.exports = {notifyOnlineUser, notifyMessageToOnlineUser};