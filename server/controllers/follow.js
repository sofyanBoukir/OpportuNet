const Notification = require("../models/Notification");
const User = require("../models/User");
const notifyOnlineUser = require("../sockets/real-time-notifications");
const { getIO } = require("../sockets/socket");


const toggleFollow = async (request,response) =>{
    try{
        const userId = request.user.id;
        const { followingId } = request.body

        const user = await User.findById(userId);
        if(!user){
            return response.status(404).json({
                'message' : 'User not found'
            })
        }
        const userToFollow = await User.findById(followingId)
        if(!userToFollow){
            return response.status(404).json({
                'message' : 'User not found'
            })
        }

        const isFollowed = user.following.includes(followingId);
        const io = getIO()

        if(isFollowed){
            const newFollowing = user.following.filter((id) => id.toString() !== followingId.toString());
            user.following = newFollowing;
            await user.save();

            const newFollowers = userToFollow.followers.filter((id) => id.toString() !== userId.toString());
            userToFollow.followers = newFollowers;
            await userToFollow.save();

            await Notification.findOneAndDelete({
                user : followingId,
                from_user : user._id,
                message : 'Started following you'
            })

            return response.json({
                'followed' : false,
            });
        }else{
            user.following.push(followingId);
            await user.save();

            userToFollow.followers.push(userId);
            await userToFollow.save();

            const newNotification = new Notification({
                user : followingId,
                from_user : user._id,
                message : 'Started following you'
            })
            await newNotification.save();
            notifyOnlineUser(io,followingId,newNotification);
            return response.json({
                'followed' : true
            })
        }

    }catch(err){
        return response.status(500).json({
            'message' : err.message
        })
    }
}


const getFollowers = async (request,response) =>{
    try{
        const userId = request.user.id;

        const user = await User.findById(userId);
        if(!user){
            return response.status(404).json({
                'message' : 'User not found'
            })
        }


        const followers = await User.find({_id:userId})
                                    .select('followers')
                                    .populate('followers','profile_picture name headLine')

        return response.json({
            'followers' : followers
        })
        
    }catch(err){
        return response.status(500).json({
            'message' : err.message
        })
    }
}


const getFollowing = async (request,response) =>{
    try{
        const userId = request.user.id;

        const user = await User.findById(userId);
        if(!user){
            return response.status(404).json({
                'message' : 'User not found'
            })
        }

        const following = await User.find({_id:userId})
                                    .select('following')
                                    .populate('following','profile_picture name headLine')

        return response.json({
            'following' : following
        })
        
    }catch(err){
        return response.status(500).json({
            'message' : err.message
        })
    }
}

const removeFollower = async (request,response) =>{
    try{
        const userId = request.user.id;

        const user = await User.findById(userId);
        if(!user){
            return response.status(404).json({
                'message' : 'User not found'
            })
        }

        const { followerId } = request.params;
        const follower = await User.findById(followerId);
        if(!follower){
            return response.status(404).json({
                'message' : 'User not found'
            })
        }

        const newFollowers = user.followers.filter((id) => id.toString() !== followerId.toString());
        user.followers = newFollowers;
        await user.save();

        const newFollowing = follower.following.filter((id) => id.toString() !== userId.toString());
        follower.following = newFollowing;
        await follower.save();

        return response.json({
            'message' : 'Follower deleted',
            'deleted' : true
        })

    }catch(err){
        return response.status(500).json({
            'message' : err.message
        })
    }
}
module.exports = { toggleFollow, getFollowers, getFollowing ,removeFollower}