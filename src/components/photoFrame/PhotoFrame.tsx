import React from "react";
import { Spinner } from "../spinner";

export const PhotoFrame = (): JSX.Element => {
  return (
    <div className="flex justify-center items-center border-gray-500 border h-screen">
      <div className="ring-4 w-1/2 rounded-t-lg flex justify-center items-center h-3/5">
        <Spinner />
      </div>
    </div>
  );
};
