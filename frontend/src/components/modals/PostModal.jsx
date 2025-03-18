import React, { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Input } from "../UI/Input";
import { Label } from "../UI/Label";
import { Button } from "../UI/Button";

export const PostModal = ({setOpenModalPost}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const text =
    "There's a small issue in your class name usage. In JSX (React), class names should not start with a dot (.) inside the className attribute.";
  const toggleText = () => setIsExpanded(!isExpanded);

  return (
    <div className="fixed inset-0 z-20 flex items-center bg-black/50 justify-center h-screen text-gray-700 backdrop-blur-xs">
      <div className="bg-white md:w-[50%] px-1 py-6 rounded-lg shadow-xl flex flex-col max-h-[90vh] w-full">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">This is the modal header</h1>
          <div className="text-xl w-10 h-10 cursor-pointer rounded-full flex items-center justify-center hover:bg-gray-200 duration-200">
            <XMarkIcon className="w-8 h-8" onClick={() => setOpenModalPost(false)}/>
          </div>
        </div>
        <hr className="mt-5 text-gray-200"/>
        <div className="flex-1 overflow-auto">
          <div className="w-full px-4 py-4 flex items-center">
            <img src="/profil.jpg" className="w-12 h-12 rounded-full" alt="" />
            <div className="px-3">
              <h1 className="text-xl font-semibold">Ayoub Mhainid</h1>
              <h3 className="text-gray-400 font-semibold text-sm">
                Developer Full Stack
              </h3>
            </div>
          </div>

          <div className="text-gray-800 px-4 py-2 text-xl">
            {text.length > 20 ? (
              <>
                <span>{isExpanded ? text : text.slice(0, 20) + "..."}</span>
                <button onClick={toggleText} className="text-gray-500 ml-2 cursor-pointer underline text-sm">
                  {isExpanded ? "See Less" : "See More"}
                </button>
              </>
            ) : (
              <span>{text}</span>
            )}
          </div>

          <div className="w-full mt-1">
            <img src="/OnePiece.jpg" className="w-full" alt="" />
          </div>

          <div className="px-4 py-3 flex justify-between">
            <h1>100 Likes</h1>
            <h1>100 Comments</h1>
          </div>
          <hr className="w-[95%] py-1 text-gray-200 mx-auto" />

          <div className="px-4 py-2">
            <div className="flex flex-row items-start w-[100%] mt-2 gap-2">
                <div className="w-12 lg:w-12">
                  <img
                    src="/profil.jpg"
                    className="rounded-full border-2"
                    alt=""
                  />
                </div>
                <div className="w-auto rounded-tl-none bg-gray-200 rounded-2xl px-3 py-2">
                  <span className="text-xl font-semibold">Sofsin <span className="text-gray-500 text-sm">2 hours ago</span></span>
                  <p>One Piece follows Monkey D. Luffy, a pirate with a rubber body, as he searches for the legendary treasure, One Piece, to become the Pirate King."</p>
                </div>
            </div>

            <div className="flex flex-row items-start w-[100%] mt-2 gap-2">
              <div className="w-12 lg:w-12">
                <img
                  src="/profil.jpg"
                  className="rounded-full border-2"
                  alt=""
                />
              </div>
              <div className="w-auto rounded-tl-none bg-gray-200 rounded-2xl px-3 py-2">
              <span className="text-xl font-semibold">Sofsin <span className="text-gray-500 text-sm">2 hours ago</span></span>
              <p>One Piece follows Monkey D. Luffy, a pirate with a rubber body, as he searches for the legendary treasure, One Piece, to become the Pirate King."</p>
              </div>
            </div>

            
          </div>
        </div>

        <div className="sticky bottom-0 left-0 flex items-center w-full py-2 gap-2 bg-white">
          <img
            src="/profil.jpg"
            className="w-10 h-10 rounded-full border-2"
            alt=""
          />
          <Input
            type="text"
            name="comment"
            placeholder="Write a comment..."
            className="bg-gray-200 w-full py-4 px-2 rounded-2xl"
          />
          <Button text={'Comment'} className={'bg-blue-500 text-white'}/>
        </div>
      </div>
    </div>
  );
};
