import { useEffect, useState } from "react";
import { Follow } from "../UI/Follow";
import { SuggesstionsSkeleton } from "../skeletons/SuggesstionsSkeleton";
import { getSuggesstedUsers } from "../../services/home";
import { Link } from "react-router-dom";

export const SuggestionsModal = () => {
  const [loading, setLoading] = useState(true);
  const [suggesstedUsers,setSuggesstedUsers] = useState([])

  const _getSuggesstedUsers = async () =>{
    const response = await getSuggesstedUsers(localStorage.getItem('token'));
    
    if(response.status === 200){
      if(response.data.suggesstedUsers){
        setSuggesstedUsers(response.data.suggesstedUsers);
        setLoading(false);  
      }
    }
  }

  useEffect(() =>{
    _getSuggesstedUsers()
  },[])
  return (
    <div>
      {!loading && (
        <div className="p-3 bg-white dark:bg-black dark:text-white w-full lg:w-full lg:rounded-lg">
          <h1 className="text-xl font-semibold">People you may know</h1>
          <span className="text-gray-500">Based on your interests</span>
          { !loading && suggesstedUsers && suggesstedUsers.length ?
          suggesstedUsers.map((user,index) => {
            return <div
              key={user._id}
              className="p-2 w-full flex gap-2 items-center mt-2 relative border-b border-b-gray-300 dark:border-b-gray-800"
            >
              <div className="w-[25%]">
                <img
                  src={user.profilePictureUrl}
                  className="w-16 h-16 rounded-full m-auto object-cover"
                />
              </div>
              <div className="w-[80%]">
                <p><Link className="text-lg font-semibold hover:text-blue-500 duration-200" to={`/user/profile/${user._id}`}>{user.name}</Link></p>
                <span className="text-gray-900 dark:text-gray-100">{user.headLine}</span>
                <Follow
                  type={"text"}
                  userId={user._id}
                  className={
                    "hover:bg-gray-200 w-[50%] mt-1 h-7 duration-200 rounded-full dark:hover:bg-gray-950 font-semibold bg-gray-100 dark:bg-gray-900 border-2 dark:text-gray-300 text-gray-500"
                  }
                />
              </div>
            </div>
          }):null}
        </div>
      )}
      {loading && <SuggesstionsSkeleton />}
    </div>
  );
};
