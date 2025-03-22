import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import { MenuItem } from "@mui/material";
import { EllipsisHorizontalIcon, TrashIcon } from "@heroicons/react/24/outline";
import moment from "moment";
const serverUrl = import.meta.env.VITE_SERVER_URL;
import defaultImage from '../../../public/images/educationImage.png'
import { useNavigate } from "react-router-dom";
export const NotificationApp = ({notification,deleteNotification,close}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  

  useEffect(() => {
    close && handleClose()
  },[close])
  const navigate = useNavigate();
  return (
    <div>
      <div className={`p-4 flex justify-between cursor-pointer ${notification.status === 'delivred' ? 'bg-blue-100 hover:bg-blue-200 duration-200' : 'hover:bg-gray-100 duration-200'}`}
       onClick={() => notification.message === 'Started following you'? navigate(`/user/profile/${notification?.from_user?._id}`) : navigate(`/post/${notification?.post?._id}`)}>
        <div className="flex gap-2">
          {
            notification.message === 'Mentioned you in a post' ?
            <img
              src={notification?.post?.image ? serverUrl + notification?.post?.image : defaultImage}
              className="rounded-md w-12 h-12"
            />
            :
            <img
              src={serverUrl+notification?.from_user?.profile_picture}
              className="rounded-full w-12 h-12"
            />
          }
          <div>
            <h2 className="text-lg"><span className="font-semibold text-xl cursor-pointer hover:text-blue-800 duration-75" onClick={(e) =>{
              e.stopPropagation();
              navigate(`/user/profile/${notification.from_user?._id}`)
            }}>{notification?.from_user?.name}</span> {notification.message}</h2>
            <h2 className="text-sm">{moment(notification.createdAt).fromNow()}</h2>
          </div>
        </div>
        <div>
          <Button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={(e) => {
              e.stopPropagation();
              handleClick(e);
            }}
          >
            <EllipsisHorizontalIcon className="text-black w-10" strokeWidth={'1'}/>
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleClose}>
              <div className="flex flex-row items-center gap-2" onClick={(e) => {e.stopPropagation();
                deleteNotification(notification._id)
              }}>
                <TrashIcon className="text-black w-6 h-6" strokeWidth={1.2} />
                <h1>delete</h1>
              </div>
            </MenuItem>
          </Menu>
        </div>
      </div>
      <hr className="text-gray-300"></hr>
    </div>
  );
};
