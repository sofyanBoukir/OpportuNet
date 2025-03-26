import { PlusIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { AddJob } from "../../components/modals/AddJob";

export const RecuiterJobs = () => {
  const [openAddJob, setOpenAddJob] = useState(false);

  const jobs = [
    {
      id: 1,
      title: "Software Engineer",
      company: "Google",
      location: "San Francisco",
      empType: "Full-time",
      posted: "1 day ago",
    },
    {
      id: 2,
      title: "Product Manager",
      company: "Amazon",
      location: "Seattle",
      empType: "Part-time",
      posted: "2 days ago",
    },
    {
      id: 3,
      title: "Data Analyst",
      company: "Meta",
      location: "New York",
      empType: "Contract",
      posted: "3 days ago",
    },
    {
      id: 4,
      title: "UX Designer",
      company: "Apple",
      location: "Los Angeles",
      empType: "Freelance",
      posted: "5 days ago",
    },
  ];

  return (
    <div className="relative md:top-40 top-20 mb-40">
      <div className="2xl:px-[10%] md:px-[5%] px-[3%] w-[100%] flex md:flex-wrap md:flex-row flex-col md:gap-10 gap-5">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="bg-white dark:bg-gray-900 dark:text-white px-6 py-8 md:w-[22%] w-[94%] rounded-2xl shadow-xl shadow-gray-300 dark:shadow-gray-900 transition-transform transform hover:scale-105 border border-gray-200 dark:border-gray-700"
          >
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {job.title}
            </h1>
            <h3 className="text-lg font-semibold text-gray-500 dark:text-gray-400">
              {job.company}
            </h3>
            <h3 className="text-blue-600 font-medium">{job.location}</h3>
            <h3 className="mt-6 bg-gray-100 dark:bg-gray-800 w-[50%] text-center px-3 py-1 rounded-lg text-sm font-semibold text-gray-700 dark:text-gray-300">
              {job.empType}
            </h3>
            <h3 className="text-gray-500 dark:text-gray-400 mt-5 text-sm font-medium">
              {job.posted}
            </h3>
          </div>
        ))}

        <div
          onClick={() => setOpenAddJob(true)}
          className="bg-white dark:bg-gray-900 dark:text-white px-6 py-8 md:w-[22%] w-[94%] rounded-2xl shadow-xl shadow-gray-300 dark:shadow-gray-900 flex flex-col items-center justify-center border-dashed border-2 border-gray-400 dark:border-gray-600 hover:cursor-pointer hover:border-blue-500 transition-all duration-300 transform hover:scale-105"
        >
          <h1 className="text-2xl font-semibold mb-5 text-gray-700 dark:text-gray-300">
            Add New Job
          </h1>
          <PlusIcon className="w-[30%] text-blue-500" />
        </div>
      </div>
      {openAddJob && <AddJob setOpenAddJob={setOpenAddJob} />}
    </div>
  );
};
