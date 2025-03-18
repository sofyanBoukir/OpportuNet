const Comment = require("../models/Comment");
const Notification = require("../models/Notification");
const Post = require("../models/Post");
const User = require("../models/User");


const getComments = async (request,response) =>{
    try{
        const userId = request.user.id;
        const { postId } = request.params;
        
        const user = await User.findById(userId)
        
        if(!user){
            return response.status(404).json({
                'message' : 'user not found'
            })
        }

        const page = parseInt(request.query.page) || 1;
        const pageSize = 5;
        const skip = (page - 1) * pageSize; 

        const comments = await Comment.find({
                post:postId
            })
            .populate('user','name headLine profile_picture')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(pageSize)

        if(comments){
            return response.json({
                'comments' : comments
            })
        }else{
            return response.status(404).json({
                'message' : 'Post has no comments'
            })
        }
    }catch(err){
        return response.status(500).json({
            'message' : err.message
        })
    }
}

const commentOnPost = async (request,response) =>{
    try{
        const userId = request.user.id;
        const { postId } = request.params;
        const user = await User.findById(userId)
        const {comment} = request.body;

        if(!user){
            return response.status(404).json({
                'message' : 'user not found'
            })
        }

        const postExists = await Post.findById(postId);
        if(!postExists){
            return response.status(404).json({
                'message' : 'Post not found'
            })
        }


        const newComment = new Comment({
            post : postId,
            user : userId,
            comment : comment,
        })

        const newNotification = new Notification({
            user:postExists.user,
            from_user:userId,
            post:postExists._id,
            message:"Commented on your post"
        })

        postExists.comments.push(newComment._id);
        await postExists.save()
        await newComment.save();
        await newNotification.save();

        return response.json({
            'message' : 'Commented successfully'
        })

    }catch(err){
        return response.status(500).json({
            'message' : err.message
        })
    }
}

module.exports = { getComments,commentOnPost };