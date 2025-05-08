import React from "react";
import { NavLink } from "react-router-dom";
import { hscan } from "../assets";
const Hscan = () => {
  return (
    <div
      className="mx-[10px] h-[300px] text-white flex items-center justify-center flex-col rounded-b-[10px] bg-cover bg-no-repeat"
      style={{ backgroundImage: `url(${hscan})` }}
    >
      <div className="w-[900px] flex flex-col items-center justify-center backdrop-blur-[30px] rounded-2xl ">
        <h1 className="font-bold font-[Times] text-[30px] text-[#120079]">
          Ready to protect your crops?
        </h1>
        <NavLink to="/predict">
          <button className="bg-gradient-to-br from-[#00a800] to-[#002b00] p-2 rounded-2xl w-32 hover:bg-green-700 transition-[1s] hover:transform-[rotate(1deg)_scale(1.1)] ">
            Scan Now
          </button>
        </NavLink>
        s
        <p className="text-center mx-[100px] text-[16px] font-serif font-bold text-[#000000]">
          🎯 Join thousands of farmers revolutionizing agriculture with our
          AI-driven crop disease detection and prevention system. Detect plant
          diseases early, receive real-time insights, and take proactive
          measures to protect your crops. Our intelligent system ensures
          healthier yields, reduces pesticide use, and promotes sustainable
          farming. Get started today and secure your farm’s future with
          cutting-edge AI technology! 🌱
        </p>
      </div>
    </div>
  );
};

export default Hscan;
