import Image from "next/image";
import Logo from "../../src/img/logo.png";
import mainLogo from "../../src/img/mainSnowing.png";
import Link from "next/link";
import { appleFontEB } from "../components/fontZip";
import CardHover from "./cardHover";
import { useEffect, useState, useRef } from "react";

// Particle 클래스를 밖으로 이동
class Particle {
  constructor(x, y, type, canvasWidth, canvasHeight) {
    this.x = x;
    this.y = y;
    this.type = type;
    this.speed = Math.random() * 0.5 + 0.2;
    this.radius = Math.random() * 2 + 1;
    this.angle = Math.random() * Math.PI * 2;
    this.opacity = 1;
    this.fadeOut = false;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.originalOpacity = 1;
    this.originalRadius = this.radius;
    this.twinkleSpeed = Math.random() * 0.03 + 0.01; // 반짝임 속도
    this.twinklePhase = Math.random() * Math.PI * 2; // 반짝임 위상
    // 별들을 화면 상단 2/3 영역에만 배치
    this.y = Math.random() * (canvasHeight * 0.7);
    // 색상 랜덤 선택 (흰색, 연한 파랑, 연한 노랑)
    this.color = [
      [255, 255, 255], // 흰색
      [200, 220, 255], // 연한 파랑
      [255, 255, 200], // 연한 노랑
    ][Math.floor(Math.random() * 3)];

    // 구름 파티클을 위한 추가 속성
    if (type === "cloud") {
      this.radius = Math.random() * 40 + 30; // 약간 더 작게
      this.speed = Math.random() * 0.15 - 0.075; // 더 천천히
      this.opacity = Math.random() * 0.2 + 0.15; // 더 투명하게
      this.originalOpacity = this.opacity;
      this.y = Math.random() * (canvasHeight / 3);
      // 구름의 모양을 위한 추가 속성
      this.subClouds = [
        { x: 0, y: 0, r: this.radius }, // 메인 구름
        { x: -this.radius * 0.5, y: -this.radius * 0.2, r: this.radius * 0.7 },
        { x: this.radius * 0.5, y: -this.radius * 0.3, r: this.radius * 0.6 },
        { x: -this.radius * 0.8, y: -this.radius * 0.1, r: this.radius * 0.5 },
        { x: this.radius * 0.8, y: this.radius * 0.1, r: this.radius * 0.6 },
        { x: this.radius * 0.2, y: this.radius * 0.15, r: this.radius * 0.7 },
        { x: -this.radius * 0.3, y: this.radius * 0.15, r: this.radius * 0.6 },
      ];
    }

    if (type === "sun") {
      this.radius = Math.random() * 1 + 0.5; // 더 가는 선
      this.speed = Math.random() * 0.3 + 0.1; // 더 느린 속도
      this.opacity = Math.random() * 0.2 + 0.1; // 더 투명하게
      this.originalOpacity = this.opacity;
      this.angle = Math.random() * Math.PI; // 0 ~ 180도
      this.length = Math.random() * 200 + 100; // 광선 길이
      // 시작 위치를 화면 상단으로
      this.y = -this.length;
      this.x = Math.random() * canvasWidth;
    }

    if (type === "rain") {
      this.length = Math.random() * 30 + 20; // 더 긴 빗줄기
      this.speed = Math.random() * 8 + 5; // 더 느린 속도 (15+10 → 8+5)
      this.opacity = Math.random() * 0.4 + 0.2; // 더 선명하게
      this.thickness = Math.random() * 2 + 1; // 더 두꺼운 빗줄기
      this.originalOpacity = this.opacity;
      this.splashed = false;
      this.splashSize = 0;
      this.maxSplashSize = Math.random() * 4 + 3; // 더 큰 물방울 크기
    }

    if (type === "star") {
      this.radius = Math.random() * 1 + 0.3; // 더 작은 별
      this.originalRadius = this.radius;
      this.speed = Math.random() * 0.2 + 0.1;
      this.opacity = Math.random() * 0.4 + 0.1; // 더 은은하게
      this.originalOpacity = this.opacity;
      this.twinkleSpeed = Math.random() * 0.008 + 0.002; // 더욱 천천히 반짝이도록
      this.twinklePhase = Math.random() * Math.PI * 2;
      this.glowSize = Math.random() * 2 + 1.5; // 더 작은 빛나는 효과
      this.y = Math.random() * canvasHeight * 0.9;
      // 대부분 흰색으로
      this.color =
        Math.random() > 0.1
          ? [255, 255, 255] // 90% 확률로 흰색
          : [255, 255, Math.random() > 0.5 ? 220 : 200]; // 10% 확률로 약간 노란빛이나 푸른빛
    }
  }

