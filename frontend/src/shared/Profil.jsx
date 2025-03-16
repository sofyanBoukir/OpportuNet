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
import { useState } from "react";
import { Post } from "../components/App/Post";

export const Profil = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [toUpdate, setToUpdate] = useState("");
  const { id } = useParams();
  const { userData } = AppSelector();
  const dataInfo = {
    name: "Said kachoud",
    headLine: "Full stack devloper",
    address: "Tiznit, Souss-Massa, Morocco",
    github: "https://github.com/saidKachoud",
    profile_picture: profilImg,
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
    interests: ["microsoft", "apple", "google", "meta"],
    content: `Lorem ipsum dolor si amet consectetur adipisicing elit. Magni nostrum
            consequatur itaque nulla dignissimos non fugiat exercitationem dolor,
            alias mollitia quas vero iure aliquam consectetur excepturi deserunt
            maxime.`,
    suggestions: [
      { sugName: "Ayoub Mhainid", sugHead: "Devloper Front-end" },
      { sugName: "Soufiane Boukir", sugHead: "Devloper Back-End" },
    ],
  };

  const showIcon = userData._id === id;
  const recuiterData = {
    name: userData.name,
    headeLine: userData.headeLine,
    companyName: userData.companyName,
    location: userData.location,
    webSite: userData.webSit,
  };
  const candidateData = {
    name: userData.name,
    headeLine: userData.headeLine,
    location: userData.location,
    webSite: userData.webSit,
  };
  console.log("object", userData);

  return (
    <div>
      <div className={`w-full flex flex-col gap-y-2 lg:flex-row justify-start`}>
        <div className="w-full lg:w-[65%] pt-[55px] lg:pt-[80px] flex flex-col gap-y-2 lg:pb-4">
          {
            <ProfilInfoModal
              setShowModal={setShowAddModal}
              valuetoUpdate={setToUpdate}
              showIcon={showIcon}
              userData={userData}
            />
          }

          {<AboutModal showIcon={showIcon} content={dataInfo.content} />}
          {
            // userData.education &&
            <EducationsModal
              showIcon={showIcon}
              educationList={
                userData.education.length
                  ? userData.education
                  : dataInfo.education
              }
            />
          }
          {
            // userData.experience &&
            <ExperiencesModal
              showIcon={showIcon}
              experienceList={
                userData.experience.length
                  ? userData.experience
                  : dataInfo.experience
              }
            />
          }
          {
            // userData.skills &&
            <SkillsModal
              showIcon={showIcon}
              skillList={
                userData.skills.length ? userData.skills : dataInfo.skills
              }
            />
          }
          {userData.interests && (
            <InterestsModal
              showIcon={showIcon}
              interestList={userData.interests}
            />
          )}
          <div className="w-full lg:w-[89%] flex flex-col gap-2 lg:ml-[15%]">
            <Post />
            <Post />
            <Post />
          </div>
        </div>
        <div className="lg:w-[20%] flex flex-col gap-2 lg:pt-[80px] lg:ml-[4%]">
          {<UrlProfilModal />}
          {<SuggestionsModal suggestionList={dataInfo.suggestions} />}
        </div>
        {showAddModal && (
          <UpdateModal
            toUpdate={toUpdate}
            userInfobeforUpdate={
              userData.role === "candidate" ? candidateData : recuiterData
            }
            setOpen={setShowAddModal}
          />
        )}
      </div>
    </div>
  );
};
