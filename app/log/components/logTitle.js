import { appleFontEB, appleFontB } from "@/app/components/fontZip";
export default function LogTitle() {
  return (
    <div className="flex w-full flex-col justfy-center items-center">
      <div className="w-{85} h-auto p-5 text-center items-center justify-center">
        <div
          className={`toc-class translate-y-6 opacity-0 ${appleFontEB.className} 
    text-black text-4xl`}
        >
          기록
        </div>
        <div
          id="toc-header"
          className={`toc-class translate-y-6 opacity-0 ${appleFontB.className} text-gray-500 mt-5`}
        >
          <div>사실 우연히 사고를 쳤네 알고한 것 처럼 겉으로</div>
          <div>보이지만 자세히 보면 정답을 몰랐네 🎵</div>
        </div>
      </div>
    </div>
  );
}
