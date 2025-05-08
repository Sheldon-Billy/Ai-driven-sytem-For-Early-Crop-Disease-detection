import React from "react";
import { Link } from "react-router-dom";
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
  const [isSubscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    if (email) {
      setSubscribed(!isSubscribed);
    }
  };

  return (
    <div className="bg-[#001800] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-8">
          {/* Logo Section */}
          <div className="flex flex-col items-center md:items-start">
            <h1 className="text-[#05ff05] font-bold text-lg md:text-xl lg:text-[20px] mb-2">
              Agri-Ai
            </h1>
            <p className="text-[#02a5c9] text-sm md:text-base text-center md:text-left">
              Ai-Driven crop disease detection & prevention for smarter farming.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center md:items-start">
            <h1 className="text-[#05ff05] font-bold text-lg md:text-xl lg:text-[20px] mb-2">
              Quick links
            </h1>
            <ul className="text-[#02a5c9] space-y-1 text-sm md:text-base">
              <li>
                <Link
                  className="hover:text-white hover:underline transition-colors"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-white hover:underline transition-colors"
                  to="/about"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-white hover:underline transition-colors"
                  to="/contact"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-white hover:underline transition-colors"
                  to="/predict"
                >
                  Predict
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="flex flex-col items-center md:items-start">
            <h1 className="text-[#05ff05] font-bold text-lg md:text-xl lg:text-[20px] mb-2">
              Support
            </h1>
            <ul className="text-[#02a5c9] space-y-1 text-sm md:text-base">
              <li>
                <Link
                  className="hover:text-white hover:underline transition-colors"
                  to="/faqs"
                >
                  FAQs
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-white hover:underline transition-colors"
                  to="/help-center"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-white hover:underline transition-colors"
                  to="/contact"
                >
                  Email Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="flex flex-col items-center md:items-start">
            <h1 className="text-[#05ff05] font-bold text-lg md:text-xl lg:text-[20px] mb-2">
              Stay Connected
            </h1>
            <div className="w-full max-w-xs">
              <input
                className="w-full rounded-md px-4 py-2 text-black text-sm mb-2 focus:outline-none focus:ring-2 focus:ring-[#05ff05]"
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                className={`w-full rounded-md py-2 text-sm font-medium transition-all duration-300 ${
                  isSubscribed
                    ? "bg-white text-green-700"
                    : "bg-gray-400 hover:bg-gray-300 text-black"
                }`}
                onClick={handleSubscribe}
              >
                {isSubscribed ? "Subscribed ✅" : "Subscribe"}
              </button>
            </div>
          </div>
        </div>

        {/* Social Media Icons */}
        <div className="flex flex-wrap justify-center gap-4 py-6 border-t border-gray-700">
          {[
            { icon: twitter, name: "Twitter" },
            { icon: google, name: "Google" },
            { icon: youtube, name: "YouTube" },
            { icon: discord, name: "Discord" },
            { icon: facebook, name: "Facebook" },
            { icon: github, name: "GitHub" },
            { icon: whatsapp, name: "WhatsApp" },
          ].map((social) => (
            <img
              key={social.name}
              src={social.icon}
              alt={social.name}
              className="h-8 w-8 sm:h-10 sm:w-10 object-contain hover:scale-110 transition-transform duration-300 cursor-pointer"
            />
          ))}
        </div>

        {/* Copyright */}
        <div className="py-4 text-center border-t border-gray-700">
          <p className="text-[#02a5c9] text-sm font-bold">
            &copy; {new Date().getFullYear()} AgriAI. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
