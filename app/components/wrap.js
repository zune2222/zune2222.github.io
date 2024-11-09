"use client";
import { usePathname } from "next/navigation";
import TravelButton from "./travelButton";
import useObserver from "./useObserver";
export default function Wrap({ children }) {
  const rootRef = useObserver();
  const pathname = usePathname();
  return (
    <>
      <TravelButton />
      <div ref={rootRef}>{children}</div>
    </>
  );
}
