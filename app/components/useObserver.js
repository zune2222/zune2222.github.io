import { usePathname } from "next/navigation";
import { useRef, useEffect } from "react";

export default function useObserver() {
  const rootRef = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    // 클라이언트 사이드에서만 실행되도록 설정
    if (typeof window === "undefined") return;

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

    // 컴포넌트 언마운트 시 옵저버 해제
    return () => observer.disconnect();
  }, [pathname]);

  return rootRef;
}
