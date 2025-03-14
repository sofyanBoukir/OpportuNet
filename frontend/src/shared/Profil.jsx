import { data } from "react-router-dom";
import profilImg from "../../public/images/said-kachoud.jpg";
import { AboutModal } from "../components/modals/AboutModal";
import { EducationsModal } from "../components/modals/EducationsModal";
import { ProfilInfoModal } from "../components/modals/ProfilInfoModal";
import { ExperiencesModal } from "../components/modals/ExperiencesModal";
import { SkillsModal } from "../components/modals/SkillsModal";
import { InterestsModal } from "../components/modals/InterestsModal";
import { SuggestionsModal } from "../components/modals/SuggestionsModal";
import { UrlProfilModal } from "../components/modals/UrlProfilModal";

export const Profil = () => {
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

  return (
    <div>
      <div className="w-full fixed bg-[#F4F2EE] h-screen"></div>
      <div className="h-[100px] w-full 2xl:w-[80%] relative top-[50px] 2xl:left-[10%]">
        <ProfilInfoModal dataInfo={dataInfo} />
        {dataInfo.content && <AboutModal content={dataInfo.content} />}
        {dataInfo.education && (
          <EducationsModal educationList={dataInfo.education} />
        )}
        {dataInfo.experience && (
          <ExperiencesModal experienceList={dataInfo.experience} />
        )}
        {dataInfo.skills && <SkillsModal skillList={dataInfo.skills} />}
        {dataInfo.interests && (
          <InterestsModal interestList={dataInfo.interests} />
        )}
        {<SuggestionsModal suggestionList={dataInfo.suggestions} />}
        {<UrlProfilModal />}
      </div>
    </div>
  );
};
