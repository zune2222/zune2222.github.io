import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  useSpring,
  animated,
  useTransition,
  useChain,
  useSpringRef,
} from "@react-spring/web";
import logo from "../../src/img/logo.png";
import logoTranparency from "../../src/img/logoTranparency.png";
import daisyBooks from "../../src/img/daisyBooks.png";
import memory from "../../src/img/memoryParis.png";
import parisTranparency from "../../src/img/memoryParisTranparency.png";
import coin from "../../src/img/coin.png";
import { usePathname } from "next/navigation";

export default function TravelButton() {
  const [currentMode, setCurrentMode] = useState(false);
  const [currentPagePic, setCurrentPagePic] = useState(logoTranparency);
  const pathname = usePathname();
  const springApi = useSpringRef();

  useEffect(() => {
    if (pathname === "/") setCurrentPagePic(logoTranparency);
    if (pathname === "/log") setCurrentPagePic(daisyBooks);
    if (pathname === "/memory") setCurrentPagePic(parisTranparency);
  }, [pathname]);

  const springs = useSpring(
    currentMode === false
      ? {
          ref: springApi,
          config: { tension: 300, mass: 0.1 },
          width: "4.3rem",
          height: "4.3rem",
        }
      : {
          ref: springApi,
          config: { tension: 250, mass: 2 },
          width: "20rem",
          height: "8rem",
        }
  );

  const data = [
    { link: "/", src: logo, class: "w-12 h-12 rounded-full", key: 1 },
    {
      link: "/log",
      src: daisyBooks,
      class: "w-12 h-12 rounded-full bg-red-50",
      key: 2,
    },
    {
      link: "/memory",
      src: memory,
      class: "w-12 h-12 rounded-full bg-red-50",
      key: 3,
    },
    {
      link: "https://python-bitcoin-auto-trading.web.app/",
      src: coin,
      class: "w-12 h-12 rounded-full bg-red-50",
      key: 4,
    },
  ];

  const transApi = useSpringRef();
  const transitions = useTransition(
    currentMode ? data : [{ src: currentPagePic, class: "w-12 h-12" }],
    {
      ref: transApi,
      trail: 400 / data.length,
      from: { opacity: 0, scale: 0 },
      enter: { opacity: 1, scale: 1 },
      leave: { opacity: 0, scale: 0 },
      reset: true,
    }
  );

  useChain([springApi, transApi], [0, 0.2]);

  const handleClick = () => {
    setCurrentMode(!currentMode);
  };

  const handleExternalLinkClick = (url) => {
    window.open(url, "_blank");
  };

  return (
    <div className="z-50 fixed w-full top-0">
      <div className="z-100 flex flex-col p-3 justify-start items-center">
        <animated.div
          onClick={handleClick}
          style={springs}
          className="flex flex-col justify-center items-center z-100 cursor-pointer rounded-full flex-initial bg-white/30 shadow-2xl backdrop-opacity-25"
        >
          <div
            className={
              currentMode
                ? "grid grid-rows-2 items-center grid-flow-col gap-2"
                : "items-center justify-center"
            }
          >
            {transitions((style, item) => (
              <animated.div style={{ ...style }}>
                {currentMode ? (
                  item.link.startsWith("http") ? (
                    <div onClick={() => handleExternalLinkClick(item.link)}>
                      <Image
                        placeholder="blur"
                        alt="travelButtonImage"
                        src={item.src}
                        className={item.class}
                      />
                    </div>
                  ) : (
                    <Link href={item.link}>
                      <Image
                        placeholder="blur"
                        alt="travelButtonImage"
                        src={item.src}
                        className={item.class}
                      />
                    </Link>
                  )
                ) : (
                  <Image
                    placeholder="blur"
                    alt="travelButtonImage"
                    src={item.src}
                    className={item.class}
                  />
                )}
              </animated.div>
            ))}
          </div>
        </animated.div>
      </div>
    </div>
  );
}
