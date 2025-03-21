import { Skeleton } from "@mui/material";
import React from "react";

export const SavedPostSkeleton = () => {
  return (
    <div>
      <div className="flex w-full items-center gap-3 px-1 py-1">
        <div>
          <Skeleton
            animation="wave"
            variant="circular"
            width={60}
            height={60}
          />
        </div>
        <div className="w-full gap-1">
          <Skeleton animation="wave" height={16} width="40%" />
          <Skeleton animation="wave" height={11} width="30%" />
        </div>
      </div>
      <div className="flex flex-row items-start gap-4 p-4 w-[100%]">
      <Skeleton
        variant="rectangular"
        width={200}
        height={100}
        animation="wave"
        className="rounded-md"
      />

      <div className="flex flex-col gap-2 mt-2 w-[70%]">
        <Skeleton animation="wave" height={10} width='100%' />
        <Skeleton animation="wave" height={10} width='80%' />
        <Skeleton animation="wave" height={10} width='60%' />
      </div>
    </div>

      <div className="flex justify-between mt-2">
        <Skeleton animation="wave" height={15} width="20%" />
        <Skeleton animation="wave" height={15} width="20%" />
      </div>
    </div>
  );
};
