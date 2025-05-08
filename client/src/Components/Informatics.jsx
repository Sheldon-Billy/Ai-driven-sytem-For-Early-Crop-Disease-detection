import React from "react";

export const Informatics = (props) => {
  return (
    <div className="bg-[#032d03] rounded-2xl h-[120px] sm:h-[140px] md:h-[150px] lg:h-[160px] text-center p-2 sm:p-3 font-black flex items-center justify-center flex-col hover:bg-[#054005] transition-colors duration-300">
      <div className="flex flex-col items-center justify-center h-full">
        <img
          className="h-12 w-12 sm:h-16 sm:w-16 md:h-[70px] md:w-[70px] lg:h-[80px] lg:w-[80px] mb-1 sm:mb-2 object-contain"
          src={props.img}
          alt={props.info}
          loading="lazy"
        />
        <h1 className="text-xs sm:text-sm md:text-base lg:text-lg mb-0.5 sm:mb-1">
          {props.info}
        </h1>
        <h2 className="text-[10px] xs:text-[11px] sm:text-[12px] font-normal px-1">
          {props.label}
        </h2>
      </div>
    </div>
  );
};
