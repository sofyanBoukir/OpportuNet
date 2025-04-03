import { useState } from "react";
import { Button } from "../UI/Button";
import { Label } from "../UI/Label";
import { addReport } from "../../services/report";
import { Notification } from "../UI/Notification";
import { ERROR_MESSAGES } from "../../constants/Errors";

export const ReportModal = ({ setOpen, postId }) => {
  const [report, setReport] = useState("");
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  const handleChange = (e) => {
    setReport(e.target.value);
  };

  const handleReport = async () => {
    setNotification(null);
    if (report !== "") {
      setLoading(true);
      try {
        const response = await addReport(localStorage.getItem("token"), postId);
        setLoading(false);
        setNotification({ type: "success", message: response.data.message });
      } catch (error) {
        setLoading(false);
        error.response
          ? setNotification({ type: "success", message: response.data.message })
          : setNotification({
              type: "error",
              message: ERROR_MESSAGES.TRY_AGAIN,
            });
      }
    } else {
      setNotification({ type: "error", message: "please check reason" });
      setTimeout(() => {
        setNotification(null);
      }, 1000);
    }
  };

  return (
    <div className="z-20 fixed w-full inset-0 p-2 bg-black/50 text-gray-700 lg:backdrop-blur-xs">
      <div
        className={`bg-[#ffffff] z-20 border w-[90%] sm:w-[65%] mx-auto lg:w-[50%] dark:bg-black px-[32px] pb-2 lg:mt-[30px] rounded-lg shadow-sm`}
      >
        <h1 className="text-2xl font-semibold py-6 text-gray-800 border-b dark:text-white">
          Report
        </h1>

        <h6 className="pt-4 pb-1">Tell us why to help improve the feed.</h6>

        <div className="flex items-center gap-1 mt-5">
          <input
            type="radio"
            name="reason"
            value="I'm not interested in the author"
            checked={report.reason}
            onChange={handleChange}
          />
          <Label
            text="I'm not interested in the author"
            className="text-sm font-normal text-black mb-1 mr-2 dark:text-white"
          />
        </div>

        <div className="flex items-center gap-1 mt-5">
          <input
            type="radio"
            name="reason"
            value="I'm not interested in this topic"
            checked={report.reason}
            onChange={handleChange}
          />
          <Label
            text="I'm not interested in this topic"
            className="text-sm font-normal text-black mb-1 mr-2 dark:text-white"
          />
        </div>

        <div className="flex items-center gap-1 mt-5">
          <input
            type="radio"
            name="reason"
            value="I've seen too many posts on this topic"
            checked={report.reason}
            onChange={handleChange}
          />
          <Label
            text="I've seen too many posts on this topic"
            className="text-sm font-normal text-black mb-1 mr-2 dark:text-white"
          />
        </div>

        <div className="flex items-center gap-1 mt-5">
          <input
            type="radio"
            name="reason"
            value="I've seen this post before"
            checked={report.reason}
            onChange={handleChange}
          />
          <Label
            text="I've seen this post before"
            className="text-sm font-normal text-black mb-1 mr-2 dark:text-white"
          />
        </div>

        <div className="flex items-center gap-1 mt-5">
          <input
            type="radio"
            name="reason"
            value="This post is old"
            checked={report.reason}
            onChange={handleChange}
          />
          <Label
            text="This post is old"
            className="text-sm font-normal text-black mb-1 mr-2 dark:text-white"
          />
        </div>

        <div className="flex items-center gap-1 mt-5">
          <input
            type="radio"
            name="reason"
            value="It's something else"
            checked={report.reason}
            onChange={handleChange}
          />
          <Label
            text="It's something else"
            className="text-sm font-normal text-black mb-1 mr-2 dark:text-white"
          />
        </div>

        <div>
          <div className="flex justify-end mr-4 gap-4 mt-7">
            <Button
              type="button"
              text="Cancel"
              onClick={() => setOpen(false)}
              className="bg-gray-200 text-gray-900 w-20 !rounded-2xl"
              color="gray-900"
            />
            <Button
              type="submit"
              onClick={handleReport}
              text="Report"
              loading={loading}
              className="bg-[#004182] text-[#ffffff] w-20 !rounded-2xl"
            />
          </div>
        </div>
      </div>
      {notification && (
        <Notification type={notification.type} message={notification.message} />
      )}
    </div>
  );
};
