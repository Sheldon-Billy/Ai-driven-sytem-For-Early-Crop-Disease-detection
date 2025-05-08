import React, { useContext } from "react";
import { Cards } from "../Components/Cards";
import {
  ai,
  digit,
  background1,
  cardcomp1,
  cardcomp2,
  insight,
  knowmore,
  leaf,
  mobile,
  smartleaf,
  clearmaize,
  maizewoman,
} from "../assets";
import { Informatics } from "../Components/Informatics";
import Hscan from "../Components/Hscan";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const TypingEffect = ({
    text,
    speed = 100,
    delay = 2000,
    backspaceSpeed = 50,
  }) => {
    const [displayedText, setDisplayedText] = useState("");
    const [index, setIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
      if (!isDeleting && index < text.length) {
        // Typing effect
        const timeout = setTimeout(() => {
          setDisplayedText((prev) => prev + text[index]);
          setIndex(index + 1);
        }, speed);
        return () => clearTimeout(timeout);
      } else if (!isDeleting && index === text.length) {
        // Pause before backspacing
        setTimeout(() => setIsDeleting(true), delay);
      } else if (isDeleting && index > 0) {
        // Backspacing effect
        const timeout = setTimeout(() => {
          setDisplayedText((prev) => prev.slice(0, -1));
          setIndex(index - 1);
        }, backspaceSpeed);
        return () => clearTimeout(timeout);
      } else if (isDeleting && index === 0) {
        // Reset after backspacing completes
        setIsDeleting(false);
      }
    }, [index, isDeleting, text, speed, delay, backspaceSpeed]);

    return (
      <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-[#00b300] text-transparent bg-clip-text">
        {displayedText}
        <span className="animate-blink">|</span>
      </h1>
    );
  };

  const information = [
    {
      img: leaf,
      info: "Eco-Friendly Solutions",
      label: "Reduce pesticide use with Ai-Driven disease prediction",
    },
    {
      img: ai,
      info: "Ai-Powered Detection",
      label: "Identify crop disease instantly using machine learning",
    },
    {
      img: insight,
      info: "Smart Insights",
      label: "Get actionble data to improve your farming decisions",
    },
    {
      img: mobile,
      info: "Mobile-Friendly access",
      label: "Access disease detection tools anytime and anywhere you are",
    },
  ];

  const cards = [
    {
      i: background1,
      l: "Smart Farmer Support & Advisory",
      d: "🔹Empowering the potentials of the farmers and encourage them to improve their workforce adaptability🔹 Community & Knowledge Sharing.",
    },
    {
      i: cardcomp1,
      l: "Prevention & Treatment Suggestions",
      d: "🔹 AI-powered Treatment Recommendations – Suggests organic, chemical, or biological treatments.",
    },
    {
      i: cardcomp2,
      l: "Real-time Monitoring & Alerts",
      d: "🔹 Continuous Crop Health Monitoring – Uses drone/satellite imagery or IoT sensors to track plant health.",
    },
    {
      i: digit,
      l: "Data Collection & Research Support",
      d: "🔹 Disease Trend Analysis – Tracks disease patterns across different regions.🔹 Government & Research Collaboration – Shares insights with agricultural research institutions.",
    },
    {
      i: digit,
      l: "Sustainable Farming Practices",
      d: "🔹 Promotes eco-friendly farming techniques to reduce environmental impact.🔹 Encourages crop rotation and organic farming.",
    },
    {
      i: smartleaf,
      l: "AI-Driven Yield Optimization",
      d: "🔹 Uses predictive analytics to forecast crop yields.🔹 Provides actionable insights to maximize productivity.",
    },
    {
      i: clearmaize,
      l: "Weather-Based Insights",
      d: "🔹 Offers real-time weather updates and forecasts.🔹 Helps farmers plan irrigation and harvesting schedules effectively.",
    },
    {
      i: maizewoman,
      l: "Remote Farm Management",
      d: "🔹 Enables farmers to monitor and manage their farms remotely.🔹 Provides access to tools and data on mobile devices.",
    },
  ];
  return (
    <>
      <div className="rounded-b-[10px] p-2 mx-[10px] flex flex-col items-center justify-center bg-[url('src/assets/greenlinesbg.jpg')] bg-cover ">
        <h1 className="font-[Times] font-bold text-[40px] bg-gradient-to-r from-[#00b300] via-[white] to-[#00b300] text-transparent bg-clip-text  ">
          Ai-Driven Crop Disease Detection & Prevention
        </h1>
        <div className="text-white font-[Times] text-[17px] font-extrabold">
          <TypingEffect
            text="Empowering Famers with real insights for higher helthier crops &
          sustainable farming"
          />
        </div>

        <div className="flex gap-[10px] mt-2">
          <Link
            to="/predict"
            className="bg-green-700 rounded-[5px] p-1.5 text-white hover:bg-orange-500 transition-[ease_2s] hover:transform-[scale(1.1)]"
          >
            Get Started
          </Link>
          <button className="bg-[green] rounded-[5px] p-1.5 text-white hover:bg-orange-500 transition-[ease_2s] hover:transform-[scale(1.1)]">
            Learn More
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 text-white my-[10px] mx-[40px]">
        {information.map(({ img, label, info }, i) => {
          return <Informatics key={i} img={img} label={label} info={info} />;
        })}
      </div>

      <div>
        <Hscan />
      </div>

      <div className="flex gap-4 items-center justify-center mt-4 text-white">
        <h2 className="bg-[#163300] p-2 rounded-2xl  hover:bg-blue-500 transition-all">
          Get to know more
        </h2>
      </div>

      <div className="bg-gradient-to-br from-[#003100] via-[#049404] to-[#002800] grid grid-cols-4 gap-2  text-white my-[10px] mx-[10px]">
        {cards.map(({ i, l, d }, index) => {
          return <Cards key={index} image={i} labelee={l} description={d} />;
        })}
      </div>
    </>
  );
};

export default Home;
