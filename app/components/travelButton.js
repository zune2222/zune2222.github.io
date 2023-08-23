"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  useSpring,
  animated,
  useTransition,
  useChain,
  useSpringRef,
} from "@react-spring/web";
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
  const springApi = useSpringRef();
  const springs = useSpring(
    currentMode === false
      ? {
          ref: springApi,
          config: {
            tension: 300,
            mass: 0.1,
          },
          width: "4rem",
          height: "4rem",
        }
      : {
          ref: springApi,
          config: {
            tension: 250,
            mass: 2,
          },
          width: mediaState ? "50rem" : "20rem",
          height: "8rem",
        }
  );
  const data = [
    { src: logo, class: "w-12 h-12 rounded-full", key: 1 },
    { src: logo, class: "w-12 h-12 rounded-full", key: 2 },
    { src: logo, class: "w-12 h-12 rounded-full", key: 3 },
    { src: logo, class: "w-12 h-12 rounded-full", key: 4 },
    { src: logo, class: "w-12 h-12 rounded-full", key: 5 },
    { src: logo, class: "w-12 h-12 rounded-full", key: 6 },
  ];
  const transApi = useSpringRef();
  const transitions = useTransition(currentMode ? data : [], {
    ref: transApi,
    trail: 400 / data.length,
    from: { opacity: 0, scale: 0 },
    enter: { opacity: 1, scale: 1 },
    leave: { opacity: 0, sacle: 0 },
  });
  useChain(currentMode ? [springApi, transApi] : [transApi, springApi], [
    0,
    currentMode ? 0.1 : 0.8,
  ]);
  const handleClick = () => {
    setCurrentMode(!currentMode);
  };
  return (
    <div className="z-50 fixed w-full top-0">
      <div className="z-100 flex flex-col p-3 justify-start items-center">
        <animated.div
          onClick={handleClick}
          style={springs}
          className="flex flex-col justify-center items-center z-100 cursor-pointer rounded-full flex-initial bg-white/30 shadow-2xl backdrop-opacity-25"
        >
          <div className="grid grid-rows-2 grid-flow-col gap-2">
            {transitions((style, item) => (
              <animated.div style={{ ...style }}>
                <Image src={item.src} className={item.class} />
              </animated.div>
            ))}
          </div>
        </animated.div>
      </div>
    </div>
  );
}
