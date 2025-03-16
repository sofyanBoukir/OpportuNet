const User = require("../models/User");
const fs = require('fs');
const path = require('path');
require("dotenv").config()


const getUserDataById = async (request,response) =>{
    try{
        const {userId} = request.params;
        const user = await User.findById(userId).populate({
            select : 'interest',
            path : 'interests'
        });

        if(!user){
            return response.status(404).json({
                'message' : 'User not found'
            })
        }
        const userObject = user.toObject()
        delete userObject.password;
        delete userObject.email;

        if(userObject){
            return response.json({
                'userData' : userObject,
            })
        }
    }catch(error){
        return response.status(500).json({
            'messahe' : error.message
        })
    }
}
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

        if(!user){
            return response.status(404).json({
                'message' : 'User Invalid'
            })
        }

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
        const {name,headLine,location,webSite,companyName} = request.body;

        const user = await User.findById(userId);

        if(!user){
            return response.status(404).json({
                'message' : 'User Invalid'
            })
        }
        const imageUrl = request.file ? `/users/${request.file.filename}` : user.profile_picture;

        if (user.profile_picture && user.profile_picture !== `${process.env.SERVER_URL}/users/userDefaultImage.jpg`) {
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


const updateAbout = async (request,response) =>{
    try{
        const userId = request.user.id;
        const { about } = request.body;

        const user = await User.findById(userId);
        if(!user){
            return response.status(404).json({
                'message' : 'User Invalid'
            })
        }

        user.about = about;

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

module.exports = { getUserDataById,completeRegistration , updateInfo ,updateAbout }