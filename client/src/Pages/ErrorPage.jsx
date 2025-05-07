import React from "react";
import { NavLink } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="flex bg-[#004300] h-[100vh] text-white font-extrabold font-[Times] text-[40px] items-center justify-center">
      <div className="border-1 p-5 rounded-[10px]  flex items-center justify-center flex-col w-[45rem]">
        <h1>404 | Page not found </h1>
        <h1>☹️</h1>
        <h3 className="text-[15px]">
          Pkease check your internet and reload,
          <br /> or enter the correct route
        </h3>
        <NavLink to="/">
          <button className="bg-green-600 p-2 text-[15px] rounded-2xl hover:scale-[1.1] hover:bg-blue-500 transition-[0.2s] ">
            Back Home
          </button>
        </NavLink>
      </div>
    </div>
  );
};

export default ErrorPage;
