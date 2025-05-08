import React from "react";

export const Cards = (props) => {
  return (
    <div className="bg-transparent p-2 sm:p-3 md:p-4 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="text-[#2a9f30] mt-2 sm:mt-3 md:mt-4 text-center">
        <div className="overflow-hidden rounded-[10px]">
          <img
            className="h-auto w-full object-cover max-h-40 sm:max-h-48 md:max-h-60 hover:scale-105 transition-transform duration-300"
            src={props.image}
            alt={props.labelee}
            loading="lazy"
          />
        </div>
        <h1 className="font-bold font-sans text-base sm:text-lg md:text-xl lg:text-[20px] text-white mt-2 sm:mt-3 px-1">
          {props.labelee}
        </h1>
        <h2 className="text-sm sm:text-base text-[#1dc423] mt-1 sm:mt-2 px-1 sm:px-2">
          {props.description}
        </h2>
      </div>
    </div>
  );
};
