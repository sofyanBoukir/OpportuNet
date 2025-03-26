const express = require("express")
const { getPostedJobs, getPostedJob, postNewJob, editJob, deleteJob, getJobs, applyForJob } = require("../controllers/job")
const isAuth = require("../middlewares/isAuth")
const isRecuiter = require("../middlewares/isRecuiter")

const router = express.Router()


router.get('/getPostedJobs',isRecuiter,getPostedJobs)
router.get('/getPostedJob/:jobId',isAuth,getPostedJob)
router.get('/getJobs',isAuth,getJobs)
router.post('/postNewJob',isRecuiter,postNewJob)
router.put('/editJob/:jobId',isRecuiter,editJob);
router.delete('/deleteJob/:jobId',isRecuiter,deleteJob)
router.post('/applyForjob/:jobId',isAuth,applyForJob)

module.exports = router