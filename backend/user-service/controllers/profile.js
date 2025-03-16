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
        user.headLine = headLine;
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

        if (user.profile_picture && user.profile_picture !== `/users/userDefaultImage.jpg`) {
            const imagePath = path.join(__dirname, "../public", user.profile_picture);
            fs.unlink(imagePath, (err) => {
            });
        }

        user.name = name;
        user.headLine = headLine;
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

const addEducation = async (request,response) =>{
    try{
        const userId = request.user.id;
        const { degree,year,institution } = request.body;

        const user = await User.findById(userId);
        if(!user){
            return response.status(404).json({
                'message' : 'User Invalid'
            })
        }

        user.education.push({
            degree,year,institution
        })

        await user.save();
        
        return response.json({
            'message' : 'New record added successgully'
        })

    }catch(err){
        return response.status(500).json({
            'message' : err.message
        })
    }
}

const updateEducation = async (request,response) =>{
    try{
        const userId = request.user.id;
        const { degree,year,institution } = request.body;
        const { educationId } = request.params;

        const user = await User.findById(userId);
        if(!user){
            return response.status(404).json({
                'message' : 'User Invalid'
            })
        }

        const educationIndex = user.education.findIndex((education) => education._id.toString() === educationId);
        
        if (educationIndex === -1) {
            return response.status(404).json({
                message: 'Invalid education id',
            });
        }

        user.education[educationIndex] = {
            ...user.education[educationIndex],
            degree,
            year,
            institution,
        };

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

const deleteEducation = async (request,response) =>{
    try{
        const userId = request.user.id;
        const { educationId } = request.params;

        const user = await User.findById(userId);
        if(!user){
            return response.status(404).json({
                'message' : 'User Invalid'
            })
        }

        const newEducations = user.education.filter((education) => education._id.toString() !== educationId);
        user.education = newEducations;

        await user.save();
        
        return response.json({
            'message' : 'Deleted successgully'
        })

    }catch(err){
        return response.status(500).json({
            'message' : err.message
        })
    }
}



const addExperience = async (request,response) =>{
    try{
        const userId = request.user.id;
        const { position,company,location,year,current,description } = request.body;

        const user = await User.findById(userId);
        if(!user){
            return response.status(404).json({
                'message' : 'User Invalid'
            })
        }

        user.experience.push({
            position,company,location,year,current,description
        })

        await user.save();
        
        return response.json({
            'message' : 'New record added successgully'
        })

    }catch(err){
        return response.status(500).json({
            'message' : err.message
        })
    }
}

const updateExperience = async (request,response) =>{
    try{
        const userId = request.user.id;
        const { position,company,location,year,current,description } = request.body;
        const { experienceId } = request.params;

        const user = await User.findById(userId);
        if(!user){
            return response.status(404).json({
                'message' : 'User Invalid'
            })
        }

        const experienceIndex = user.experience.findIndex((experience) => experience._id.toString() === experienceId);
        
        if (experienceIndex === -1) {
            return response.status(404).json({
                message: 'Invalid experience id',
            });
        }

        user.experience[experienceIndex] = {
            ...user.experience[experienceIndex],
            position,
            company,
            location,
            year,
            current,
            description
        };

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

const deleteExperience = async (request,response) =>{
    try{
        const userId = request.user.id;
        const { experienceId } = request.params;

        const user = await User.findById(userId);
        if(!user){
            return response.status(404).json({
                'message' : 'User Invalid'
            })
        }

        const newExperiences = user.experience.filter((experience) => experience._id.toString() !== experienceId);
        user.experience = newExperiences;

        await user.save();
        
        return response.json({
            'message' : 'Deleted successgully'
        })

    }catch(err){
        return response.status(500).json({
            'message' : err.message
        })
    }
}



const addSkill = async (request,response) =>{
    try{
        const userId = request.user.id;
        const { skill } = request.body;

        const user = await User.findById(userId);
        if(!user){
            return response.status(404).json({
                'message' : 'User Invalid'
            })
        }

        user.skills.push(skill)

        await user.save();
        
        return response.json({
            'message' : 'New record added successgully'
        })

    }catch(err){
        return response.status(500).json({
            'message' : err.message
        })
    }
}


const deleteSkill = async (request,response) =>{
    try{
        const userId = request.user.id;
        const index = parseInt(request.params.index, 10);

        if (isNaN(index)) {
            return response.status(400).json({
                message: 'Invalid index'
            });
        }
        
        const user = await User.findById(userId);
        if(!user){
            return response.status(404).json({
                'message' : 'User Invalid'
            })
        }

        const newSkills = user.skills.filter((skill,idx) => idx !== index);
        
        user.skills = newSkills;

        await user.save();
        
        return response.json({
            'message' : 'Deleted Successfully!'
        })

    }catch(err){
        return response.status(500).json({
            'message' : err.message
        })
    }
}


const updateInterests = async (request,response) =>{
    try{
        const userId = request.user.id;
        const {interests} = request.body;

        const user = await User.findById(userId);
        if(!user){
            return response.status(404).json({
                'message' : 'User Invalid'
            })
        }

        user.interests = [];
        user.interests = interests;

        await user.save();
        
        return response.json({
            'message' : 'Interests updated successfully'
        })

    }catch(err){
        return response.status(500).json({
            'message' : err.message
        })
    }
}

module.exports = { getUserDataById,completeRegistration , updateInfo ,updateAbout 
    ,addEducation , updateEducation, deleteEducation, addExperience, updateExperience, deleteExperience
    ,addSkill, deleteSkill, updateInterests}