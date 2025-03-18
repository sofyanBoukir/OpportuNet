import React from "react";
import { SuggestionsModal } from "../components/App/Suggestions";
import { ProfileStatus } from "../components/App/ProfileStatus";
import { NotificationApp } from "../components/App/NotificationApp";



const authService = import.meta.env.VITE_SERVER_URL;

export const Notification = () => {
  const suggestions = [
    { sugName: "Ayoub Mhainid", sugHead: "UI/UX designer" },
    { sugName: "Soufiane Boukir", sugHead: "Go developer" },
    { sugName: "Said kachoud", sugHead: "PHP developer" },
  ];
  
  return (
    <div className="md:px-[10%] px-3 relative top-16">
      <div className="flex justify-center gap-[1%]">
        <ProfileStatus />
        <div className="flex flex-col gap-2 w-[100%] lg:w-[43%] h-max left-[13%] lg:relative bg-white rounded-2xl ">
          <NotificationApp />
          <NotificationApp />
          <NotificationApp />

          
        </div>

        <div className="hidden sticky  lg:block left-[13%] lg:relative lg:w-[25%]">
          <div className="sticky top-16">
            <SuggestionsModal suggestionList={suggestions} />
          </div>
        </div>
      </div>
    </div>
  );
};
