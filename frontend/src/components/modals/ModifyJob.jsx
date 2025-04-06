import React, { useEffect, useState } from "react";
import { Label } from "../UI/Label";
import { Input } from "../UI/Input";
import { Textarea } from "../UI/Textarea";
import { modifyJob } from "../../services/job";
import { Notification } from "../UI/Notification";

export const ModifyJob = ({ setOpenAddJob, data }) => {
  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState("");
  const [responsibilities, setResponsibilities] = useState([]);
  const [responsibilityInput, setResponsibilityInput] = useState("");
  const [salaryFrom, setSalaryFrom] = useState("");
  const [salaryTo, setSalaryTo] = useState("");
  const [salaryCurrency, setSalaryCurrency] = useState("");
  const [notification, setNotification] = useState(null);

  const [jobData, setJobData] = useState({
    title: "",
    company: "",
    location: "",
    empType: "",
    salaryRange: "",
    description: "",
    skills: [],
    responsibilities: [],
  });

  const handlePostJob = async () => {
    setNotification(null);
    try {
      const response = await modifyJob(localStorage.getItem("token"), jobData, data._id);
      setNotification({ type: "success", message: response.data.message });
      setTimeout(() => {
        setOpenAddJob(false);
      }, 2000);
    } catch (err) {
      const errorMessage = err.response?.data?.message || "An error occurred"; // Added fallback
      switch (err.response?.status) {
        case 401:
          setNotification({ type: "error", message: errorMessage });
          break;
        case 500:
          setNotification({ type: "error", message: errorMessage });
          break;
        default:
          setNotification({ type: "error", message: errorMessage });
      }
    }
  };

  useEffect(() => {
    if (data) {
      setJobData({
        title: data.title || "",
        company: data.company || "",
        location: data.location || "",
        empType: data.empType || "",
        salaryRange: data.salaryRange || "",
        description: data.description || "",
        skills: data.skills || [],
        responsibilities: data.responsibilities || [],
      });

      setSkills(data.skills || []);
      setResponsibilities(data.responsibilities || []);

      const salaryParts = data.salaryRange ? data.salaryRange.split(" ") : [];
      setSalaryFrom(salaryParts[0] || "");
      setSalaryTo(salaryParts[2] || "");
      setSalaryCurrency(salaryParts[3] || "");
    }
  }, [data]);

  useEffect(() => {
    setJobData((prev) => ({
      ...prev,
      salaryRange: `${salaryFrom} to ${salaryTo} ${salaryCurrency}`,
    }));
  }, [salaryFrom, salaryTo, salaryCurrency]);

  useEffect(() => {
    setJobData((prev) => ({
      ...prev,
      skills,
      responsibilities,
    }));
  }, [skills, responsibilities]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setJobData((prev) => ({ ...prev, [name]: value }));
  };

  const addResponsibility = () => {
    if (responsibilityInput.trim() && !responsibilities.includes(responsibilityInput.trim())) {
      setResponsibilities([...responsibilities, responsibilityInput.trim()]);
      setResponsibilityInput("");
    }
  };

  const removeResponsibility = (resp) => {
    setResponsibilities(responsibilities.filter((r) => r !== resp));
  };

  const addSkill = () => {
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput("");
    }
  };

  const removeSkill = (skill) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  return (
    <div className="z-20 overflow-auto fixed inset-0 flex items-center bg-black/50 text-gray-700 justify-center backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-900 w-[90%] lg:w-[50%] px-6 py-8 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4 text-center">
          Job Posting
        </h2>
        <div className="flex flex-wrap gap-4">
          <div className="flex flex-col w-full sm:w-[48%]">
            <Label text="Title of Job" className="text-lg font-medium dark:text-gray-300" />
            <Input
              type="text"
              name="title"
              value={jobData.title}
              onChange={handleInputChange}
              placeholder="e.g., Software Engineer"
              className="border dark:border-gray-600 py-2 px-3 rounded-md dark:text-gray-300 w-full"
            />
          </div>
          <div className="flex flex-col w-full sm:w-[48%]">
            <Label text="Company Name" className="text-lg font-medium dark:text-gray-300" />
            <Input
              type="text"
              name="company"
              value={jobData.company}
              onChange={handleInputChange}
              placeholder="e.g., INWI"
              className="border dark:border-gray-600 py-2 px-3 rounded-md dark:text-gray-300 w-full"
            />
          </div>
          <div className="flex flex-col w-full sm:w-[48%]">
            <Label text="Location" className="text-lg font-medium dark:text-gray-300" />
            <Input
              type="text"
              name="location"
              value={jobData.location}
              onChange={handleInputChange}
              placeholder="e.g., Tiznit"
              className="border dark:border-gray-600 py-2 px-3 rounded-md dark:text-gray-300 w-full"
            />
          </div>
          <div className="flex flex-col w-full sm:w-[48%]">
            <Label text="Employment Type" className="text-lg font-medium dark:text-gray-300" />
            <select
              className="border dark:border-gray-600 py-2 px-3 rounded-md dark:text-gray-300 dark:bg-gray-900 w-full"
              name="empType"
              value={jobData.empType}
              onChange={handleInputChange}
            >
              <option>Choose Type</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Internship">Internship</option>
              <option value="Freelance">Freelance</option>
            </select>
          </div>
          <div className="flex flex-col w-full">
            <div className="flex flex-row gap-4">
              <Label text="Salary Range" className="text-lg font-medium dark:text-gray-300" />
              <Label text={jobData.salaryRange} className="text-lg font-medium dark:text-gray-500" />
            </div>
            <div className="flex gap-3">
              <Input
                type="number"
                name="salaryFrom"
                placeholder="From"
                onChange={(e) => setSalaryFrom(e.target.value)}
                className="border dark:border-gray-600 py-2 px-3 rounded-md dark:text-gray-300 w-2/5"
              />
              <Input
                type="number"
                name="salaryTo"
                placeholder="To"
                onChange={(e) => setSalaryTo(e.target.value)}
                className="border dark:border-gray-600 py-2 px-3 rounded-md dark:text-gray-300 w-2/5"
              />
              <select
                className="border dark:border-gray-600 py-2 px-3 rounded-md dark:text-gray-300 dark:bg-gray-900 w-1/5"
                name="currency"
                onChange={(e) => setSalaryCurrency(e.target.value)}
              >
                <option>Currency</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="MAD">MAD</option>
              </select>
            </div>
          </div>
          <div className="flex flex-col w-full">
            <Label text="Description" className="text-lg font-medium dark:text-gray-300" />
            <Textarea
              name="description"
              value={jobData.description}
              onChange={handleInputChange}
              placeholder="Job description..."
              className="border dark:border-gray-600 py-2 px-3 rounded-md dark:text-gray-300 w-full h-28"
            />
          </div>
          <div className="flex flex-col w-full">
            <Label text="Skills" className="text-lg font-medium dark:text-gray-300" />
            <div className="flex gap-2">
              <Input
                type="text"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addSkill()}
                placeholder="Add a skill and press Enter"
                className="border dark:border-gray-600 py-2 px-3 rounded-md dark:text-gray-300 w-full"
              />
              <button
                onClick={addSkill}
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2 mt-3">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="flex items-center bg-blue-500 text-white px-3 py-1 rounded-lg text-sm"
                >
                  {skill}
                  <button
                    onClick={() => removeSkill(skill)}
                    className="ml-2 bg-red-500 hover:bg-red-600 text-white rounded-full px-2"
                  >
                    X
                  </button>
                </span>
              ))}
            </div>
          </div>
          <div className="flex flex-col w-full">
            <Label text="Responsibilities" className="text-lg font-medium dark:text-gray-300" />
            <div className="flex gap-2">
              <Input
                type="text"
                value={responsibilityInput}
                onChange={(e) => setResponsibilityInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addResponsibility()}
                placeholder="Add a responsibility and press Enter"
                className="border dark:border-gray-600 py-2 px-3 rounded-md dark:text-gray-300 w-full"
              />
              <button
                onClick={addResponsibility}
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2 mt-3">
              {responsibilities.map((resp, index) => (
                <span
                  key={index}
                  className="flex items-center bg-blue-500 text-white px-3 py-1 rounded-lg text-sm"
                >
                  {resp}
                  <button
                    onClick={() => removeResponsibility(resp)}
                    className="ml-2 bg-red-500 hover:bg-red-600 text-white rounded-full px-2"
                  >
                    X
                  </button>
                </span>
              ))}
            </div>
          </div>
          <div className="flex justify-end w-full gap-3 mt-4">
            <button
              onClick={() => setOpenAddJob(false)}
              className="bg-gray-300 dark:bg-gray-700 cursor-pointer hover:bg-gray-400 dark:hover:bg-gray-600 text-gray-800 dark:text-white py-2 px-4 rounded-lg"
            >
              Cancel
            </button>
            <button
              className="bg-blue-600 cursor-pointer hover:bg-blue-700 text-white py-2 px-4 rounded-lg"
              onClick={handlePostJob}
            >
              Update Job
            </button>
          </div>
        </div>
      </div>
      {notification && (
        <Notification type={notification.type} message={notification.message} />
      )}
    </div>
  );
};
