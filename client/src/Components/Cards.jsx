import React from "react";

export const Cards = (props) => {
  return (
    <>
      <div className="bg-transparent p-4 rounded-xl shadow-lg">
        <div className="text-[#2a9f30] mt-4 text-center">
          <img
            className="h-auto w-auto max-h-60 max-w-full rounded-[10px] hover:scale-110 transition-transform duration-500"
            src={props.image}
            alt={props.labelee}
          />
          <h1 className="font-bold font-sans text-[20px] text-[#ffffff] mt-2">
            {props.labelee}
          </h1>
          <h2 className="text-[16px] text-[#1dc423] mt-1">
            {props.description}
          </h2>
        </div>
      </div>
    </>
  );
};
