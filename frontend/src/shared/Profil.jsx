import profilImg from "../../public/images/said-kachoud.jpg";
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
import { useEffect, useState } from "react";
import { Post } from "../components/App/Post";
import { AddModal } from "../components/modals/AddModal";
import { IsEmptyModal } from "../components/App/IsEmptyModal";
import { getUserById } from "../services/profile";
import { ERROR_MESSAGES } from "../constants/Errors";

export const Profil = () => {
  const { userData } = AppSelector();
  const { id } = useParams();

  const [userInfo, setUserInfo] = useState({});
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [toUpdate, setToUpdate] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [toAdd, setToAdd] = useState("");
  const [notification, setNotification] = useState(null);

  const [selectedId, setSelectedId] = useState(null);

  const showIcon = userData._id === id;

  useEffect(() => {
    const getUser = async () => {
      setNotification(null);
      try {
        // const response = await getUserById(localStorage.getItem("token"), id);
        const response = await getUserById(localStorage.getItem("token"));
        setUserInfo(response.data);
        console.log("fff", response);
      } catch (error) {
        switch (error.response.status) {
          case 401:
            setNotification({
              type: "error",
              message: error.response.data.message,
            });
            break;
          case 500:
            error.response
              ? setNotification({
                  type: "error",
                  message: error.response.data.message,
                })
              : setNotification({
                  type: "error",
                  message: ERROR_MESSAGES.TRY_AGAIN,
                });
            break;
        }
      }
    };

    // userData._id !== id &&
    getUser();
  }, []);

  const dataInfo = {
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

  console.log("userIndo", userInfo);
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
            <Post post={userData.seenPosts} />
            {/* <Post />
            <Post /> */}
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
      </div>
      {notification && (
        <Notification type={notification.type} message={notification.message} />
      )}
    </div>
  );
};