  update(mouseX, mouseY) {
    if (this.fadeOut) {
      this.opacity -= 0.02;
      return;
    }

    if (this.type === "sun") {
      // 수직으로 내려오는 움직임
      this.y += this.speed;

      // 마우스와의 상호작용
      const dx = mouseX - this.x;
      const dy = mouseY - this.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 100) {
        // 마우스 근처에서 빛나는 효과
        this.opacity = Math.min(0.6, this.opacity + 0.05);
      } else {
        // 원래 투명도로 복귀
        this.opacity += (this.originalOpacity - this.opacity) * 0.1;
      }

      // 화면 아래로 나가면 위에서 다시 시작
      if (this.y > this.canvasHeight) {
        this.y = -this.length;
        this.x = Math.random() * this.canvasWidth;
      }
      return;
    }

    if (this.type === "cloud") {
      // 기본 수평 이동
      this.x += this.speed;

      // 마우스와의 상호작용
      const dx = mouseX - this.x;
      const dy = mouseY - this.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const interactionRadius = this.radius * 3; // 상호작용 범위

      if (distance < interactionRadius) {
        // 마우스로부터 멀어지는 방향으로 이동
        const angle = Math.atan2(dy, dx);
        const pushForce = (interactionRadius - distance) / interactionRadius; // 거리에 따른 힘 조절

        this.x -= Math.cos(angle) * pushForce * 2;
        this.y -= Math.sin(angle) * pushForce * 2;

        // 투명도 살짝 변경
        this.opacity = Math.min(1, this.opacity + 0.02);
      } else {
        // 원래 투명도로 천천히 복귀
        this.opacity += (this.originalOpacity - this.opacity) * 0.1;
      }

      // 화면 밖으로 나가면 반대편에서 다시 등장
      if (this.x > this.canvasWidth + this.radius) {
        this.x = -this.radius;
        this.y = Math.random() * (this.canvasHeight / 3);
      }
      if (this.x < -this.radius) {
        this.x = this.canvasWidth + this.radius;
        this.y = Math.random() * (this.canvasHeight / 3);
      }

      // y 위치 제한 (화면 상단 1/3 영역 내에서만 움직이도록)
      this.y = Math.max(this.radius, Math.min(this.canvasHeight / 3, this.y));
      return;
    }

    if (this.type === "rain") {
      if (this.splashed) {
        // 물방울 효과 업데이트
        this.splashSize += 0.2; // 더 천천히 퍼짐
        this.opacity -= 0.02; // 더 천천히 사라짐
        return;
      }

      this.y += this.speed;
      this.x += this.speed * 0.05; // 더 수직에 가깝게 (0.1 → 0.05)

      // 마우스와의 상호작용
      const dx = mouseX - this.x;
      const dy = mouseY - this.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 50) {
        // 마우스 근처에서 빗줄기가 휘어짐
        this.x += dx * 0.02;
        this.y += dy * 0.02;
        this.opacity = Math.min(0.9, this.opacity + 0.1);
      } else {
        this.opacity += (this.originalOpacity - this.opacity) * 0.1;
      }

