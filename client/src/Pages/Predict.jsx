import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

const TypeWriter = ({ text, speed = 50, className = "" }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (text && currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed]);

  return (
    <span className={`${className}`}>
      {displayedText}
      <span className="animate-pulse">|</span>
    </span>
  );
};

const Predict = () => {
  const imageRef = useRef(null);
  const [displayImage, setDisplayImage] = useState(false);
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [apiResponse, setApiResponse] = useState(null);
  const isDevelopment = import.meta.env.MODE === "development";

  const API_URL = isDevelopment
    ? "http://127.0.0.1:8000/crop-api/crop-disease/"
    : "crop-prediction-webapp-hyeeekfcahbuefb6.canadacentral-01.azurewebsites.net";

  const [char, setChar] = useState([]);
  const [recommendations, setRecommendations] = useState({
    immediate_actions: [],
    treatments: [],
    prevention: [],
    economic_impact: "",
  });

  useEffect(() => {
    setDisplayImage(!!image);
  }, [image]);

  const Handleuploadfile = () => {
    imageRef.current.click();
  };

  const Handleuploadimage = (e) => {
    const img = e.target.files[0];
    if (img) {
      setImage(img);
      setDisplayImage(true);
    }
  };

  const Handlereupload = () => {
    setImage(null);
    setDisplayImage(false);
    setApiResponse(null);
    setChar([]);
    setRecommendations({
      immediate_actions: [],
      treatments: [],
      prevention: [],
      economic_impact: "",
    });
    if (imageRef.current) imageRef.current.value = "";
  };

  const Handlesubmit = async () => {
    if (!image || !description) {
      return toast.error("Please provide both an image and description.");
    }

    const toastId = toast.loading("Analyzing your plant...");

    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("description", description);

      const res = await axios.post(API_URL, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.dismiss(toastId);
      toast.success("Analysis complete!");

      setApiResponse(res.data);

      try {
        setChar(JSON.parse(res.data.characteristics.replace(/'/g, '"')));

        const parsedRecs = JSON.parse(
          res.data.recommendations.replace(/'/g, '"')
        );
        setRecommendations({
          immediate_actions: parsedRecs.immediate_actions?.map(
            (action) =>
              `${action} - This should be done immediately to prevent further spread.`
          ),
          treatments: parsedRecs.treatments?.map(
            (treatment) =>
              `${treatment} - Apply as directed, usually every 7-10 days until symptoms subside.`
          ),
          prevention: parsedRecs.prevention?.map(
            (prevention) =>
              `${prevention} - Implement this as a long-term strategy to avoid recurrence.`
          ),
          economic_impact:
            parsedRecs.economic_impact +
            " Early detection and treatment can significantly reduce these costs.",
        });
      } catch (e) {
        console.error("Error parsing response:", e);
        setChar(["Could not parse characteristics"]);
        setRecommendations({
          immediate_actions: ["Error parsing recommendations"],
          treatments: [],
          prevention: [],
          economic_impact: "",
        });
      }
    } catch (error) {
      toast.dismiss(toastId);
      toast.error("Failed to analyze. Please try again.");
      console.error("Submission error:", error);
    }
  };

  return (
    <div className="mx-2 sm:mx-4 md:mx-[10px]">
      <h1 className="bg-gradient-to-r from-black via-[#003000] to-black text-white text-lg sm:text-xl md:text-[20px] font-serif font-bold py-2 text-center">
        Right place to be | Scan Now
      </h1>

      <div className="bg-gradient-to-br from-black to-black mt-2 sm:mt-[5px] rounded-b-[10px] min-h-[38rem] text-white p-2 sm:p-3">
        {/* Main Content Grid */}
        <div className="flex flex-col lg:flex-row gap-2 sm:gap-3">
          {/* Upload Image */}
          <div className="border my-1 w-full lg:w-[30%] h-[20rem] rounded-[5px] flex items-center justify-center relative bg-[#003200]">
            {!displayImage ? (
              <label
                className="absolute inset-0 flex flex-col justify-center items-center cursor-pointer p-4 text-center"
                onClick={Handleuploadfile}
                htmlFor="image"
              >
                <span className="text-base sm:text-lg">
                  Click to upload plant image
                </span>
                <span className="text-xs sm:text-sm text-gray-400 mt-1">
                  Supports JPG, PNG (max 50MB)
                </span>
              </label>
            ) : (
              <div className="h-full w-full flex flex-col">
                <img
                  className="h-[85%] w-full object-contain bg-transparent"
                  src={URL.createObjectURL(image)}
                  alt="Uploaded plant"
                />
                <div className="h-[15%] w-full bg-black flex items-center justify-center">
                  <button
                    onClick={Handlereupload}
                    className="bg-gradient-to-tl from-[#002800] to-[green] text-xs sm:text-sm p-1 sm:p-2 rounded-xl sm:rounded-2xl transition-all hover:from-[#006600] hover:to-[#002c00] hover:shadow-lg hover:shadow-green-500/30"
                  >
                    Upload Different Image
                  </button>
                </div>
              </div>
            )}
            <input
              name="image"
              onChange={Handleuploadimage}
              className="hidden"
              type="file"
              ref={imageRef}
              accept="image/*"
            />
          </div>

          {/* Description Input */}
          <div className="border my-1 h-[20rem] rounded-[5px] bg-[#003200] grid grid-rows-[8fr_2fr]">
            <div className="p-2">
              <label className="block text-sm sm:text-base font-medium mb-1">
                Describe plant symptoms:
              </label>
              <textarea
                onChange={(e) => setDescription(e.target.value)}
                className="h-full w-full p-2 bg-gray-400 text-black rounded text-sm sm:text-base"
                placeholder="Example:
- Plant name
- Affected plant parts 
- Color changes"
                value={description}
                rows={5}
              />
            </div>
            <div className="flex items-center justify-center p-2">
              <button
                onClick={Handlesubmit}
                disabled={!image || !description}
                className="h-[70%] w-full bg-gradient-to-tl from-[#006600] to-[#002c00] p-1 sm:p-2 rounded-xl sm:rounded-2xl transition-all border cursor-pointer hover:from-[#0011c8] hover:to-[green] hover:shadow-lg hover:shadow-green-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="text-sm sm:text-base">Analyze Plant 🌱</span>
              </button>
            </div>
          </div>

          {/* Analysis Results */}
          <div className="border my-1 w-full lg:w-[48%] h-[20rem] rounded-[5px] p-3 overflow-y-auto bg-[#0c4a3f]">
            <div className="font-bold text-base sm:text-lg border-b pb-2">
              Analysis Result 🌿
            </div>

            {apiResponse ? (
              <div className="space-y-2 sm:space-y-3">
                <div>
                  <span className="font-semibold">Predicted Disease: </span>
                  <span className="text-[#09ff09] font-bold text-lg sm:text-[20px]">
                    <TypeWriter
                      text={apiResponse.predicted_disease}
                      speed={70}
                    />
                  </span>
                </div>

                <div>
                  <span className="font-semibold">Category: </span>
                  <span className="text-[#09ff09] italic">
                    <TypeWriter
                      text={apiResponse.disease_category}
                      speed={70}
                    />
                  </span>
                </div>

                <div>
                  <span className="font-semibold">Confidence: </span>
                  <span className="text-[#09ff09] italic">
                    <TypeWriter
                      text={`${
                        apiResponse.confidence?.toFixed(2) || "N/A"
                      }% (High confidence)`}
                      speed={70}
                    />
                  </span>
                </div>

                <div className="font-semibold text-[#b296fe] p-1">
                  <hr />
                  Key Characteristics:
                </div>
                <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm">
                  {char.map((item, i) => (
                    <li key={i}>
                      <TypeWriter text={item} speed={40} />
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="text-gray-400 italic h-full flex items-center justify-center">
                {image && description ? (
                  <div className="flex items-center gap-2 animate-pulse">
                    <span>Now click "Analyze plant 🌱" to get analysis</span>
                  </div>
                ) : (
                  "Upload image and description"
                )}
              </div>
            )}
          </div>
        </div>

        {/* Recommendations Section */}
        <div className="border m-1 w-auto h-auto min-h-[200px] mt-3 rounded-[5px] p-3 bg-[#053c31]">
          <div className="font-bold text-base sm:text-lg border-b pb-2">
            Recommendations 🎯
          </div>

          {apiResponse ? (
            <div className="space-y-3 sm:space-y-4">
              <div>
                <div className="font-semibold text-[#b296fe]">
                  Immediate Actions:
                </div>
                <ul className="list-disc pl-5 space-y-1 mt-1 text-xs sm:text-sm">
                  {recommendations.immediate_actions?.map((action, i) => (
                    <li key={`action-${i}`}>
                      <TypeWriter text={action} speed={30} />
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="font-semibold text-[#b296fe]">
                  Treatment Options:
                </div>
                <ul className="list-disc pl-5 space-y-1 mt-1 text-xs sm:text-sm">
                  {recommendations.treatments?.map((treatment, i) => (
                    <li key={`treatment-${i}`}>
                      <TypeWriter text={treatment} speed={30} />
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="font-semibold text-[#b296fe]">
                  Prevention Strategies:
                </div>
                <ul className="list-disc pl-5 space-y-1 mt-1 text-xs sm:text-sm">
                  {recommendations.prevention?.map((prevention, i) => (
                    <li key={`prevention-${i}`}>
                      <TypeWriter text={prevention} speed={30} />
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="font-semibold text-[#b296fe]">
                  Economic Impact:
                </div>
                <div className="text-xs sm:text-sm mt-1">
                  <TypeWriter
                    text={recommendations.economic_impact}
                    speed={30}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="text-gray-400 italic h-[150px] flex items-center justify-center">
              Recommendations will appear after analysis
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Predict;
