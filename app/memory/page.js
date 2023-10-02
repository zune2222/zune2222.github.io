"use client";
import MemoryPic from "./components/memoryPic";
import MemoryTitle from "./components/memoryTitle";
import MemoryList from "./components/memoriesList";

export default function Memory() {
  return (
    <div>
      <MemoryPic />
      <MemoryTitle />
      <MemoryList />
    </div>
  );
}
