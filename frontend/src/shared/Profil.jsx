import profilImg from "../../public/images/said-kachoud.jpg";
import { ProfilInfoModal } from "../components/App/ProfilInfoModal";
import { AboutModal } from "../components/App/AboutModal";
import { EducationsModal } from "../components/App/EducationsModal";
import { ExperiencesModal } from "../components/App/ExperiencesModal";
import { SkillsModal } from "../components/App/SkillsModal";
import { InterestsModal } from "../components/App/InterestsModal";
import { UrlProfilModal } from "../components/App/UrlProfilModal";
import { SuggestionsModal } from "../components/App/SuggestionsModal";
import { AppSelector } from "../selectors/AppSelector";
import { useParams } from "react-router-dom";

export const Profil = () => {
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
      { nameSchool: "Ofppt tiznit tscttp", date: "2020-2021" },
      { nameSchool: "Ofppt tiznit tsccttp", date: "2023-2024" },
    ],
    experience: [
      { namePost: "devloper backend", date: "2020-2021" },
      { namePost: "devloper front end", date: "2023-2024" },
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
  console.log("this id user ", userData);
  console.log("this is result", showIcon);

  return (
    <div>
      <div className="w-full pt-[55px] lg:pt-[80px] flex flex-col gap-y-2 pb-[55px] lg:pb-4">
        <ProfilInfoModal showIcon={showIcon} userData={userData} />
        {
          // userData.content &&
          <AboutModal
            showIcon={showIcon}
            content={userData.content ? userData.content : dataInfo.content}
          />
        }
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
        {<UrlProfilModal showIcon={showIcon} />}
        {<SuggestionsModal suggestionList={dataInfo.suggestions} />}
      </div>
    </div>
  );
};
