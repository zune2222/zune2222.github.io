"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import Lottie from "react-lottie-player";
import homeLottie from "../../src/lottie/homeLottie.json";
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
      <div className="z-100 flex flex-col p-3 min-h-screen justify-start items-center">
        <animated.div
          onClick={handleClick}
          style={springs}
          className="flex flex-col justify-center items-center z-100 cursor-pointer rounded-full flex-initial shadow-xl  bg-gradient-to-r from-cyan-500 to-blue-500"
        >
          {currentMode ? (
            <></>
          ) : (
            <Lottie
              className="w-15 h-15"
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
