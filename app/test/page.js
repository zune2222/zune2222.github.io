"use client";
import React, { useEffect } from "react";
import useObserver from "../components/useObserver";

export default function Test() {
  const rootRef = useObserver();
  return (
    <div ref={rootRef}>
      <div id="table-of-contents">
        <div id="toc-header" className="opacity-0 text-3xl text-center">
          우와아 테스트다 이자식들아
        </div>
        <ul
          id="toc-content"
          className="flex flex-col justify-center items-center"
        >
          <li className="translate-y-6 opacity-0 flex shadow-lg rounded-full w-64 h-24 my-3 justify-center items-center">
            <div>반갑습니다</div>
          </li>
          <li className="translate-y-6 opacity-0 flex shadow-lg rounded-full w-64 h-24 my-3 justify-center items-center">
            <div>반갑습니다</div>
          </li>
          <li className="flex translate-y-6 opacity-0 shadow-lg rounded-full w-64 h-24 my-3 justify-center items-center">
            <div>반갑습니다</div>
          </li>
          <li className="flex translate-y-6 opacity-0 shadow-lg rounded-full w-64 h-24 my-3 justify-center items-center">
            <div>반갑습니다</div>
          </li>
          <li className="flex translate-y-6 opacity-0 shadow-lg rounded-full w-64 h-24 my-3 justify-center items-center">
            <div>반갑습니다</div>
          </li>
          <li className="flex translate-y-6 opacity-0 shadow-lg rounded-full w-64 h-24 my-3 justify-center items-center">
            <div>반갑습니다</div>
          </li>
          <li className="flex translate-y-6 opacity-0 shadow-lg rounded-full w-64 h-24 my-3 justify-center items-center">
            <div>반갑습니다</div>
          </li>
          <li className="flex translate-y-6 opacity-0 shadow-lg rounded-full w-64 h-24 my-3 justify-center items-center">
            <div>반갑습니다</div>
          </li>
          <li className="flex translate-y-6 opacity-0 shadow-lg rounded-full w-64 h-24 my-3 justify-center items-center">
            <div>반갑습니다</div>
          </li>
        </ul>
      </div>
    </div>
  );
}
