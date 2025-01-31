import { appleFontEB, appleFontB } from "../../components/fontZip";
export default function MemoryTitle() {
  return (
    <div className="flex w-full flex-col justfy-center items-center">
      <div className="w-{85} h-auto p-5 text-center items-center justify-center">
        <div
          className={`toc-class translate-y-6 opacity-0 ${appleFontEB.className} 
    text-black text-4xl`}
        >
          넋두리
        </div>
        <div
          id="toc-header"
          className={`toc-class translate-y-6 opacity-0 ${appleFontB.className} text-gray-500 mt-5`}
        >
          <div>Livin young till I die</div>
        </div>
      </div>
    </div>
  );
}
