import React from "react";
import { NavLink } from "react-router-dom";
import { hscan } from "../assets";

const Hscan = () => {
  return (
    <div
      className="mx-2 sm:mx-3 md:mx-[10px] h-[250px] sm:h-[300px] md:h-[350px] text-white flex items-center justify-center flex-col rounded-b-[10px] bg-cover bg-no-repeat "
      style={{ backgroundImage: `url(${hscan})` }}
    >
      <div className="w-full sm:w-[90%] md:w-[800px] lg:w-[900px] flex flex-col items-center justify-center backdrop-blur-sm sm:backdrop-blur-[15px] md:backdrop-blur-[30px] rounded-lg sm:rounded-xl md:rounded-2xl p-4 sm:p-6">
        <h1 className="font-bold font-serif text-xl sm:text-2xl md:text-3xl lg:text-[30px] text-[#120079] text-center mb-3 sm:mb-4">
          Ready to protect your crops?
        </h1>

        <NavLink to="/predict" className="mb-3 sm:mb-4">
          <button className="bg-gradient-to-br from-[#00a800] to-[#002b00] py-2 px-4 rounded-xl sm:rounded-2xl w-28 sm:w-32 hover:bg-green-700 transition-all duration-300 hover:scale-105 active:scale-95">
            Scan Now
          </button>
        </NavLink>

        <p className="text-center mx-2 sm:mx-6 md:mx-[60px] lg:mx-[100px] text-xs sm:text-sm md:text-[15px] lg:text-[16px] font-serif font-bold text-gray-800 sm:text-gray-900">
          🎯 Join thousands of farmers revolutionizing agriculture with our
          AI-driven crop disease detection and prevention system. Detect plant
          diseases early, receive real-time insights, and take proactive
          measures to protect your crops. Our intelligent system ensures
          healthier yields, reduces pesticide use, and promotes sustainable
          farming. Get started today and secure your farm's future with
          cutting-edge AI technology! 🌱
        </p>
      </div>
    </div>
  );
};

export default Hscan;
