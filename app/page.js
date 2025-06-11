"use client";
import dynamic from "next/dynamic";
import HomeIntro from "./components/homeIntro";

// SSR을 비활성화하여 클라이언트에서만 렌더링
const HomePic = dynamic(() => import("./components/homePic"), {
  ssr: false,
  loading: () => (
    <div className="relative bg-gradient-to-b from-sky-300 to-cyan-200">
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-pulse">
            <div className="h-64 w-full bg-gradient-to-b from-sky-200 to-cyan-100 rounded-lg"></div>
          </div>
        </div>
      </div>
    </div>
  ),
});

export default function Home() {
  return (
    <>
      <HomePic />
      <HomeIntro />
    </>
  );
}
