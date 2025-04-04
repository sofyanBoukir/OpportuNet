import { Table } from "../../components/tables/Table";
import { getReportPosts } from "../../services/admin";
import { Table as TableSkeletons } from "../../components/skeletons/Table";
import { useEffect, useState } from "react";
import { ERROR_MESSAGES } from "../../constants/Errors";
import { Notification } from "../../components/UI/Notification";

export const ReportedPosts = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({});
  const [pagination, setPagination] = useState({
    currentPage: "",
    lastPage: "",
    total: "",
  });

  const getAllReport = async (page) => {
    setNotification(null);
    setLoading(true);
    try {
      const response = await getReportPosts(
        localStorage.getItem("token"),
        page
      );
      setLoading(false);
      console.log(response);
      setReports(response.data.reports);
      setPagination({
        currentPage: page,
        lastPage: response.data.totalPages,
        total: response.data.totalPosts,
      });
    } catch (error) {
      setLoading(false);
      error.response
        ? setNotification({
            type: "error",
            message: error.response.data.message,
          })
        : setNotification({
            type: "error",
            message: ERROR_MESSAGES.TRY_AGAIN,
          });
    }
  };

  useEffect(() => {
    getAllReport(1);
  }, []);

  return (
    <div>
      {/* className="w-full md:w-[100%] mt-6 md:pl-[255px] 2xl:pl-[15%] sm:relative" */}
      <div className="w-[100%] px-2 ">
        <h1 className="text-3xl font-semibold pb-5">Manage posts</h1>
        {loading && <TableSkeletons />}

        {!loading && reports.length > 0 ? (
          <Table
            heads={["content", "total reported"]}
            data={reports}
            keys={["postInfo.content", "total"]}
            pagination={pagination}
            getData={getAllReport}
            toDelete={"post"}
          />
        ) : (
          <span className="text-red-300 text-xl font-semibold">
            {ERROR_MESSAGES.NOT_FOUND}
          </span>
        )}
      </div>
      {notification && (
        <Notification type={notification.type} message={notification.message} />
      )}
    </div>
  );
};
