import { appleFontEB } from "./fontZip";
import { appleFontB } from "./fontZip";
export default function HomeIntro() {
  return (
    <div>
      <div className="mt-10 flex justify-center">
        <div className="w-96 h-auto p-5 text-center">
          <div
            className={`toc-class translate-y-6 opacity-0 ${appleFontEB.className} text-black text-4xl`}
          >
            준이는 만드는 게 좋다.
          </div>
          <div
            id="toc-header"
            className={`toc-class translate-y-6 opacity-0 ${appleFontB.className} text-gray-500 mt-5`}
          >
            아이디어로 세상을 변화시키며 즐거움과 혁신을 창출. 그 기록을
            'TravelButton'과 함께 시작해보세요.
          </div>
        </div>
      </div>
    </div>
  );
}
