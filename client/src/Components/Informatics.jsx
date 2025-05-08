import React from "react";

export const Informatics = (props) => {
  return (
    <div>
      <div className="bg-[#032d03] rounded-2xl h-[150px] text-center p-2 font-black flex items-center justify-center flex-col">
        <img className="h-[80px] w-[80px]" src={props.img} />
        <h1>{props.info}</h1>
        <h2 className="text-[12px] font-normal">{props.label}</h2>
      </div>
    </div>
  );
};
