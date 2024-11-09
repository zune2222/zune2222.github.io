"use client";
import HomePic from "./components/homePic";
import HomeIntro from "./components/homeIntro";
import CopyRightFooter from "./components/copyrightFooter";
import dynamic from "next/dynamic";

const GoogleAnalytics = dynamic(() => import("./components/googleAnalytics"), {
  ssr: false,
});
export default function Home() {
  return (
    <>
      <HomePic />
      <HomeIntro />
    </>
  );
}
