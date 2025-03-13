const User = require("../models/User");

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

module.exports = completeRegistration