      // 바닥에 닿으면 물방울 효과 시작
      if (this.y > this.canvasHeight) {
        this.splashed = true;
        this.y = this.canvasHeight;
        this.opacity = this.originalOpacity * 3; // 더 선명한 물방울
        this.splashSize = 2; // 시작 크기 증가
      }
    }

    if (this.type === "star") {
      // 반짝이는 효과
      this.twinklePhase += this.twinkleSpeed;
      const twinkle = Math.sin(this.twinklePhase) * 0.5 + 0.5;
      this.opacity = this.originalOpacity * (0.5 + twinkle * 0.5);
      this.radius = this.originalRadius * (0.8 + twinkle * 0.4);

      // 마우스와의 상호작용
      const dx = mouseX - this.x;
      const dy = mouseY - this.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 100) {
        // 마우스 근처에서 더 밝게 빛나기
        this.opacity = Math.min(1, this.opacity + 0.3);
        this.radius = this.originalRadius * 1.5;
      }
      return;
    }

    // 다른 파티클들의 기존 업데이트 로직
    const dx = mouseX - this.x;
    const dy = mouseY - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < 100) {
      this.x += dx * 0.01;
      this.y += dy * 0.01;
    }

    this.y += this.speed;

    if (this.y > this.canvasHeight) {
      this.y = 0;
      this.x = Math.random() * this.canvasWidth;
    }
  }

  draw(ctx) {
    ctx.beginPath();
    if (this.type === "sun") {
      // 태양광선 그리기
      ctx.beginPath();
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(this.x, this.y + this.length);

      // 그라데이션 효과
      const gradient = ctx.createLinearGradient(
        this.x,
        this.y,
        this.x,
        this.y + this.length
      );
      gradient.addColorStop(0, `rgba(255, 220, 110, 0)`);
      gradient.addColorStop(0.5, `rgba(255, 220, 110, ${this.opacity})`);
      gradient.addColorStop(1, `rgba(255, 220, 110, 0)`);

      ctx.strokeStyle = gradient;
      ctx.lineWidth = this.radius;
      ctx.stroke();
      return;
    }

    if (this.type === "cloud") {
      const x = this.x;
      const y = this.y;

      // 구름의 외부 빛나는 효과
      const outerGlow = ctx.createRadialGradient(
        x,
        y,
        0,
        x,
        y,
        this.radius * 1.5
      );
      outerGlow.addColorStop(0, `rgba(255, 255, 255, ${this.opacity * 0.3})`);
      outerGlow.addColorStop(1, "rgba(255, 255, 255, 0)");

      ctx.beginPath();
      ctx.fillStyle = outerGlow;
      ctx.arc(x, y, this.radius * 1.5, 0, Math.PI * 2);
      ctx.fill();

      // 각 부분 구름 그리기
      this.subClouds.forEach((cloud) => {
        const cloudX = x + cloud.x;
        const cloudY = y + cloud.y;

        // 각 부분의 그라데이션
        const gradient = ctx.createRadialGradient(
          cloudX,
          cloudY,
          0,
          cloudX,
          cloudY,
          cloud.r
        );
        gradient.addColorStop(0, `rgba(255, 255, 255, ${this.opacity * 1.2})`);
        gradient.addColorStop(0.5, `rgba(255, 255, 255, ${this.opacity})`);
        gradient.addColorStop(1, `rgba(255, 255, 255, ${this.opacity * 0.8})`);

        // 부드러운 그림자 효과
        ctx.shadowColor = "rgba(0, 0, 0, 0.05)";
        ctx.shadowBlur = cloud.r * 0.3;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = cloud.r * 0.1;

        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.arc(cloudX, cloudY, cloud.r, 0, Math.PI * 2);
        ctx.fill();
      });

      // 그림자 초기화
      ctx.shadowColor = "transparent";
      ctx.shadowBlur = 0;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;

      return;
    }

    if (this.type === "rain") {
      if (this.splashed) {
        // 물방울 그리기
        const gradient = ctx.createRadialGradient(
          this.x,
          this.y,
          0,
          this.x,
          this.y,
          this.splashSize * this.maxSplashSize
        );
        gradient.addColorStop(0, `rgba(174, 194, 224, ${this.opacity})`);
        gradient.addColorStop(
          0.5,
          `rgba(174, 194, 224, ${this.opacity * 0.5})`
        );
        gradient.addColorStop(1, `rgba(174, 194, 224, 0)`);

        ctx.beginPath();
        ctx.arc(
          this.x,
          this.y,
          this.splashSize * this.maxSplashSize,
          0,
          Math.PI * 2
        );
        ctx.fillStyle = gradient;
        ctx.fill();
      } else {
        // 빗줄기 그리기
        const gradient = ctx.createLinearGradient(
          this.x,
          this.y,
          this.x + this.speed * 0.05,
          this.y + this.length
        );
        gradient.addColorStop(0, `rgba(174, 194, 224, 0)`);
        gradient.addColorStop(0.5, `rgba(174, 194, 224, ${this.opacity})`);
        gradient.addColorStop(1, `rgba(174, 194, 224, 0)`);

        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + this.speed * 0.05, this.y + this.length);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = this.thickness;
        ctx.stroke();
      }
      return;
    }

    if (this.type === "star") {
      const [r, g, b] = this.color;

      // 중심 별 먼저 그리기
      ctx.globalCompositeOperation = "screen";
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${this.opacity * 1.2})`;
      ctx.fill();

      // 부드러운 빛나는 효과
      const gradient = ctx.createRadialGradient(
        this.x,
        this.y,
        0,
        this.x,
        this.y,
        this.radius * this.glowSize
      );
      gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${this.opacity * 0.5})`);
      gradient.addColorStop(
        0.5,
        `rgba(${r}, ${g}, ${b}, ${this.opacity * 0.1})`
      );
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius * this.glowSize, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      ctx.globalCompositeOperation = "source-over";
      return;
    }

    // 다른 파티클들의 기존 draw 로직
    if (this.type === "sun") {
      ctx.arc(this.x, this.y, this.radius * 2, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 220, 110, ${this.opacity * 0.3})`;
      ctx.fill();
    } else if (this.type === "snow") {
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity * 0.8})`;
      ctx.fill();
    }
    ctx.closePath();
  }
}

