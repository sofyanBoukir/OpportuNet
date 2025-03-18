const Interest = require("../models/Interest")

const getInterests = async (request,response) =>{
    try{
        const interests = await Interest.find();
        if(!interests){
            return response.status(400).json({
                'message' : 'No interests founded'
            })
        }

        return response.json({
            'interests' : interests
        })
    }catch(err){
        return response.status(500).json({
            'message' : err.message
        })
    }
}

module.exports = getInterests