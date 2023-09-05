"use client";
import CardHover from "../components/cardHover";
import TravelButton from "../components/travelButton";
import LogPic from "./components/logPic";
import useObserver from "../components/useObserver";
import LogTitle from "./components/logTitle";
import LogBooks from "./components/logBooks";

export default function Log() {
  return (
    <div>
      <LogPic />
      <LogTitle />
      <LogBooks />
    </div>
  );
}