export default function HomePic() {
  const [timeState, setTimeState] = useState({
    bgColor: "bg-sky-400",
    isDaytime: true,
    weatherType: "sun", // 기본값
  });

  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 }); // mousePos를 ref로 변경
  const particlesRef = useRef([]);
  const animationFrameIdRef = useRef(null);

  // initParticles 함수를 밖으로 이동
  const initParticles = (type) => {
    if (!canvasRef.current) return [];

    const particles = [];
    const count =
      type === "cloud" ? 8 : type === "sun" ? 50 : type === "star" ? 100 : 200;
    const canvas = canvasRef.current;

    for (let i = 0; i < count; i++) {
      particles.push(
        new Particle(
          Math.random() * canvas.width,
          Math.random() * canvas.height,
          type,
          canvas.width,
          canvas.height
        )
      );
    }
    return particles;
  };

  // 날씨 데이터 가져오기
  const fetchWeather = async () => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=busan&appid=a40005b9dd55620b64c0889925acdd27&units=metric`
      );
      const data = await res.json();

      let weatherCode = data.weather[0].id;
      const hours = new Date().getHours();
      const isDaytime = hours >= 6 && hours < 18;

      let weatherType;
      let bgColor;

      // 날씨 코드에 따른 상세 분류
      if (weatherCode >= 200 && weatherCode < 300) {
        // 천둥번개
        weatherType = "rain";
        bgColor = isDaytime ? "bg-gray-600" : "bg-gray-900";
      } else if (weatherCode >= 300 && weatherCode < 600) {
        // 비
        weatherType = "rain";
        bgColor = isDaytime ? "bg-gray-400" : "bg-gray-900";
      } else if (weatherCode >= 600 && weatherCode < 700) {
        // 눈
        weatherType = "snow";
        bgColor = isDaytime ? "bg-slate-200" : "bg-slate-900";
      } else if (weatherCode === 800) {
        // 맑음
        weatherType = isDaytime ? "sun" : "star"; // 밤에는 별이 보이도록
        bgColor = isDaytime
          ? hours < 8
            ? "bg-orange-200"
            : hours < 16
            ? "bg-sky-400"
            : "bg-orange-400"
          : "bg-slate-900";
      } else {
        // 구름 (801-804)
        weatherType = "cloud";
        bgColor = isDaytime ? "bg-gray-200" : "bg-gray-900";
      }

      console.log(
        "Current weather:",
        data.weather[0].main,
        "Code:",
        weatherCode,
        "Time:",
        isDaytime ? "Day" : "Night"
      );

      setTimeState((prev) => ({
        ...prev,
        bgColor,
        isDaytime,
        weatherType,
      }));

      // 밤하늘에 별을 추가
      if (!isDaytime && weatherCode === 800) {
        // 맑은 밤일 경우 별과 달을 함께 표시
        particlesRef.current = [
          ...initParticles("star"),
          ...initParticles("moon"), // 달 파티클도 추가할 수 있습니다
        ];
      } else {
        particlesRef.current = initParticles(weatherType);
      }
    } catch (error) {
      console.error("날씨 데이터를 가져오는데 실패했습니다:", error);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // 캔버스 크기 설정
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // 애니메이션 함수
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current = particlesRef.current.filter(
        (particle) => particle.opacity > 0
      );

      particlesRef.current.forEach((particle) => {
        particle.update(mouseRef.current.x, mouseRef.current.y);
        particle.draw(ctx);
      });

      animationFrameIdRef.current = requestAnimationFrame(animate);
    };

    // 마우스 이벤트 리스너
    const handleMouseMove = (e) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY,
      };
    };

    // 초기 설정
    window.addEventListener("resize", resizeCanvas);
    canvas.addEventListener("mousemove", handleMouseMove);
    resizeCanvas();
    fetchWeather(); // 최초 한 번만 날씨 데이터 가져오기
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      canvas.removeEventListener("mousemove", handleMouseMove);
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
      <div className="mt-10 flex w-full h-auto z-2 flex flex-col items-center justify-center">
        <CardHover className="cursor-pointer">
          <Link
            href={`https://zune2222.notion.site/Pak-Jun-Yi-2c6ae27311c94be48543fc00c0ea861a?pvs=4`}
            target="_blank"
            passHref
          >
            <Image
              placeholder="blur"
              alt="logo"
              className="toc-class opacity-0 translate-y-6 w-56 h-56 rounded-3xl shadow-2xl"
              src={Logo}
            />
          </Link>
        </CardHover>
      </div>
    </>
  );
}
