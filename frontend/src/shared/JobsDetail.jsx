import React, { useEffect } from "react";
import { JobDetails } from "../components/App/JobDetails";
import {  useParams } from "react-router-dom";
import { useState } from "react";
import { getPostedJobsById } from "../services/job";

export const JobsDetail = () => {
  const [jobData, setJobData] = useState([]);
  const {id} = useParams()  
  const getJobs = async () => {
      const response = await getPostedJobsById(localStorage.getItem("token"),id);
      setJobData(response.data.postedJob);
    };
    useEffect(()=>{
      getJobs();
    },[])
  return (
    <div className=" relative top-15 px-[20%]">
      <JobDetails job={jobData}/>
    </div>
  );
};