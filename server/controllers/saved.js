const User = require("../models/User");

const getSavedPosts = async (request,response) =>{
    try{

        const userId = request.user.id;

        const page = parseInt(request.query.page) || 1;

        const user = await User.findById(userId);
        if(!user){
            return response.status(404).json({
                'message' : 'User not found' 
            })
        }

        const pageSize = 3;
        const skip = (page - 1) * pageSize;

        const userSavedPosts = await User.findById(userId)
                                    .select('savedPosts')
                                    .populate({path: "savedPosts",
                                        select : 'content image',
                                        populate: {
                                            path: "user",
                                            select: "name headLine profile_picture"
                                        }
                                    })
                                    .skip(skip)
                                    .limit(pageSize)

        const totalSavedPosts = user.savedPosts.length;
        const totalPages = Math.ceil(totalSavedPosts / pageSize);
        const lastPage = totalPages;

        if(userSavedPosts){
            return response.json({
                'savedPosts' : userSavedPosts,
                'totalSavedPosts' : totalSavedPosts,
                'lastPage' : lastPage
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