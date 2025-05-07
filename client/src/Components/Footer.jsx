import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import {
  discord,
  facebook,
  github,
  google,
  telegram,
  tiktok,
  twitter,
  whatsapp,
  youtube,
} from "../assets";

const Footer = () => {
  const [Issubscribed, setSubscribed] = useState(false);
  const toggle = () => {
    setSubscribed(!Issubscribed);
  };

  return (
    <div className="bg-[#001800]">
      <div className="text-white h-[13rem]  grid grid-cols-4 mx-[200px]">
        <div className="text-white my-5 mx-5 flex flex-col justify-center items-center">
          <h1 className="text-[#05ff05] font-bold text-[20px]">Agri-Ai</h1>
          <p className="text-[#02a5c9]">
            Ai-Driven crop disease detection & prevention for smarter farming.
          </p>
        </div>

        <div className="text-white my-5 mx-5 flex flex-col justify-center items-center">
          <h1 className="text-[#05ff05] font-bold text-[20px]">Quick links</h1>
          <ul className="text-[#02a5c9]">
            <Link className="hover:text-white hover:underline" to="/">
              Home
            </Link>
            <Link className="hover:text-white hover:underline" to="/about">
              <li>About</li>
            </Link>
            <Link className="hover:text-white hover:underline" to="/contact">
              <li>Contact</li>
            </Link>
            <Link className="hover:text-white hover:underline" to="/predict">
              {" "}
              <li>Predict</li>
            </Link>
          </ul>
        </div>

        <div className="text-white my-5 mx-5 flex flex-col justify-center items-center">
          <h1 className="text-[#05ff05] font-bold text-[20px]">Support</h1>
          <ul className="text-[#02a5c9]">
            <Link className="hover:text-white hover:underline" to="/">
              FAQs
            </Link>
            <Link className="hover:text-white hover:underline" to="/about">
              <li>Help Center</li>
            </Link>
            <Link className="hover:text-white hover:underline" to="/contact">
              <li>Email Us</li>
            </Link>
          </ul>
        </div>

        <div className="text-white my-5 mx-5 flex flex-col justify-center items-center">
          <h1 className="text-[#05ff05] font-bold text-[20px]">
            Stay Connected
          </h1>

          <input
            className="border-1 w-auto rounded-[5px] text-center my-5"
            type="email"
            placeholder="Enter Email "
          />
          <button
            className="bg-[#a09c9c] text-black w-[100px] rounded-[10px] p-[3px]"
            onClick={toggle}
            style={{
              backgroundColor: Issubscribed ? "white" : "gray",
            }}
          >
            {Issubscribed ? "Subscribed✅ " : "Subscribe"}
          </button>
        </div>
      </div>
      <div className="bg-[#001800] flex gap-2 items-center justify-center">
        <img
          className="h-[40px] w-[40px] bg-white rounded-4xl hover:transform-stroke hover:transform-[scale(1.1)] transition-[2s]"
          src={twitter}
        />
        <img
          className="h-[40px] w-[40px] hover:transform-stroke hover:transform-[scale(1.1)] transition-[2s]"
          src={google}
        />
        <img
          className="h-[40px] w-[40px] hover:transform-stroke hover:transform-[scale(1.1)] transition-[2s]"
          src={youtube}
        />
        <img
          className="h-[40px] w-[50px] hover:transform-stroke hover:transform-[scale(1.1)] transition-[2s]"
          src={discord}
        />
        <img
          className="h-[40px] w-[40px] hover:transform-stroke hover:transform-[scale(1.1)] transition-[2s]"
          src={facebook}
        />
        <img
          className="h-[40px] w-[40px] bg-white rounded-4xl hover:transform-stroke hover:transform-[scale(1.1)] transition-[2s]"
          src={github}
        />
        <img
          className="h-[40px] w-[40px] hover:transform-stroke hover:transform-[scale(1.1)] transition-[2s]"
          src={whatsapp}
        />
      </div>

      <div className="text-center font-bold text-[#02a5c9] border-t border-white bg-[#001800]">
        &copy; {new Date().getFullYear()}
        <h1>AgriAI. All rights reserved.</h1>
      </div>
    </div>
  );
};

export default Footer;
