import React from "react";

const Shimmer = () => {
  return (
    <div className="shimmer-container flex flex-wrap mx-auto max-w-[80%]">
      <div className="shimmer-card rounded-lg bg-gray-200 w-[15rem] h-[10rem] pr-8 pl-4 pb-6 m-4"></div>
      <div className="shimmer-card rounded-lg bg-gray-200 w-[15rem] h-[10rem] pr-8 pl-4 pb-6 m-4"></div>
      <div className="shimmer-card rounded-lg bg-gray-200 w-[15rem] h-[10rem] pr-8 pl-4 pb-6 m-4"></div>
      <div className="shimmer-card rounded-lg bg-gray-200 w-[15rem] h-[10rem] pr-8 pl-4 pb-6 m-4"></div>
    </div>
  );
};

export default Shimmer;
