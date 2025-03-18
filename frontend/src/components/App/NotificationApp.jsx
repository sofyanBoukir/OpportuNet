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
    <div className="w-[100%] flex  flex-col  ">
        <div className="flex flex-row text-center items-center justify-between px-3 py-6">
        <img
        src="../../public/images/profilDefault.png"
        className="rounded-full w-[15%]"
      />
      <h2 className="text-lg">John Doe has sent you a connection request.</h2>
      <div>
        <h2 className="text-gray-500">12h</h2>
        <div>
          <Button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <EllipsisHorizontalIcon className="text-black w-10" />
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
