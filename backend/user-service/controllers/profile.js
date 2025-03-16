const User = require("../models/User");
const fs = require('fs');
const path = require('path');

const completeRegistration = async (request,response) =>{
    try{
        const userId = request.user.id;
        const {role,headLine,companyName} = request.body;
        const {interests} = request.body;

        if(role !== 'candidate' && role !== 'recuiter'){
            return response.status(403).json({
                'message' : 'Invalid role'
            })
        }

        const user = await User.findById(userId);
        user.role = role;
        user.headeLine = headLine;
        user.role === 'recuiter' ? user.companyName = companyName : null;
        user.interests = interests;
        user.isNewUser = false;

        await user.save();
        
        return response.json({
            'message' : 'Completed successfully'
        })
    

    }catch(err){
        return response.status(500).json({
            'message' : err.message
        })
    }
}

const updateInfo = async (request,response) =>{
    try{
        const userId = request.user.id;
        const {name,headLine,location,webSite} = request.body;

        const imageUrl = request.file ? `/users/${request.file.filename}` : user.profile_picture;

        const user = await User.findById(userId);

        if (user.profile_picture) {
            const imagePath = path.join(__dirname, "../public", user.profile_picture);
            fs.unlink(imagePath, (err) => {
            });
        }

        user.name = name;
        user.headeLine = headLine;
        user.role === 'recuiter' ? user.companyName = companyName : null;
        user.location = location;
        user.webSite = webSite;
        user.profile_picture = imageUrl;

        await user.save();
        
        return response.json({
            'message' : 'Updated successgully'
        })

    }catch(err){
        return response.status(500).json({
            'message' : err.message
        })
    }
}

module.exports = { completeRegistration , updateInfo }