import { ProfilInfoModal } from "../components/App/ProfilInfo";
import { About } from "../components/App/About";
import { Educations } from "../components/App/Educations";
import { Experiences } from "../components/App/Experiences";
import { Skills } from "../components/App/Skills";
import { Interests } from "../components/App/Interests";
import { UrlProfile } from "../components/App/UrlProfile";
import { SuggestionsModal } from "../components/App/Suggestions";
import { UpdateModal } from "../components/modals/UpdateModal";
import { AppSelector } from "../selectors/AppSelector";
import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Post } from "../components/App/Post";
import { AddModal } from "../components/modals/AddModal";
import { IsEmptyModal } from "../components/App/IsEmptyModal";
import { getUserById } from "../services/profile";
import { ERROR_MESSAGES } from "../constants/Errors";
import { PostSkeleton } from "../components/skeletons/PostSkeleton";
import { deletePost } from "../services/post";
import { Notification } from "../components/UI/Notification";
import { DeleteModal } from "../components/modals/DeleteModal";
import { ArrowDownCircleIcon } from "@heroicons/react/24/solid";
import { getMultualFollowing } from "../services/follow";

export const Profil = () => {
  const { userData } = AppSelector();
  const { id } = useParams();

  const [userInfo, setUserInfo] = useState({});
  const [postsList, setPostsList] = useState([]);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [toUpdate, setToUpdate] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [toAdd, setToAdd] = useState("");
  const [notification, setNotification] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [error, setError] = useState("");
  const [postId, setPostId] = useState(null);
  const [openDelete, setOpenDelete] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [multualFollowing, setMultualFollowing] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const loadingRef = useRef(false);

  const showIcon = userData._id === id;

  const _getUserById = async (page) => {
    page === 1 && setPostsList([]);
    try {
      if (loadingRef.current) return;
      loadingRef.current = true;
      const response = await getUserById(
        localStorage.getItem("token"),
        id,
        page
      );

      loadingRef.current = false;

      setTimeout(() => {
        setLoading(false);
      }, 3000);
      if (response.status === 200) {
        setUserInfo(response.data.userData);
        if (response.data.posts) {
          setPostsList((prevPosts) => [...prevPosts, ...response.data.posts]);
          setTotalPages(response.data.totalPages);
          setTotalPosts(response.data.totalPosts);
        }
      }
    } catch (err) {
      setLoading(false);
      switch (err.response.status) {
        case 401:
          setError(err.response.data.message);
          break;
        case 500:
          setError(ERROR_MESSAGES.SOMETHING_WENT_WRONG);
          break;
      }
    }
  };

  const _getMultualFollowing = async () => {
    const response = await getMultualFollowing(
      localStorage.getItem("token"),
      id
    );
    if (response.status === 200) {
      if (response.data.multualFollowing) {
        setMultualFollowing(response.data.multualFollowing);
      }
    }
  };

  useEffect(() => {
    userInfo._id !== id && setPage(1);
    _getUserById(page);
    userData._id !== id && _getMultualFollowing();
  }, [id, page]);

  /*useEffect(() => {
    const handleScroll = () => {
      console.log("ffffscroDDl");
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight
      ) {
        if (page <= totalPages) {
          console.log("page", page);
          const nextPage = page + 1;
          setPage((prevPage) => prevPage + 1);
          _getUserById(nextPage);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [page]);*/

  const _deletePost = async () => {
    setNotification(null);
    setLoadingDelete(true);
    try {
      const response = await deletePost(localStorage.getItem("token"), postId);
      setLoadingDelete(false);
      setOpenDelete(false);
      setNotification({ type: "success", message: response.data.message });
      const newPosts = postsList.filter((item) => item._id !== postId);
      setPostsList(newPosts);
    } catch (error) {
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

  return (
    <div>
      <div className={`w-full flex flex-col gap-y-2 lg:flex-row justify-start`}>
        <div className="w-full lg:w-[65%] pt-[55px] lg:pt-[80px] flex flex-col gap-y-2 lg:pb-4">
          {
            <ProfilInfoModal
              setShowModalUpdate={setShowUpdateModal}
              valuetoUpdate={setToUpdate}
              showIcon={showIcon}
              multualFollowing={multualFollowing}
              userData={userData._id === id ? userData : userInfo}
            />
          }

          {
            <About
              valuetoUpdate={setToUpdate}
              setShowModalUpdate={setShowUpdateModal}
              showIcon={showIcon}
              content={userData._id === id ? userData.about : userInfo.about}
            />
          }
          {userInfo.role === "candidate" && userInfo.education && (
            <Educations
              notification={setNotification}
              idEduSelected={setSelectedId}
              setShowModalUpdate={setShowUpdateModal}
              valuetoUpdate={setToUpdate}
              setShowModalAdd={setShowAddModal}
              valuetoAdd={setToAdd}
              showIcon={showIcon}
              educationList={
                userData._id === id ? userData.education : userInfo.education
              }
            />
          )}
          {userInfo.role === "candidate" && userInfo.experience && (
            <Experiences
              notification={setNotification}
              idEduSelected={setSelectedId}
              setShowModalUpdate={setShowUpdateModal}
              valuetoUpdate={setToUpdate}
              setShowModalAdd={setShowAddModal}
              valuetoAdd={setToAdd}
              showIcon={showIcon}
              experienceList={
                userData._id === id ? userData.experience : userInfo.experience
              }
            />
          )}
          {userInfo.role === "candidate" && userInfo.skills && (
            <Skills
              notification={setNotification}
              setShowModalAdd={setShowAddModal}
              valuetoAdd={setToAdd}
              showIcon={showIcon}
              skillList={
                userData._id === id ? userData.skills : userInfo.skills
              }
            />
          )}
          {userInfo.interests && (
            <Interests
              setShowModalUpdate={setShowUpdateModal}
              valuetoUpdate={setToUpdate}
              showIcon={showIcon}
              interestList={
                userData._id === id ? userData.interests : userInfo.interests
              }
            />
          )}
          <div className="w-full lg:w-[89%] flex flex-col gap-2 lg:ml-[15%]">
            {loading && <PostSkeleton />}
            {postsList && !loading && postsList.length
              ? postsList.map((post) => {
                  return (
                    <Post
                      key={post._id}
                      post={post}
                      showIcon={showIcon}
                      postSelected={setPostId}
                      openDelete={setOpenDelete}
                    />
                  );
                })
              : null}
          </div>
          {!loading && totalPages !== page && totalPosts !== 0 && (
            <div className="w-full lg:w-[89%] lg:ml-[15%]">
              <ArrowDownCircleIcon
                onClick={() => setPage((prev) => prev + 1)}
                className="mx-auto cursor-pointer my-3 text-blue-700 hover:text-blue-600 duration-200 w-12 h-12"
              />
            </div>
          )}
        </div>
        <div className="lg:w-[20%] flex flex-col gap-2 lg:pt-[80px] lg:ml-[4%]">
          {<UrlProfile />}
          {<SuggestionsModal />}
        </div>
        {showUpdateModal && (
          <UpdateModal
            toUpdate={toUpdate}
            idSelected={selectedId}
            setOpen={setShowUpdateModal}
          />
        )}

        {showAddModal && <AddModal toAdd={toAdd} setOpen={setShowAddModal} />}
        {openDelete && (
          <DeleteModal
            setOpen={setOpenDelete}
            deleteItem={_deletePost}
            itemType="post"
            loading={loadingDelete}
          />
        )}
        {notification && (
          <Notification
            type={notification.type}
            message={notification.message}
          />
        )}
      </div>
    </div>
  );
};
