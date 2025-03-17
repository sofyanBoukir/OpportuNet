const Notification = require("../models/Notification");
const Post = require("../models/Post");
const User = require("../models/User");



const getUserPosts = async (request,response) =>{
    try{
        const userId = request.user.id;
        const user = await User.findById(userId)
        
        if(!user){
            return response.status(404).json({
                'message' : 'user not found'
            })
        }

        const page = parseInt(request.query.page) || 1;
        const pageSize = 6;

        const skip = (page - 1) * pageSize; 

        const posts = await Post.find({ user : userId })
            .skip(skip)
            .limit(pageSize)
            .populate('user', 'name profile_picture headLine')
            .sort({ createdAt: -1 });
        const totalPosts = await Post.countDocuments({ user: userId });

        const totalPages = Math.ceil(totalPosts / pageSize);

        if(posts){
            return response.json({
                posts,
                totalPosts,
                totalPages
            });
        }
        return response.status(404).json({
            'message' : 'User has No posts'
        })
    }catch(err){
        return response.status(500).json({
            'message' : err.message
        })
    }
}



const addPost = async (request,response) =>{
    try{
        const { content, tags, mentionsIds } = request.body;
        const imageUrl = request.file ? `/posts/${request.file.filename}` : null;

        const userId = request.user.id;

        const user = await User.findById(userId)
        
        if(!user){
            return response.status(404).json({
                'message' : 'user not found'
            })
        }

        const newPost = new Post({
            user : userId, 
            content,
            tags,
            mentions : mentionsIds,
            image : imageUrl
        })

        await newPost.save();
        if(mentionsIds){
            const notifications = mentionsIds.map((mentionId) => {
                return new Notification({
                    user: mentionId,
                    from_user: userId,
                    post: newPost._id,
                    message: 'Mentioned you in a post',
                });
            });
            await Notification.insertMany(notifications);
            return response.json({
                'message' : 'Posted successfully!'
            })
        }
        return response.json({
            'message' : 'Posted successfully!'
        })
    }catch(err){
        return response.status(500).json({
            'message' : err.message
        })
    }
}

module.exports = {addPost, getUserPosts}