const Job = require("../models/Job");
const User = require("../models/User");

const getPostedJobs = async (request,response) =>{
    try{
        const userId = request.user.id;

        const user = await User.findById(userId);
        if(!user){
            return response.status(404).json({
                'message' : 'User not found'
            })
        }

        const postedJobs = await Job.find({recuiter:userId})
                                    .sort({createdAt: -1});
        if(postedJobs.length){
            return response.json({
                'postedJobs' : postedJobs
            })
        }else{
            return response.status(404).json({
                'message' : 'No posted Jobs yet'
            })
        }


    }catch(err){
        return response.status(500).json({
            'message' : err.message
        })
    }
}

const getPostedJob = async (request,response) =>{
    try{
        const userId = request.user.id;

        const user = await User.findById(userId);
        if(!user){
            return response.status(404).json({
                'message' : 'User not found'
            })
        }
        const { jobId } = request.params; 

        const postedJob = await Job.findOne({_id:jobId})
        if(postedJob){
            return response.json({
                'postedJob' : postedJob
            })
        }else{
            return response.status(404).json({
                'message' : 'No job with this id'
            })
        }


    }catch(err){
        return response.status(500).json({
            'message' : err.message
        })
    }
}

const getJobs = async (request,response) =>{
    try{
        const userId = request.user.id;

        const user = await User.findById(userId);
        if(!user){
            return response.status(404).json({
                'message' : 'User not found'
            })
        }

        const page = parseInt(request.query.page) || 1;
        const pageSize = 8;
        const skip = (page - 1) * pageSize; 
        const jobs = await Job.find()
                            .limit(pageSize)
                            .skip(skip)
                            .sort({createdAt:-1})

        const totalJobs = await Job.countDocuments();
        const totalPages = Math.ceil(totalJobs / pageSize);
        const lastPage = totalPages;

        return response.json({
            'postedJobs' : jobs,
            'totalJobs' : totalJobs,
            'lastPage' : lastPage
        })
    }catch(err){
        return response.status(500).json({
            'message' : err.message
        })
    }
}

const postNewJob = async (request,response) =>{
    try{
        const userId = request.user.id;

        const user = await User.findById(userId);
        if(!user){
            return response.status(404).json({
                'message' : 'User not found'
            })
        }
        
        const {title,company,location,salaryRange,empType,description,skills,responsibilities} = request.body;
        const newJob = new Job({
            recuiter:userId,
            title,company,location,salaryRange,empType,description,skills,responsibilities
        });

        await newJob.save();

        return response.json({
            'message' : 'New job posted successfully!'
        });


    }catch(err){
        return response.status(500).json({
            'message' : err.message
        })
    }
}


const editJob = async (request,response) =>{
    try{
        const userId = request.user.id;

        const user = await User.findById(userId);
        if(!user){
            return response.status(404).json({
                'message' : 'User not found'
            })
        }

        const { jobId } = request.params;
        const {title,company,location,salaryRange,empType,description,skills,responsibilities} = request.body;
        const job = await Job.findOne({$and:[{_id:jobId},{recuiter:userId}]})

        if(job){
            job.title = title;
            job.company = company;
            job.location = location;
            job.salaryRange = salaryRange;
            job.empType = empType;
            job.description = description;
            job.skills = skills;
            job.responsibilities = responsibilities;
            await job.save();

            return response.json({
                'message' : 'Job data updated successfully!'
            });
        }else{
            return response.status(404).json({
                'message' : 'Could not find this job'
            });
        }

    }catch(err){
        return response.status(500).json({
            'message' : err.message
        })
    }
}

const deleteJob = async (request,response) =>{
    try{
        const userId = request.user.id;

        const user = await User.findById(userId);
        if(!user){
            return response.status(404).json({
                'message' : 'User not found'
            })
        }

        const { jobId } = request.params;
        const job = await Job.findOneAndDelete({$and:[{_id:jobId},{recuiter:userId}]})

        if(job){
            return response.json({
                'message' : 'Job deleted successfully!'
            });
        }else{
            return response.status(404).json({
                'message' : 'Could not find this job'
            });
        }

    }catch(err){
        return response.status(500).json({
            'message' : err.message
        })
    }
}


module.exports = {getPostedJobs, getPostedJob, getJobs, postNewJob, editJob, deleteJob}