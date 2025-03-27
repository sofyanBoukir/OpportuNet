import { PlusIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import { AddJob } from "../../components/modals/AddJob";
import { deleteJob, getPostedJobs } from "../../services/job";
import { formatDistanceToNow } from "date-fns";
import {
  EyeIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import { JobsDetail } from "../../shared/JobsDetail";
import { useNavigate } from "react-router-dom";
import { DeleteModal } from "../../components/modals/DeleteModal";

export const RecuiterJobs = () => {
  const [openAddJob, setOpenAddJob] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [notification, setNotification] = useState(null);
  const [openDelete, setOpenDelete] = useState(false);
  const [loadingDelete, setLoadinDelete] = useState(false);
  const [idDelete, setIdDelete] = useState("");
  const navigate = useNavigate();

  const handleViewJob = (job) => {
    navigate(`/job-detail/${job._id}`, { state: { job } });
  };
  const getJobs = async () => {
    const response = await getPostedJobs(localStorage.getItem("token"));
    setJobs(response.data.postedJobs);
  };
  const deleteJobById = async () => {
    setLoadinDelete(true);
    const response = await deleteJob(localStorage.getItem("token"), idDelete);
    if (response.status === 200) {
      setJobs((prevJobs) => prevJobs.filter((job) => job._id !== idDelete));
    }
    setTimeout(() => {
      setLoadinDelete(false);

      setOpenDelete(false);
    }, 1000);
  };
  useEffect(() => {
    getJobs();
  }, []);

  return (
    <div className="relative md:top-40 top-20 mb-40">
      <div className="2xl:px-[10%] md:px-[5%] px-[3%] w-[100%] flex md:flex-wrap md:flex-row flex-col md:gap-10 gap-5">
        {jobs.map((job) => (
          <div
            key={job._id}
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
            <div className="flex justify-between items-center mt-5 w-full">
              <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                {formatDistanceToNow(new Date(job.createdAt), {
                  addSuffix: true,
                })}
              </h3>
              <div className="flex gap-x-3">
                <EyeIcon
                  className="text-green-600 w-6 h-6 cursor-pointer"
                  onClick={() => handleViewJob(job)}
                />
                <PencilSquareIcon className="text-blue-600 w-6 h-6 cursor-pointer" />
                <TrashIcon
                  className="text-red-600 w-6 h-6 cursor-pointer"
                  onClick={() => {
                    setIdDelete(job._id);
                    setOpenDelete(true);
                  }}
                />
              </div>
            </div>
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
      {openDelete && (
        <DeleteModal
          setOpen={setOpenDelete}
          deleteItem={deleteJobById}
          itemType={"job"}
          loading={loadingDelete}
        />
      )}
    </div>
  );
};
