"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import Lottie from "react-lottie-player";
import homeLottie from "../../src/lottie/homeLottie.json";
import logo from "../../src/img/logo.png";
export default function TravelButton() {
  const [currentMode, setCurrentMode] = useState(false);
  const [mediaState, setMediaState] = useState(false);
  useEffect(() => {
    if (matchMedia("screen and (min-width: 1024px)").matches) {
      setMediaState(true);
    } else {
      setMediaState(false);
    }
  }, []);
  const springs = useSpring(
    currentMode === false
      ? {
          config: {
            tension: 300,
            mass: 0.1,
          },
          width: "4rem",
          height: "4rem",
        }
      : {
          config: {
            tension: 250,
            mass: 2,
          },
          width: mediaState ? "50rem" : "20rem",
          height: "8rem",
        }
  );
  const handleClick = () => {
    setCurrentMode(!currentMode);
  };
  return (
    <div className="z-50 fixed w-full top-0">
      <div className="z-100 flex flex-col p-3 justify-start items-center">
        <animated.div
          onClick={handleClick}
          style={springs}
          className="flex flex-col justify-center items-center z-100 cursor-pointer rounded-full flex-initial shadow-xl  bg-gradient-to-r from-cyan-500 to-blue-500"
        >
          {currentMode ? (
            <div className="flex flex-col justify-center items-center">
              <Image
                src={logo}
                className="h-20 w-20 shadow-xl shadow-indigo-500/50"
              ></Image>
            </div>
          ) : (
            <Lottie
              className="w-16 h-16"
              loop
              animationData={homeLottie}
              play
            ></Lottie>
          )}
        </animated.div>
      </div>
    </div>
  );
}
