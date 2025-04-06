import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";

function HomeBanner() {
  const router = useRouter();
  const [searchData, setSearchData] = useState("");
  const [image, setImage] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setImage((prevImage) => (prevImage % 6) + 1);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-auto relative flex flex-col items-center justify-center gap-8">
      {/* Video Section with Search Bar */}
      <div className="w-full h-[720px] flex justify-center items-center relative">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Transparent Black Overlay */}
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-10"></div>

        {/* Search Bar and Text */}
        <div
          className={[
            "z-20 absolute", // Increased z-index to ensure it appears above the overlay
            "w-[650px] flex justify-start flex-col",
            "gap-5",
          ].join(" ")}
          style={{
            position: "absolute",
            bottom: "10%", // Position the search bar near the bottom
            left: "5%", // Position the search bar near the left
          }}
        >
          <h1 className="text-white text-5xl leading-snug">
            Find the perfect&nbsp;
            <i>instructor</i>
            <br />
            for your craft
          </h1>
          <div className="flex align-middle">
            <div className="relative">
              <IoSearchOutline className="absolute text-gray-500 text-2xl flex align-middle h-full left-2" />
              <input
                type="text"
                className="h-14 w-[450px] pl-10 rounded-md rounded-r-none"
                placeholder={`Try "building mobile app"`}
                value={searchData}
                onChange={(e) => setSearchData(e.target.value)}
              />
            </div>
            <button
              className="bg-[#1DBF73] text-white px-12 text-lg font-semibold rounded-r-md"
              onClick={() => router.push(`/search?q=${searchData}`)}
            >
              Search
            </button>
          </div>
          <div className="text-white flex gap-4">
            Popular:
            <ul className="flex gap-5">
              <li
                className="text-sm py-1 px-3 border rounded-full hover:bg-white hover:text-black transition-all duration-300 cursor-pointer"
                onClick={() => router.push("/search?q=website design")}
              >
                Website Design
              </li>
              <li
                className="text-sm py-1 px-3 border rounded-full hover:bg-white hover:text-black transition-all duration-300 cursor-pointer"
                onClick={() => router.push("/search?q=wordpress")}
              >
                Wordpress
              </li>
              <li
                className="text-sm py-1 px-3 border rounded-full hover:bg-white hover:text-black transition-all duration-300 cursor-pointer"
                onClick={() => router.push("/search?q=logo design")}
              >
                Logo Design
              </li>
              <li
                className="text-sm py-1 px-3 border rounded-full hover:bg-white hover:text-black transition-all duration-300 cursor-pointer"
                onClick={() => router.push("/search?q=ai services")}
              >
                AI Services
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Slideshow */}
      <div className="h-[600px] relative bg-cover w-full">
        <div className="absolute top-0 right-0 w-[110vw] h-full transition-opacity z-0">
          {[1, 2, 3, 4, 5, 6].map((num) => (
            <Image
              key={num}
              alt="hero"
              src={`/bg-hero${num}.webp`}
              fill
              className={`${
                image === num ? "opacity-100" : "opacity-0"
              } transition-all duration-[5000ms] absolute top-0 left-0`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomeBanner;
