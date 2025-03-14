import React from "react";
import { SuggestionModal } from "./SuggestionModal";

export const SuggestionsModal = ({ suggestionList }) => {
  return (
    <div className="p-[10px] bg-white w-full 2xl:w-[20%] h-auto 2xl:rounded-lg absolute 2xl:fixed top-[1460px] md:top-[1477px] 2xl:top-[155px] left-0 2xl:left-[65%] z-10">
      {suggestionList.map((item) => (
        <SuggestionModal key={item.sugName} suggestion={item} />
      ))}
    </div>
  );
};
