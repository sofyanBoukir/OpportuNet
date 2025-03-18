import React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import { MenuItem } from "@mui/material";
import { EllipsisHorizontalIcon, TrashIcon } from "@heroicons/react/24/outline";

export const NotificationApp = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className="w-[100%] flex flex-col">
        <div className="flex flex-row items-center px-3 py-3 bg-blue-100">
        <div className="flex gap-2 items-center">
            <img
              src="../../public/images/profilDefault.png"
              className="rounded-full w-[15%]"
            />
          <div>
            <h2 className="text-lg"><span className="font-semibold cursor-pointer">Jhon doe</span> started following you. <span className="text-sm font-semibold underline cursor-pointer">view more</span></h2>
            <h2 className="text-sm">12 hours ago</h2>
          </div>
        </div>
      <div>
        <div>
          <Button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
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
              <div className="flex flex-row items-center gap-2">
                <TrashIcon className="text-black w-6 h-6" strokeWidth={1.2} />
                <h1>delete</h1>
              </div>
            </MenuItem>
          </Menu>
        </div>
      </div>
        </div>
        <div className="px-2">
            <hr className="text-gray-300"/>
        </div>
      
      
    </div>
  );
};
