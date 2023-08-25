"use client";
import { AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import PageTransition from "./pageTransition";
import TravelButton from "./travelButton";
export default function Wrap({ children }) {
  const pathname = usePathname();
  return (
    <>
      <TravelButton />
      {children}
      {/* <AnimatePresence isExiting={true} mode="wait">
        <PageTransition key={pathname}>{children}</PageTransition>
      </AnimatePresence> */}
    </>
  );
}
