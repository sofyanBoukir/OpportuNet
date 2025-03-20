const User = require("../models/User");

const getSavedPosts = async (request,response) =>{
    try{

        const userId = request.user.id;

        const user = await User.findById(userId);
        if(!user){
            return response.status(404).json({
                'message' : 'User not found' 
            })
        }
        const userSavedPosts = await User.findById(userId)
                                    .select('savedPosts')
                                    .populate({path: "savedPosts",
                                        select : 'content image',
                                        populate: {
                                            path: "user",
                                            select: "name headLine profile_picture"
                                        }
                                    })

        if(userSavedPosts){
            return response.json({
                'savedPosts' : userSavedPosts
            })
        }

        return response.status(404).json({
            'message' : 'No saved posts with this user'
        })
    }catch(err){
        return response.status(500).json({
            'message' : err.message
        })
    }
}

module.exports = getSavedPosts