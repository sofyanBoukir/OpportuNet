import coverProfil from "../../../public/images/coverProfil.png";
import ProfilImg from "../../../public/images/profilDefault.png";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import { Follow } from "../UI/Follow";
import { UserPlusIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { Follows } from "../modals/Follows";
import { Avatar, AvatarGroup } from "@mui/material";
import { Link } from "react-router-dom";
import { Button } from "../UI/Button";
import { startNewConversation } from "../../services/conversation";
import { ERROR_MESSAGES } from "../../constants/Errors";
import { Notification } from "../UI/Notification";

const serverURL = import.meta.env.VITE_SERVER_URL;

export const ProfilInfoModal = ({
  setShowModalUpdate,
  valuetoUpdate,
  showIcon,
  userData,
  multualFollowing,
}) => {
  const styleCover = {
    backgroundImage: `url(${coverProfil})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };  
  
  const [toView,setToView] = useState(null)
  const [loading,setLoading] = useState(false);
  const [notification,setNotification] = useState()

  const _startNewConversation = async () =>{
    setNotification(null)
    try{
      setLoading(true)
      const response = await startNewConversation(localStorage.getItem('token'),userData._id)
      setLoading(false)

      if(response.status === 200){
        setNotification({type:'success',message:response.data.message});
      }
    }catch(err){
      setLoading(false);
      if(err.response.data.message){
        setNotification({type:'error',message:err.response.data.message})
      }else{
        setNotification({type:'error',message:ERROR_MESSAGES.SOMETHING_WENT_WRONG})
      }
    }
  }


  return (
    <div className="bg-white w-full lg:w-[89%] pb-[1px] lg:ml-[15%] relative lg:rounded-md z-10">
      <div
        style={styleCover}
        className="w-full h-[120px] md:h-[160px] 2xl:h-[215px] lg:rounded-t-md"
      ></div>
      <div className="bg-white absolute top-18 md:top-[105px] 2xl:top-[100px] left-[5%] 2xl:left-[3%] h-[100px] 2xl:h-[155px] w-[100px] 2xl:w-[155px] rounded-[50%] p-[3px] cursor-pointer">
        <img
          src={userData.profilePictureUrl}
          alt="photo profil"
          className="w-[95px] h-[95px] 2xl:w-[150px] 2xl:h-[150px] rounded-[50%] object-cover"
        />
      </div>

      {showIcon && (
        <div
          onClick={() => {
            setShowModalUpdate(true);
            valuetoUpdate("intro");
          }}
          className="float-end mt-4 mr-5 p-1.5 duration-200 text-center pt-1 text-gray-600 cursor-pointer hover:bg-gray-100 hover:text-black rounded-[50%] "
        >
          <ModeEditOutlinedIcon strokeWidth="1" />
        </div>
      )}

      <div className="mt-[70px] ml-[30px]">
        <h1 className="font-semibold text-3xl">{userData.name}</h1>
        <span className="text-xl font-semibold">{userData.companyName}</span>
        <h6 className="font-normal text-xl text-gray-800">
          {userData.headLine}
        </h6>

        
        <div className="text-gray-600">{userData.location}</div>

        {
          !showIcon && (
            <div className="my-2 flex items-center">
              {multualFollowing.length ? <span>Followed by</span> :null}
              <div className="flex items-center ml-2">
                
                <AvatarGroup>
                  {
                    multualFollowing && multualFollowing.length ?
                      multualFollowing.slice(0,3).map((user) =>{
                        return <Avatar sx={{width:30, height:30}} alt="Remy Sharp" src={user.profilePictureUrl} />
                      })
                    :null
                  }
                  {
                    multualFollowing.length > 3 && <Avatar sx={{width:30, height:30, fontSize:"16px"}}>+{multualFollowing.length - 3}</Avatar>
                  }
                </AvatarGroup>
              </div>


              <div>
                {
                  multualFollowing && multualFollowing.length ?
                    multualFollowing.slice(0,3).map((user) =>{
                      return <Link className="font-semibold hover:text-blue-700 duration-200" to={`/user/profile/${user._id}`}>{user.name},</Link>
                    })
                  :null
                }
                {
                    multualFollowing.length > 3 && <span className="font-semibold cursor-pointer" onClick={() => setToView('MutualFollowing')}> and {multualFollowing.length - 3} more</span>
                }
              </div>
            </div>
          )
        }
        {
          toView === 'MutualFollowing' && <Follows toView={'Mutual following'} setToView={setToView} mutualFollowing={multualFollowing}/>
        }
        <a
          href={userData.webSite}
          className="font-semibold text-sm cursor-pointer text-[#0A66C2] hover:underline"
        >
          {userData.webSite}
        </a>
       
        <div className="flex gap-2 items-center">
          <div className="border-2 border-[#0A66C2] px-2 py-0.5 rounded-full mb-2 mt-3">
            <span className="text-[#0A66C2] font-semibold cursor-pointer" onClick={() => setToView('followers')}>
              {userData.followers ? userData.followers?.length : "0"} followers
            </span>
          </div>
          <div className="border-2 border-[#0A66C2] px-2 py-0.5 rounded-full mb-2 mt-3">
            <span className="text-[#0A66C2] font-semibold cursor-pointer" onClick={() => setToView('following')}>
              {userData.followers ? userData.following?.length : "0"} following
            </span>
          </div>
          {!showIcon && (
            <Follow
              userId={userData._id}
              className="bg-[#0A66C2] text-white w-[30%] sm:w-[15%] py-0.5 hover:bg-blue-900 px-7 rounded-full mb-2 mt-3"
            />
          )}
          {
            !showIcon && (
              <Button text={'👋 Send hi'} className="bg-blue-900 text-white rounded-full cursor-pointer h-[45px] mt-1 py-1 px-3 flex justify-center items-center font-semibold" onClick={_startNewConversation} /> 
            ) 
          }
          {
            toView && showIcon && <Follows toView={toView} setToView={setToView} />
          }
          {
            notification && <Notification type={notification.type} message={notification.message} />
          }
        </div>
      </div>
    </div>
  );
};
