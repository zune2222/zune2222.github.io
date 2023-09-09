import { usePathname } from "next/navigation";
import { useRef, useEffect, useState } from "react";
export default function useObserver() {
  const rootRef = useRef(null);
  const pathname = usePathname();
  useEffect(() => {
    const aniBoxes = document.querySelectorAll(".toc-class");
    const callback = (entries, observer) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0px)";
          entry.target.style.pointerEvents = "auto";
          entry.target.style.transition = "500ms ease-out";
          entry.target.style.transitionDelay = `${i * 30}ms`;
        } else {
          // entry.target.style.opacity = "0";
          // entry.target.style.transform = "translateY(20px)";
          // entry.target.style.pointerEvents = "none";
          // entry.target.style.transition = "200ms ease-out";
          // entry.target.style.transitionDelay = `${i * 15}ms`;
        }
      });
    };
    const observer = new IntersectionObserver(callback, { threshold: 0.3 });
    aniBoxes.forEach((aniBox) => observer.observe(aniBox));
  }, [pathname]);

  return rootRef;
}
