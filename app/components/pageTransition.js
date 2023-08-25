"use client";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
export default function PageTransition({ children }) {
  const animate = {
    initial: {
      // transform: `translateY(30px)`,
      opacity: 0,
      transition: `transform 0.2s ease`,
    },
    animate: {
      // transform: `translateY(0px)`,
      opacity: 1,
      transition: `transform 0.2s ease`,
    },
    exit: {
      // transform: `translateY(30px)`,
      opacity: 0,
      transition: `transform 0.2s ease`,
    },
  };
  const pathname = usePathname();
  return (
    <motion.div
      initial={animate.initial}
      animate={animate.animate}
      exit={animate.exit}
    >
      {children}
    </motion.div>
  );
}
