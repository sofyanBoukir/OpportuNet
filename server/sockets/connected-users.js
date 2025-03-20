const jwt = require("jsonwebtoken")
require('dotenv').config()

const users = {

}

const registerUser = (token,socketId) =>{
    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        const userId = decoded.id;
        
        users[userId] = socketId;

        console.log('user ' + userId + ' is now online') ;
        
        return userId;
    }catch(err){
        return response.status(500).json({
            'message' : err.message
        })        
    }
}

module.exports = { users, registerUser};