import { ProfilInfoModal } from "../components/App/ProfilInfo";
import { AboutModal } from "../components/App/About";
import { EducationsModal } from "../components/App/Educations";
import { ExperiencesModal } from "../components/App/Experiences";
import { SkillsModal } from "../components/App/Skills";
import { InterestsModal } from "../components/App/Interests";
import { UrlProfilModal } from "../components/App/UrlProfile";
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

  const [selectedId, setSelectedId] = useState(null);
  const loadingRef = useRef(false);
  const hasMore = useRef(true);
  const showIcon = userData._id === id;

  const _getUserById = async () => {
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
  useEffect(() => {
    _getUserById(1);
  }, [page]);

  // useEffect(() => {
  //   const handleScroll = async () => {
  //     const isAtBottom =
  //       window.innerHeight + window.scrollY >= document.body.offsetHeight - 1;

  //     if (isAtBottom && !loading && loadingRef.current && hasMore.current) {
  //       const nextPage = page + 1;
  //       setPage((prevState) => prevState + 1);
  //       _getUserById(nextPage);
  //     }
  //   };

  //   window.addEventListener("scroll", handleScroll);

  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, [page, loadingRef]);

  useEffect(() => {
    const handleScroll = () => {
      console.log("ffffscrol");
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 10
      ) {
        if (page <= totalPages) {
          const nextPage = page + 1;
          setPage((prevPage) => prevPage + 1);
          _getUserById(nextPage);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [page]);

  useEffect(() => {
    const _deletePost = async () => {
      setNotification(null);
      try {
        const response = await deletePost(
          localStorage.getItem("token"),
          postId
        );
        const newPosts = postsList.filter((item) => item._id !== postId);
        setPostsList(newPosts);
        setNotification({ type: "success", message: response.data.message });
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

    postId && _deletePost();
  }, [postId]);

  const dataInfo = {
    posts: [
      {
        _id: "67d9a83925cbdd122b11296b",
        user: {
          _id: "67d9a393df3aebc8f05f988d",
          name: "Soufian boukir",
          profile_picture: "/users/1742320140690-ronaldo.jpg",
          headLine: "Software devlooper",
        },
        content: "this content of post soufine",
        image: null,
        tags: [],
        likes: [],
        comments: [],
        mentions: [],
        createdAt: "2025-03-18T17:07:05.740Z",
        updatedAt: "2025-03-18T17:07:05.740Z",
        __v: 0,
      },
      {
        _id: "67d9a8392erbdd122b11296b",
        user: {
          _id: "67d9a393df3aebc8f05f988d",
          name: "Soufian boukir",
          profile_picture: "/users/1742320140690-ronaldo.jpg",
          headLine: "Software devlooper",
        },
        content: "this dis of post soufine",
        image: null,
        tags: [],
        likes: [],
        comments: [],
        mentions: [],
        createdAt: "2025-03-18T17:07:05.740Z",
        updatedAt: "2025-03-18T17:07:05.740Z",
        __v: 0,
      },
    ],
    followers: 300,
    following: 100,
    education: [
      {
        nameSchool: "Specialized Institute of Applied Technology Tiznit",
        date: "Sep 2023 - Jun 2025",
        degree: "Specialized technicien in digitale developement",
      },
      {
        nameSchool: "Argane heigh school",
        date: "Sep 2021 - Jun 2022",
        degree: "Phisics Sciences",
      },
    ],
    experience: [
      {
        namePost: "Backend developer",
        companyName: "Capegemeni",
        date: "2020-2021",
        location: "Casablanca, Morocco",
        description:
          "As a Backend Developer at [Company Name], I was responsible for designing, developing, and maintaining the server-side logic of web applications. My work focused on ensuring high-performance APIs and database interactions for seamless user experiences",
      },
      {
        namePost: "Server administrator",
        companyName: "Akodiis",
        date: "2023-2024",
        location: "Casablanca, Morocco",
        description:
          "As a Server Administrator at [Company Name], I was responsible for maintaining and securing the company's IT infrastructure. My role involved configuring, managing, and troubleshooting servers to ensure optimal performance and uptime. Key responsibilities included",
      },
    ],
    skills: ["React", "Laravel", "Tailwind", "Express", "Nodejs", "Mongodb"],

    content: `Lorem ipsum dolor si amet consectetur adipisicing elit. Magni nostrum
            consequatur itaque nulla dignissimos non fugiat exercitationem dolor,
            alias mollitia quas vero iure aliquam consectetur excepturi deserunt
            maxime.`,
    suggestions: [
      { sugName: "Ayoub Mhainid", sugHead: "Devloper Front-end" },
      { sugName: "Soufiane Boukir", sugHead: "Devloper Back-End" },
    ],
  };
  console.log("state post", postsList);
  console.log("userInfopost", userInfo);
  console.log("userData", userData);
  return (
    <div>
      <div className={`w-full flex flex-col gap-y-2 lg:flex-row justify-start`}>
        <div className="w-full lg:w-[65%] pt-[55px] lg:pt-[80px] flex flex-col gap-y-2 lg:pb-4">
          {
            <ProfilInfoModal
              setShowModalUpdate={setShowUpdateModal}
              valuetoUpdate={setToUpdate}
              showIcon={showIcon}
              userData={userData._id === id ? userData : userInfo.userData}
            />
          }

          {userData._id === id ? (
            userData.about ? (
              <AboutModal
                valuetoUpdate={setToUpdate}
                setShowModalUpdate={setShowUpdateModal}
                showIcon={showIcon}
                content={
                  userData._id === id ? userData.about : userInfo.userData.about
                }
              />
            ) : (
              <IsEmptyModal
                setShowModalAdd={setShowAddModal}
                valuetoAdd={setToAdd}
                type="about"
              />
            )
          ) : (
            userInfo.about && (
              <AboutModal
                valuetoUpdate={setToUpdate}
                setShowModalUpdate={setShowUpdateModal}
                showIcon={showIcon}
                content={
                  userData._id === id ? userData.about : userInfo.userData.about
                }
              />
            )
          )}
          {
            <EducationsModal
              notification={setNotification}
              idEduSelected={setSelectedId}
              setShowModalUpdate={setShowUpdateModal}
              valuetoUpdate={setToUpdate}
              setShowModalAdd={setShowAddModal}
              valuetoAdd={setToAdd}
              showIcon={showIcon}
              educationList={
                userData._id === id
                  ? userData.education
                  : userInfo.userData.education
              }
            />
          }
          {
            <ExperiencesModal
              notification={setNotification}
              idEduSelected={setSelectedId}
              setShowModalUpdate={setShowUpdateModal}
              valuetoUpdate={setToUpdate}
              setShowModalAdd={setShowAddModal}
              valuetoAdd={setToAdd}
              showIcon={showIcon}
              experienceList={
                userData._id === id
                  ? userData.experience
                  : userInfo.userData.experience
              }
            />
          }
          {
            <SkillsModal
              notification={setNotification}
              setShowModalAdd={setShowAddModal}
              valuetoAdd={setToAdd}
              showIcon={showIcon}
              skillList={
                userData._id === id ? userData.skills : userInfo.userData.skills
              }
            />
          }
          {userData.interests && (
            <InterestsModal
              setShowModalUpdate={setShowUpdateModal}
              valuetoUpdate={setToUpdate}
              showIcon={showIcon}
              interestList={
                userData._id === id
                  ? userData.interests
                  : userInfo.userData.interests
              }
            />
          )}
          <div className="w-full lg:w-[89%] flex flex-col gap-2 lg:ml-[15%]">
            {loading && <PostSkeleton />}
            {postsList && !loading && postsList.length
              ? postsList.map((post) => {
                  return (
                    <Post
                      post={post}
                      showIcon={showIcon}
                      postSelected={setPostId}
                    />
                  );
                })
              : null}
            {!loading && postsList.length === 0 && (
              <span className="text-xl font-semibold">
                Try to post new posts on diff accounts
              </span>
            )}
          </div>
        </div>
        <div className="lg:w-[20%] flex flex-col gap-2 lg:pt-[80px] lg:ml-[4%]">
          {<UrlProfilModal />}
          {<SuggestionsModal suggestionList={dataInfo.suggestions} />}
        </div>
        {showUpdateModal && (
          <UpdateModal
            toUpdate={toUpdate}
            idSelected={selectedId}
            setOpen={setShowUpdateModal}
          />
        )}
        {showAddModal && <AddModal toAdd={toAdd} setOpen={setShowAddModal} />}
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
