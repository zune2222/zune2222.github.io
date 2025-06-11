import Image from "next/image";
import Logo from "../../src/img/logo.png";
import mainLogo from "../../src/img/mainSnowing.png";
import Link from "next/link";
import { appleFontEB } from "../components/fontZip";
import CardHover from "./cardHover";
import { useEffect, useState, useRef } from "react";

// 모듈화된 파일들 import
import {
  getInitialState,
  getWeatherType,
  getWeatherBackground,
} from "./homePic/weatherConfig";
import { fetchWeatherData } from "./homePic/weatherAPI";
import {
  initParticles,
  resizeCanvas,
  animate,
  handleMouseMove,
} from "./homePic/canvasUtils";

export default function HomePic() {
  const [timeState, setTimeState] = useState(getInitialState);
  const [isLoading, setIsLoading] = useState(true);

  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const particlesRef = useRef([]);
  const animationFrameIdRef = useRef(null);

  // 날씨 데이터 가져오기 및 상태 업데이트
  const updateWeather = async () => {
    const weatherData = await fetchWeatherData();

    if (weatherData) {
      const hours = new Date().getHours();
      const isDaytime = hours >= 6 && hours < 18;
      const weatherType = getWeatherType(weatherData.weatherCode, isDaytime);
      const bgColor = getWeatherBackground(
        weatherData.weatherCode,
        isDaytime,
        hours
      );

      console.log(
        "Current weather:",
        weatherData.weatherMain,
        "Code:",
        weatherData.weatherCode,
        "Time:",
        isDaytime ? "Day" : "Night"
      );

      setTimeState({
        bgColor,
        isDaytime,
        weatherType,
      });

      // 밤하늘에 별을 추가
      if (!isDaytime && weatherData.weatherCode === 800) {
        particlesRef.current = [...initParticles("star", canvasRef.current)];
      } else {
        particlesRef.current = initParticles(weatherType, canvasRef.current);
      }
      
      // 로딩 완료
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // 캔버스 크기 설정
    const handleResize = () => resizeCanvas(canvas);

    // 마우스 이벤트 리스너
    const mouseHandler = (e) => handleMouseMove(e, mouseRef);

    // 애니메이션 시작
    const startAnimation = () => {
      animate(ctx, canvas, particlesRef, mouseRef, animationFrameIdRef);
    };

    // 초기 설정
    window.addEventListener("resize", handleResize);
    canvas.addEventListener("mousemove", mouseHandler);
    handleResize();
    updateWeather(); // 최초 한 번만 날씨 데이터 가져오기
    startAnimation();

    return () => {
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("mousemove", mouseHandler);
      cancelAnimationFrame(animationFrameIdRef.current);
    };
  }, []);

  return (
    <>
      <div
        className={`relative ${timeState.bgColor} transition-colors duration-1000`}
      >
        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0 w-full h-full z-10"
        />
        <div className="flex z-0">
          <Image
            placeholder="blur"
            alt="main logo"
            className="h-auto w-full"
            src={mainLogo}
            priority
          />
        </div>
      </div>
      <div className="mt-10 flex w-full h-auto z-20 flex flex-col items-center justify-center">
        <CardHover className="cursor-pointer">
          <Link
            href={`https://zune2222.notion.site/Pak-Jun-Yi-2c6ae27311c94be48543fc00c0ea861a?pvs=4`}
            target="_blank"
            passHref
          >
            <Image
              placeholder="blur"
              alt="logo"
              className="w-56 h-56 rounded-3xl shadow-2xl"
              src={Logo}
            />
          </Link>
        </CardHover>
      </div>
    </>
  );
}