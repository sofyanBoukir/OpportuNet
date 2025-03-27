import React from "react";
import { JobDetails } from "../components/App/JobDetails";
import { useLocation } from "react-router-dom";

export const JobsDetail = () => {
  const location = useLocation();
  const { job } = location.state || {}; 

  if (!job) {
    return <div className="text-center mt-10 text-red-500">Job not found.</div>;
  }

  return (
    <div>
      <JobDetails job={job} />
    </div>
  );
};