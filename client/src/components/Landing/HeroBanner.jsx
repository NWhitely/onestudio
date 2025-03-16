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
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-auto relative flex flex-col items-center justify-center gap-8"> 
      {/* Slideshow */}
      <div className="h-[680px] relative bg-cover w-full">
        <div className="absolute top-0 right-0 w-[110vw] h-full transition-opacity z-0">
          {[1, 2, 3, 4, 5, 6].map((num) => (
            <Image
              key={num}
              alt="hero"
              src={`/bg-hero${num}.webp`}
              fill
              className={`${
                image === num ? "opacity-100" : "opacity-0"
              } transition-all duration-1000 absolute top-0 left-0`}
            />
          ))}
        </div>
        <div className="z-10 relative w-[650px] flex justify-center flex-col h-full gap-5 ml-20">
          <h1 className="text-white text-5xl leading-snug">
            Find the perfect&nbsp;
            <i>freelance</i>
            <br />
            services for your business
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
        {/* Video Section Above the Slideshow */}
      <div className="w-full h-[400px] flex justify-center items-center">
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
      </div>

    </div>
  );
}

export default HomeBanner;
