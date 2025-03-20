import { Skeleton } from "@mui/material";
import React from "react";

const suggLength = [1, 2, 3, 4, 5];
export const SuggesstionsSkeleton = () => {
  return (
    <div className="flex flex-col gap-1 mt-4 mx-4">
      {suggLength.map(() => {
        return (
          <div className="flex w-full items-center gap-3">
            <div>
              <Skeleton
                animation="wave"
                variant="circular"
                width={70}
                height={70}
              />
            </div>
            <div className="w-full gap-1">
              <Skeleton animation="wave" height={20} width="80%" />
              <Skeleton animation="wave" height={16} width="70%" />
            </div>
          </div>
        );
      })}
    </div>
  );
};
