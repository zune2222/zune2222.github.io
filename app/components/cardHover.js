import { gsap } from "gsap";
import { useCallback, useState } from "react";
export default function CardHover({ children }) {
  const [cardElement, setCardElement] = useState(null);
  const setTransformVariable = useCallback(
    (e) => {
      if (cardElement != null) {
        const bounds = cardElement.getBoundingClientRect();

        const mouseX = e.clientX;
        const mouseY = e.clientY;
        const leftX = mouseX - bounds.x;
        const topY = mouseY - bounds.y;

        const cardX = leftX - bounds.width / 2;
        const cardY = topY - bounds.height / 2;

        const cardRotateX = (-1 * cardY) / 100;
        const cardRotateY = cardX / 100;

        gsap.to(cardElement, {
          scale: 1.07,
          rotateX: cardRotateX * 12,
          rotateY: cardRotateY * 12,
        });
      }
    },
    [cardElement]
  );

  const clearTransformVariable = useCallback(() => {
    if (cardElement != null) {
      gsap.to(cardElement, {
        scale: 1,
        rotateX: 0,
        rotateY: 0,
      });
    }
  }, [cardElement]);

  return (
    <div>
      <div
        className="card-root"
        onMouseMove={setTransformVariable}
        onMouseLeave={clearTransformVariable}
      >
        <div className="card" ref={setCardElement}>
          {children}
        </div>
      </div>

      <style jsx>{`
        .card-root {
          display: flex;
          justify-content: center;
          align-items: center;
          perspective: 800px;
        }

        .card {
          display: flex;
          flex-direction: column;
          // box-shadow: 0px 24px 72px rgba(36, 42, 48, 0.3),
          //   inset 0px 0px 0px 1px rgba(0, 0, 0, 0.08);
          // box-shadow: 0px 24px 72px rgba(36, 42, 48, 0.3),
          //   inset 0px 0px 0px 1px rgba(0, 0, 0, 0.08);
          transition: all 300ms ease-out;
        }
      `}</style>
    </div>
  );
}
